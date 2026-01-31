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
  IonSearchbar,
  IonHeader,
  IonAvatar,
} from '@ionic/react';
import { useState, useContext, useEffect, useRef } from 'react';

import { locationOutline, filter } from 'ionicons/icons';
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
import ModalPageEcoSelecionado from './components/Modal/ecopontoSelecionado';

import { EcopontosContext, EcopontosProvider } from './context/ecopontosContext';
import { GeolocationProvider, GeolocationContext } from './context/geolocationContext';

import { StatusBar } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

import imgPapel from './assets/papel.png';
import imgPlastico from './assets/plastico.png';
import imgVidro from './assets/vidro.png';
import imgOleao from './assets/oleao.png';
import imgPilhao from './assets/pilhao.png';

setupIonicReact();

import { NavigationBar } from '@capgo/capacitor-navigation-bar';

import { authService } from './services/auth';
import ModalPageAccountInterface from './components/Modal/accountInterface';
import ModalPageDirecoes from './components/Modal/modalDirecoes';

NavigationBar.setNavigationBarColor({ color: 'TRANSPARENT', darkButtons: true });

// Colocar mapa no principal, não usar outras paginas, pagina principal (Mapa) sempre em load
// Ion-Modals irão estão integrados noutras pastas mas trazidas para o App.tsx

// https://ionicframework.com/docs/api/modal#controller-modals

const AppContent: React.FC = () => {
  const initializeApp = async () => {
    await authService.initializeSocialLogin();
  };

  authService.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      console.log('User signed in:', session.user);
    } else if (event === 'SIGNED_OUT') {
      console.log('User signed out');
    }
  });

  initializeApp();

  // Código a executar quando botão back do Hardware é clicado
  document.addEventListener('ionBackButton', (event: any) => {
    event.detail.register(10, () => {
      setSelectedEcoponto(null);
      setModalEcoSelecionado(false);
      setModalDirecoes(false);
      setRemoveCameraTiltTrigger((t) => t + 1);
    });
  });

  const [designSelected, setDesignSelected] = useState('mapa');

  const [showModalChatbot, setModalChatbot] = useState(false);
  const [showModalAccountInterface, setModalAccountInterface] = useState(false);

  const [canClickMapa, setCanClickMapa] = useState(true);

  const {
    selectedEcoponto,
    setSelectedEcoponto,
    showModalEcoSelecionado,
    setModalEcoSelecionado,
    callShowModalEcoSelecionado,
    setCallShowModalEcoSelecionado,
    showModalEcopontos,
    setModalEcopontos,
    showModalResiduos,
    setModalResiduos,
    residuosPretendidos,
    showModalDirecoes,
    setModalDirecoes,
  } = useContext(EcopontosContext);

  const { position } = useContext(GeolocationContext)!;

  const closeModals = () => {
    setModalEcopontos(false);
    setModalResiduos(false);
    setModalChatbot(false);
    setModalEcoSelecionado(false);
    setCallShowModalEcoSelecionado(false);
    setModalAccountInterface(false);
    setTimeout(() => setSelectedEcoponto(null), 150);
  };

  // Fechar outras páginas automaticamente caso EcoSelecionado abra
  // Abrir EcoSelecionadoModal com delay depois de selecionar ecoponto para dar tempo
  // de modalEcopontos fechar
  useEffect(() => {
    if (showModalEcoSelecionado) {
      setModalEcopontos(false);
      setModalResiduos(false);
      setModalChatbot(false);
      setModalAccountInterface(false);
      setDesignSelected('mapa');

      setTimeout(() => {
        setCallShowModalEcoSelecionado(true);
      }, 100);
    }
    if (!showModalEcoSelecionado) {
      setCallShowModalEcoSelecionado(false);
    }
  }, [showModalEcoSelecionado, callShowModalEcoSelecionado]);

  // Função para verificar se todos os modals estão fechados (executado quando tab 'Mapa' clicado)
  const verificarTudoFechado = () => {
    if (
      !showModalEcopontos &&
      !showModalResiduos &&
      !showModalChatbot &&
      !showModalEcoSelecionado &&
      !callShowModalEcoSelecionado &&
      !showModalAccountInterface
    )
      return true;
    else return false;
  };

  // Trigger para o mapa voar para a localização do utilizador
  const [flyUserLocationTrigger, setFlyUserLocTrigger] = useState(0);

  // Trigger para remover o tilt do mapa quando modalEcoSelecionado fecha por gesture
  const [removeCameraTiltTrigger, setRemoveCameraTiltTrigger] = useState(0);

  // Função para transformar corretamente a distância entre o user e o ecoponto
  const stringDistanciaFuncao = (distancia: number) => {
    if (distancia < 1) {
      return `${(distancia * 1000).toFixed(0)} m`;
    } else {
      return `${distancia.toFixed(2)} km`;
    }
  };

  // Ajustar StatusBar para dispositivos que não ajustem automaticamente (Samsung)
  useEffect(() => {
    const adjustStatusBar = async () => {
      await StatusBar.setOverlaysWebView({ overlay: false });
    };

    if (Capacitor.getPlatform() === 'android') {
      window.addEventListener('load', adjustStatusBar);
    }

    return () => {
      window.removeEventListener('load', adjustStatusBar);
    };
  }, []);

  return (
    <IonApp>
      <IonContent>
        <div className={`containerResiduosAtivos ${showModalEcoSelecionado ? 'active' : ''}`}>
          <div className="residuosAtivos">
            {residuosPretendidos.Papel && <img style={{ marginLeft: '6px' }} src={imgPapel} className="" />}
            {residuosPretendidos.Plastico && <img style={{ marginLeft: '4px' }} src={imgPlastico} />}
            {residuosPretendidos.Vidro && <img src={imgVidro} />}
            {residuosPretendidos.Oleao && <img style={{ marginRight: '-2px' }} src={imgOleao} />}
            {residuosPretendidos.Pilhao && <img style={{ marginRight: '-7px' }} src={imgPilhao} />}
          </div>
        </div>

        <IonAvatar
          onClick={() => {
            setModalAccountInterface(true);
            setDesignSelected('');
          }}
          className={`containerAvatar ${showModalEcoSelecionado ? 'active' : ''}`}
        >
          <img src="https://ionicframework.com/docs/img/demos/avatar.svg" />
        </IonAvatar>

        <IonModal
          isOpen={showModalAccountInterface}
          onDidDismiss={() => {
            setModalAccountInterface(false);
            setDesignSelected('mapa');
          }}
        >
          <ModalPageAccountInterface />
        </IonModal>

        <IonModal
          isOpen={showModalEcopontos}
          initialBreakpoint={0.8}
          breakpoints={[0.8, 0]}
          backdropDismiss={true}
          expandToScroll={false}
          handle={false}
          onDidDismiss={(e) => {
            const { role } = e.detail;

            if (role === 'backdrop' || role === 'gesture') {
              setDesignSelected('mapa');
              setModalEcopontos(false);
            }
          }}
        >
          <ModalPageEcopontos stringDistancia={stringDistanciaFuncao} />
        </IonModal>
        <IonModal
          isOpen={showModalResiduos}
          initialBreakpoint={0.33}
          breakpoints={[0.33, 0]}
          backdropDismiss={true}
          expandToScroll={false}
          handle={false}
          onDidDismiss={(e) => {
            const { role } = e.detail;

            if (role === 'backdrop' || role === 'gesture') {
              setDesignSelected('mapa');
              setModalResiduos(false);
            }
          }}
        >
          <ModalPageResiduos />
        </IonModal>
        <IonModal
          isOpen={showModalChatbot}
          initialBreakpoint={0.85}
          breakpoints={[0.85]}
          backdropDismiss={false}
          expandToScroll={false}
          handle={false}
        >
          <ModalPageChatbot />
        </IonModal>

        <IonModal
          isOpen={showModalDirecoes}
          className="ecoselecionado"
          initialBreakpoint={0.3}
          breakpoints={[0.3, 0]}
          backdropDismiss={false}
          expandToScroll={false}
          handle={true}
          onWillPresent={() => setModalEcoSelecionado(false)}
          onDidDismiss={(e) => {
            const { role } = e.detail;

            if (role === 'gesture') {
              setDesignSelected('mapa');
              setModalDirecoes(false);
              setSelectedEcoponto(null);
            }
          }}
        >
          <ModalPageDirecoes />
        </IonModal>

        <IonModal
          isOpen={callShowModalEcoSelecionado}
          className="ecoselecionado"
          initialBreakpoint={0.6}
          breakpoints={[0.6, 0]}
          onIonModalWillDismiss={(e) => {
            const { role } = e.detail;

            if (role === 'gesture') {
              console.log('modalEcoSelecionado fechado!');
              setSelectedEcoponto(null);
              setModalEcoSelecionado(false);
              setRemoveCameraTiltTrigger((t) => t + 1);
            }
          }}
          backdropDismiss={false}
          expandToScroll={false}
          handle={true}
          //backdropBreakpoint={1} // nunca ativa o backdrop
          //style={{ height: '400px' }}
        >
          <ModalPageEcoSelecionado stringDistancia={stringDistanciaFuncao} modalDirecoes={setModalDirecoes} />
        </IonModal>
        <IonTabs>
          <IonTab tab="home">
            <div className="map-container">
              <Mapa
                flyToUserLocation={flyUserLocationTrigger}
                removeCameraTilt={removeCameraTiltTrigger}
                showModalDirecoes={showModalDirecoes}
              />
            </div>
          </IonTab>
          <IonTabBar slot="bottom">
            <IonTabButton
              tab="home"
              className={designSelected === 'mapa' ? 'designSelectedClass' : ''}
              onClick={() => {
                console.log('home');
                setDesignSelected('mapa');

                if (canClickMapa) {
                  // Voar para a localização atual caso nenhum modal estiver aberto, quando tab "Mapa" for clicado
                  if (verificarTudoFechado() /* && position*/) {
                    setFlyUserLocTrigger((t) => t + 1);

                    // Não ser possível clicar muito rápido
                    setCanClickMapa(false);
                    setTimeout(() => {
                      setCanClickMapa(true);
                    }, 1000);
                  }
                }
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
              <IonIcon icon={filter} />
              <IonLabel>Filtros</IonLabel>
            </IonTabButton>
            {/*
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
            </IonTabButton>*/}
          </IonTabBar>
        </IonTabs>
      </IonContent>
    </IonApp>
  );
};

const App: React.FC = () => (
  <EcopontosProvider>
    <GeolocationProvider>
      <AppContent />
    </GeolocationProvider>
  </EcopontosProvider>
);

export default App;
