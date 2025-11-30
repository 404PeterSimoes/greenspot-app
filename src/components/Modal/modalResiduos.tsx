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
    IonIcon,
} from '@ionic/react';
import './modalResiduos.css';
import { checkmarkOutline, closeOutline, colorFill } from 'ionicons/icons';

const ModalPageResiduos: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <h3 style={{ textAlign: 'center', marginTop: 'none' }}>Resíduos</h3>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="containerCima">
                    <div className="formatacaoCima">Tudo</div>
                    <div className="formatacaoCima">Limpar</div>
                </div>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <div onClick={() => console.log('a')} className="formatacao papel">
                                <IonIcon size="large" icon={closeOutline} />
                                <IonLabel>Papel</IonLabel>
                            </div>
                        </IonCol>
                        <IonCol>
                            <div className="formatacao plastico">
                                <IonIcon className='icone' size="large" icon={checkmarkOutline} />
                                Plástico
                            </div>
                        </IonCol>
                        <IonCol>
                            <div className="formatacao vidro">
                                <IonIcon size="large" icon={checkmarkOutline} />
                                Vidro
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <div className="formatacao oleao">
                                <IonIcon size="large" icon={checkmarkOutline} />
                                Óleos Alimentares
                            </div>
                        </IonCol>
                        <IonCol>
                            <div className="formatacao pilhao">
                                <IonIcon size="large" icon={checkmarkOutline} />
                                Pilhas
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ModalPageResiduos;
