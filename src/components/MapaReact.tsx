import { IonPage, IonContent } from '@ionic/react';
import { useContext, useEffect, useRef } from 'react';
import Map, { Marker, MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import markerEcoponto from '../assets/marker_ecoponto.png';
import './MapaReact.css';
import { EcopontosContext } from '../context/ecopontosContext';

const Mapa: React.FC = () => {
    const { arrayEcopontos, selectedEcoponto } = useContext(EcopontosContext);

    const mapRef = useRef<MapRef>(null);

    // Efeito: quando o selectedEcoponto muda, o mapa move-se para ele
    useEffect(() => {
        if (selectedEcoponto && mapRef.current) {
            mapRef.current.flyTo({
                center: [selectedEcoponto.Longitude, selectedEcoponto.Latitude],
                zoom: 15,
                duration: 2000,
                essential: true,
            });
        }
    }, [selectedEcoponto]);

    return (
        <IonContent>
            <Map
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                ref={mapRef}
                initialViewState={{
                    latitude: 38.96373575159655,
                    longitude: -8.525892398242028,
                    zoom: 14.12,
                }}
                style={{ width: '100%', height: '100%' }}
                //mapStyle="mapbox://styles/mapbox/streets-v9"
                mapStyle="mapbox://styles/mapbox/standard-satellite"
                attributionControl={false}
            >
                {arrayEcopontos.map((eco) => (
                    <Marker
                        key={eco.Codigo}
                        latitude={eco.Latitude}
                        longitude={eco.Longitude}
                        anchor="bottom"
                    >
                        <img className="imgEcoponto" src={markerEcoponto} />
                    </Marker>
                ))}
            </Map>
        </IonContent>
    );
};

export default Mapa;
