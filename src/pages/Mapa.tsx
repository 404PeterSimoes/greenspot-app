// import './Mapa.css';
import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

import 'mapbox-gl/dist/mapbox-gl.css';

const Mapa = () => {
    const mapboxtoken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    const mapRef = useRef<mapboxgl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        mapboxgl.accessToken = mapboxtoken;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
        });

        return () => {
            mapRef.current?.remove();
        };
    }, []);

    return (
        <>
            <IonContent fullscreen>
                <div id="map-container" ref={mapContainerRef} />
            </IonContent>
        </>
    );
};

export default Mapa;
