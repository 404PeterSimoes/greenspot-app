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
import { useEffect, useState } from 'react';
import './modalResiduos.css';
import { checkmarkOutline, closeOutline } from 'ionicons/icons';

const ModalPageResiduos: React.FC = () => {
    const [residuosPapel, setResiduosPapel] = useState(true);
    const [residuosPlastico, setResiduosPlastico] = useState(true);
    const [residuosVidro, setResiduosVidro] = useState(true);
    const [residuosOleao, setResiduosOleao] = useState(true);
    const [residuosPilhao, setResiduosPilhao] = useState(true);

    const setTudo = () => {
        setResiduosPapel(true);
        setResiduosPlastico(true);
        setResiduosVidro(true);
        setResiduosOleao(true);
        setResiduosPilhao(true);
    };

    const setLimpar = () => {
        setResiduosPapel(false);
        setResiduosPlastico(false);
        setResiduosVidro(false);
        setResiduosOleao(false);
        setResiduosPilhao(false);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <h3 style={{ textAlign: 'center', marginTop: 'none' }}>Resíduos</h3>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="containerCima">
                    <div onClick={setTudo} className="formatacaoCima">
                        Tudo
                    </div>
                    <div onClick={setLimpar} className="formatacaoCima">
                        Limpar
                    </div>
                </div>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <div
                                onClick={() => setResiduosPapel(!residuosPapel)}
                                className={
                                    residuosPapel ? 'formatacao papel' : 'formatacao desativado'
                                }
                            >
                                <IonIcon
                                    size="large"
                                    icon={residuosPapel ? checkmarkOutline : closeOutline}
                                />
                                <IonLabel>Papel</IonLabel>
                            </div>
                        </IonCol>
                        <IonCol>
                            <div
                                onClick={() => setResiduosPlastico(!residuosPlastico)}
                                className={
                                    residuosPlastico
                                        ? 'formatacao plastico'
                                        : 'formatacao desativado'
                                }
                            >
                                <IonIcon
                                    size="large"
                                    icon={residuosPlastico ? checkmarkOutline : closeOutline}
                                    className={residuosPlastico ? 'icone' : ''}
                                />
                                Plástico
                            </div>
                        </IonCol>
                        <IonCol>
                            <div
                                onClick={() => setResiduosVidro(!residuosVidro)}
                                className={
                                    residuosVidro ? 'formatacao vidro' : 'formatacao desativado'
                                }
                            >
                                <IonIcon
                                    size="large"
                                    icon={residuosVidro ? checkmarkOutline : closeOutline}
                                />
                                Vidro
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <div
                                onClick={() => setResiduosOleao(!residuosOleao)}
                                className={
                                    residuosOleao
                                        ? 'formatacao oleao'
                                        : 'formatacao oleao desativado'
                                }
                            >
                                <IonIcon
                                    size="large"
                                    icon={residuosOleao ? checkmarkOutline : closeOutline}
                                />
                                Óleos Alimentares
                            </div>
                        </IonCol>
                        <IonCol>
                            <div
                                onClick={() => setResiduosPilhao(!residuosPilhao)}
                                className={
                                    residuosPilhao ? 'formatacao pilhao' : 'formatacao desativado'
                                }
                            >
                                <IonIcon
                                    size="large"
                                    icon={residuosPilhao ? checkmarkOutline : closeOutline}
                                />
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
