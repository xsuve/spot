import React, { FC, useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Badge, Button, Text } from '@/components/ui';
import { sendRequest, RequestType } from '@/types/RequestResponse';
import { jobIdParser } from '@/utils/jobIdParser';
import { BoxData, TechnologyItem } from '@/typings';
import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { SPOT_BOX_ROOT } from '@/utils/interfaceSelectors';

type BoxProps = {
  jobDescription?: string;
  boxData?: BoxData;
  className?: string;
};

const Box: FC<BoxProps> = ({
  jobDescription = null,
  boxData = null,
  className = '',
}) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const isDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches &&
    !document
      .querySelector('meta[name="theme-color"]')
      ?.getAttribute('content')
      ?.includes('#ffffff');

  const handleClick = async () => {
    setLoading(true);
    setAlert(null);

    const jobId = jobIdParser(window.location.href);
    if (jobId === null) {
      setLoading(false);
      setAlert('Could not get the job ID.');
      return;
    }

    const response = await sendRequest({
      type: RequestType.GENERATE,
      data: {
        jobDescription,
        jobId,
      },
    });

    if (response.error || !response.data) {
      setLoading(false);
      setAlert(response.error.message);
      return;
    }

    const spotBoxRoot: HTMLElement = document.querySelector(SPOT_BOX_ROOT);
    if (window.location.href.includes('/jobs/view/') && spotBoxRoot) {
      spotBoxRoot.innerHTML = '';

      const reactElement: Root = createRoot(spotBoxRoot);
      reactElement.render(<Box jobDescription='' boxData={response.data} />);
    }

    setLoading(false);
    setAlert(null);
  };

  const [f, setF] = useState(0);
  useEffect(() => {
    if (!boxData?.queryData?.salaryForPosition) return;

    const k: number =
      boxData?.queryData.salaryForPosition.max -
      boxData?.queryData.salaryForPosition.min;
    const p: number = Math.round(k / 11);
    const f: number =
      Math.round(
        (boxData?.queryData.salaryForPosition.suitable -
          boxData?.queryData.salaryForPosition.min) /
          p
      ) + 1;
    setF(f);
  }, []);

  return (
    <div
      className={`
      ${
        jobDescription
          ? 'bg-aquamarine'
          : isDarkMode
          ? 'bg-linkedin-dark'
          : 'bg-white !shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08)]'
      } 
      w-full rounded-[0.8rem] mb-[16px] relative overflow-hidden
      ${className}`}
    >
      {jobDescription ? (
        <div className='!grid grid-cols-5 items-center'>
          <div className='col-span-3 p-[2.4rem] z-20'>
            <img
              src={chrome.runtime.getURL('assets/img/spot-icon-background.svg')}
              className='w-[24px] mb-[16px]'
              alt=''
            />
            <Text
              type='title'
              color='white'
              className='!text-[2rem] mb-[8px] leading-[1.25]'
            >
              Better prepare for your next interview with Spot.
            </Text>
            <Text
              type='paragraph'
              color='white'
              className='!text-[1.4rem] mb-[32px] leading-[1.5]'
            >
              Targeted AI generated interview questions and job insights based
              on the job description.
            </Text>
            <div className='flex items-center gap-x-[32px]'>
              <Button
                type='button'
                color='vermilion'
                size='interface'
                onClick={handleClick}
                loading={loading}
                disabled={loading}
                className='flex-none'
              >
                Try Spot!
              </Button>
              {alert ? (
                <div className='flex items-start gap-x-[12px]'>
                  <ExclamationTriangleIcon className='w-[20px] h-[20px] text-white' />
                  <Text
                    type='paragraph'
                    color='white'
                    className='!text-[1.4rem] leading-[1.5]'
                  >
                    {alert}
                  </Text>
                </div>
              ) : null}
            </div>
          </div>
          <div className='col-span-2'></div>
          <div
            className='absolute top-0 right-0 h-full w-full bg-cover bg-no-repeat z-10'
            style={{
              backgroundImage: `url('${chrome.runtime.getURL(
                'assets/img/box.svg'
              )}')`,
            }}
          ></div>
        </div>
      ) : (
        <div className='flex flex-col gap-y-[32px] p-[2.4rem]'>
          <div className='flex justify-between gap-x-[32px]'>
            <div className='flex items-center gap-x-[16px]'>
              <Text
                type='title'
                color={isDarkMode ? 'white' : 'dark'}
                className='!text-[2rem]'
              >
                {boxData.queryData.jobTitle}
              </Text>
              <Text
                type='title'
                color={isDarkMode ? 'white' : 'gray'}
                className={`!text-[1.8rem] ${
                  isDarkMode ? '!text-white/40' : ''
                }`}
              >
                {boxData.queryData.experienceLevel}-level
              </Text>
            </div>
            <div className='flex items-center gap-x-[8px]'>
              <Text
                type='paragraph'
                color={isDarkMode ? 'white' : 'gray'}
                className={`!text-[1.2rem] leading-[1.5] ${
                  isDarkMode ? '!text-white/70' : ''
                }`}
              >
                Powered by
              </Text>
              <img
                src={chrome.runtime.getURL(
                  'assets/img/spot-icon-background.svg'
                )}
                className='w-[24px]'
              />
            </div>
          </div>
          <div className='!grid grid-cols-3 gap-x-[32px]'>
            <div className='col-span-2'>
              <div className='flex flex-col gap-y-[4px]'>
                <Text
                  type='title'
                  color={isDarkMode ? 'white' : 'dark'}
                  className='!text-[1.8rem] leading-[1.25]'
                >
                  Technologies
                </Text>
                <Text
                  type='paragraph'
                  color={isDarkMode ? 'white' : 'dark'}
                  className='!text-[1.4rem] leading-[1.25]'
                >
                  Job required technologies and libraries, included based on
                  your skills.
                </Text>
              </div>
              <div className='flex flex-wrap items-start gap-[12px] mt-[16px]'>
                {boxData.queryData.technologies.map(
                  (item: TechnologyItem, index: number) => (
                    <Badge
                      key={index}
                      text={item.title}
                      color={
                        boxData.userSkills.find(
                          (skill) =>
                            skill.title === item.title &&
                            skill.yearsOfExperience >= item.yearsOfExperience
                        )
                          ? 'vermilion'
                          : 'gray'
                      }
                      chip={item.yearsOfExperience}
                    />
                  )
                )}
              </div>
            </div>
            <div>
              <div className='flex justify-between gap-x-[16px]'>
                <div className='flex flex-col gap-y-[4px]'>
                  <Text
                    type='title'
                    color={isDarkMode ? 'white' : 'dark'}
                    className='!text-[1.8rem] leading-[1.25]'
                  >
                    Salary info
                  </Text>
                  <Text
                    type='paragraph'
                    color={isDarkMode ? 'white' : 'dark'}
                    className='!text-[1.4rem] leading-[1.25]'
                  >
                    Suitable:{' '}
                    {boxData.queryData.salaryForPosition.suitable || 0}{' '}
                    {boxData.queryData.salaryForPosition.currencyCode}
                  </Text>
                </div>
                <InformationCircleIcon className='w-[20px] h-[20px] text-white/70' />
              </div>
              <div className='flex flex-col gap-y-[16px] mt-[16px]'>
                <div className='flex items-center justify-between'>
                  <div
                    className={`bg-red-400 ${
                      f < 1 ? (isDarkMode ? '!bg-white/20' : 'bg-gray-200') : ''
                    } h-[30px] rounded-[4px] w-[8px]`}
                  ></div>
                  <div
                    className={`bg-orange-400 ${
                      f < 2 ? (isDarkMode ? '!bg-white/20' : 'bg-gray-200') : ''
                    } h-[30px] rounded-[4px] w-[8px]`}
                  ></div>
                  <div
                    className={`bg-amber-400 ${
                      f < 3 ? (isDarkMode ? '!bg-white/20' : 'bg-gray-200') : ''
                    } h-[30px] rounded-[4px] w-[8px]`}
                  ></div>
                  <div
                    className={`bg-yellow-400 ${
                      f < 4 ? (isDarkMode ? '!bg-white/20' : 'bg-gray-200') : ''
                    } h-[30px] rounded-[4px] w-[8px]`}
                  ></div>
                  <div
                    className={`bg-lime-400 ${
                      f < 5 ? (isDarkMode ? '!bg-white/20' : 'bg-gray-200') : ''
                    } h-[30px] rounded-[4px] w-[8px]`}
                  ></div>
                  <div
                    className={`bg-green-400 ${
                      f < 6 ? (isDarkMode ? '!bg-white/20' : 'bg-gray-200') : ''
                    } h-[30px] rounded-[4px] w-[8px]`}
                  ></div>
                  <div
                    className={`bg-emerald-400 ${
                      f < 7 ? (isDarkMode ? '!bg-white/20' : 'bg-gray-200') : ''
                    } h-[30px] rounded-[4px] w-[8px]`}
                  ></div>
                  <div
                    className={`bg-teal-400 ${
                      f < 8 ? (isDarkMode ? '!bg-white/20' : 'bg-gray-200') : ''
                    } h-[30px] rounded-[4px] w-[8px]`}
                  ></div>
                  <div
                    className={`bg-cyan-400 ${
                      f < 9 ? (isDarkMode ? '!bg-white/20' : 'bg-gray-200') : ''
                    } h-[30px] rounded-[4px] w-[8px]`}
                  ></div>
                  <div
                    className={`bg-sky-400 ${
                      f < 10
                        ? isDarkMode
                          ? '!bg-white/20'
                          : 'bg-gray-200'
                        : ''
                    } h-[30px] rounded-[4px] w-[8px]`}
                  ></div>
                  <div
                    className={`bg-blue-400 ${
                      f < 11
                        ? isDarkMode
                          ? '!bg-white/20'
                          : 'bg-gray-200'
                        : ''
                    } h-[30px] rounded-[4px] w-[8px]`}
                  ></div>
                </div>
                <div className='flex justify-between'>
                  <div className='flex flex-col justify-start gap-y-[4px] text-left'>
                    <Text
                      type='paragraph'
                      color={isDarkMode ? 'white' : 'gray'}
                      className={`!text-[1.2rem] ${
                        isDarkMode ? '!text-white/70' : ''
                      }`}
                    >
                      min
                    </Text>
                    <Text
                      type='label'
                      color={isDarkMode ? 'white' : 'dark'}
                      className='!text-[1.2rem]'
                    >
                      {boxData.queryData.salaryForPosition.min || 0}{' '}
                      {boxData.queryData.salaryForPosition.currencyCode}
                    </Text>
                  </div>
                  <div className='flex flex-col justify-end gap-y-[4px] text-right'>
                    <Text
                      type='paragraph'
                      color={isDarkMode ? 'white' : 'gray'}
                      className={`!text-[1.2rem] ${
                        isDarkMode ? '!text-white/70' : ''
                      }`}
                    >
                      max
                    </Text>
                    <Text
                      type='label'
                      color={isDarkMode ? 'white' : 'dark'}
                      className='!text-[1.2rem]'
                    >
                      {boxData.queryData.salaryForPosition.max || 0}{' '}
                      {boxData.queryData.salaryForPosition.currencyCode}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Text
              type='title'
              color={isDarkMode ? 'white' : 'dark'}
              className='!text-[1.8rem] mb-[8px] leading-[1.25]'
            >
              Interview questions
            </Text>
            <ul className='!list-decimal indent-[0.5rem] pl-[2rem]'>
              {boxData.queryData.interviewQuestions.map((item: string) => (
                <li className='leading-loose'>
                  <Text
                    type='paragraph'
                    color={isDarkMode ? 'white' : 'dark'}
                    className='!text-[1.4rem] leading-[1.5]'
                  >
                    {item}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Box;
