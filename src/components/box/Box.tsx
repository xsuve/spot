import React, { FC, useState } from 'react';
import { Button, Text } from '@/components/ui';
import { sendRequest, RequestType } from '@/types/RequestResponse';
import { SPOT_BOX_ROOT } from '@/utils/interfaceSelectors';
import { jobIdParser } from '@/utils/jobIdParser';
import { GenerateData, TechnologyItem } from '@/typings';

type BoxProps = {
  jobDescription?: string;
  generateData?: GenerateData;
  className?: string;
};

const Box: FC<BoxProps> = ({
  jobDescription = null,
  generateData = null,
  className = ''
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    const jobId = jobIdParser(window.location.href);
    if (jobId === null) {
      setLoading(false);
      // TODO: Alert user
      return;
    }

    const response = await sendRequest({
      type: RequestType.GENERATE,
      data: {
        jobDescription,
        jobId
      }
    });

    console.log(response);

    if (response.error) {
      console.log(response.error);
      setLoading(false);
      // TODO: Alert user
      return;
    }

    const spotBoxRoot: HTMLElement = document.querySelector(SPOT_BOX_ROOT);
    if (window.location.href.includes('/jobs/view/') && spotBoxRoot) {
      //
    }

    setLoading(false);
  };

  return (
    <div className={`${jobDescription ? 'bg-aquamarine' : 'bg-linkedin-dark'} p-[2.4rem] w-full rounded-[0.8rem] mb-[16px] ${className}`}>
      { jobDescription
      ? <div className='!grid grid-cols-2 items-center'>
          <div>
            <img src={chrome.runtime.getURL('assets/img/spot-icon-background.svg')} className='w-[24px] mb-[16px]' />
            <Text type='title' color='white' className='!text-[2rem] mb-[8px] leading-[1.25]'>Better prepare yourself for the next interview with Spot.</Text>
            <Text type='paragraph' color='white' className='!text-[1.4rem] mb-[32px] leading-[1.5]'>Targeted AI generated interview questions and job insights based on the job description.</Text>
            <Button
              type='button'
              color='vermilion'
              size='interface'
              onClick={handleClick}
              loading={loading}
              disabled={loading}
            >Try Spot!</Button>
          </div>
          <div className='flex justify-end'>
            {/*  */}
          </div>
        </div>
      : <div className='flex flex-col gap-y-[32px]'>
          <div className='flex justify-between gap-x-[16px]'>
            <Text type='title' color='white' className='!text-[2rem]'>{generateData.positionTitle}</Text>
            <div className='flex items-center gap-x-[8px]'>
              <Text type='paragraph' color='white' className='!text-[1.2rem] leading-[1.5]'>Powered by</Text>
              <img src={chrome.runtime.getURL('assets/img/spot-icon-background.svg')} className='w-[24px]' />
            </div>
          </div>
          <div className='flex justify-between items-start gap-x-[16px]'>
            <div>
              <Text type='title' color='white' className='!text-[1.8rem] mb-[16px] leading-[1.25]'>Technologies</Text>
              <div className='flex gap-[0.8rem]'>
                { generateData.technologies.map((item: TechnologyItem, index: number) => 
                  <div key={index} className={`${item.included ? 'bg-creamy text-vermilion' : 'bg-white/20 text-white/70'} rounded-md font-poppins !text-[1.2rem] font-medium px-[8px] py-[4px]`}>
                    {item.title}
                  </div>
                ) }
              </div>
            </div>
            <div>
              <Text type='title' color='white' className='!text-[1.8rem] mb-[16px] leading-[1.25]'>Salary range</Text>
            </div>
            <div>&nbsp;</div>
          </div>
          <div>
            <Text type='title' color='white' className='!text-[1.8rem] mb-[8px] leading-[1.25]'>Interview questions</Text>
            <ul className='!list-decimal indent-[0.5rem] pl-[3rem]'>
              { generateData.interviewQuestions.map((item: string) => 
                <li className='leading-loose'>
                  <Text type='paragraph' color='white' className='!text-[1.4rem] leading-[1.5]'>{item}</Text>
                </li>
              ) }
            </ul>
          </div>
        </div>
      }
    </div>
  );
};

export default Box;