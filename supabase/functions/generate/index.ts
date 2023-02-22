// @ts-ignore
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

export const createCompletion = async (prompt: string) => {
  const response = await fetch(
    'https://api.openai.com/v1/completions',
    {
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 1,
        max_tokens: 512,
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
  const { userCountry, jobDescription } = await req.json();

  const prompt = `
    Generate JSON with fields from job description:
    \n
    Fields:
    \n
    - programmingLanguagesAndLibraries (array)
    - interviewQuestions (array, 10)
    - salaryRangeForPosition (object(min,max,currency)), Country: ${userCountry}
    \n
    Job description: """${jobDescription}"""
    \n
    JSON:
  `;
  const result = await createCompletion(prompt);
  try {
    const data = JSON.parse(result);
    return new Response(
      JSON.stringify({
        data: data.choices[0].text,
        usage: data.usage,
        error: null
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        data: null,
        usage: null,
        error
      }),
      { headers: { 'Content-Type': 'application/json' } },
    );
  }
});
