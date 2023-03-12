import useSWR from 'swr';
import { getUserData, getUserGenerated } from '@/services/supabase';
import { GenerateData } from '@/typings';

type UserData = {
  spots: number;
  generated: {
    job_id: string;
    created_at: string;
    data: GenerateData;
  }[];
};

export const useUserData = (userId: string): UserData | undefined => {
  const fetchUserData = async () => {
    const getUserDataResponse = await getUserData(userId);
    if (getUserDataResponse?.error) {
      return;
    }

    const getUserGeneratedResponse = await getUserGenerated(userId);
    if (getUserGeneratedResponse?.error) {
      return;
    }

    return { ...getUserDataResponse.data.data, generated: [...getUserGeneratedResponse.data] };
  };

  const { data } = useSWR(userId ? ['/userData', userId] : null, fetchUserData);

  return data;
};