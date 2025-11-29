import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    IonGrid,
    IonRow,
    IonCol,
} from '@ionic/react';
import './modalResiduos.css'

const ModalPageResiduos: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <h3 style={{ textAlign: 'center', marginTop: 'none' }}>Resíduos</h3>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol><div>Tudo</div></IonCol>
                        <IonCol><div>Limpar</div></IonCol>
                    </IonRow>
                </IonGrid>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <div className='papel'>Papel</div>
                        </IonCol>
                        <IonCol>
                            <div className='plastico'>Plástico</div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <div className='vidro'>Vidro</div>
                        </IonCol>
                        <IonCol>
                            <div className='oleao'>Oleão</div>
                        </IonCol>
                        <IonCol>
                            <div className='pilhao'>Pilhão</div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ModalPageResiduos;
