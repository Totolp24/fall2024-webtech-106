import Head from 'next/head';
import Header from '@/component/Header';



const Home = () => {
  return (
    <>
    <div>
          <Header/>
        </div>
      <Head>
        <title>Page  Épurée</title>
        <meta name="description" content="Exemple d'une page avec Next.js et Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="flex min-h-screen items-center justify-center bg-gray-100">

        
        <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-lg w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenue sur notre site </h1>
          <p className="text-lg text-gray-600 mb-6">
            Cette page  est construite avec Nextjs et Tailwind CSS dans un style épuré
          </p>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
            En savoir plus
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
