import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-screen-lg mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-800">
        {/* Section Menu (Première colonne) */}
        <div className="space-y-4">
          <h3 className="text-indigo-600 font-bold uppercase">Menu</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-indigo-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                Pricing
              </a>
            </li>
          </ul>
        </div>

        {/* Section Our Story (Deuxième colonne) */}
        <div className="space-y-4">
          <h3 className="text-indigo-600 font-bold uppercase">Our Story</h3>
          <p className="text-sm text-gray-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Section Contact Us (Troisième colonne) */}
        <div className="space-y-4">
          <h3 className="text-indigo-600 font-bold uppercase">Contact Us</h3>
          <p className="text-sm">
            XXX XXXX, Floor 4<br />
            San Francisco, CA
          </p>
          <p className="text-sm">
            <a href="mailto:contact@company.com" className="hover:text-indigo-600">
              contact@company.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
