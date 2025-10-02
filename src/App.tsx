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

import Mapa from './components/Mapa';

setupIonicReact();

// Colocar mapa no principal, não usar outras paginas, pagina principal (Mapa) sempre em load
// Ion-Modals irão estão integrados noutras pastas mas trazidas para o App.tsx

// https://ionicframework.com/docs/api/modal#controller-modals

const App = () => {
    const [designSelected, setDesignSelected] = useState('mapa');

    return (
        <IonApp>
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
                        }}
                    >
                        <IonIcon icon={helpOutline} />
                        <IonLabel>Chatbot</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonApp>
    );
};

export default App;

// Forma que estava com home e tudo mais
/*
const App = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route path="/home" component={Home} />
                    <Route exact path="/" render={() => <Redirect to="/home" />} />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="home" href="/home">
                        <IonIcon icon={locationOutline} />
                        <IonLabel>Mapa</IonLabel>
                    </IonTabButton>

                    <IonTabButton
                        tab="ecopontos"
                        onClick={() => window.dispatchEvent(new CustomEvent('open-modal1'))}
                    >
                        <IonIcon icon={recycleIcon} />
                        <IonLabel>Ecopontos</IonLabel>
                    </IonTabButton>

                    <IonTabButton
                        tab="residuos"
                        onClick={() => window.dispatchEvent(new CustomEvent('open-modal2'))}
                    >
                        <IonIcon icon={trashOutline} />
                        <IonLabel>Residuos</IonLabel>
                    </IonTabButton>

                    <IonTabButton
                        tab="chatbot"
                        onClick={() => window.dispatchEvent(new CustomEvent('open-modal3'))}
                    >
                        <IonIcon icon={helpOutline} />
                        <IonLabel>Chatbot</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

export default App;
*/
