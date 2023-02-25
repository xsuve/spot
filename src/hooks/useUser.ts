import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useSWR from 'swr';
import { User } from '@supabase/supabase-js';
import { getSession } from '@/services/supabase';

export const useUser = ({
  redirect = '',
  foundRedirect = false
} = {}): User | undefined => {
  const navigate = useNavigate();

  const fetchSession = async () => {
    const { data, error } = await getSession();
    
    if (error) {
      return;
    }
    
    return data.session;
  };

  const { data } = useSWR('/session', fetchSession);
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