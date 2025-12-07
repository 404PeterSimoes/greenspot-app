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

const ModalPageEcopontos: React.FC = () => {
    const { arrayEcopontos, setSelectedEcoponto, setModalEcoSelecionado } =
        useContext(EcopontosContext);

    // Código para fazer a Searchbar funcionar
    let [results, setResults] = useState([...arrayEcopontos]);

    const handleInput = (event: Event) => {
        let query = '';
        const target = event.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();

        setResults(arrayEcopontos.filter((eco) => eco.Morada.toLowerCase().indexOf(query) > -1));
    };

    // Função para transformar corretamente a distância entre o user e o ecoponto
    const stringDistancia = (distancia: number) => {
        if (distancia < 1) {
            return `${(distancia * 1000).toFixed(0)} m`;
        } else {
            return `${distancia.toFixed(2)} km`;
        }
    };

    const Lista: React.FC = () => (
        <IonList lines="full">
            {results.map((eco) => (
                 eco.Mostrar && <IonItem
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
                        <h2 className='morada'>{eco.Morada}</h2>
                    </IonLabel>
                    {eco.Distancia && <IonNote>{stringDistancia(eco.Distancia)}</IonNote>}
                </IonItem>
            ))}
        </IonList>
    );

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonSearchbar
                        placeholder="Pesquisar Ecopontos"
                        onIonInput={(event) => handleInput(event)}
                    />
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Lista />
            </IonContent>
        </IonPage>
    );
};

export default ModalPageEcopontos;
