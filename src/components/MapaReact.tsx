import { IonPage, IonContent } from '@ionic/react';
import { useContext, useEffect, useRef } from 'react';
import Map, { Marker, MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import markerEcoponto from '../assets/marker_ecoponto.png';
import './MapaReact.css';
import { EcopontosContext } from '../context/ecopontosContext';

const Mapa: React.FC = () => {
    const { arrayEcopontos, selectedEcoponto, setSelectedEcoponto, setModalEcoSelecionado } =
        useContext(EcopontosContext);

    const mapRef = useRef<MapRef>(null);

    // Quando o selectedEcoponto muda, o mapa move-se para ele
    useEffect(() => {
        if (selectedEcoponto && mapRef.current) {
            mapRef.current.flyTo({
                center: [selectedEcoponto.Longitude, selectedEcoponto.Latitude],
                zoom: 16.5,
                duration: 3000,
                essential: true,
                offset: [0, -260],
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
                onTouchMove={() => {
                    setModalEcoSelecionado(false);

                    // Delay para apenas desselecionar o ecoponto quando o modal sair
                    setTimeout(() => setSelectedEcoponto(null), 150);
                }}
            >
                {arrayEcopontos.map((eco) => (
                    <Marker
                        key={eco.Codigo}
                        latitude={eco.Latitude}
                        longitude={eco.Longitude}
                        anchor="bottom"
                        onClick={() => {
                            const ecoSelecionado = eco;
                            setSelectedEcoponto(ecoSelecionado);
                            setModalEcoSelecionado(true);
                        }}
                    >
                        <img
                            className={`imgEcoponto ${selectedEcoponto === eco ? 'selected' : ''}`}
                            src={markerEcoponto}
                        />
                    </Marker>
                ))}
            </Map>
        </IonContent>
    );
};

export default Mapa;
