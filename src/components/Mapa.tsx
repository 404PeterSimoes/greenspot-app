import './Mapa.css';
import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { IonContent, IonPage } from '@ionic/react';

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
            center: [-8.525892398242028, 38.96373575159655],
            zoom: 14.12,
            style: 'mapbox://styles/mapbox/standard-satellite',
            attributionControl: false,
        });

        mapRef.current.on('load', () => {
            if (!mapRef.current) return;
            mapRef.current.resize();
        });

        return () => {
            mapRef.current?.remove();
        };
    }, []);

    return (
        <>
            <IonPage>
                <IonContent>
                    <div id="map-container" ref={mapContainerRef} />
                </IonContent>
            </IonPage>
        </>
    );
};

export default Mapa;
