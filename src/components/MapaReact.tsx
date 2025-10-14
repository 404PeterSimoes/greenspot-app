import { IonPage, IonContent } from '@ionic/react';
import { useContext } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import markerEcoponto from '../assets/marker_ecoponto.png';
import './MapaReact.css';
import { EcopontosContext } from '../context/ecopontosContext';

const Mapa: React.FC = () => {
    const { arrayEcopontos } = useContext(EcopontosContext);

    return (
        <IonContent>
            <Map
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
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
                        key={eco.codigo}
                        latitude={eco.latitude}
                        longitude={eco.longitude}
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
