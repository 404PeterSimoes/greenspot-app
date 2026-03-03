import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
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
import { usePhotoGallery } from '../../hooks/usePhotoGallery';
import './modalReportar.css';
import { camera, cameraOutline, image, imageOutline, close, colorFill, send } from 'ionicons/icons';
import { EmailComposer } from 'capacitor-email-composer';
import { ExceptionCode } from '@capacitor/core';
import { AccountContext } from '../../context/accountContext';

interface Props {
  setModalReportar: (value: boolean) => void;
  setDesignSelected: (value: string) => void;
}

interface ProblemaProps {
  Problema: string | undefined | null;
  OutroProblema: string | undefined | null;
}

const ModalPageReportar: React.FC<Props> = ({ setModalReportar, setDesignSelected }) => {
  const { selectedEcoponto } = useContext(EcopontosContext);
  const { profile } = useContext(AccountContext);
  const { pickPhotoFromGallery, photo, deletePhoto } = usePhotoGallery();

  const [problema, setProblema] = useState<ProblemaProps>({
    Problema: undefined,
    OutroProblema: undefined,
  });

  const sendEmail = async () => {
    try {
      await EmailComposer.open({
        to: ['ecoleziria@emailteste.pt'],
        subject: `Reporte Problema: Ecoponto ${selectedEcoponto?.Morada} - ${selectedEcoponto?.Concelho}`,
        body: `GreenSpot - Reporte de Problema em Ecoponto

Problema: ${problema.Problema === 'outro' ? `${problema.OutroProblema}` : `Ecoponto ${problema.Problema}`}

------------------------------------------------
ID Ecoponto: ${selectedEcoponto?.Codigo}

Morada / Lugar: ${selectedEcoponto?.Morada}
Concelho: ${selectedEcoponto?.Concelho}
Freguesia: ${selectedEcoponto?.Freguesia}

Coordenadas:
- Latitude: ${selectedEcoponto?.Latitude}
- Longitude: ${selectedEcoponto?.Longitude}
------------------------------------------------`,
        ...(photo && {
          attachments: [
            {
              type: 'absolute',
              path: photo.filePath!.replace('file://', ''),
            },
          ],
        }),
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <div className="safe-toolbar">
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
        </div>
      </IonHeader>
      <IonContent>
        <div className="divContentReportar" style={{ marginLeft: '16px', marginRight: '16px', marginTop: '24px' }}>
          <IonInput
            labelPlacement="floating"
            value={`Ecoponto ${selectedEcoponto?.Morada}`}
            fill="outline"
            disabled={true}
          >
            <div slot="label">Local</div>
          </IonInput>
          <br />
          <IonInput
            labelPlacement="floating"
            value={`${selectedEcoponto?.Latitude}   ${selectedEcoponto?.Longitude}`}
            fill="outline"
            disabled={true}
          >
            <div slot="label">Coordenadas</div>
          </IonInput>
          <br />
          <IonInput labelPlacement="floating" value={selectedEcoponto?.Concelho} fill="outline" disabled={true}>
            <div slot="label">Concelho</div>
          </IonInput>
          <br />
          <IonInput labelPlacement="floating" value={selectedEcoponto?.Freguesia} fill="outline" disabled={true}>
            <div slot="label">Freguesia</div>
          </IonInput>
          <br />
          <br />
          <IonSelect
            labelPlacement="floating"
            interface="popover"
            fill="outline"
            onIonChange={(e) => {
              setProblema({ ...problema, Problema: e.detail.value });
            }}
          >
            <div slot="label">
              Problema <span style={{ color: 'red' }}>*</span>
            </div>
            <IonSelectOption value="Danificado">Danificado</IonSelectOption>
            <IonSelectOption value="Deslocado">Deslocado</IonSelectOption>
            <IonSelectOption value="Inexistente">Inexistente</IonSelectOption>
            <IonSelectOption value="outro">Outro</IonSelectOption>
          </IonSelect>
          <br />
          {problema.Problema === 'outro' && (
            <>
              <IonInput
                labelPlacement="stacked"
                fill="outline"
                onIonChange={(e) => {
                  setProblema({ ...problema, OutroProblema: e.detail.value });
                }}
              >
                <div slot="label">
                  Outro <span style={{ color: 'red' }}>*</span>
                </div>
              </IonInput>
              <br />
            </>
          )}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {photo ? (
              <div className="divPhotoReportar">
                <div className="eliminarPhoto" onClick={deletePhoto}>
                  <IonIcon src={close} />
                </div>

                <img src={photo.webviewPath} />
              </div>
            ) : (
              <IonButton className="galleryButton" onClick={pickPhotoFromGallery}>
                <IonIcon src={image} slot="start" />
                Anexar Imagem
              </IonButton>
            )}
          </div>
          <br />
          <IonButton
            className="sendButton"
            expand="block"
            onClick={sendEmail}
            disabled={!problema.Problema || (problema.Problema === 'outro' && !problema.OutroProblema)}
            style={{marginBottom: '15px'}}
          >
            Enviar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ModalPageReportar;

/*const ModalPageReportar: React.FC<Props> = ({ setModalReportar, setDesignSelected }) => {
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
*/
