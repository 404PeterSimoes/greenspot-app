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
  arrayDataDirecoes: { mode: string; distance: number; duration: number }[];

  stringDistancia: (distance: number) => string;
  stringDuracao: (duration: number) => string;
}

const ModalPageDirecoes: React.FC<Props> = ({
  modeDirecoes,
  setModeDirecoes,
  arrayDataDirecoes,
  stringDistancia,
  stringDuracao,
}) => {
  const { selectedEcoponto } = useContext(EcopontosContext);

  useEffect(() => setModeDirecoes('walk'), []);

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
              {stringDistancia(arrayDataDirecoes.find((item) => item.mode === 'walk')?.distance ?? 0)}
              {stringDuracao(arrayDataDirecoes.find((item) => item.mode === 'walk')?.duration ?? 0)}
            </IonSegmentContent>
            <IonSegmentContent id="car">
              Carro
             <br />
              {stringDistancia(arrayDataDirecoes.find((item) => item.mode === 'car')?.distance ?? 0)}
              {stringDuracao(arrayDataDirecoes.find((item) => item.mode === 'car')?.duration ?? 0)}
            </IonSegmentContent>
            <IonSegmentContent id="cycle">
              Bicicleta
              <br />
              {stringDistancia(arrayDataDirecoes.find((item) => item.mode === 'cycle')?.distance ?? 0)}
              {stringDuracao(arrayDataDirecoes.find((item) => item.mode === 'cycle')?.duration ?? 0)}
            </IonSegmentContent>
          </IonSegmentView>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ModalPageDirecoes;
