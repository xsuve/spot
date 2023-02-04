import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useSWR from 'swr';
import supabase from '@/services/supabase';
import { User } from '@supabase/supabase-js';

export const useUser = ({
  redirect = '',
  foundRedirect = false
} = {}): User | undefined => {
  const navigate = useNavigate();

  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      return;
    }

    return data.session;
  };

  const { data } = useSWR('/session', getSession);
  useEffect(() => {
    if (!redirect) {
      return;
    }
    
    if ((redirect && !foundRedirect && !data?.user) || (foundRedirect && data?.user)) {
      navigate(redirect);
    }
  }, [data?.user, foundRedirect, redirect]);

  return data?.user;
};