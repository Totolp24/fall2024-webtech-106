import React from 'react';

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-5">
      <header className="mb-10 text-center">
        <h1 className="text-xxl font-bold text-customBlue">Bienvenue dans votre projet Tailwind CSS !</h1>
        <p className="mt-2 text-lg text-gray-700">
          Ceci est une démonstration de l'utilisation de Tailwind avec une configuration personnalisée.
        </p>
      </header>

      <main className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">À propos de Tailwind CSS</h2>
        <p className="text-gray-600">
          Tailwind CSS est un framework CSS utilitaire qui facilite la création de designs modernes et responsives.
          Grâce à des classes utilitaires, vous pouvez rapidement construire des interfaces personnalisées sans avoir à écrire
          beaucoup de CSS.
        </p>

        <div className="mt-6">
          <button className="bg-customBlue text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
            Cliquez ici
          </button>
        </div>
      </main>

      <footer className="mt-10 text-center text-gray-600">
        <p>&copy; 2024 Votre Nom. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default App;
