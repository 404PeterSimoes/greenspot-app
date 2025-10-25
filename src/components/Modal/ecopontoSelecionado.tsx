import { IonContent, IonHeader, IonLabel, IonPage, IonToolbar } from '@ionic/react';
import { EcopontosContext } from '../../context/ecopontosContext';

import { useContext } from 'react';

const ModalPageEcoSelecionado: React.FC = () => {
    const { selectedEcoponto } = useContext(EcopontosContext);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <h5 style={{ color: 'black', textAlign: 'center' }}>
                        {selectedEcoponto?.Morada}
                    </h5>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonLabel>{String(selectedEcoponto?.Tem_oleao)}</IonLabel>
            </IonContent>
        </IonPage>
    );
};

export default ModalPageEcoSelecionado;
