import React, { FC, useState } from 'react';
import Button from '@/components/button/Button';
import { sendRequest, RequestType } from '@/types/RequestResponse';
import { LINKEDIN_JOB_DESCRIPTION_CONTAINER, LINKEDIN_JOB_DESCRIPTION_FOOTER } from '@/utils/interfaceSelectors';
import { createRoot, Root } from 'react-dom/client';
import Wrapper from '@/components/wrapper/Wrapper';

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
    const response = await sendRequest({
      type: RequestType.GENERATE,
      data: {
        jobDescription
      }
    });

    console.log(response);

    if (response.error) {
      console.log(response.error);
      setLoading(false);
      // alert user
      return;
    }

    const container: HTMLElement = document.querySelector(LINKEDIN_JOB_DESCRIPTION_CONTAINER);
    if (window.location.href.includes('/jobs/view/') && container) {
      const boxRoot: HTMLDivElement = container.parentElement.querySelector('.spot-box-root');
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