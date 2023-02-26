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
    Given the job description below, create a JSON object with the following properties:
    \n\n
    - programmingLanguages: Array of Strings with programming languages and libraries from job description.
    \n\n
    - interviewQuestions: Array of Strings with 5 potential interview questions from job description.
    \n\n
    - positionTitle: String with the position title from the job description.
    \n\n
    - experienceLevel: String with the experience level for the position from this options: Intern, Junior, Mid, Senior, Lead.
    \n\n
    - salaryRangeForPosition: Object with following properties:
    \n
    min: Number with minimum salary for the position and experience level in country ${userCountry}.
    max: Number with maximum salary for the position and experience level in country ${userCountry}.
    currencyCode: String with the currency code for the salary range values (e.g. USD, EUR, RON etc.).
    \n\n
    The job description:
    \n
    """${jobDescription}"""
    \n\n
    Example response:
    \n
    {
      "programmingLanguages": ["React", "NodeJS", "MongoDB", "Jest"],
      "interviewQuestions": ["What is your experience with React?"],
      "positionTitle": "React Developer",
      "experienceLevel": "Junior",
      "salaryRangeForPosition": {
        "min": 7000,
        "max": 14000,
        "currencyCode": "RON"
      }
    }
    \n\n
    The JSON object:
  `;
  const result = await createCompletion(prompt);
  try {
    const jsonData = JSON.parse(result);
    return new Response(
      JSON.stringify({
        data: jsonData.choices[0].text,
        usage: jsonData.usage,
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
