
import { User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { toast } from 'sonner';

export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return { user: null, error };
    }

    toast.success('Sign up successful! Please check your email for confirmation.');
    return { user: data.user, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    toast.error('An unexpected error occurred during sign up.');
    return { user: null, error };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return { user: null, error };
    }

    toast.success('Signed in successfully!');
    return { user: data.user, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    toast.error('An unexpected error occurred during sign in.');
    return { user: null, error };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error(error.message);
      return { error };
    }
    
    toast.success('Signed out successfully!');
    return { error: null };
  } catch (error) {
    console.error('Sign out error:', error);
    toast.error('An unexpected error occurred during sign out.');
    return { error };
  }
}

export async function getCurrentUser() {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session?.user || null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}
