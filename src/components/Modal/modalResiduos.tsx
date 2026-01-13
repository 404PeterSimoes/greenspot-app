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
          <IonLabel className="firstText">O que pretende depositar?</IonLabel>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="wrapper">
          <IonGrid>
            <IonRow>
              <IonCol></IonCol>
              <IonCol size="auto">
                <div onClick={setTudo} className="formatacaoCima">
                  Tudo
                </div>
              </IonCol>
              <IonCol size="auto">
                <div onClick={setLimpar} className="formatacaoCima">
                  Limpar
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
                  className={residuosPretendidos.Papel ? 'formatacao papel' : 'formatacao desativado'}
                >
                  {residuosPretendidos.Papel && (
                    <IonIcon size="large" icon={residuosPretendidos.Papel ? checkmarkOutline : undefined} />
                  )}
                  <IonLabel>Papel</IonLabel>
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
                  className={residuosPretendidos.Plastico ? 'formatacao plastico' : 'formatacao desativado'}
                >
                  {residuosPretendidos.Plastico && (
                    <IonIcon
                      size="large"
                      icon={residuosPretendidos.Plastico ? checkmarkOutline : undefined}
                      className={residuosPretendidos.Plastico ? 'icone' : ''}
                    />
                  )}
                  Plástico
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
                  className={residuosPretendidos.Vidro ? 'formatacao vidro' : 'formatacao desativado'}
                >
                  {residuosPretendidos.Vidro && (
                    <IonIcon size="large" icon={residuosPretendidos.Vidro ? checkmarkOutline : undefined} />
                  )}
                  Vidro
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
                  className={residuosPretendidos.Oleao ? 'formatacao oleao' : 'formatacao oleao desativado'}
                >
                  {residuosPretendidos.Oleao && (
                    <IonIcon size="large" icon={residuosPretendidos.Oleao ? checkmarkOutline : undefined} />
                  )}
                  Óleos Alimentares
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
                  className={residuosPretendidos.Pilhao ? 'formatacao pilhao' : 'formatacao desativado'}
                >
                  {residuosPretendidos.Pilhao && (
                    <IonIcon size="large" icon={residuosPretendidos.Pilhao ? checkmarkOutline : undefined} />
                  )}
                  Pilhas
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
