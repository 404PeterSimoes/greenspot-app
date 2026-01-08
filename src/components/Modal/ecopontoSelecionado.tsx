import { IonContent, IonHeader, IonLabel, IonPage, IonToolbar } from '@ionic/react';
import { EcopontosContext } from '../../context/ecopontosContext';

import { useContext } from 'react';
import imgPapel from '../../assets/papel.png';
import imgPlastico from '../../assets/plastico.png';
import imgVidro from '../../assets/vidro.png';
import imgOleao from '../../assets/oleao.png';
import imgPilhao from '../../assets/pilhao.png';

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
      <IonContent className="contentEcoSelecionado">
        <div className="containerPodeDepositar">
          {selectedEcoponto?.Tem_papel && <img src={imgPapel} />}
          {selectedEcoponto?.Tem_plastico && <img style={{ marginLeft: '5px' }} src={imgPlastico} />}
          {selectedEcoponto?.Tem_vidro && <img src={imgVidro} />}
          {selectedEcoponto?.Tem_oleao && <img style={{ marginRight: '-2px' }} src={imgOleao} />}
          {selectedEcoponto?.Tem_pilhao && <img style={{ marginRight: '-7px' }} src={imgPilhao} />}
        </div>

        {String(selectedEcoponto?.Mostrar)}
      </IonContent>
    </IonPage>
  );
};

export default ModalPageEcoSelecionado;
