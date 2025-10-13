import { IonPage, IonContent } from '@ionic/react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import markerEcoponto from '../assets/marker_ecoponto.png';
import './MapaReact.css';

const Mapa: React.FC = () => {
    const ecopontos = [
        { id: 1, latitude: 38.9850531036262, longitude: -8.51704650887078 },
        { id: 2, latitude: 38.9590289941464, longitude: -8.52303300697236 },
        { id: 3, latitude: 38.9620051339888, longitude: -8.52243435377444 },
    ];

    return (
        <IonPage>
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
                    {ecopontos.map((eco) => (
                        <Marker latitude={eco.latitude} longitude={eco.longitude} anchor="bottom">
                            <img className="imgEcoponto" src={markerEcoponto} />
                        </Marker>
                    ))}
                </Map>
            </IonContent>
        </IonPage>
    );
};

export default Mapa;
