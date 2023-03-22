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


export type SignUpData = {
  email: string;
  password: string;
  country: string;
};

export const signUp = async (signUpData: SignUpData) => {
  const { data, error } = await supabase.auth.signUp({
    email: signUpData.email,
    password: signUpData.password,
    options: {
      data: {
        fullName: null,
        country: signUpData.country
      }
    }
  });

  return { data, error };
};


export type OnboardData = {
  fullName: string;
  position: string;
  yearsOfExperience: string;
};

export const onboard = async (onboardData: OnboardData): Promise<any> => {
  const response = await supabase.auth.updateUser({
    data: {
      fullName: onboardData.fullName
    }
  });

  if (response.error) {
    return { data: null, error: response.error };
  }

  const { data, error } = await supabase
    .from('user_data')
    .insert({
      user_id: response.data.user.id,
      data: {
        spots: 5,
        experience: {
          position: onboardData.position,
          yearsOfExperience: onboardData.yearsOfExperience
        },
        skills: [],
        education: null
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


export const insertQuery = async (insertData: any) => {
  const { data, error } = await supabase
    .from('user_queries')
    .insert({
      user_id: insertData.userId,
      job_id: insertData.jobId,
      data: insertData.queryData,
      usage: insertData.usage
    });

  return { data, error };
};

export  const getUserQueries = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_queries')
    .select('job_id, data, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
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