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
    const [residuosPapel, setResiduosPapel] = useState(false);
    const [residuosPlastico, setResiduosPlastico] = useState(false);
    const [residuosVidro, setResiduosVidro] = useState(false);
    const [residuosOleao, setResiduosOleao] = useState(false);
    const [residuosPilhao, setResiduosPilhao] = useState(false);

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
                <IonLabel className='firstText'>O que pretende depositar?</IonLabel>
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
                                {residuosPapel && <IonIcon
                                    size="large"
                                    icon={residuosPapel ? checkmarkOutline : undefined}
                                />}
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
                                {residuosPlastico && <IonIcon
                                    size="large"
                                    icon={residuosPlastico ? checkmarkOutline : undefined}
                                    className={residuosPlastico ? 'icone' : ''}
                                />}
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
                                {residuosVidro && <IonIcon
                                    size="large"
                                    icon={residuosVidro ? checkmarkOutline : undefined}
                                />}
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
                               {residuosOleao && <IonIcon
                                    size="large"
                                    icon={residuosOleao ? checkmarkOutline : undefined}
                                />}
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
                                {residuosPilhao && <IonIcon
                                    size="large"
                                    icon={residuosPilhao ? checkmarkOutline : undefined}
                                />}
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
