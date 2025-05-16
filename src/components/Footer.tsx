
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-black text-gray-400 px-6 py-16 text-sm mt-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

   
        <div className="flex flex-col gap-4">
          <h3 className="text-white text-lg font-bold">🎬 Movie Explorer</h3>
          <p>
            Discover top-rated movies, trending series, and hidden gems. Movie Explorer is your one-stop platform for everything cinema.
          </p>
        </div>

        
        <div className="flex flex-col gap-4">
          <h4 className="text-white text-base font-semibold">Categories</h4>
          <ul className="space-y-2">
            {["Movies", "TV Series", "Drama", "Documentaries"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        
        <div className="flex flex-col gap-4">
          <h4 className="text-white text-base font-semibold">Support</h4>
          <ul className="space-y-2">
            {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

     
      <div className="mt-16 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Movie Explorer. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
