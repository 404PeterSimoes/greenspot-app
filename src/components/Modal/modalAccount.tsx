import {
  IonAvatar,
  IonButton,
  IonHeader,
  IonPage,
  IonToolbar,
  IonContent,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { authService } from '../../services/auth';
import { supabase } from '../../services/supabaseClient';
import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../../context/accountContext';
import { AuthContextType, Profile } from '../../context/accountContext';
import './modalAccount.css';
import BackgroundSvg from '../BackgroundSvg';
import GoogleButton from '../GoogleButton';
import GreenSpot from '../../assets/Icon_GreenSpot.png';

interface PageNoAccountProps {
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

interface PageLoggedInProps {
  profile: Profile | null;
  logout: () => Promise<void>;
}

const PageNoAccount: React.FC<PageNoAccountProps> = ({ loginWithGoogle, logout }) => {
  return (
    <IonPage>
      <IonContent>
        <div className="pagNoAccount">
          <IonImg className="iconGreenSpot" src={GreenSpot} />
          <div className="iniciarSessaoPanel">
            <IonGrid style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <IonRow style={{ flex: 1.5 }}>
                <IonCol style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', height: '100%', gap: '20px' }}>
                  <span className='welcomeBackText'>Bem-vindo de volta! 👋</span>
                  <span className='iniciarSessaoText'>Iniciar Sessão</span>
                </IonCol>
              </IonRow>
              <IonRow style={{ flex: 1 }}>
                <IonCol style={{ justifyContent: 'center', display: 'flex', height: '100%' }}>
                  <div className="divGoogleButton">
                    <GoogleButton click={loginWithGoogle} />
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </div>
        {/*
        <BackgroundSvg
          style={{
            position: 'fixed',
            left: -10,
            right: -10,
            bottom: 0,
            height: 'auto',
            zIndex: 0,
          }}
        />

        <IonGrid style={{ height: '100%', padding: 0, display: 'flex', flexDirection: 'column' }}>
          <IonRow style={{ flex: 6 }}>
            <IonCol style={{ display: 'flex', height: '100%', justifyContent: 'center' }}>
              <IonImg className="greenspotImg" src={GreenspotBigLogo} />
            </IonCol>
          </IonRow>
					<IonRow style={{flex: 8}}>
						<IonCol style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
							<h1>
								Iniciar Sessão
							</h1>
						</IonCol>
					</IonRow>
          <IonRow style={{ flex: 10 }}>
            <IonCol style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <div className='divGoogleButton'>
                <GoogleButton click={loginWithGoogle} />
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>*/}
      </IonContent>
    </IonPage>
  );
};

const PageLoggedIn: React.FC<PageLoggedInProps> = ({ profile, logout }) => {
  const printProfile = () => {
    console.log(profile?.avatar_url);
  };

  // Apenas mostrar o avatar após ele ter sido carregado
  const [avatarState, setAvatarState] = useState(false);
  useEffect(() => {
    if (profile?.avatar_url) {
      setAvatarState(true);
    }
  }, [profile?.avatar_url]);

  return (
    <IonPage>
      {avatarState && (
        <IonAvatar>
          <img src={profile?.avatar_url} />
        </IonAvatar>
      )}
      <h1>Tás logado</h1>
      <p>{profile?.email}</p>
      <IonButton onClick={printProfile}>getUserProfile</IonButton>
      <IonButton onClick={logout}>handleLogout</IonButton>
    </IonPage>
  );
};

const ModalPageAccount: React.FC = () => {
  const { user, profile, loading, loginWithGoogle, logout } = useContext(AccountContext);

  return (
    <IonPage>
      {profile ? (
        <PageLoggedIn profile={profile} logout={logout} />
      ) : (
        <PageNoAccount loginWithGoogle={loginWithGoogle} logout={logout} />
      )}
    </IonPage>
  );
};

export default ModalPageAccount;
