import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      {/* Main Footer Content */}
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold text-white mb-2">AeroNova 🚀</h3>
            <p className="text-sm text-gray-400">
              Revolutionizing aerospace with innovative solutions and
              cutting-edge technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="hover:text-primary transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/products")}
                  className="hover:text-primary transition"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/about")}
                  className="hover:text-primary transition"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/contact")}
                  className="hover:text-primary transition"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="bg-none border-none p-0 cursor-pointer hover:text-primary transition text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="bg-none border-none p-0 cursor-pointer hover:text-primary transition text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="bg-none border-none p-0 cursor-pointer hover:text-primary transition text-left">
                  Careers
                </button>
              </li>
              <li>
                <button className="bg-none border-none p-0 cursor-pointer hover:text-primary transition text-left">
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a
                  href="mailto:support@aeronova.com"
                  className="hover:text-primary transition"
                >
                  support@aeronova.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a
                  href="tel:+18001234567"
                  className="hover:text-primary transition"
                >
                  +1 (800) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Tech City, TC 12345</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Bottom Footer */}
      <div className="px-6 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {currentYear} AeroNova. All rights reserved.</p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <button className="bg-none border-none p-0 cursor-pointer hover:text-primary transition">
              Facebook
            </button>
            <button className="bg-none border-none p-0 cursor-pointer hover:text-primary transition">
              Twitter
            </button>
            <button className="bg-none border-none p-0 cursor-pointer hover:text-primary transition">
              LinkedIn
            </button>
            <button className="bg-none border-none p-0 cursor-pointer hover:text-primary transition">
              Instagram
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
