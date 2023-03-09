import { useEffect } from 'react';
import useSWR from 'swr';
import { getUserData } from '@/services/supabase';

interface UserData {
  spots: number;
};

export const useUserData = (userId: string): UserData | undefined => {
  const fetchUserData = async () => {
    const { data, error } = await getUserData(userId);
    
    if (error) {
      return;
    }

    return data.data;
  };

  const { data } = useSWR(['/userData', userId], fetchUserData);
  useEffect(() => {
    if (!userId) {
      return;
    }
    
  }, [userId, data]);

  return data;
};