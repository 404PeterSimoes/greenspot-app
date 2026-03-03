import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { isPlatform } from '@ionic/react';
import { useState } from 'react';

export interface UserPhoto {
  webviewPath?: string;
  filePath?: string;
  fileName?: string;
}

export const usePhotoGallery = () => {
  const [photo, setPhoto] = useState<UserPhoto | null>(null);

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve((reader.result as string).split(',')[1]);
      };
      reader.readAsDataURL(blob);
    });
  };

  /** ---------------------------
   * Pick a photo from the gallery
   * --------------------------- */
  const pickPhotoFromGallery = async () => {
    const selectedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos, // open gallery
      quality: 90,
    });

    if (!selectedPhoto.path && !selectedPhoto.webPath) return;

    const fileName = `ecoponto_${Date.now()}.jpg`;

    const response = await fetch(selectedPhoto.webPath!);
    const blob = await response.blob();

    const base64Data = await blobToBase64(blob);

    // save to temporary cache directory
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Cache,
    });

    // get real file URI
    const fileUri = await Filesystem.getUri({
      directory: Directory.Cache,
      path: fileName,
    });

    // save file URI in state
    setPhoto({
      webviewPath: isPlatform('hybrid') ? Capacitor.convertFileSrc(selectedPhoto.webPath!) : selectedPhoto.webPath!,
      filePath: fileUri.uri,
      fileName: fileName,
    });
  };

  const deletePhoto = async () => {
    try {
      await Filesystem.deleteFile({
        directory: Directory.Cache,
        path: photo!.fileName!,
      });

      setPhoto(null);
    } catch (error) {
      alert(`Erro ao apagar foto: ${error}`);
    }
  };

  return {
    photo,
    pickPhotoFromGallery,
    deletePhoto,
  };
};
