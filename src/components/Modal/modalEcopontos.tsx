import {
    IonContent,
    IonItem,
    IonList,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonSpinner,
    IonPage,
} from '@ionic/react';
import useEcopontos from '../../hooks/useEcopontos';


const ModalPageEcopontos: React.FC = () => {
    const { arrayEcopontos, loadingState } = useEcopontos();

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <h1>Ecopontos</h1>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {loadingState ? (
                    <div style={{ textAlign: 'center', marginTop: '50%' }}>
                        <IonSpinner />
                    </div>
                ) : (
                    <IonList lines="full">
                        {arrayEcopontos.map((eco) => (
                            <IonItem key={eco.codigo}>
                                <IonLabel>
                                    <h2>{eco.morada}</h2>
                                </IonLabel>
                            </IonItem>
                        ))}
                    </IonList>
                )}
            </IonContent>
        </>
    );
};

export default ModalPageEcopontos;

/*
                {loadingState ? (
                    <div style={{ textAlign: 'center', marginTop: '50%' }}>
                        <IonSpinner />
                    </div>
                ) : (
                    <IonList lines="full">
                        {arrayEcopontos.map((eco) => (
                            <IonItem key={eco.codigo}>
                                <IonLabel>
                                    <h2>{eco.morada}</h2>
                                </IonLabel>
                            </IonItem>
                        ))}
                    </IonList>
                )}
                    */
