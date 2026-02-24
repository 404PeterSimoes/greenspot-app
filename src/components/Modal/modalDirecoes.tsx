import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonSegmentView,
  IonSegmentContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/react';
import {
  car,
  walk,
  bicycle,
  chevronForwardOutline,
  arrowForward,
  arrowForwardOutline,
  refreshOutline,
} from 'ionicons/icons';
import './modalDirecoes.css';
import { useContext, useEffect } from 'react';
import { EcopontosContext } from '../../context/ecopontosContext';

interface Props {
  modeDirecoes: string;
  setModeDirecoes: (value: string) => void;
  objectDataDirecoes: {
    walk: {
      distance: number;
      duration: number;
    };
    car: {
      distance: number;
      duration: number;
    };
    cycle: {
      distance: number;
      duration: number;
    };
  };

  stringDistancia: (distance: number) => string;
  stringDuracao: (duration: number) => string;

  followDirection: boolean;
  setFollowDirection: (value: boolean) => void;
  setRefreshDirection: (value: boolean) => void;
}

const ModalPageDirecoes: React.FC<Props> = ({
  modeDirecoes,
  setModeDirecoes,
  objectDataDirecoes,
  stringDistancia,
  stringDuracao,
  followDirection,
  setFollowDirection,
  setRefreshDirection,
}) => {
  const { selectedEcoponto } = useContext(EcopontosContext);

  useEffect(() => setModeDirecoes('walk'), []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="direcoesToolbar">
          <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
            Localização Atual <IonIcon src={chevronForwardOutline} />
            <span style={{ fontWeight: 'bold' }}> {selectedEcoponto?.Morada}</span>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="direcoesContentHeight">
          <IonSegment
            value={modeDirecoes}
            onIonChange={(e) => {
              const value = e.detail.value;

              if (value === 'walk') setModeDirecoes('walk');
              else if (value === 'car') setModeDirecoes('car');
              else if (value === 'cycle') setModeDirecoes('cycle');
            }}
          >
            <IonSegmentButton value="walk" contentId="walk">
              <IonIcon src={walk} />
            </IonSegmentButton>
            <IonSegmentButton value="car" contentId="car">
              <IonIcon src={car} />
            </IonSegmentButton>
            <IonSegmentButton value="cycle" contentId="cycle">
              <IonIcon src={bicycle} />
            </IonSegmentButton>
          </IonSegment>
          <IonSegmentView>
            <IonSegmentContent id="walk">
              <IonGrid>
                <IonRow>
                  <IonCol className="direcoesColumn" style={{ textAlign: 'center' }}>
                    <span className="spanDuration">{stringDuracao(objectDataDirecoes.walk.duration)}</span>{' '}
                    <span className="spanDistance">({stringDistancia(objectDataDirecoes.walk.distance)})</span>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonSegmentContent>
            <IonSegmentContent id="car">
              <IonCol className="direcoesColumn" style={{ textAlign: 'center' }}>
                <span className="spanDuration">{stringDuracao(objectDataDirecoes.car.duration)}</span>{' '}
                <span className="spanDistance">({stringDistancia(objectDataDirecoes.car.distance)})</span>
              </IonCol>
            </IonSegmentContent>
            <IonSegmentContent id="cycle">
              <IonCol className="direcoesColumn" style={{ textAlign: 'center' }}>
                <span className="spanDuration">{stringDuracao(objectDataDirecoes.cycle.duration)}</span>{' '}
                <span className="spanDistance">({stringDistancia(objectDataDirecoes.cycle.distance)})</span>
              </IonCol>
            </IonSegmentContent>
          </IonSegmentView>
          <IonGrid style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', padding: 0 }}>
            <IonRow>
              <IonCol style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                {followDirection ? (
                  <IonButton
                    className="direcoes vermelho"
                    style={{ width: '100%' }}
                    expand="block"
                    onClick={() => setFollowDirection(false)}
                  >
                    <IonIcon src={arrowForwardOutline} slot="start" />
                    Deixar de Seguir
                  </IonButton>
                ) : (
                  <IonButton
                    className="direcoes"
                    style={{ width: '100%' }}
                    expand="block"
                    onClick={() => setFollowDirection(true)}
                  >
                    <IonIcon src={arrowForwardOutline} slot="start" />
                    Seguir
                  </IonButton>
                )}
              </IonCol>
              <IonCol style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <IonButton
                  className="direcoes"
                  style={{ width: '100%' }}
                  expand="block"
                  onClick={() => setRefreshDirection(true)}
                >
                  <IonIcon src={refreshOutline} slot="start" />
                  Atualizar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ModalPageDirecoes;
