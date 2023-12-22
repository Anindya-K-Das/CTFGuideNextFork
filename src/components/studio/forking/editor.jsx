import React from 'react';
import { MarkdownViewer } from '@/components/MarkdownViewer';
import { useState, useEffect } from 'react';

const baseUrl = `http://localhost:3001`;
const Editor = (props) => {
  // console.log(props);

  const styles = {
    h1: { fontSize: '2.4rem' },
    h2: { fontSize: '2rem' },
    h3: { fontSize: '1.8rem' },
    h4: { fontSize: '1.6rem' },
    h5: { fontSize: '1.4rem' },
    h6: { fontSize: '1.2rem' },
  };

  const [activeTab, setActiveTab] = useState('created');
  const [contentPreview, setContentPreview] = useState('');
  const [hints, setHints] = useState([
    'No hints set',
    'No hints set',
    'No hints set',
  ]);
  const [solution, setSolution] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState([]);
  const [newChallengeName, setNewChallengeName] = useState(props.slug);
  const [fetched, setFetched] = useState(false);

  const [username, setUsername] = useState('anonymous');
  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  });
  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  const uploadChallenge = async () => {
    try {
      const challengeInfo = {
        name: newChallengeName,
        hints,
        content: contentPreview,
        solution,
        difficulty,
        category,
      };
      // console.log(challengeInfo);
      // console.log(props.assignmentInfo.assignmentInfo);
      const assignmentInfo = props.assignmentInfo.assignmentInfo;
      const url = `${baseUrl}/classroom-assignments/create-fork-assignment`;
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: props.slug,
          challengeInfo,
          assignmentInfo,
          userId: localStorage.getItem('uid'),
          username: localStorage.getItem('username'),
        }),
      };
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (data.success) {
        window.location.reload();
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getChallenge = async () => {
      try {
        var requestOptions = {
          method: 'GET',
        };
        const response = await fetch(
          `http://localhost:3001/challenges/basicInfo/${props.slug}`,
          requestOptions
        );
        const data = await response.json();
        if (data.success) {
          setHints(data.body.hints);
          setContentPreview(data.body.content);
          setSolution(data.body.solution);
          setDifficulty(data.body.difficulty);
          setCategory(data.body.category);
          setFetched(true);
        } else {
          console.log(`Error when getting challenge information`);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (!fetched) {
      getChallenge();
    }
  }, []);

  return (
    <div>
      <div id="createChallenges" className="mx-auto mt-10 max-w-7xl text-white">
        {/*/ Create a new challenge */}

        <input
          value={newChallengeName}
          id="challengeName"
          onChange={(event) => {
            setNewChallengeName(event.target.value);
          }}
          className="w-3/4 rounded-lg border border-neutral-600  bg-neutral-900/90 px-4 py-2 text-3xl font-semibold text-white shadow-lg"
          placeholder="Untitled Challenge"
        />

        <div className="mt-4">
          <i className="fas fa-code-branch"></i> You are forking{' '}
          <span className="mt-4 font-semibold text-blue-500">{props.slug}</span>
        </div>

        <div id="error" className="mt-4 hidden rounded-md bg-red-500 px-4 py-1">
          Something went wrong on our end. Your changes have not been saved. You
          can try again now or later.
        </div>

        <div className=" mt-4 flex hidden flex-shrink-0">
          <div className="w-full">
            <h1>Difficulty</h1>
            <select
              id="difficulty"
              name="difficulty"
              className="mb-4 mt-1  w-1/3 rounded-md border-neutral-600 bg-neutral-900/90 py-2 pl-3 pr-20 text-base  text-white  focus:outline-none sm:text-sm"
              defaultValue="easy"
            >
              <option value="beginner">Beginner</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="insane">Insane</option>
            </select>
          </div>
          <div className="w-full">
            <h1>Category</h1>
            <select
              id="category"
              name="category"
              className="mb-4 ml-4 mt-1  w-1/3 rounded-md border-neutral-600  bg-neutral-900/90 py-2 pl-3 pr-20  text-base  text-white  focus:outline-none sm:text-sm"
              defaultValue="forensics"
            >
              <option value="forensics">forensics</option>
              <option value="cryptography">cryptography</option>
              <option value="web">web</option>
              <option value="reverse engineering">reverse engineering</option>
              <option value="programming">programming</option>
              <option value="pwn">pwn</option>
              <option value="basic">basic</option>

              <option value="other">other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <div className="mt-5 rounded-sm border border-gray-900 bg-neutral-800/40 shadow-lg  shadow-lg ring-1 ring-black ring-opacity-5">
            <h3 className=" rounded-t-lg bg-blue-800 px-4 py-1.5 text-xl font-medium leading-6 text-white">
              Challenge Content
            </h3>
            <div className="px-5 py-5 ">
              <dt className="truncate text-xl font-medium text-white">
                Challenge Instructions
              </dt>
              <textarea
                value={contentPreview}
                id="content"
                placeholder="You can use Markdown here! "
                className="mt-2 h-40 w-full rounded-lg border-neutral-800 bg-neutral-900 px-5 py-4 text-white shadow-lg"
                onChange={(event) => {
                  setContentPreview(event.target.value);
                }}
              ></textarea>

              <div className=" py-5">
                {hints.map((hint, idx) => {
                  return (
                    <div key={idx}>
                      <dt className="mt-4 truncate text-xl font-medium text-white">
                        Hint {idx + 1}
                      </dt>
                      <textarea
                        onChange={(e) => {
                          setHints((prevState) => {
                            const newState = [...prevState];
                            newState[idx] = e.target.value;
                            return newState;
                          });
                        }}
                        value={hint}
                        placeholder="No hint set"
                        className="mt-1 w-full rounded-lg border-neutral-800 bg-neutral-900 text-white  shadow-lg"
                      ></textarea>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-sm border border-gray-900 bg-neutral-800/40 shadow-lg  shadow-lg ring-1 ring-black ring-opacity-5">
            <h3 className=" rounded-t-lg bg-blue-800 px-4 py-1.5 text-xl font-medium leading-6 text-white">
              Challenge Content Preview
            </h3>
            <div
              className=" w-full py-10 "
              style={{
                backgroundSize: 'cover',
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1633259584604-afdc243122ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80")',
              }}
            >
              <div className="mx-auto my-auto flex  text-center">
                <h1
                  className="mx-auto my-auto text-4xl font-semibold text-white"
                  id="challengeName2"
                >
                  {' '}
                  {newChallengeName}{' '}
                </h1>
              </div>
              <div className="mx-auto my-auto  text-center text-lg text-white">
                <div className="my-auto flex place-items-center justify-center">
                  <p className="my-auto mr-2 text-sm">Created by</p>
                  <img
                    className="my-auto my-auto mr-2 h-6   w-6  rounded-full bg-neutral-900"
                    src={
                      `https://robohash.org/` +
                      username +
                      `.png?set=set1&size=150x150`
                    }
                    alt=""
                  />
                  <p className="my-auto text-sm">{username}</p>
                </div>
              </div>
            </div>
            <div className="px-5 py-5 ">
              <div contentEditable={false}>
                <MarkdownViewer content={contentPreview} />
              </div>
            </div>
          </div>
        </div>

        <div className="900 mt-5 rounded-sm   bg-neutral-800/40 shadow-lg">
          <h3 className="mt-6 rounded-t-lg bg-blue-800 px-4 py-1.5 text-xl font-medium leading-6 text-white">
            Challenge Solution
          </h3>
          <div className="px-5 py-5">
            <textarea
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              id="solution"
              placeholder="Not having a solution, is a different kinda evil."
              className="mt-1 w-full rounded-lg border-neutral-800 bg-neutral-900 text-white shadow-lg"
            ></textarea>
          </div>
        </div>

        <button
          onClick={uploadChallenge}
          className="mr-2 mt-6 rounded-lg border-green-600 bg-green-900 px-4 py-2 text-2xl text-white shadow-lg hover:bg-green-800"
        >
          <i class="fas fa-send"></i> Create Challenge
        </button>

        <button className="mr-2 mt-6 hidden rounded-sm border-blue-600 bg-blue-700 px-4 py-2 text-2xl text-white shadow-lg hover:bg-blue-800">
          <i class="fas fa-save"></i> Save as draft
        </button>
      </div>

      <div
        id="saved"
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex hidden items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <div className="pointer-events-auto w-full  max-w-sm overflow-hidden rounded-sm border border-gray-700 shadow-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-white">
                    All changes saved
                  </p>
                  <p className="mt-1 text-sm text-gray-300">
                    It may take a few minutes for your changes to be visible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
