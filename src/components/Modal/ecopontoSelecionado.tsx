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
import { EcopontosContext } from '../../context/ecopontosContext';

import { useContext } from 'react';
import imgPapel from '../../assets/papel.png';
import imgPlastico from '../../assets/plastico.png';
import imgVidro from '../../assets/vidro.png';
import imgOleao from '../../assets/oleao.png';
import imgPilhao from '../../assets/pilhao.png';

import { carOutline, walk, bicycle, bicycleOutline, walkOutline, car } from 'ionicons/icons';

import './ecopontoSelecionado.css';

const ModalPageEcoSelecionado: React.FC = () => {
  const { selectedEcoponto } = useContext(EcopontosContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <h4 className="selecionadoMorada">{selectedEcoponto?.Morada}</h4>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="sectionPodeDepositar">
          <div style={{ color: 'rgba(0, 0, 0, 0.655)' }}>Pode depositar:</div>

          <div className="containerPodeDepositar">
            {selectedEcoponto?.Tem_papel && <img src={imgPapel} />}
            {selectedEcoponto?.Tem_plastico && <img style={{ marginLeft: '5px' }} src={imgPlastico} />}
            {selectedEcoponto?.Tem_vidro && <img src={imgVidro} />}
            {selectedEcoponto?.Tem_oleao && <img style={{ marginRight: '-2px' }} src={imgOleao} />}
            {selectedEcoponto?.Tem_pilhao && <img style={{ marginRight: '-7px' }} src={imgPilhao} />}
          </div>
        </div>

        <div className="sectionDirecoes">
          <div style={{ color: 'rgba(0, 0, 0, 0.655)' }}>Direções</div>

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
        </div>
        <IonSegmentView>
          <IonSegmentContent id="car">Carro</IonSegmentContent>
          <IonSegmentContent id="walk">Andar</IonSegmentContent>
          <IonSegmentContent id="cycle">Bicicleta</IonSegmentContent>
        </IonSegmentView>
      </IonContent>
    </IonPage>
  );
};

export default ModalPageEcoSelecionado;
