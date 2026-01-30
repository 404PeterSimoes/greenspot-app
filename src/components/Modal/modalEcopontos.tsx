import {
  IonContent,
  IonItem,
  IonList,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonPage,
  IonSearchbar,
  IonNote,
} from '@ionic/react';
import { useContext, useState } from 'react';

import { EcopontosContext } from '../../context/ecopontosContext';
import './modalEcopontos.css';
import markerEcoponto from '../../assets/marker_ecoponto.png';

interface Props {
  stringDistancia: (distancia: number) => string;
}

const ModalPageEcopontos: React.FC<Props> = ({ stringDistancia }) => {
  const { arrayEcopontos, setSelectedEcoponto, setModalEcoSelecionado } = useContext(EcopontosContext);

  // Código para fazer a Searchbar funcionar
  let [results, setResults] = useState([...arrayEcopontos]);

  const handleInput = (event: Event) => {
    let query = '';
    const target = event.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setResults(arrayEcopontos.filter((eco) => eco.Morada.toLowerCase().indexOf(query) > -1));
  };

  const Lista: React.FC = () => (
    <IonList lines="full">
      {results.map(
        (eco) =>
          eco.Mostrar && (
            <IonItem
              key={eco.Codigo}
              button
              onClick={() => {
                const ecoSelecionado = eco;

                // Timer para dar tempo de fazer a animação toda de clique
                setTimeout(() => {
                  setModalEcoSelecionado(true);

                  setTimeout(() => setSelectedEcoponto(ecoSelecionado), 10);
                }, 100);
              }}
            >
              <img src={markerEcoponto} className="markerEcoponto" />
              <IonLabel>
                <h2 className="morada">{eco.Morada}</h2>
              </IonLabel>
              {eco.DistanciaHaversine && <IonNote>{stringDistancia(eco.DistanciaHaversine)}</IonNote>}
            </IonItem>
          ),
      )}
    </IonList>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar placeholder="Pesquisar Ecopontos" onIonInput={(event) => handleInput(event)} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Lista />
      </IonContent>
    </IonPage>
  );
};

export default ModalPageEcopontos;
