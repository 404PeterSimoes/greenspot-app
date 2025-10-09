import './Mapa.css';
import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { IonContent, IonPage } from '@ionic/react';

import 'mapbox-gl/dist/mapbox-gl.css';

const Markers = (mapa: mapboxgl.Map) => {
    // marker
    const el = document.createElement('div');
    el.style.backgroundImage = 'url(../assets/marker_ecoponto.png)';
    el.style.width = '32px';
    el.style.height = '32px';
    el.style.cursor = 'pointer';

    const marker = new mapboxgl.Marker({ element: el }).setLngLat([-74.006, 40.7128]).addTo(mapa);
};

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
            //Markers(mapRef.current);
        });

        const el = document.createElement('div');
        el.style.backgroundImage = 'url(../assets/marker_ecoponto.png)';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.cursor = 'pointer';

        const marker = new mapboxgl.Marker()
            .setLngLat([-8.526351467741904, 38.964119833056614])
            .addTo(mapRef.current);

        return () => {
            mapRef.current?.remove();
        };
    }, []);

    return (
        <>
            <IonPage>
                <IonContent fullscreen>
                    <div id="map-container" ref={mapContainerRef} />
                </IonContent>
            </IonPage>
        </>
    );
};

export default Mapa;
