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
            <div className="contentIniciarSessaoPanel">
              <span className="welcomeBackText">Bem-vindo! 👋</span>
              <span className="iniciarSessaoText">Iniciar Sessão</span>
              <div className="divGoogleButton">
                <GoogleButton click={loginWithGoogle} />
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

const PageLoggedIn: React.FC<PageLoggedInProps> = ({ profile, logout }) => {
  const printProfile = () => {
    console.log(profile?.avatar_url);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="pagAccount">
          <div className='container1'>
            <IonAvatar style={{ width: '150px', height: '150px' }}>
              <img src={profile?.avatar_url} referrerPolicy="no-referrer" />
            </IonAvatar>
            <div className='containerPerfilEmail'>
              <span style={{fontSize: '23px'}}>{profile?.name}</span>
              <span>{profile?.email}</span>
            </div>
          </div>
          <IonButton onClick={logout}>a</IonButton>
        </div>
      </IonContent>
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
