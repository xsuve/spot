import React, { FC, useState } from 'react';
import Button from '@/components/ui/button/Button';
import { sendRequest, RequestType } from '@/types/RequestResponse';
import { LINKEDIN_JOB_DESCRIPTION_CONTAINER, LINKEDIN_JOB_DESCRIPTION_FOOTER, SPOT_BOX_ROOT } from '@/utils/interfaceSelectors';
import { createRoot, Root } from 'react-dom/client';
import Wrapper from '@/components/wrapper/Wrapper';
import { jobIdParser } from '@/utils/jobIdParser';

interface BoxProps {
  jobDescription: string;
  className?: string;
};

const Box: FC<BoxProps> = ({
  jobDescription,
  className = ''
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    const jobId = jobIdParser(window.location.href);
    if (jobId === null) {
      setLoading(false);
      // TODO: alert user
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
      // TODO: alert user
      return;
    }

    const container: HTMLElement = document.querySelector(LINKEDIN_JOB_DESCRIPTION_CONTAINER);
    if (window.location.href.includes('/jobs/view/') && container) {
      const boxRoot: HTMLDivElement = container.parentElement.querySelector(SPOT_BOX_ROOT);
      if (boxRoot) {
        boxRoot.innerHTML = '';

        const footer: HTMLDivElement = document.querySelector(LINKEDIN_JOB_DESCRIPTION_FOOTER);
        if (footer) {
          footer.style.setProperty('display', 'none', 'important');
        }

        let reactElement: Root = createRoot(boxRoot);
        reactElement.render(<Wrapper data={response.data} />);

        container.style.setProperty('display', 'none', 'important');
      }
    }

    setLoading(false);
  };

  return (
    <div className={`bg-yellow-300/30 shadow-xl shadow-yellow-300/30 px-[2.4rem] h-[125px] w-full !grid grid-cols-3 items-center rounded-t-[0.8rem] ${className}`}>
      <div className='col-span-2'>
        <img src={chrome.runtime.getURL('assets/img/spot-logo-white.svg')} className='w-[100px] mb-[12px]' />
        <p className='font-poppins text-[15px] font-normal text-white'>Generate a list of interview questions based on the job description.</p>
      </div>
      <div className='flex justify-end'>
        <Button type='button' color='yellow' size='normal' onClick={handleClick} loading={loading}>Generate</Button>
      </div>
    </div>
  );
};

export default Box;