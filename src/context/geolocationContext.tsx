import { Geolocation } from '@capacitor/geolocation';
import { createContext, useContext, useState } from 'react';

type Pos = { lat: number; lng: number } | null;

interface DataContextType {
    getCurrentLocation: () => void;
    position: Pos;
}

const GeolocationContext = createContext<DataContextType | undefined>(undefined);

export const GeolocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [position, setPosition] = useState<Pos>(null);

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition()
            .then((p) => {
                const coords = { lat: p.coords.latitude, lng: p.coords.longitude };
                setPosition(coords);
            })
            .catch((err) => {
                console.error('Erro ao obter localização:', err);
            });
    };

    return (
        <GeolocationContext.Provider value={{ getCurrentLocation, position }}>
            {children}
        </GeolocationContext.Provider>
    );
};

export const useGeolocation = () => {
    const context = useContext(GeolocationContext);
    return context;
};
