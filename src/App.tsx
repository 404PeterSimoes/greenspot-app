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
import recycleIcon from "./icon/recycle.svg"

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
import AppRoutes from './routes/AppRoutes';

setupIonicReact();


const App = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <AppRoutes />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="mapa" href="/mapa">
                        <IonIcon icon={locationOutline}/>
                        <IonLabel>Mapa</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="ecopontos" href="/ecopontos">
                        <IonIcon src={recycleIcon}/>
                        <IonLabel>Ecopontos</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="residuos" href="/residuos">
                        <IonIcon src={trashOutline}/>
                        <IonLabel>Resíduos</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="chatbot" href="/chatbot">
                        <IonIcon src={helpOutline}/>
                        <IonLabel>Chatbot</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

// https://ionicframework.com/docs/api/tabs#usage-with-router

/*
const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route exact path="/home">
                    <Home />
                </Route>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);*/

export default App;
