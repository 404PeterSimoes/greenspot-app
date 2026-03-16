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
  IonRippleEffect,
  IonFab,
  IonFabButton,
} from '@ionic/react';
import { useState, useContext, useEffect, useRef } from 'react';

import { locationOutline, filter, helpOutline, mapOutline, locateOutline } from 'ionicons/icons';
import recycleIcon from './assets/recycle.svg';

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

import './App.css';

import Mapa from './pages/MapaReact';
import ModalPageEcopontos from './components/Modal/modalEcopontos';
import ModalPageResiduos from './components/Modal/modalResiduos';
import ModalPageChatbot from './components/Modal/modalChatbot';
import ModalPageEcoSelecionado from './components/Modal/modalEcoSelecionado';

import { EcopontosContext, EcopontosProvider } from './context/ecopontosContext';
import { GeolocationProvider } from './context/geolocationContext';

import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

import imgPapel from './assets/papel.png';
import imgPlastico from './assets/plastico.png';
import imgVidro from './assets/vidro.png';
import imgOleao from './assets/oleao.png';
import imgPilhao from './assets/pilhao.png';

setupIonicReact();

import { NavigationBar } from '@capgo/capacitor-navigation-bar';

import ModalPageDirecoes from './components/Modal/modalDirecoes';
import ModalPageReportar from './components/Modal/modalReportar';

import useMapStyle from './hooks/storageMapStyle';
import SplashScreen from './pages/SplashScreen';

const AppContent: React.FC = () => {
  // Definir barras do sistema
  useEffect(() => {
    NavigationBar.setNavigationBarColor({ color: 'TRANSPARENT', darkButtons: true });
    StatusBar.setStyle({ style: Style.Dark });
  }, []);

  // Código a executar quando botão back do Hardware é clicado
  document.addEventListener('ionBackButton', (event: any) => {
    event.detail.register(10, () => {
      setSelectedEcoponto(null);
      setModalEcoSelecionado(false);
      setModalReportar(false);
      setModalDirecoes(false);
      setFollowDirection(false);
      setModalChatbot(false);
      setModalReportar(false);
      setRemoveCameraTiltTrigger((t) => t + 1);
    });
  });

  const [designSelected, setDesignSelected] = useState('mapa');

  const [showModalChatbot, setModalChatbot] = useState(false);
  const [showModalReportar, setModalReportar] = useState(false);

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

  // Função para fechar todos os modals
  const closeModals = () => {
    setModalEcopontos(false);
    setModalResiduos(false);
    setModalChatbot(false);
    setModalEcoSelecionado(false);
    setCallShowModalEcoSelecionado(false);
    setModalDirecoes(false);
    setFollowDirection(false);
    setModalReportar(false);
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
      !showModalDirecoes
    )
      return true;
    else return false;
  };

  // Trigger para o mapa voar para a localização do utilizador
  const [flyUserLocationTrigger, setFlyUserLocTrigger] = useState(0);

  // Trigger para remover o tilt do mapa quando modalEcoSelecionado fecha por gesture
  const [removeCameraTiltTrigger, setRemoveCameraTiltTrigger] = useState(0);

  // Style do mapa
  const { mapStyle, updateMapStyle } = useMapStyle();

  // Função para transformar corretamente a distância entre o user e o ecoponto
  const stringDistanciaFuncao = (distance: number) => {
    if (distance <= 1000) {
      return `${distance.toFixed(0)} m`;
    } else {
      return `${(distance / 1000).toFixed(2)} km`;
    }
  };

  // Função para transformar corretamente a duração da rota
  const stringDuracaoFuncao = (duration: number) => {
    if (duration < 60) {
      return `1 min`;
    } else if (duration < 3600) {
      return `${Math.round(duration / 60)} min`;
    } else {
      const hours = Math.floor(duration / 3600);
      const minutes = Math.round((duration % 3600) / 60);

      if (minutes === 0) {
        return `${hours} hr`;
      } else return `${hours} hr ${minutes} min`;
    }
  };

  const [modeDirecoes, setModeDirecoes] = useState('walk');
  const [objectDataDirecoes, setObjectDataDirecoes] = useState({
    walk: { distance: 0, duration: 0 },
    car: { distance: 0, duration: 0 },
    cycle: { distance: 0, duration: 0 },
  });

  const [followDirection, setFollowDirection] = useState(false);
  const [refreshDirection, setRefreshDirection] = useState(false);

  // Mudar design de selecionado na Toolbar quando modalReportar abre
  useEffect(() => {
    if (showModalReportar) {
      setDesignSelected('');
    }
  }, [showModalReportar]);

  // State com as mensagens da IA da sessão
  const [aiMessages, setAiMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);

  useEffect(() => {
    setAiMessages([
      {
        role: 'assistant',
        content: `Olá! Sou o assistente de IA da <span style='color:rgb(0, 109, 9)'><b>GreenSpot</b></span>. <br /><br />Qual é o resíduo que pretende depositar?`,
      },
    ]);
  }, []);

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
        <div className={`containerResiduosAtivos ${showModalEcoSelecionado || showModalDirecoes ? 'active' : ''}`}>
          <div className="residuosAtivos">
            {residuosPretendidos.Papel && <img style={{ marginLeft: '6px' }} src={imgPapel} className="" />}
            {residuosPretendidos.Plastico && <img style={{ marginLeft: '4px' }} src={imgPlastico} />}
            {residuosPretendidos.Vidro && <img src={imgVidro} />}
            {residuosPretendidos.Oleao && <img style={{ marginRight: '-2px' }} src={imgOleao} />}
            {residuosPretendidos.Pilhao && <img style={{ marginRight: '-7px' }} src={imgPilhao} />}
          </div>
        </div>

        <IonFab className="fabTop" slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton
            onClick={() => {
              if (canClickMapa) {
                setFlyUserLocTrigger((t) => t + 1);

                // Não ser possível clicar muito rápido
                setCanClickMapa(false);
                setTimeout(() => {
                  setCanClickMapa(true);
                }, 1000);
              }
            }}
          >
            <IonIcon icon={locateOutline}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonFab className="fabBottom" slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton
            onClick={() => {
              updateMapStyle(!mapStyle);
            }}
          >
            <IonIcon icon={mapOutline}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonModal
          isOpen={showModalEcopontos}
          initialBreakpoint={0.8}
          breakpoints={[0.8, 0]}
          backdropDismiss={true}
          expandToScroll={false}
          handle={true}
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
          handle={true}
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
          onIonModalDidDismiss={() => {
            setModalChatbot(false);
            setDesignSelected('mapa');
          }}
          onWillPresent={() => {
            StatusBar.setStyle({ style: Style.Light });
          }}
          onWillDismiss={() => {
            StatusBar.setStyle({ style: Style.Dark });
          }}
        >
          <ModalPageChatbot
            messages={aiMessages}
            setMessages={setAiMessages}
            setDesignSelected={setDesignSelected}
            setModalChatbot={setModalChatbot}
          />
        </IonModal>

        <IonModal
          isOpen={showModalDirecoes}
          className="ecoselecionado"
          initialBreakpoint={0.3}
          breakpoints={[0.3, 0]}
          backdropBreakpoint={0.5}
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
              setFollowDirection(false);
            }
          }}
        >
          <ModalPageDirecoes
            modeDirecoes={modeDirecoes}
            setModeDirecoes={setModeDirecoes}
            objectDataDirecoes={objectDataDirecoes}
            stringDistancia={stringDistanciaFuncao}
            stringDuracao={stringDuracaoFuncao}
            followDirection={followDirection}
            setFollowDirection={setFollowDirection}
            setRefreshDirection={setRefreshDirection}
          />
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
        >
          <ModalPageEcoSelecionado
            stringDistancia={stringDistanciaFuncao}
            modalDirecoes={setModalDirecoes}
            objectDataDirecoes={objectDataDirecoes}
            modalReportar={setModalReportar}
          />
        </IonModal>

        <IonModal
          isOpen={showModalReportar}
          onWillPresent={() => {
            StatusBar.setStyle({ style: Style.Light });
          }}
          onWillDismiss={() => {
            StatusBar.setStyle({ style: Style.Dark });
          }}
          onIonModalDidDismiss={() => {
            setModalReportar(false);
            setDesignSelected('mapa');
          }}
        >
          <ModalPageReportar setModalReportar={setModalReportar} setDesignSelected={setDesignSelected} />
        </IonModal>
        <IonTabs>
          <IonTab tab="home">
            <div className="map-container">
              <Mapa
                flyToUserLocation={flyUserLocationTrigger}
                removeCameraTilt={removeCameraTiltTrigger}
                showModalDirecoes={showModalDirecoes}
                modeDirecoes={modeDirecoes}
                setObjectDataDirecoes={setObjectDataDirecoes}
                followDirection={followDirection}
                refreshDirection={refreshDirection}
                setRefreshDirection={setRefreshDirection}
                mapStyle={mapStyle}
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
                  if (verificarTudoFechado()) {
                    setFlyUserLocTrigger((t) => t + 1);

                    // Não ser possível clicar muito rápido
                    setCanClickMapa(false);
                    setTimeout(() => {
                      setCanClickMapa(true);
                    }, 1000);
                  }
                }
                if (callShowModalEcoSelecionado && showModalReportar) {
                  setModalReportar(false);
                } else closeModals();
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

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  return (
    <EcopontosProvider>
      <GeolocationProvider>
        {/*Splash screen nos primeiros segundos*/}
        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
        <AppContent />
      </GeolocationProvider>
    </EcopontosProvider>
  );
};

export default App;
