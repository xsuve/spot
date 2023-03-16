import { SelectPropsOption } from '@/components/ui/select/Select';
import { createClient } from '@supabase/supabase-js';


const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false
    }
  }
);


export type SignupData = {
  email: string;
  password: string;
  country: SelectPropsOption;
};

export const signUp = async (signupData: SignupData) => {
  const { data, error } = await supabase.auth.signUp({
    email: signupData.email,
    password: signupData.password,
    options: {
      data: {
        fullName: null,
        country: signupData.country.value,
        position: null
      }
    }
  });

  return { data, error };
};


export type OnboardData = {
  fullName: string;
  position: string;
};

export const onboard = async (onboardData: OnboardData) => {
  const { data, error } = await supabase.auth.updateUser({
    data: {
      fullName: onboardData.fullName,
      position: onboardData.position
    }
  });

  await supabase
    .from('user_data')
    .insert({
      user_id: data.user.id,
      data: {
        spots: 5
      }
    });

  return { data, error };
};


export type LoginData = {
  email: string;
  password: string;
};

export const logIn = async (logInData: LoginData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: logInData.email,
    password: logInData.password
  });

  return { data, error };
};


export const logOut = async () => {
  const { error } = await supabase.auth.signOut();

  return { error };
};


export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  return { data, error };
};


export const getUser = async (jwt: string) => {
  const { data, error } = await supabase.auth.getUser(jwt);

  return { data, error };
};


export type QueryRequestData = {
  userCountry: string;
  jobDescription: string;
};

export const invokeGenerate = async (queryRequestData: QueryRequestData) => {
  const { data, error } = await supabase.functions.invoke('generate', {
    body: queryRequestData
  });
  
  return { data, error };
};


export const getUserData = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_data')
    .select('user_id, data')
    .eq('user_id', userId)
    .limit(1)
    .single();
  
  return { data, error };
};


export const updateUserData = async (userId: string, userData: any) => {
  const { data, error } = await supabase
    .from('user_data')
    .update({ data: userData })
    .eq('user_id', userId)
    .select('user_id, data');

  return { data, error };
};


export const insertQuery = async (userId: string, jobId: string, queryData: any) => {
  const { data, error } = await supabase
    .from('user_queries')
    .insert({
      user_id: userId,
      job_id: jobId,
      data: queryData
    });

  return { data, error };
};

export  const getUserQueries = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_queries')
    .select('job_id, data, created_at')
    .eq('user_id', userId);
  
  return { data, error };
};

export  const getUserQueriesByJobId = async (userId: string, jobId: string) => {
  const { data, error } = await supabase
    .from('user_queries')
    .select('job_id, data')
    .eq('user_id', userId)
    .eq('job_id', jobId)
    .limit(1)
    .single();
  
  return { data, error };
};