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

async function getUserProfile() {
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) {
    console.error('Error getting user:', authError);
    return null;
  }

  if (!authData?.user) {
    console.log('No user logged in');
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authData.user.id)
    .maybeSingle();

  if (profileError) {
    console.error('Error getting profile:', profileError);
    return null;
  }
  if (profile) console.log('profile value:', profile);

  
  console.log(authData.user.id);

  return profile;
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
