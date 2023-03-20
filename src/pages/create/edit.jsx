import Head from 'next/head'
import { useEffect, useState } from 'react'
import { StandardNav } from '@/components/StandardNav'
import { Footer } from '@/components/Footer'
import { useRouter } from 'next/router'


const pages = [
    { name: 'Creator Dashboard', href: '../create', current: false },
    { name: 'Challenge Edit', href: './', current: true },
  ]


export default function Createchall() {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState('created');

  function handleTabClick(tab) {
    setActiveTab(tab);
  }
  useEffect(() => {
    loadChallenge();
  }, [router.query]);
  function loadChallenge() {

var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
    var challenge = JSON.parse(this.responseText);
    document.getElementById("challengeName").innerText = challenge.title;
    document.getElementById("content").value = challenge.content;
    document.getElementById("category").value = challenge.category;
   // document.getElementById("solution").value = challenge.keyword;


  }
});

xhr.open("GET", `${process.env.NEXT_PUBLIC_API_URL}/challenges/` + router.query.slug);
xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("idToken"));

xhr.send();
  }

  function uploadChallenge() {

    // WARNING: For POST requests, body is set to null by browsers.
    var data = JSON.stringify({
      "title": document.getElementById("challengeName").innerText,
      "content": document.getElementById("content").value,
      "keyword": document.getElementById("solution").value,
    });

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {

      if (this.readyState === 4 || this.status === 201) {
      //window.location.replace("/create")
      }

      if (this.readyState === 4 && this.status != 201) {
        window.alert("Something went wrong.")
        console.log(this.responseText)
      }




    });

    xhr.open("PUT", `${process.env.NEXT_PUBLIC_API_URL}/challenges/` + router.query.slug);
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("idToken"));
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);

  }

  return (
    <>
        <Head>
                <title>Create  - CTFGuide</title>
                <style>
                    @import url(&apos;https://fonts.googleapis.com/css2?family=Poppins&display=swap&apos;);
                </style>
        </Head>
            <StandardNav />

    <main>
  
 


    <div className=" w-full " style={{ backgroundColor: "#212121" }}>

<div className="flex mx-auto text-center h-28 my-auto">
    <h1 className='text-4xl text-white mx-auto my-auto font-semibold'>Challenge Edit</h1>
</div>


</div>

 <nav className="flex max-w-7xl mx-auto text-center mt-10" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a href="#" className=" text-white hover:text-gray-200">
                <i className="fas fa-home"></i>

              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-200"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <a
                href={page.href}
                className="ml-4 text-sm font-medium text-gray-100 hover:text-gray-200"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>

    <div id="createChallenges" className="max-w-7xl mx-auto text-white mt-10">
                        {/*/ Create a new challenge */}

                        <h1 id="challengeName" className="rounded-lg text-3xl text-white font-semibold bg-neutral-800 w-3/4 py-2 px-4" contentEditable>Untitled Challenge</h1>

                        <div className=" flex-shrink-0 flex mt-4 hidden">
                            <select
                                id="difficulty"
                                name="difficulty"
                                className="mt-1 mb-4  w-1/3 pl-3 pr-20 bg-neutral-800 py-2 text-base border-neutral-900 text-white  focus:outline-none  sm:text-sm rounded-md"
                                defaultValue="easy">


                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>

                            <select
                                id="category"
                                name="category"
                                className="ml-4 mt-1 mb-4  w-1/3 pl-3 pr-20  py-2 text-base bg-neutral-800 border-neutral-900  text-white  focus:outline-none  sm:text-sm rounded-md"
                                defaultValue="forensics">


                                <option value="forensics">forensics</option>
                                <option value="cryptography">cryptography</option>
                                <option value="web">web</option>
                                <option value="reverse engineering">reverse engineering</option>
                                <option value="programming">programming</option>
                                <option value="pwn">pwn</option>
                                <option value="steganography">steganography</option>
                                <option value="basic">basic</option>

                                <option value="other">other</option>


                            </select>
                        </div>


                        <div className="mt-5 rounded-lg   bg-neutral-800">
                            <h3 className="bg-neutral-700 rounded-t-lg px-4 py-5 mt-6  text-3xl leading-6 font-medium text-white"><i class="fas fa-align-left"></i> Challenge Content</h3>
                           <div className='px-5 py-5'>
                           <textarea id="content" className='px-5 w-full h-40  bg-neutral-900 border-none py-4 text-white rounded-lg'>
                                </textarea>

                            </div>
                        </div>


                        <div className="mt-5 rounded-lg   bg-neutral-800 hidden">
                            <h3 className="bg-neutral-700 rounded-t-lg px-4 py-5 mt-6  text-3xl leading-6 font-medium text-white"><i class="far fa-lightbulb"></i> Challenge Hints</h3>
                           <div className='px-5 py-5'>
                              <dt className="text-xl font-medium text-white truncate">Hint 1</dt>
                            <textarea id="hint1" className="mt-1 w-full rounded-lg bg-neutral-900 border-none text-white">No hint set</textarea>

                            <dt className="mt-4 text-xl font-medium text-white truncate">Hint 2</dt>
                            <textarea id="hint2" className="mt-1 w-full rounded-lg bg-neutral-900 border-none   text-white">No hint set</textarea>

                            <dt className="mt-4 text-xl font-medium text-white truncate">Hint 3</dt>
                            <textarea id="hint3" className="mt-1 w-full rounded-lg bg-neutral-900 border-none  text-white">No hint set</textarea>


                            </div>
                        </div>

                        <div className="mt-5 rounded-lg   bg-neutral-800">
                            <h3 className="bg-neutral-700 rounded-t-lg px-4 py-5 mt-6  text-3xl leading-6 font-medium text-white"><i class="far fa-flag"></i> Challenge Solution</h3>
                           <div className='px-5 py-5'>

                           <input id="solution"  className="mb-4 mt-1 w-full px-2 py-2 bg-neutral-900 border-none rounded-lg  text-white"></input>

                            </div>
                        </div>


                  
                   
                   

                        <button onClick={uploadChallenge} className="mr-2 mt-6 bg-green-700 border-green-600 hover:bg-green-800 px-4 py-2 text-2xl text-white rounded-lg">Save</button>

                        <button  className="hidden mr-2 mt-6 bg-blue-700 border-blue-600 hover:bg-blue-800 px-4 py-2 text-2xl text-white rounded-lg"><i class="fas fa-save"></i> Save as draft</button>

                    </div>

                    <div id="saved" aria-live="assertive" className="hidden fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start">
                        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">

                            <div className="max-w-sm w-full  border border-gray-700 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                                <div className="p-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">

                                            <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3 w-0 flex-1 pt-0.5">
                                            <p className="text-sm font-medium text-white">All changes saved</p>
                                            <p className="mt-1 text-sm text-gray-300">It may take a few minutes for your changes to be visible.</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
         
            
  
  
      </main>
      <Footer />
    </>
  )
}
