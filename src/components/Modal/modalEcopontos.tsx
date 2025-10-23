import {
    IonContent,
    IonItem,
    IonList,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonPage,
    IonSearchbar,
} from '@ionic/react';
import { useContext, useState } from 'react';

import { EcopontosContext } from '../../context/ecopontosContext';

const ModalPageEcopontos: React.FC = () => {
    const { arrayEcopontos } = useContext(EcopontosContext);

    const Lista: React.FC = () => (
        <IonList lines="full">
            {arrayEcopontos.map((eco) => (
                <IonItem
                    key={eco.Codigo}
                    button
                    onClick={() => {
                        console.log('teste');
                    }}
                >
                    <IonLabel>
                        <h2>{eco.Morada}</h2>
                    </IonLabel>
                </IonItem>
            ))}
        </IonList>
    );

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {/*<h1 style={{textAlign: 'center'}}>Ecopontos</h1>*/}
                    <IonSearchbar placeholder="Pesquisar Ecopontos" />
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Lista />
            </IonContent>
        </IonPage>
    );
};

export default ModalPageEcopontos;
