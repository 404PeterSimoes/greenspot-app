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
} from '@ionic/react';
import { car, walk, bicycle, chevronForwardOutline } from 'ionicons/icons';
import './modalDirecoes.css';
import { useContext, useEffect } from 'react';
import { EcopontosContext } from '../../context/ecopontosContext';

interface Props {
  modeDirecoes: string;
  setModeDirecoes: (value: string) => void;
}

const ModalPageDirecoes: React.FC<Props> = ({ modeDirecoes, setModeDirecoes }) => {
  const { selectedEcoponto } = useContext(EcopontosContext);
  useEffect(() => {
    setModeDirecoes('car');
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="direcoesToolbar">
          <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
            Localização Atual <IonIcon src={chevronForwardOutline} />
            <span style={{ fontWeight: 'bold' }}>{selectedEcoponto?.Morada}</span>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="direcoesContentHeight">
          <IonSegment
            value={modeDirecoes}
            onIonChange={(e) => {
              const value = e.detail.value;

              if (value === 'car') setModeDirecoes('car');
              else if (value === 'walk') setModeDirecoes('walk');
              else if (value === 'cycle') setModeDirecoes('cycle');
            }}
          >
            <IonSegmentButton value="car" contentId="car">
              <IonIcon src={car} />
            </IonSegmentButton>
            <IonSegmentButton value="walk" contentId="walk">
              <IonIcon src={walk} />
            </IonSegmentButton>
            <IonSegmentButton value="cycle" contentId="cycle">
              <IonIcon src={bicycle} />
            </IonSegmentButton>
          </IonSegment>
          <IonSegmentView>
            <IonSegmentContent id="car">Carro</IonSegmentContent>
            <IonSegmentContent id="walk">Andar</IonSegmentContent>
            <IonSegmentContent id="cycle">Bicicleta</IonSegmentContent>
          </IonSegmentView>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ModalPageDirecoes;
