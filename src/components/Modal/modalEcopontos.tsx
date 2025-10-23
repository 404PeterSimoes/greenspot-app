import {
    IonContent,
    IonItem,
    IonList,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonPage,
    IonSearchbar,
} from '@ionic/react';
import { useContext, useState } from 'react';

import { EcopontosContext } from '../../context/ecopontosContext';

interface Props {
    onClose: () => void;
}

const ModalPageEcopontos: React.FC<Props> = ({ onClose }) => {
    const { arrayEcopontos, setSelectedEcoponto } = useContext(EcopontosContext);

    let [results, setResults] = useState([...arrayEcopontos]);

    const handleInput = (event: Event) => {
        let query = '';
        const target = event.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();

        setResults(arrayEcopontos.filter((eco) => eco.Morada.toLowerCase().indexOf(query) > -1));
    };

    const Lista: React.FC = () => (
        <IonList lines="full">
            {results.map((eco) => (
                <IonItem
                    key={eco.Codigo}
                    button
                    onClick={() => {
                        const ecoSelecionado = eco;

                        setTimeout(() => {
                            setSelectedEcoponto(null);
                            onClose();

                            setTimeout(() => setSelectedEcoponto(ecoSelecionado),10);
                        }, 100);
                    }}
                >
                    <IonLabel>
                        <h2>{eco.Morada}</h2>
                    </IonLabel>
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
