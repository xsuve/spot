import useSWR from 'swr';
import { getUserData, getUserQueries } from '@/services/supabase';
import { QueryData } from '@/typings';

type UserData = {
  spots: number;
  position: string;
  yearsOfExperience: string;
  skills: string[];
  education: object;
  queries: {
    job_id: string;
    created_at: string;
    data: QueryData;
  }[];
};

export const useUserData = (userId: string): UserData | undefined => {
  const fetchUserData = async () => {
    const getUserDataResponse = await getUserData(userId);
    if (getUserDataResponse?.error) {
      return;
    }

    const getUserQueriesResponse = await getUserQueries(userId);
    if (getUserQueriesResponse?.error) {
      return;
    }

    return { ...getUserDataResponse.data.data, queries: [...getUserQueriesResponse.data] };
  };

  const { data } = useSWR(userId ? ['/userData', userId] : null, fetchUserData);

  return data;
};