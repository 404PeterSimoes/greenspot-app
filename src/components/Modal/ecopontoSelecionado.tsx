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
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { EcopontosContext } from '../../context/ecopontosContext';

import { useContext } from 'react';
import imgPapel from '../../assets/papel.png';
import imgPlastico from '../../assets/plastico.png';
import imgVidro from '../../assets/vidro.png';
import imgOleao from '../../assets/oleao.png';
import imgPilhao from '../../assets/pilhao.png';

import {
  carOutline,
  walk,
  bicycle,
  bicycleOutline,
  walkOutline,
  car,
  compass,
  trashBinOutline,
  trashOutline,
  trash,
} from 'ionicons/icons';

import './ecopontoSelecionado.css';

interface Props {
  stringDistancia: (distancia: number) => string;
}

const ModalPageEcoSelecionado: React.FC<Props> = ({ stringDistancia }) => {
  const { selectedEcoponto } = useContext(EcopontosContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <h4 className="selecionadoMorada">{selectedEcoponto?.Morada}</h4>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 0 }}>
          <IonRow style={{ flex: 1, background: 'white', padding: '5px', paddingBottom: 0 }}>
            <IonCol style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <div className="section">
                <div style={{ color: 'rgba(0, 0, 0, 0.655)' }}>Pode depositar:</div>

                <div className="containerPodeDepositar">
                  {selectedEcoponto?.Tem_papel && <img src={imgPapel} />}
                  {selectedEcoponto?.Tem_plastico && <img style={{ marginLeft: '5px' }} src={imgPlastico} />}
                  {selectedEcoponto?.Tem_vidro && <img src={imgVidro} />}
                  {selectedEcoponto?.Tem_oleao && <img style={{ marginRight: '-2px' }} src={imgOleao} />}
                  {selectedEcoponto?.Tem_pilhao && <img style={{ marginRight: '-7px' }} src={imgPilhao} />}
                </div>
              </div>
            </IonCol>
          </IonRow>
          {/* Linha (secção) apenas carrega caso a distância seja calculada */}
          {selectedEcoponto?.DistanciaHaversine && (
            <IonRow style={{ flex: 1, background: 'rgba(0, 0, 0, 0.04)',padding: '5px', paddingBottom: 0, paddingTop: 0 }}>
              <IonCol style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="section">
                  <div style={{ color: 'rgba(0, 0, 0, 0.655)' }}>Distância:</div>
                  <div style={{ textAlign: 'center', fontSize: '20px' /*fontWeight:'bold'*/ }}>
                    ~{stringDistancia(selectedEcoponto.DistanciaHaversine)}
                  </div>
                </div>
              </IonCol>
            </IonRow>
          )}
          <IonRow style={{ flex: 1, background: 'white',padding: '5px', paddingTop: 0 }}>
            <IonCol style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <IonButton style={{ width: '100%' }} expand="block" className="ecoSelecionado">
                <IonIcon slot="start" src={compass} />
                Direções
              </IonButton>
            </IonCol>
            <IonCol style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <IonButton style={{ width: '100%' }} expand="block" className="ecoSelecionado">
                <IonIcon slot="start" src={trash} />
                Reportar problema
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/*       <div className="sectionDirecoes">
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
        </IonSegmentView>*/}
      </IonContent>
    </IonPage>
  );
};

export default ModalPageEcoSelecionado;
