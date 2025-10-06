import { IonButton, IonContent, IonPage } from '@ionic/react';

const ModalPageEcopontos: React.FC = () => {
    return (
        <IonContent>
            <h1>modalEcopontos</h1>
            <h2>texto</h2>
        </IonContent>
    );
};

export default ModalPageEcopontos;

/*
import { IonButton, IonContent, IonPage } from '@ionic/react';

type Props = {
    toggleModal: (value: boolean) => void;
};

const ModalPageEcopontos: React.FC<Props> = ({ toggleModal }) => {
    return (
        <>
            <h1>modalEcopontos</h1>
            <IonButton onClick={() => toggleModal(false)}>Clica</IonButton>
        </>
    );
};

export default ModalPageEcopontos;
*/
