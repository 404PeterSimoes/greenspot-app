import {
    IonApp,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact,
    IonIcon,
    IonContent,
    IonTab,
    IonModal,
} from '@ionic/react';
import { useState } from 'react';

import { locationOutline, trashOutline, helpOutline } from 'ionicons/icons';
import recycleIcon from './icon/recycle.svg';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css'; ***********

/* Theme variables */
import './theme/variables.css';
import './App.css';

import Mapa from './components/MapaReact';
import ModalPageEcopontos from './components/Modal/modalEcopontos';
import ModalPageResiduos from './components/Modal/modalResiduos';
import ModalPageChatbot from './components/Modal/modalChatbot';

import { EcopontosProvider } from './context/ecopontosContext';

setupIonicReact();

// Colocar mapa no principal, não usar outras paginas, pagina principal (Mapa) sempre em load
// Ion-Modals irão estão integrados noutras pastas mas trazidas para o App.tsx

// https://ionicframework.com/docs/api/modal#controller-modals

const App: React.FC = () => {
    const [designSelected, setDesignSelected] = useState('mapa');

    const [showModalEcopontos, setModalEcopontos] = useState(false);
    const [showModalResiduos, setModalResiduos] = useState(false);
    const [showModalChatbot, setModalChatbot] = useState(false);

    // Utilizar isOpen
    const closeModals = () => {
        setModalEcopontos(false);
        setModalResiduos(false);
        setModalChatbot(false);
    };

    return (
        <EcopontosProvider>
            <IonApp>
                <IonModal
                    isOpen={showModalEcopontos}
                    className="modal"
                    initialBreakpoint={0.8}
                    breakpoints={[0.8]}
                    backdropDismiss={false}
                    expandToScroll={false}
                    handle={false}
                >
                    <ModalPageEcopontos
                        onClose={() => {
                            setModalEcopontos(false);
                            setDesignSelected('mapa');
                        }}
                    />
                </IonModal>

                <IonModal
                    isOpen={showModalResiduos}
                    className="modal"
                    initialBreakpoint={0.33}
                    breakpoints={[0.33]}
                    backdropDismiss={false}
                    expandToScroll={false}
                    handle={false}
                >
                    <ModalPageResiduos />
                </IonModal>

                <IonModal
                    isOpen={showModalChatbot}
                    className="modal"
                    initialBreakpoint={0.85}
                    breakpoints={[0.85]}
                    backdropDismiss={false}
                    expandToScroll={false}
                    handle={false}
                >
                    <ModalPageChatbot />
                </IonModal>

                <IonTabs>
                    <IonTab tab="home">
                        <Mapa />
                    </IonTab>

                    <IonTabBar slot="bottom">
                        <IonTabButton
                            tab="home"
                            className={designSelected === 'mapa' ? 'designSelectedClass' : ''}
                            onClick={() => {
                                console.log('home');
                                setDesignSelected('mapa');
                                closeModals();
                            }}
                        >
                            <IonIcon icon={locationOutline} />
                            <IonLabel>Mapa</IonLabel>
                        </IonTabButton>

                        <IonTabButton
                            tab="home"
                            className={designSelected === 'ecopontos' ? 'designSelectedClass' : ''}
                            onClick={() => {
                                console.log('ecopontos');
                                setDesignSelected('ecopontos');
                                closeModals();
                                setModalEcopontos(true);
                            }}
                        >
                            <IonIcon icon={recycleIcon} />
                            <IonLabel>Ecopontos</IonLabel>
                        </IonTabButton>

                        <IonTabButton
                            tab="home"
                            className={designSelected === 'residuos' ? 'designSelectedClass' : ''}
                            onClick={() => {
                                console.log('residuos');
                                setDesignSelected('residuos');
                                closeModals();
                                setModalResiduos(true);
                            }}
                        >
                            <IonIcon icon={trashOutline} />
                            <IonLabel>Residuos</IonLabel>
                        </IonTabButton>

                        <IonTabButton
                            tab="home"
                            className={designSelected === 'chatbot' ? 'designSelectedClass' : ''}
                            onClick={() => {
                                console.log('chatbot');
                                setDesignSelected('chatbot');
                                closeModals();
                                setModalChatbot(true);
                            }}
                        >
                            <IonIcon icon={helpOutline} />
                            <IonLabel>Chatbot</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonApp>
        </EcopontosProvider>
    );
};

export default App;
