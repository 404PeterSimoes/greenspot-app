import { IonPage, IonContent } from '@ionic/react';
import { useContext, useEffect, useRef, useState } from 'react';
import Map, { Marker, MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import markerEcoponto from '../assets/marker_ecoponto.png';
import './MapaReact.css';
import { EcopontosContext } from '../context/ecopontosContext';

const Mapa: React.FC = () => {
    const {
        arrayEcopontos,
        selectedEcoponto,
        showModalEcoSelecionado,
        setSelectedEcoponto,
        setModalEcoSelecionado,
    } = useContext(EcopontosContext);

    const mapRef = useRef<MapRef>(null);
    const [bloquear, setBloquear] = useState(false);

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

    // Bloquear por 2,5 segundo o mapa após selecionar ecoponto, para não parar o flyto por acidente
    useEffect(() => {
        if (showModalEcoSelecionado) {
            setBloquear(true);
            setTimeout(() => setBloquear(false), 2500);
        } else {
            setBloquear(false);
        }
    }, [showModalEcoSelecionado, selectedEcoponto]);

    return (
        <IonContent style={{ postition: 'relative' }}>
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
                // Quando o mapa for movido, fecha o modal EcoSelecionado
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
                            // SetTimeout para o flyto acontecer mesmo que o user tenha feito double click no marker
                            setTimeout(() => {
                                const ecoSelecionado = eco;
                                setSelectedEcoponto(ecoSelecionado);
                                setModalEcoSelecionado(true);
                            }, 100);
                        }}
                    >
                        <img
                            className={`imgEcoponto ${selectedEcoponto === eco ? 'selected' : ''}`}
                            src={markerEcoponto}
                        />
                    </Marker>
                ))}
            </Map>
            {
                // Caso bloquear = true, mostra o bloqueioOverlay para o user não mexer no mapa durante o flyto (para não parar o flyto)
                bloquear && <div className="bloqueioOverlay"></div>
            }
        </IonContent>
    );
};

export default Mapa;
