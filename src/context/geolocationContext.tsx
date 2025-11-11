import { Geolocation } from '@capacitor/geolocation';
import { createContext, useContext, useState } from 'react';

type Pos = { lat: number; lng: number } | null;

interface DataContextType {
    getCurrentLocation: () => Promise<Pos>;
}

export const GeolocationContext = createContext<DataContextType | undefined>(undefined);

export const GeolocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const getCurrentLocation = async () => {
        const p = await Geolocation.getCurrentPosition();
        const coords = { lat: p.coords.latitude, lng: p.coords.longitude };
        return coords;
    };

    return (
        <GeolocationContext.Provider value={{ getCurrentLocation }}>
            {children}
        </GeolocationContext.Provider>
    );
};

/*
const printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    alert(`Current position: ${coordinates.coords.latitude} ${coordinates.coords.longitude}`);
};
*/
