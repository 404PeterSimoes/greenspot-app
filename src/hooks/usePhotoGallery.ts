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

  /** ---------------------------
   * Pick a photo from the gallery
   * --------------------------- */
  const pickPhotoFromGallery = async () => {
    const selectedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos, // open gallery
      quality: 100,
    });

    const tempPhoto: UserPhoto = {
      webviewPath: isPlatform('hybrid') ? Capacitor.convertFileSrc(selectedPhoto.path!) : selectedPhoto.webPath!,
    };

    // Save it temporarily in state only
    setPhoto(tempPhoto);
  };

  const deletePhoto = () => {
    setPhoto(null);
  };

  return {
    photo,
    pickPhotoFromGallery,
    deletePhoto,
  };
};
