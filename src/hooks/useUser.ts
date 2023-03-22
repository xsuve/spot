import useSWR from 'swr';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { getSession, getUserData, getUserQueries } from '@/services/supabase';
import { QueryData, QueryUsage } from '@/typings';
import { useState } from 'react';
import { DateTime } from 'luxon';

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
    usage: QueryUsage;
  }[] | undefined;
  queriesData: {
    usedToday: number;
    weekQueries: number;
  } | undefined;
};


export const useUser = (): User => {
  const today = DateTime.now();

  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);

    const getSessionResponse = await getSession();
    let user, data, queries, queriesData;

    if (getSessionResponse?.data?.session?.user) {
      user = getSessionResponse.data.session.user;

      if (user?.user_metadata?.fullName) {
        const getUserDataResponse = await getUserData(user.id);
        const getUserQueriesResponse = await getUserQueries(user.id);

        if (!getUserDataResponse?.error && !getUserQueriesResponse?.error) {
          data = getUserDataResponse?.data?.data;
          queries = getUserQueriesResponse?.data;
          queriesData = {
            usedToday: getUserQueriesResponse?.data.reduce((count, item) => {
              if (today.startOf('day') <= DateTime.fromISO(item.created_at).startOf('day')) {
                count += 1;
              }

              return count;
            }, 0),
            weekQueries: getUserQueriesResponse?.data.reduce((count, item) => {
              if (today.startOf('week') <= DateTime.fromISO(item.created_at).startOf('week')) {
                count += 1;
              }

              return count;
            }, 0)
          };
        }
      }
    }

    setLoading(false);

    return { isLoading: loading, user, data, queries, queriesData };
  };

  const { data, isLoading } = useSWR('/user', fetchUser);
  
  return data || { isLoading: isLoading, user: undefined, data: undefined, queries: undefined, queriesData: undefined };
};