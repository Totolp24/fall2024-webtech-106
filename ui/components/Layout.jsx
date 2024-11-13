import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        © 2024 Lok-e Games
      </footer>
    </div>
  );
};

export default Layout;
