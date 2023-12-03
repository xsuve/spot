import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
    },
  }
);

export type QueryRequestData = {
  openAIAPIKey: string;
  userCountry: string;
  jobDescription: string;
};

export const invokeGenerate = async (queryRequestData: QueryRequestData) => {
  const { data, error } = await supabase.functions.invoke('generate', {
    body: queryRequestData,
  });

  return { data, error };
};
