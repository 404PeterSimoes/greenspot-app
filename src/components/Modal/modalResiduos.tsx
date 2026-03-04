import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonTitle,
  IonRippleEffect,
} from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import './modalResiduos.css';
import { checkmarkOutline, closeOutline } from 'ionicons/icons';
import { EcopontosContext } from '../../context/ecopontosContext';

const ModalPageResiduos: React.FC = () => {
  const { residuosPretendidos, setResiduosPretendidos } = useContext(EcopontosContext);

  const setTudo = () => {
    setResiduosPretendidos({
      Papel: true,
      Plastico: true,
      Vidro: true,
      Oleao: true,
      Pilhao: true,
    });
  };

  const setLimpar = () => {
    setResiduosPretendidos({
      Papel: false,
      Plastico: false,
      Vidro: false,
      Oleao: false,
      Pilhao: false,
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ textAlign: 'center' }}>
          <IonTitle style={{ color: '#272727' }}>O que pretende depositar?</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="wrapper">
          <IonGrid>
            <IonRow>
              <IonCol></IonCol>
              <IonCol size="auto">
                <div onClick={setTudo} className="formatacaoCima ion-activatable ripple-parent">
                  Tudo
                  <IonRippleEffect />
                </div>
              </IonCol>
              <IonCol size="auto">
                <div onClick={setLimpar} className="formatacaoCima ion-activatable ripple-parent">
                  Limpar
                  <IonRippleEffect />
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <div
                  onClick={() => {
                    // Função faz com que os estados dos outros botões permaneçam os mesmos
                    setResiduosPretendidos((prev) => ({
                      ...prev,
                      Papel: !prev.Papel,
                    }));
                  }}
                  className={`${residuosPretendidos.Papel ? 'formatacao papel' : 'formatacao desativado'} ion-activatable ripple-parent`}
                >
                  {residuosPretendidos.Papel && (
                    <IonIcon size="large" icon={residuosPretendidos.Papel ? checkmarkOutline : undefined} />
                  )}
                  Papel
                  <IonRippleEffect />
                </div>
              </IonCol>
              <IonCol>
                <div
                  onClick={() => {
                    setResiduosPretendidos((prev) => ({
                      ...prev,
                      Plastico: !prev.Plastico,
                    }));
                  }}
                  className={`${residuosPretendidos.Plastico ? 'formatacao plastico' : 'formatacao desativado'} ion-activatable ripple-parent`}
                >
                  {residuosPretendidos.Plastico && (
                    <IonIcon
                      size="large"
                      icon={residuosPretendidos.Plastico ? checkmarkOutline : undefined}
                      className={residuosPretendidos.Plastico ? 'icone' : ''}
                    />
                  )}
                  Plástico
                  <IonRippleEffect />
                </div>
              </IonCol>
              <IonCol>
                <div
                  onClick={() => {
                    setResiduosPretendidos((prev) => ({
                      ...prev,
                      Vidro: !prev.Vidro,
                    }));
                  }}
                  className={`${residuosPretendidos.Vidro ? 'formatacao vidro' : 'formatacao desativado'} ion-activatable ripple-parent`}
                >
                  {residuosPretendidos.Vidro && (
                    <IonIcon size="large" icon={residuosPretendidos.Vidro ? checkmarkOutline : undefined} />
                  )}
                  Vidro
                  <IonRippleEffect />
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <div
                  onClick={() => {
                    setResiduosPretendidos((prev) => ({
                      ...prev,
                      Oleao: !prev.Oleao,
                    }));
                  }}
                  className={`oleao1 ${residuosPretendidos.Oleao ? 'formatacao oleao' : 'formatacao desativado'} ion-activatable ripple-parent`}
                >
                  {residuosPretendidos.Oleao && (
                    <IonIcon size="large" icon={residuosPretendidos.Oleao ? checkmarkOutline : undefined} />
                  )}
                  Óleos Alimentares
                  <IonRippleEffect />
                </div>
              </IonCol>
              <IonCol>
                <div
                  onClick={() => {
                    setResiduosPretendidos((prev) => ({
                      ...prev,
                      Pilhao: !prev.Pilhao,
                    }));
                  }}
                  className={`${residuosPretendidos.Pilhao ? 'formatacao pilhao' : 'formatacao desativado'} ion-activatable ripple-parent`}
                >
                  {residuosPretendidos.Pilhao && (
                    <IonIcon size="large" icon={residuosPretendidos.Pilhao ? checkmarkOutline : undefined} />
                  )}
                  Pilhas
                  <IonRippleEffect />
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ModalPageResiduos;
