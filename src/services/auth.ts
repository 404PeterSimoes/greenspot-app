import { SocialLogin } from '@capgo/capacitor-social-login';
import { supabase } from './supabaseClient';

export class AuthService {
  async initializeSocialLogin() {
    await SocialLogin.initialize({
      google: {
        webClientId: '706594959262-14o4iummrbv6lqonv04hfp5c8r8vnvv7.apps.googleusercontent.com',
      },
    });
  }

  async signInWithGoogle() {
    try {
      const result = await SocialLogin.login({
        provider: 'google',
        options: {
          scopes: ['email', 'profile'],
        },
      });

      const googleResult = result.result;
      if (!googleResult) {
        throw new Error('Google login failed');
      }

      // GoogleLoginResponse is a union type - check responseType to determine flow
      if (googleResult.responseType === 'online') {
        console.log(googleResult)
        // Online mode: use idToken directly with Supabase
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: googleResult.idToken!,
        });
        if (error) throw error;
        return data;
      } 
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  }

  async signOut() {
    // Sign out from Supabase
    await supabase.auth.signOut();

    // Optionally sign out from social providers
    await SocialLogin.logout({
      provider: 'google', // or 'apple', 'facebook'
    });
  }

  getCurrentUser() {
    return supabase.auth.getUser();
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

export const authService = new AuthService();
