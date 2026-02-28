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
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { EcopontosContext } from '../../context/ecopontosContext';

interface Props {
  setModalReportar: (value: boolean) => void;
  setDesignSelected: (value: string) => void;
}

const ModalPageReportar: React.FC<Props> = ({ setModalReportar, setDesignSelected }) => {
  const { selectedEcoponto, arrayEcopontos } = useContext(EcopontosContext);
  const [concelhos, setConcelhos] = useState<string[]>([]);
  const [freguesias, setFreguesias] = useState<string[]>([]);

  // Guardar todos os diferentes concelhos e freguesias da tabela
  useEffect(() => {
    const uniqueConcelhos = [...new Set(arrayEcopontos.map((item) => item.Concelho))];
    setConcelhos(uniqueConcelhos);

    const uniqueFreguesias = [...new Set(arrayEcopontos.map((item) => item.Freguesia))];
    setFreguesias(uniqueFreguesias);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons
            onClick={() => {
              setModalReportar(false);
              setDesignSelected('mapa');
            }}
            slot="start"
          >
            <IonBackButton defaultHref="#" />
          </IonButtons>
          <IonTitle style={{ color: '#272727' }}>Reportar problema</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="divContentReportar" style={{ marginLeft: '16px', marginRight: '16px', marginTop: '24px' }}>
          <IonInput
            label="Local:"
            labelPlacement="floating"
            value={`${selectedEcoponto?.Morada} (${selectedEcoponto?.Tipologia})`}
            fill="outline"
          />
          <br />
          <IonInput
            label="Coordenadas:"
            labelPlacement="floating"
            value={`${selectedEcoponto?.Latitude}   ${selectedEcoponto?.Longitude}`}
            fill="outline"
            disabled={true}
          />
          <br />
          <IonSelect
            label="Concelho:"
            labelPlacement="floating"
            interface="popover"
            fill="outline"
            value={selectedEcoponto?.Concelho}
          >
            {concelhos.map((concelho) => (
              <IonSelectOption key={concelho} value={concelho}>
                {concelho}
              </IonSelectOption>
            ))}
          </IonSelect>
          <br />
          <IonSelect
            label="Freguesia:"
            labelPlacement="floating"
            interface="popover"
            fill="outline"
            value={selectedEcoponto?.Freguesia}
          >
            {freguesias.map((freguesia) => (
              <IonSelectOption key={freguesia} value={freguesia}>
                {freguesia}
              </IonSelectOption>
            ))}
          </IonSelect>
          <br />
          <IonSelect label="Problema:" labelPlacement="floating" interface="popover" fill="outline">
            <IonSelectOption value="danificado">Danificado</IonSelectOption>
            <IonSelectOption value="deslocado">Deslocado</IonSelectOption>
            <IonSelectOption value="inexistente">Inexistente</IonSelectOption>
            <IonSelectOption value="outro">Outro</IonSelectOption>
          </IonSelect>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ModalPageReportar;
