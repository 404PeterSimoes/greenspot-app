import { IonAvatar, IonButton, IonPage } from '@ionic/react';
import { authService } from '../../services/auth';
import { supabase } from '../../services/supabaseClient';
import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../../context/accountContext';
import { AuthContextType, Profile } from '../../context/accountContext';

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
      <h1>Não tás logado</h1>
      <IonButton onClick={loginWithGoogle}>handleGoogleLogin</IonButton>
      <IonButton onClick={logout}>handleLogout</IonButton>
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
  },[profile?.avatar_url]);

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

  const [loggedInPageBool, setLoggedInPageBool] = useState(false);

  useEffect(() => {
    if (profile) setTimeout(() => setLoggedInPageBool(true), 100);
    else setTimeout(() => setLoggedInPageBool(false), 100);
  });

  return (
    <IonPage>
      {loggedInPageBool ? (
        <PageLoggedIn profile={profile} logout={logout} />
      ) : (
        <PageNoAccount loginWithGoogle={loginWithGoogle} logout={logout} />
      )}
    </IonPage>
  );
};

export default ModalPageAccount;
