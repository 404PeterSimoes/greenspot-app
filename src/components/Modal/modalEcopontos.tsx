import {
    IonContent,
    IonItem,
    IonList,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonPage,
} from '@ionic/react';
import { useContext } from 'react';

import { EcopontosContext } from '../../context/ecopontosContext';

const ModalPageEcopontos: React.FC = () => {
    const { arrayEcopontos } = useContext(EcopontosContext);

    const Lista: React.FC = () => (
        <IonList lines="full">
            {arrayEcopontos.map((eco) => (
                <IonItem key={eco.codigo}>
                    <IonLabel>
                        <h2>{eco.morada}</h2>
                    </IonLabel>
                </IonItem>
            ))}
        </IonList>
    );

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <h1 style={{textAlign: 'center'}}>Ecopontos</h1>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Lista />
            </IonContent>
        </IonPage>
    );
};

export default ModalPageEcopontos;