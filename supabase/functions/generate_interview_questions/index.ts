// @ts-ignore
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

export const createCompletion = async (prompt: string) => {
  const response = await fetch(
    'https://api.openai.com/v1/engines/text-davinci-003/completions', // text-davinci-003
    {
      body: JSON.stringify({
        prompt: prompt,
        temperature: 1,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        best_of: 1
      }),
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  );
  return response.text();    
}

// @ts-ignore
serve(async (req) => {
  const { jobDescription } = await req.json();

  const fullPrompt = `Generate me a list of 10 interview questions based on this job description: ${jobDescription}`;
  const result = await createCompletion(fullPrompt);
  try {
    const data = JSON.parse(result);
    return new Response(
      JSON.stringify({
        data: data.choices[0].text,
        error: null
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        data: null,
        error
      }),
      { headers: { 'Content-Type': 'application/json' } },
    );
  }
});
