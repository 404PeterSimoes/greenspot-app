import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

const useMapStyle = () => {
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/standard-satellite');

  // Load saved value on mount
    const loadStyle = async () => {
      const { value } = await Preferences.get({ key: 'mapStyle' });
      if (value) setMapStyle(value);
    };

  useEffect(() => {
    loadStyle();
  }, []);

  // Update and save
  const updateMapStyle = async (newStyle: string) => {
    setMapStyle(newStyle);
    await Preferences.set({ key: 'mapStyle', value: newStyle });
  };

  return { mapStyle, updateMapStyle };
};

export default useMapStyle;