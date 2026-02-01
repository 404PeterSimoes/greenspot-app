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
import { car, walk, bicycle, arrowForward, chevronForwardOutline } from 'ionicons/icons';
import './modalDirecoes.css';
import { useContext } from 'react';
import { EcopontosContext } from '../../context/ecopontosContext';

const ModalPageDirecoes: React.FC = () => {
  const { selectedEcoponto } = useContext(EcopontosContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="direcoesToolbar">
          <div style={{paddingLeft: '16px', paddingRight: '16px'}}>
            Localização Atual <IonIcon src={chevronForwardOutline} />
            <span style={{ fontWeight: 'bold' }}>{selectedEcoponto?.Morada}</span>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='direcoesContentHeight'>
        <IonSegment value="car">
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
