import Head from 'next/head';
import { StandardNav } from '@/components/StandardNav';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Transition, Dialog } from '@headlessui/react';
import { useState, Fragment } from 'react';
import { Menu } from '@headlessui/react';

import ForkChallenge from './fork-challenge';
import CreateChallenge from './create-challenge';

export default function CreateGroup(props) {
  const baseUrl = 'http://localhost:3001'; // change this in deployment
  const [selectedOption, setSelectedOption] = useState(null);
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [time, setTime] = useState('');
  const [assignmentPoints, setAssignmentPoints] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayExistingChallenge, setDisplayExistingChallenge] =
    useState(false);
  const [displayCustomChallenge, setDisplayCustomChallenge] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const onSubmit = async () => {
    if (
      !dueDate ||
      !time ||
      !selectedOption ||
      !selectedCategory ||
      assignmentPoints < 0 ||
      !title
    ) {
      setErrMessage('Please enter all the form information');
      return;
    }
    if (selectedOption === 'existingChallenge') {
      setDisplayExistingChallenge(true);
    } else if (selectedOption === 'customChallenge') {
      setDisplayCustomChallenge(true);
    } else {
      setErrMessage('Please select an assignment type');
    }
  };

  if (displayExistingChallenge) {
    return (
      <ForkChallenge
        assignmentInfo={{
          classroomId: props.classroomId,
          title,
          description,
          time,
          dueDate,
          assignmentPoints,
          selectedCategory,
        }}
      />
    );
  } else if (displayCustomChallenge) {
    return (
      <CreateChallenge
        assignmentInfo={{
          classroomId: props.classroomId,
          title,
          description,
          time,
          dueDate,
          assignmentPoints,
          selectedCategory,
        }}
      />
    );
  }

  console.log();
  return (
    <>
      <Head>
        <title>Groups - CTFGuide</title>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
        </style>
      </Head>
      <StandardNav />
      <div className=" min-h-screen  ">
        <div className="mx-auto mt-10 max-w-6xl">
          <div className="flex">
            <h1 className="text-3xl text-white">Create an Assignment</h1>
            <div className="ml-auto hidden">
              <button className="ml-4 rounded-lg bg-blue-600 px-2 py-1 text-white">
                Create Group
              </button>
              <button
                onClick={() => setOpen(true)}
                className="ml-4 rounded-lg bg-neutral-800/50  px-2 py-1 text-white hover:bg-neutral-700/50"
              >
                Join a Group
              </button>
            </div>
          </div>

          <div className="container mt-4 bg-neutral-800/40 px-4 py-3">
            <div className="space-y-12">
              <div className="border-b border-neutral-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-white">
                  Assignment Settings
                </h2>
                <p className="mt-1 text-sm leading-6 text-white">
                  CTFGuide needs some information to issue an assignment to
                  students.
                </p>
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <div className="grid grid-cols-1">
                      <div>
                        <div className="grid w-full grid-cols-3 gap-x-8">
                          <div>
                            <label
                              for="username"
                              className="block text-sm font-medium leading-6 text-white"
                            >
                              Assignment Title
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-neutral-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                                <input
                                  type="text"
                                  name="title"
                                  id="assignment_title"
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                  className="block flex-1 border-0 bg-transparent px-4 py-1.5 pl-3 text-white placeholder:text-neutral-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder="Make this descriptive but short."
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label
                              for="assignment_points"
                              className="block text-sm  font-medium leading-6 text-white"
                            >
                              Assignment Points
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-neutral-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                                <input
                                  value={assignmentPoints}
                                  onChange={(e) =>
                                    setAssignmentPoints(
                                      parseInt(e.target.value)
                                    )
                                  }
                                  type="number"
                                  name="title"
                                  id="assignment_points"
                                  className="block flex-1 border-0 bg-transparent px-4 py-1.5 pl-3 text-white placeholder:text-neutral-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder="100"
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="title"
                              className="block text-sm font-medium leading-6 text-white"
                            >
                              Assignment Category
                            </label>
                            <div className="mt-2">
                              <div className="">
                                <Menu
                                  as="div"
                                  className="relative  rounded text-left"
                                >
                                  <Menu.Button className="flex inline-flex w-full justify-center rounded-md rounded-md px-4 py-2 text-sm font-medium  text-white shadow-sm  shadow-sm  ring-1 ring-inset ring-neutral-700  focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600  ">
                                    {selectedCategory || 'Test'}
                                  </Menu.Button>

                                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-left divide-y divide-neutral-700 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={`${
                                            active ? '' : ''
                                          } group  flex items-center bg-neutral-800 px-4 py-2 text-sm text-white hover:bg-neutral-900`}
                                          onClick={() =>
                                            setSelectedCategory('Test')
                                          }
                                        >
                                          Test
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={`${
                                            active ? '' : ''
                                          } group  flex items-center bg-neutral-800 px-4 py-2 text-sm text-white hover:bg-neutral-900`}
                                          onClick={() =>
                                            setSelectedCategory('Quiz')
                                          }
                                        >
                                          Quiz
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={`${
                                            active ? '' : ''
                                          } group  flex items-center bg-neutral-800 px-4 py-2 text-sm text-white hover:bg-neutral-900`}
                                          onClick={() =>
                                            setSelectedCategory('HW')
                                          }
                                        >
                                          HW
                                        </a>
                                      )}
                                    </Menu.Item>
                                  </Menu.Items>
                                </Menu>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div></div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      for="about"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Assignment Information
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="assignment_info"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="about"
                        rows="3"
                        className="block  w-full rounded-md border-0 bg-transparent py-1.5 text-white shadow-sm ring-1 ring-inset ring-neutral-700 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <h1 className="mt-10 text-sm text-white">Assignment Type</h1>
                <div className="grid-row-1 mt-2 grid grid-cols-3 gap-4 gap-x-4 text-white ">
                  <div
                    className={`cursor-pointer bg-neutral-800 px-2 py-2 text-center ${
                      selectedOption === 'existingChallenge'
                        ? 'border-2 border-blue-600'
                        : 'border-2 border-neutral-800 hover:border-neutral-900 hover:bg-neutral-900'
                    }`}
                    onClick={() => {
                      setSelectedOption('existingChallenge');
                    }}
                  >
                    <i className="fas fa-globe text-3xl text-blue-500"></i>
                    <h1 className="text-lg font-semibold">
                      Existing Challenge
                    </h1>
                    <h1 className="text-sm">
                      Choose an existing challenge made by the community on
                      CTFGuide with assisted grading by AI
                    </h1>
                  </div>
                  <div
                    className={`cursor-pointer bg-neutral-800 px-2 py-2 text-center ${
                      selectedOption === 'customChallenge'
                        ? 'border-2 border-blue-600'
                        : 'border-2 border-neutral-800 hover:border-neutral-900 hover:bg-neutral-900'
                    }`}
                    onClick={() => {
                      setSelectedOption('customChallenge');
                    }}
                  >
                    <i className="fas fa-hand-sparkles text-3xl text-orange-500"></i>
                    <h1 className="text-lg font-semibold">Custom Challenge</h1>
                    <h1 className="text-sm">
                      Create a new challenge from scratch. This is a classic CTF
                      challenge with assisted grading by AI.
                    </h1>
                  </div>
                  <div
                    className={`bg-neutral-900 px-2 py-2 text-center`}
                    // onClick={() => setSelectedOption('dynamicLab')}
                  >
                    <i className="fas fa-robot text-3xl text-green-500"></i>
                    <h1 className="text-lg font-semibold">
                      Dynamic Lab (Coming Soon)
                    </h1>
                    <h1 className="text-sm">
                      Create a simulated Cybersecurity environent graded by AI{' '}
                    </h1>
                  </div>
                </div>
                <h1 className="mt-6 text-sm  text-white">
                  Assignment Due Date
                </h1>
                <div className="mt-2 flex gap-x-4 rounded-md shadow-sm ring-1 ring-inset ring-neutral-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                  <input
                    type="date"
                    name="username"
                    id="username"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 text-white placeholder:text-neutral-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Just needs to be an estimate."
                  />

                  <div className="ml-4 flex rounded-r shadow-sm ring-1 ring-inset ring-neutral-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                    <input
                      type="time"
                      name="username"
                      id="username"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 text-white placeholder:text-neutral-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Just needs to be an estimate."
                    />
                  </div>
                </div>
                <h1 className="mt-4 text-sm text-white"></h1>
                <div className="bg-neutral-850 mt-4 hidden rounded-lg border border-neutral-500 px-4 py-2 text-white">
                  <b>✨ Why do we ask for this information?</b>
                  <h1>
                    CTFGuide boasts a swift terminal boot time, but
                    pre-deploying terminals can enhance this speed even further.
                    By obtaining these estimates, we aim to optimize our
                    terminal pools and schedule maintenance more effectively.
                    Rest assured, even if the pool sizes aren't precise, we've
                    allocated a generous buffer. In the rare event of a delay, a
                    student might experience a brief 5-second wait for their
                    terminal to deploy.
                  </h1>
                </div>
                <button
                  onClick={onSubmit}
                  id="submitButton"
                  className="mt-4  rounded-lg bg-blue-700 px-5 py-1 text-xl text-white hover:bg-blue-600/50"
                >
                  {' '}
                  continue
                </button>
                <br></br>
                <br></br>
                <div style={{ color: 'red' }}>{errMessage}</div>
              </div>
            </div>
          </div>

          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={setOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div
                  onClick={() => setOpen(false)}
                  className="z-2 fixed inset-0 bg-black bg-opacity-75 transition-opacity"
                />
              </Transition.Child>
              <div className="flex min-h-screen items-center justify-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      backgroundColor: '#161716',
                    }}
                    className="  transform  overflow-hidden rounded-lg bg-neutral-700 px-40 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:align-middle "
                  >
                    <div className="w-full">
                      <div className="mx-auto mt-3 text-center sm:mt-5">
                        <h1 className="text-center text-xl text-white">
                          {' '}
                          Enter a join code
                        </h1>
                        <input
                          id="joinCode"
                          className="cursor-outline-none mt-2 rounded-lg  border-transparent bg-neutral-800 py-0.5  text-sm  text-white outline-none focus:border-transparent  focus:outline-none  focus:ring-0  "
                        ></input>
                        <br></br>
                        <div className="mx-auto mt-4 w-full pb-5 text-center">
                          <button
                            onClick={() => joinGroup()}
                            className="rounded-lg bg-neutral-800 px-4 py-2 text-white hover:bg-neutral-600/50"
                          >
                            {' '}
                            Join{' '}
                          </button>
                          <button
                            onClick={() => setOpen(false)}
                            className="ml-4 rounded-lg bg-neutral-800 px-4 py-2 text-white hover:bg-neutral-600/50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </div>

      <Footer />
    </>
  );
}
