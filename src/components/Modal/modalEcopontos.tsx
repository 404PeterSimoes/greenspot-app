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
    onClose: () => void;
}

const ModalPageEcopontos: React.FC<Props> = ({ onClose }) => {
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
    //

    const Lista: React.FC = () => (
        <IonList lines="full">
            {results.map((eco) => (
                <IonItem
                    key={eco.Codigo}
                    button
                    onClick={() => {
                        const ecoSelecionado = eco;

                        //onClose(); ficaria dentro do setTimeout
                        // Timer para dar tempo de fazer a animção toda de clique
                        setTimeout(() => {
                            setModalEcoSelecionado(true);

                            setTimeout(() => setSelectedEcoponto(ecoSelecionado), 10);
                        }, 100);
                    }}
                >
                    <img src={markerEcoponto} />
                    <IonLabel>
                        <h2>{eco.Morada}</h2>
                    </IonLabel>
                    <IonNote>Ola</IonNote>
                </IonItem>
            ))}
        </IonList>
    );

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {/*<h1 style={{textAlign: 'center'}}>Ecopontos</h1>*/}
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
