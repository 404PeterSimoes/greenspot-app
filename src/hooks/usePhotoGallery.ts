import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { isPlatform } from '@ionic/react';
import { useState } from 'react';

export interface UserPhoto {
  webviewPath?: string;
  fileName?: string;
}

export const usePhotoGallery = () => {
  const [photo, setPhoto] = useState<UserPhoto | null>(null);
  const [photoBase64, setPhotoBase64] = useState<any>(null);

  /** ---------------------------
   * Pick a photo from the gallery
   * --------------------------- */
  const pickPhotoFromGallery = async () => {
    const selectedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos, // open gallery
      quality: 90,
    });

    const tempPhoto: UserPhoto = {
      webviewPath: isPlatform('hybrid') ? Capacitor.convertFileSrc(selectedPhoto.path!) : selectedPhoto.webPath!,
    };

    // Save it temporarily in state only
    setPhoto(tempPhoto);

    const response = await fetch(selectedPhoto.webPath!);
    const blob = await response.blob();

    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });

    setPhotoBase64(base64);
  };

  const deletePhoto = () => {
    setPhoto(null);
    setPhotoBase64(null)
  };

  return {
    photo,
    photoBase64,
    pickPhotoFromGallery,
    deletePhoto,
  };
};
