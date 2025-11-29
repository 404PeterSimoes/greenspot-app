import { Geolocation } from '@capacitor/geolocation';
import { createContext, useContext, useEffect, useState } from 'react';
import { EcopontosContext } from './ecopontosContext';

type Pos = { lat: number; lng: number } | null;

interface DataContextType {
    position: Pos;
}

export const GeolocationContext = createContext<DataContextType | undefined>(undefined);

export const GeolocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [position, setPosition] = useState<Pos | null>(null);
    const { arrayEcopontos, setEcopontos, showModalEcopontos } = useContext(EcopontosContext)!;

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

    useEffect(() => {
        updateEcopontosPosition();
    }, [showModalEcopontos]);

    function formulaHaversine(lat1: number, lon1: number, lat2: number, lon2: number) {
        const R = 6371; // raio da Terra em km
        const toRad = (x: number) => (x * Math.PI) / 180;

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

        return  R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    function updateEcopontosPosition() {
        if (position) {
            const arrayEcopontosOrdenados = arrayEcopontos
                .map((eco) => ({
                    ...eco,
                    Distancia: formulaHaversine(
                        position.lat,
                        position.lng,
                        eco.Latitude,
                        eco.Longitude
                    ),
                }))
                .sort((a, b) => a.Distancia - b.Distancia);

            setEcopontos(arrayEcopontosOrdenados);
            console.log('Ecopontos updated!');
        }
    }

    return (
        <GeolocationContext.Provider value={{ position /*, getCurrentLocation*/ }}>
            {children}
        </GeolocationContext.Provider>
    );
};
