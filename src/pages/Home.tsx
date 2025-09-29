import { useState, useEffect } from 'react';
import { IonPage, IonContent, IonModal, IonButton } from '@ionic/react';
import Mapa from '../components/Mapa';
import Ecopontos from '../components/Modal/Ecopontos';
import Residuos from '../components/Modal/Residuos';
import Chatbot from '../components/Modal/Chatbot';

const Home = () => {
    const [isModal1Open, setModal1Open] = useState(false);
    const [isModal2Open, setModal2Open] = useState(false);
    const [isModal3Open, setModal3Open] = useState(false);

    useEffect(() => {
        const openModal1 = () => setModal1Open(true);
        const openModal2 = () => setModal2Open(true); 
        const openModal3 = () => setModal3Open(true); 

        window.addEventListener('open-modal1', openModal1);
        window.addEventListener('open-modal2', openModal2);
        window.addEventListener('open-modal3', openModal3);

        return () => {
            window.removeEventListener('open-modal1', openModal1);
            window.removeEventListener('open-modal2', openModal2);
            window.removeEventListener('open-modal3', openModal3);
        };
    }, []);

    return (
        <IonPage>
            <IonContent>
                <Mapa />

                {/* Modals */}
                <IonModal isOpen={isModal1Open} onDidDismiss={() => setModal1Open(false)}>
                    <Ecopontos />
                </IonModal>

                <IonModal isOpen={isModal2Open} onDidDismiss={() => setModal2Open(false)}>
                    <Residuos />
                </IonModal>

                <IonModal isOpen={isModal3Open} onDidDismiss={() => setModal3Open(false)}>
                    <Chatbot />
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default Home;
