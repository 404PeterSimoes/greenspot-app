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
import { GeolocationContext } from '../../context/geolocationContext';

interface Props {
  stringDistancia: (distancia: number) => string;
  modalDirecoes: (value: boolean) => void;
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
}
}

const ModalPageEcoSelecionado: React.FC<Props> = ({ stringDistancia, modalDirecoes, objectDataDirecoes }) => {
  const { selectedEcoponto } = useContext(EcopontosContext);
  const { position } = useContext(GeolocationContext)!;

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
          {objectDataDirecoes.walk.distance != 0 && (
            <IonRow
              style={{ flex: 1, background: 'rgba(0, 0, 0, 0.04)', padding: '5px', paddingBottom: 0, paddingTop: 0 }}
            >
              <IonCol style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="section">
                  <div style={{ color: 'rgba(0, 0, 0, 0.655)' }}>Distância:</div>
                  <div style={{ textAlign: 'center', fontSize: '20px' /*fontWeight:'bold'*/ }}>
                    {stringDistancia(objectDataDirecoes.walk.distance)}
                  </div>
                </div>
              </IonCol>
            </IonRow>
          )}
          <IonRow style={{ flex: 1, background: 'white', padding: '5px', paddingTop: 0 }}>
            <IonCol style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <IonButton
                style={{ width: '100%' }}
                expand="block"
                className="ecoSelecionado"
                onClick={() => modalDirecoes(true)}
                disabled={position ? false : true}
              >
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
      </IonContent>
    </IonPage>
  );
};

export default ModalPageEcoSelecionado;
