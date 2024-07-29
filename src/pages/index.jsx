import Head from 'next/head';


export default function Home() {
  return (
    <>
   
      <Head>
        <meta property="og:title" content="CTFGuide" />

        <title>CTFGuide</title>
        <meta property="og:description" content="The data-driven simulation platform for finding and building cybersecurity talent." />
        <meta property="og:image" content="https://ctfguide.com/siteBanner.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ctfguide.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CTFGuide" />
        <meta name="twitter:description" content="The data-driven simulation platform for finding and building cybersecurity talent." />
        <meta name="twitter:image" content="https://ctfguide.com/siteBanner.png" />




        <style>
          @import
          url(&apos;https://fonts.googleapis.com/css2?family=Poppins&display=swap&apos;);
        </style>
      </Head>
    


      <br></br>

      <div
        className="flex items-center justify-center min-h-screen"
      >
        <div className="text-center bg-neutral-800 p-10 rounded-lg">
        <img src="/darklogo.png" alt="CTFGuide Logo" width={100} className='mx-auto' />

        <h1 className='text-white text-3xl font-semibold'>Platform Maintenance</h1>
          <h1 className="mb-2 text-2xl  text-white">
            We're preparing for the launch of CTFGuide V2.
          </h1>
          <p className='text-white text-xl'>
            We will be back at July 31st 11:59 PM EST.
          </p>
          <br></br>
          <button href="https://discord.gg/bH6gu3HCFF" className='bg-blue-600 text-white px-10 py-2 rounded-lg'>Join the Discord</button>
   
      <p className='mt-4 text-white text-sm mt-10'>&copy; CTFGuide Corporation 2024</p>
        </div>
      </div>
    </>
  );
}