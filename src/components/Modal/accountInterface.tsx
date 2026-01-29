import { IonButton, IonPage } from '@ionic/react';
import { authService } from '../../services/auth';
import { supabase } from '../../services/supabaseClient';

// Login component
async function handleGoogleLogin() {
  try {
    const user = await authService.signInWithGoogle();
    console.log('Signed in with Google:', user);
  } catch (error) {
    console.error('Login failed:', error);
  }
}

async function handleLogout() {
  try {
    await authService.signOut();
    console.log('Signed out successfully');
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

// Exemplos
async function getUserProfile() {
  const { data: user } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.user?.id)
      .single();

    return data;
  }
}
async function updateUserProfile(updates: any) {
  const { data: user } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.user?.id);

    return data;
  }
}

const ModalPageAccountInterface: React.FC = () => {

  return (
    <IonPage>
      <h1>conta</h1>
      <IonButton onClick={handleGoogleLogin}>handleGoogleLogin</IonButton>
      <IonButton onClick={handleLogout}>handleLogout</IonButton>

      {/* Ainda não está a funcionar */}
      <IonButton onClick={getUserProfile}>getUserProfile</IonButton>

      <p></p>
    </IonPage>
  );
};

export default ModalPageAccountInterface;
