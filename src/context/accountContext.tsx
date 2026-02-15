import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../services/supabaseClient';
import { authService } from '../services/auth';
import { User } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

// Contexto que fornece as informações do utilizador atual a todos os componentes da App
// Também é aqui que correm as funções de login e logout, assim como a função para fazer fetch
// às informações do utilizador à tabela do Supabase (table_profiles)
export const AccountContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: false,
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Login
  async function loginWithGoogle() {
    await authService.signInWithGoogle();
  }

  // Logout
  async function logout() {
    await authService.signOut();
    setUser(null);
    setProfile(null);
  }

  // Função para sincronizar o perfil
  const syncProfile = async (session: any) => {
    // If no session, clear everything and stop
    if (!session?.user) {
      setUser(null);
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // 1. Set the Auth User immediately (so UI knows someone is logged in)
      setUser(session.user);

      // 2. Fetch the detailed profile from your custom table
      const { data, error } = await supabase
        .from('table_profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (error) throw error;

      // 3. Update the global profile state
      setProfile(data);

      console.log('Profile successfully synced:', data);
    } catch (err) {
      console.error('Profile fetch failed:', err);
      // Optional: you could set an error state here to show an alert to the user
      setProfile(null);
    } finally {
      // 4. Ensure loading is turned off whether it worked or failed
      setLoading(false);
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = authService.onAuthStateChange((event, session) => {
      console.log('Auth Event Triggered:', event);
      syncProfile(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AccountContext.Provider
      value={{
        user,
        profile,
        loading,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
