import React from "react";
import Image from "next/image";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden text-gray-800 mt-20 ">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-50px] left-[10%] w-64 h-64 bg-gradient-to-br from-blue-400 to-green-300 opacity-30 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-[-80px] right-[5%] w-72 h-72 bg-gradient-to-tr from-yellow-400 to-red-400 opacity-30 rounded-full blur-3xl animate-float-fast"></div>
      </div>

      {/* Top curved SVG wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.74,22.24,103.78,29.67,158,16,70-17.29,136.45-69.09,207-81,86.85-14.53,172.06,25.34,258,44,87.26,19,174.35,16.45,261-5,74.14-18.26,148.37-52.94,216-89.11V0Z"
            opacity=".2"
            fill="#60a5fa"
          ></path>
          <path
            d="M0,0V15.81C65,53.67,155,87.19,261,71.75c75.69-11,144.3-55.23,218-69.69C554.18-13.59,636,6.61,715,35.49s158.77,61.82,243,38.8c56.31-15.29,102.12-45.89,144-78.29V0Z"
            opacity=".3"
            fill="#3b82f6"
          ></path>
          <path
            d="M0,0V5.63C47.74,28.2,103.78,42.47,158,31.27,228,16.71,294.45-26.09,365-38c86.85-14.53,172.06,25.34,258,44,87.26,19,174.35,16.45,261-5,74.14-18.26,148.37-52.94,216-89.11V0Z"
            fill="#2563eb"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo & Message */}
        <div className="group">
          <div className="flex items-center space-x-2 mb-3 ">
            <Image
              src="/google_logo.png"
              alt="GDG Logo"
              width={48}
              height={48}
              className="rounded-xl drop-shadow-md transition-transform group-hover:rotate-3 group-hover:scale-110"
            />
            <h2 className="text-2xl font-semibold tracking-tight">
              <span className="text-blue-600">G</span>
              <span className="text-red-600">D</span>
              <span className="text-yellow-500">G</span>{" "}
              <span className="text-green-600">Community</span>
            </h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Empowering developers through collaboration, learning, and
            innovation. Let’s build a better tech future — together.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 relative inline-block">
            Explore
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-blue-500 via-red-500 via-yellow-400 to-green-500 rounded-full"></span>
          </h3>
          <ul className="space-y-2 text-sm">
            {["About", "Events", "Team", "Projects", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={"#" + item.toLowerCase()}
                  className="inline-block transform transition-all duration-200 hover:translate-x-1 hover:text-blue-600"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Address */}
        <div className="transition-transform duration-300 hover:translate-x-1">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Address</h3>
          <p className="text-sm text-gray-600">
            Google Developer Groups<br />
            NITTE<br />
            Bengaluru, India
          </p>
          <div className="flex items-center mt-3 space-x-2 text-sm text-gray-600">
            <FaEnvelope className="text-blue-600" />
            <a
              href="mailto:contact@gdgcommunity.dev"
              className="hover:text-blue-600 transition-colors"
            >
              MAIL
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center md:text-right mr-20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect</h3>
          
          <div className="flex justify-center md:justify-end mt-4 space-x-5">
            {[
              { Icon: FaTwitter, color: "hover:text-blue-500" },
              { Icon: FaInstagram, color: "hover:text-pink-500" },
              { Icon: FaLinkedin, color: "hover:text-blue-700" },
              { Icon: FaGithub, color: "hover:text-gray-900" },
            ].map(({ Icon, color }, i) => (
              <div
                key={i}
                className={`p-2 bg-white rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ${color}`}
              >
                <Icon size={20} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Signature 
      <div className="bg-gradient-to-r from-blue-600 via-red-500 via-yellow-400 to-green-500 text-white text-center py-3 text-sm font-medium tracking-wide">
        Built with ❤️ by GDG Creators — Powered by Next.js & Tailwind
      </div>*/}
    </footer>
  );
};

export default Footer;
