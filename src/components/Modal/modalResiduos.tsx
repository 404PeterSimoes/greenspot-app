import { IonContent, IonHeader, IonToolbar, IonPage } from '@ionic/react';

const ModalPageResiduos: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <h3 style={{ textAlign: 'center', marginTop:'none' }}>Resíduos</h3>
                </IonToolbar>
            </IonHeader>
            <IonContent></IonContent>
        </IonPage>
    );
};

export default ModalPageResiduos;
