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
  dataDirecoes: { distance: number; duration: number };

  stringDistancia: (distance: number) => string;
  stringDuracao: (duration: number) => string;
}

const ModalPageDirecoes: React.FC<Props> = ({
  modeDirecoes,
  setModeDirecoes,
  dataDirecoes,
  stringDistancia,
  stringDuracao,
}) => {
  const { selectedEcoponto } = useContext(EcopontosContext);

  useEffect(() => setModeDirecoes('walk'),[])

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
              Andar
              <br />
              {stringDistancia(dataDirecoes.distance)} <br />
              {stringDuracao(dataDirecoes.duration)}
            </IonSegmentContent>
            <IonSegmentContent id="car">
              Carro
              <br />
              {stringDistancia(dataDirecoes.distance)} <br />
              {stringDuracao(dataDirecoes.duration)}
            </IonSegmentContent>
            <IonSegmentContent id="cycle">
              Bicicleta
              <br />
              {stringDistancia(dataDirecoes.distance)} <br />
              {stringDuracao(dataDirecoes.duration)}
            </IonSegmentContent>
          </IonSegmentView>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ModalPageDirecoes;
