import { useState, useEffect } from 'react';
import ChallengeCard from '../profile/ChallengeCard';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';

function getCategoryIcon(category) {
  switch (category.toLowerCase()) {
    case 'forensics':
      return 'fas fa-binoculars';
    case 'cryptography':
      return 'fas fa-lock';
    case 'web':
      return 'fas fa-globe';
    case 'reverse engineering':
      return 'fas fa-tools';
    case 'programming':
      return 'fas fa-code';
    case 'pwn':
      return 'fas fa-skull-crossbones';
    case 'steganography':
      return 'fas fa-image';
    case 'basic':
      return 'fas fa-graduation-cap';
    default:
      return 'fas fa-question';
  }
}

function CategorySelect({ category, setCategory, isDifficulty }) {
  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Forensics', value: 'forensics' },
    { name: 'Cryptography', value: 'cryptography' },
    { name: 'Web', value: 'web' },
    { name: 'Reverse Engineering', value: 'reverse engineering' },
    { name: 'Programming', value: 'programming' },
    { name: 'Pwn', value: 'pwn' },
    { name: 'Steganography', value: 'steganography' },
    { name: 'Basic', value: 'basic' },
  ];

  const difficulty = [
    { name: 'All', value: 'all' },
    { name: 'Beginner', value: 'beginner' },
    { name: 'Easy', value: 'easy' },
    { name: 'Medium', value: 'medium' },
    { name: 'Hard', value: 'hard' },
    { name: 'Insane', value: 'insane' },
  ];

  const list = isDifficulty ? difficulty : categories;

  return (
    <Listbox value={category} onChange={setCategory}>
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <Listbox.Button
              style={{ backgroundColor: '#212121' }}
              id="difficulty"
              className="py-2 px-2 border border-neutral-700 block w-full rounded  text-base leading-6 text-white focus:outline-none sm:text-sm sm:leading-5"
            >
              <span className="flex items-center">
                <i className={`${getCategoryIcon(category)} fa-fw`} />
                <span className="ml-3 block truncate">{list.find(c => c.value === category).name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-neutral-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {list.map((category) => (
                  <Listbox.Option
                    key={category.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-blue-600 text-white' : 'text-white'
                      }`
                    }
                    value={category.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <i className={`${getCategoryIcon(category.value)} fa-fw`} />
                          <span
                            className={`ml-3 block truncate ${selected ? 'font-semibold' : 'font-normal'
                              }`}
                          >
                            {category.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? 'text-white' : 'text-blue-600'
                              }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

export function Community({ challenges }) {
  const [difficulty, setDifficulty] = useState('all');
  const [category, setCategory] = useState('all');
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const filteredChallenges = challenges
      .filter((challenge) => {
        if (difficulty !== 'all' && challenge.difficulty.toLowerCase() !== difficulty.toLowerCase()) {
          return false;
        }
        if (category !== 'all' && challenge.category[0].toLowerCase() !== category.toLowerCase()) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (category === 'all') {
          return 0;
        }
        if (a.category < b.category) {
          return -1;
        }
        if (a.category > b.category) {
          return 1;
        }
        return 0;
      });

    setResults(filteredChallenges);
  }, [difficulty, category, challenges]);

  const search = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>

      <div className="mt-6 max-w-7xl text-left">
        <h1 className="text-3xl font-semibold text-white mb-4"> Practice Problems </h1>
        <div className="flex flex-col md:flex-row max-w-7xl gap-4">

          <div className="w-full">
            <label
              htmlFor="sort-category"
              className="block text-sm font-medium leading-5 text-gray-200"
            >
              Set
            </label>
            <select
              style={{ backgroundColor: '#212121' }}
              id="difficulty"
              className="mt-1 block w-full rounded border border-neutral-700 text-base leading-6 text-white focus:outline-none sm:text-sm sm:leading-5"
              onChange={(e) => {
                setDifficulty(e.target.value);
              }}
              value={difficulty}
            >
              <option value="all">-</option>

            </select>          </div>
          <div className="w-full flex-row-reverse">

            <label
              htmlFor="difficulty"
              className="block text-sm font-medium leading-5 text-gray-200"
            >
              Difficulty
            </label>

            <CategorySelect category={difficulty} setCategory={setDifficulty} isDifficulty={true} />

          </div>

          <div className="w-full">
            <label
              htmlFor="sort-category"
              className="block text-sm font-medium leading-5 text-gray-200"
            >
              Category
            </label>
            <CategorySelect category={category} setCategory={setCategory} isDifficulty={false}/>

          </div>

          <div className="w-full">
            <label
              htmlFor="sort-category"
              className="block text-sm font-medium leading-5 text-gray-200"
            >
              Tag
            </label>
            <select
              style={{ backgroundColor: '#212121' }}
              id="difficulty"
              className="mt-1 block  w-full rounded border border-neutral-700 text-base leading-6 text-white focus:outline-none sm:text-sm sm:leading-5"
              onChange={(e) => {
                setDifficulty(e.target.value);
              }}
              value={difficulty}
            >
              <option value="all">-</option>

            </select>       </div>
          <div className="w-full">
            <label
              htmlFor="search"
              className="block text-sm font-medium  leading-5 text-gray-200"
            >
              Search
            </label>
            <input
              id="search"
              style={{ backgroundColor: '#212121' }}
              onChange={search}
              placeholder="Search for a Challenge"
              className="mt-1 block w-full rounded py-2 leading-6 border border-neutral-700 text-white focus:outline-none sm:text-sm sm:leading-5"
            ></input>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {challenges && (results.length > 0 ? results : challenges)
            .filter((challenge) => {
              if (
                difficulty.toLowerCase() !== 'all' &&
                challenge.difficulty.toLowerCase() !== difficulty.toLowerCase()
              ) {
                return false;
              }
              if (
                filter !== '' &&
                challenge.category.includes(filter.toLowerCase())
              ) {
                return true;
              }
              if (
                filter !== '' &&
                !(
                  challenge.title
                    .toLowerCase()
                    .includes(filter.toLowerCase()) ||
                  challenge.content
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                )
              ) {
                return false;
              }
              return true;
            })
            .map((challenge) => (
              <ChallengeCard challenge={challenge} key={challenge.challengeId} />
            ))
          }
        </div>
      </div>
    </>
  );
}

