import { IonContent, IonHeader, IonLabel, IonPage, IonToolbar } from '@ionic/react';
import { EcopontosContext } from '../../context/ecopontosContext';

import { useContext } from 'react';
import imgPapel from '../../assets/papel.png';
import imgPlastico from '../../assets/plastico.png';
import imgVidro from '../../assets/vidro.png';
import imgOleao from '../../assets/oleao.png';
import imgPilhao from '../../assets/pilhao.png';

const ModalPageEcoSelecionado: React.FC = () => {
    const { selectedEcoponto } = useContext(EcopontosContext);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <h4 style={{ color: 'black', textAlign: 'center' }}>
                        {selectedEcoponto?.Morada}
                    </h4>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div style={{ backgroundColor: 'red' }}>
                    {selectedEcoponto?.Tem_papel && <img src={imgPapel} />}
                    {selectedEcoponto?.Tem_plastico && <img src={imgPlastico} />}
                    {selectedEcoponto?.Tem_vidro && <img src={imgVidro} />}
                    {selectedEcoponto?.Tem_oleao && <img src={imgOleao} />}
                    {selectedEcoponto?.Tem_pilhao && <img src={imgPilhao} />}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ModalPageEcoSelecionado;
