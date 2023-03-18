import useSWR from 'swr';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { getSession, getUserData, getUserQueries } from '@/services/supabase';
import { QueryData } from '@/typings';
import { useState } from 'react';

type UserDataExperience = {
  position: string;
  yearsOfExperience: string;
};

type UserDataEducation = {
  title: string;
  years: string;
};

type UserDataSkill = {
  title: string;
  yearsOfExperience: number;
};

export type UserData = {
  spots: number;
  experience: UserDataExperience;
  skills: UserDataSkill[];
  education: UserDataEducation;
};

export type User = {
  isLoading: boolean;
  user: SupabaseUser | undefined;
  data: UserData | undefined;
  queries: {
    job_id: string;
    created_at: string;
    data: QueryData;
  }[] | undefined;
};


export const useUser = (): User => {
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);

    const getSessionResponse = await getSession();
    let user, data, queries;

    if (getSessionResponse?.data?.session?.user) {
      user = getSessionResponse.data.session.user;

      if (user?.user_metadata?.fullName) {
        const getUserDataResponse = await getUserData(user.id);
        const getUserQueriesResponse = await getUserQueries(user.id);

        if (!getUserDataResponse?.error && !getUserQueriesResponse?.error) {
          data = getUserDataResponse?.data?.data;
          queries = getUserQueriesResponse?.data;
        }
      }
    }

    setLoading(false);

    return { isLoading: loading, user, data, queries };
  };

  const { data, isLoading } = useSWR('/user', fetchUser);
  
  return data || { isLoading: isLoading, user: undefined, data: undefined, queries: undefined };
};