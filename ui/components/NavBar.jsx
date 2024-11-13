
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between">
      <div className="flex space-x-4">
        <Link href="/">
          <a className="text-white">Accueil</a>
        </Link>
        <Link href="/about">
          <a className="text-white">À Propos</a>
        </Link>
        <Link href="/contact">
          <a className="text-white">Contact</a>
        </Link>
      </div>
      <div className="flex space-x-4">
        {user ? (
          <>
            <Link href="/profile">
              <a className="text-white">Profil</a>
            </Link>
            <button onClick={logout} className="text-white">Déconnexion</button>
          </>
        ) : (
          <Link href="/login">
            <a className="text-white">Connexion</a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
