import { Geolocation, Position } from '@capacitor/geolocation';
import { createContext, useEffect, useState } from 'react';

type Pos = { lat: number; lng: number } | null;

interface DataContextType {
    position: Pos;
    //getCurrentLocation: () => Promise<Pos>;
}

export const GeolocationContext = createContext<DataContextType | undefined>(undefined);

export const GeolocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    /*
    const getCurrentLocation = async () => {
        const p = await Geolocation.getCurrentPosition({ enableHighAccuracy: true});
        const coords = { lat: p.coords.latitude, lng: p.coords.longitude };
        return coords;
    };

    return (
        <GeolocationContext.Provider value={{ getCurrentLocation }}>
            {children}
        </GeolocationContext.Provider>
    );
    */

    const [position, setPosition] = useState<Pos | null>(null);

    // Inicia o watchPosition ao abrir a App
    useEffect(() => {
        let watchId: string | null = null;

        const startWatching = async () => {
            watchId = await Geolocation.watchPosition({ enableHighAccuracy: true }, (pos, err) => {
                if (pos) {
                    const coords = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    };
                    setPosition(coords);
                }
            });
        };

        startWatching();

        return () => {
            if (watchId) {
                Geolocation.clearWatch({ id: watchId });
            }
        };
    }, []);

    return (
        <GeolocationContext.Provider value={{ position /*, getCurrentLocation*/ }}>
            {children}
        </GeolocationContext.Provider>
    );
};
