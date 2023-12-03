// @ts-ignore
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts';
// @ts-ignore
import OpenAI from 'https://deno.land/x/openai@v4.20.1/mod.ts';

export const sendResponse = (data: any, usage: any, error: any) => {
  return new Response(
    JSON.stringify({
      data,
      usage,
      error,
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};

serve(async (req: Request) => {
  try {
    const { openAIAPIKey, userCountry, jobDescription } = await req.json();
    if (!openAIAPIKey) {
      return sendResponse(null, null, 'OpenAI API key is not set.');
    }

    const responseSchema = {
      type: 'object',
      properties: {
        programmingLanguages: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description:
                  'Abbreviated title of the technology. Example: CSS, HTML, React etc.',
              },
              yearsOfExperience: {
                type: 'integer',
                description: `The years of experience required for the technology. Set the value to -1 if not specified.`,
              },
            },
          },
          description:
            'Programming languages and libraries from job description.',
        },
        interviewQuestions: {
          type: 'array',
          items: {
            type: 'string',
            description: 'Interview question.',
          },
          description:
            'Ten potential interview questions from job description.',
        },
        jobTitle: {
          type: 'string',
          description: 'Job title from job description.',
        },
        experienceLevel: {
          type: 'string',
          enum: ['Intern', 'Junior', 'Mid', 'Senior', 'Lead'],
          description:
            'Experience level for the position from job description.',
        },
        salaryForPosition: {
          type: 'object',
          properties: {
            suitable: {
              type: 'integer',
              description: `Suitable monthly salary for the position and experience level in ${userCountry}.`,
            },
            min: {
              type: 'integer',
              description: `Minimum monthly salary for the position and experience level in ${userCountry}.`,
            },
            max: {
              type: 'integer',
              description: `Maximum monthly salary for the position and experience level in ${userCountry}.`,
            },
            currencyCode: {
              type: 'string',
              enum: ['RON', 'EUR', 'USD'],
              description: 'Currency code for the monthly salary.',
            },
          },
        },
      },
      required: [
        'programmingLanguages',
        'interviewQuestions',
        'jobTitle',
        'experienceLevel',
        'salaryForPosition',
      ],
    };

    const openai = new OpenAI({ apiKey: openAIAPIKey });
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-1106',
      messages: [
        {
          role: 'system',
          content:
            'Extract the required information and create an object from the job description:',
        },
        {
          role: 'user',
          content: jobDescription,
        },
      ],
      functions: [
        {
          name: 'createResponse',
          parameters: responseSchema,
        },
      ],
      function_call: { name: 'createResponse' },
    });

    const functionCall = response.choices[0].message.function_call.arguments;
    const jsonData = JSON.parse(functionCall);

    return sendResponse(jsonData, response.usage, null);
  } catch (error) {
    return sendResponse(null, null, error.message);
  }
});
