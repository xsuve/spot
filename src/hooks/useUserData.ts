import { useEffect } from 'react';
import useSWR from 'swr';
import { getUserData } from '@/services/supabase';

interface UserData {
  spots: number;
};

export const useUserData = (uid: string): UserData | undefined => {
  const fetchUserData = async () => {
    const { data, error } = await getUserData(uid);
    
    if (error) {
      return;
    }

    return data.data;
  };

  const { data } = useSWR(['/userData', uid], fetchUserData);
  useEffect(() => {
    if (!uid) {
      return;
    }
    
  }, [uid, data]);

  return data;
};