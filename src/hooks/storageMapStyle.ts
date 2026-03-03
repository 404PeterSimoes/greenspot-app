import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

const useMapStyle = () => {
  //const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/standard-satellite');
  const [mapStyle, setMapStyle] = useState(true);

  // Carrega define o estado ao abrir a aplicação
  const loadStyle = async () => {
    const { value } = await Preferences.get({ key: 'mapStyle' });
    if (value === 'true') {
      setMapStyle(true);
    } else {
      setMapStyle(false);
    }
  };

  useEffect(() => {
    loadStyle();
  }, []);

  // Atualizar estado e guardar no storage em cache
  const updateMapStyle = async (newStyle: boolean) => {
    setMapStyle(newStyle);
    await Preferences.set({ key: 'mapStyle', value: newStyle ? 'true' : 'false' });
  };

  return { mapStyle, updateMapStyle };
};

export default useMapStyle;
