import { IonButton, IonPage } from '@ionic/react';
import { authService } from '../../services/auth';
import { supabase } from '../../services/supabaseClient';
import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../../context/accountContext';

const PageNoAccount: React.FC = () => {
  return (
    <IonPage>
      <h1>Não tás logado</h1>
      {/*<IonButton onClick={handleGoogleLogin}>handleGoogleLogin</IonButton>*/}
    </IonPage>
  );
};
const PageLoggedIn: React.FC = () => {
  return (
    <IonPage>
      <h1>Tás logado</h1>
    </IonPage>
  );
};

const ModalPageAccount: React.FC = () => {
  const { user, profile, loading, loginWithGoogle, logout } = useContext(AccountContext);

  const printProfile = () => {
    console.log(profile?.name);
  };

  return (
    <IonPage>
      <h1>conta</h1>
      <IonButton onClick={loginWithGoogle}>handleGoogleLogin</IonButton>
      <IonButton onClick={logout}>handleLogout</IonButton>

      <IonButton onClick={printProfile}>getUserProfile</IonButton>

      <p></p>
    </IonPage>
    //profile ? <PageLoggedIn /> : <PageNoAccount />
  );
};

export default ModalPageAccount;
