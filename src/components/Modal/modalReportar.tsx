import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useContext } from 'react';
import { EcopontosContext } from '../../context/ecopontosContext';

interface Props {
    setModalReportar: (value: boolean) => void;
    setDesignSelected: (value: string) => void;
}

const ModalPageReportar: React.FC<Props> = ({setModalReportar, setDesignSelected}) => {
  const { selectedEcoponto } = useContext(EcopontosContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons onClick={() => {setModalReportar(false); setDesignSelected('mapa')}} slot="start">
            <IonBackButton defaultHref='#' />
          </IonButtons>
          <IonTitle style={{ color: '#272727' }}>Reportar problema</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <IonList>
            <IonItem>
              <IonInput label="Nome" labelPlacement="floating" value={`Ecoponto ${selectedEcoponto?.Morada}`} />
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ModalPageReportar;
