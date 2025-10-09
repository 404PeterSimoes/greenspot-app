import { IonPage, IonContent } from '@ionic/react';
import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const Mapa: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <Map
                    mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                    initialViewState={{
                        longitude: -122.4,
                        latitude: 37.8,
                        zoom: 14,
                    }}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle="mapbox://styles/mapbox/standard-satellite"
                    attributionControl={false}
                />
            </IonContent>
        </IonPage>
    );
};

export default Mapa;
