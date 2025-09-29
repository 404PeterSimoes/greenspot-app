import {
    IonApp,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact,
    IonIcon,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { locationOutline, trashOutline, helpOutline } from 'ionicons/icons';
import recycleIcon from './icon/recycle.svg';
import { Route, Redirect } from 'react-router-dom';

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
import Home from './pages/Home';

setupIonicReact();

// Colocar mapa no principal, não usar outras paginas, pagina principal (Mapa) sempre em load
// Ion-Modals irão estão integrados noutras pastas mas trazidas para o App.tsx

// https://ionicframework.com/docs/api/modal#controller-modals

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
