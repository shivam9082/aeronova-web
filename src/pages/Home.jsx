import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-3">
              AERONOVA SYSTEMS
            </h1>
            <div className="h-1 w-24 bg-primary mx-auto mb-6"></div>
          </div>

          <p className="text-2xl md:text-3xl text-gray-300 font-light mb-4">
            Technology for Bharat. Impact for the World.
          </p>

          <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
            Pioneering advanced aerospace solutions that combine cutting-edge
            innovation with Indian excellence. We deliver government-ready,
            enterprise-scale products for a sustainable future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/products")}
              className="btn btn-primary btn-lg"
            >
              🚀 Explore Products
            </button>
            {!authUser && (
              <button
                onClick={() => navigate("/signup")}
                className="btn btn-outline btn-lg text-white border-primary hover:bg-primary"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="bg-base-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our Core Strengths
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Strong */}
            <div className="card bg-gray-900 shadow-lg border border-primary/20 hover:border-primary transition">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-3">💪</div>
                <h3 className="card-title text-white">Strong</h3>
                <p className="text-gray-400">
                  Built on robust architecture for mission-critical operations
                </p>
              </div>
            </div>

            {/* Scientific */}
            <div className="card bg-gray-900 shadow-lg border border-primary/20 hover:border-primary transition">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-3">🔬</div>
                <h3 className="card-title text-white">Scientific</h3>
                <p className="text-gray-400">
                  Data-driven innovation backed by rigorous research
                </p>
              </div>
            </div>

            {/* Trustworthy */}
            <div className="card bg-gray-900 shadow-lg border border-primary/20 hover:border-primary transition">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-3">🛡️</div>
                <h3 className="card-title text-white">Trustworthy</h3>
                <p className="text-gray-400">
                  Certified compliance and transparent operations
                </p>
              </div>
            </div>

            {/* Innovative */}
            <div className="card bg-gray-900 shadow-lg border border-primary/20 hover:border-primary transition">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-3">⚡</div>
                <h3 className="card-title text-white">Innovative</h3>
                <p className="text-gray-400">
                  Continuous advancement through cutting-edge technology
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES SECTION */}
      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Solutions for Tomorrow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Government & Smart City */}
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition border-l-4 border-primary">
              <div className="card-body">
                <div className="text-4xl mb-3">🏛️</div>
                <h3 className="card-title text-lg">Government & Smart City</h3>
                <p className="text-gray-600 mb-4">
                  Enterprise solutions designed for government-scale deployment
                  and smart city infrastructure.
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Explore →
                </button>
              </div>
            </div>

            {/* Sustainable Products */}
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition border-l-4 border-primary">
              <div className="card-body">
                <div className="text-4xl mb-3">🌱</div>
                <h3 className="card-title text-lg">Sustainable Products</h3>
                <p className="text-gray-600 mb-4">
                  Eco-friendly solutions that reduce environmental impact while
                  maximizing efficiency.
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Explore →
                </button>
              </div>
            </div>

            {/* Industrial Compliance */}
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition border-l-4 border-primary">
              <div className="card-body">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="card-title text-lg">Industrial Compliance</h3>
                <p className="text-gray-600 mb-4">
                  Standards-compliant systems meeting international and national
                  regulations.
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Explore →
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Renewable Energy */}
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition border-l-4 border-primary">
              <div className="card-body">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="card-title text-lg">Renewable Energy</h3>
                <p className="text-gray-600 mb-4">
                  Clean energy solutions powering India's sustainable future.
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Explore →
                </button>
              </div>
            </div>

            {/* Environmental Infrastructure */}
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition border-l-4 border-primary">
              <div className="card-body">
                <div className="text-4xl mb-3">🌍</div>
                <h3 className="card-title text-lg">
                  Environmental Infrastructure
                </h3>
                <p className="text-gray-600 mb-4">
                  Building the sustainable infrastructure for a cleaner planet.
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Explore →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION SECTION */}
      <section className="bg-base-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-gray-900 rounded-xl p-8 border border-primary/20">
              <h3 className="text-3xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                To deliver world-class aerospace and advanced technology
                solutions that address India's critical infrastructure needs
                while maintaining the highest standards of innovation, quality,
                and sustainability.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gray-900 rounded-xl p-8 border border-primary/20">
              <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                To be India's most trusted technology partner in aerospace and
                advanced systems, creating global impact through innovation
                while contributing to Atmanirbhar Bharat and sustainable
                development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-primary/20 to-primary/10 border-t border-b border-primary/30 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join leading organizations leveraging AERONOVA SYSTEMS for
            mission-critical solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/products")}
              className="btn btn-primary btn-lg"
            >
              View Catalog
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="btn btn-outline btn-lg border-primary text-primary hover:bg-primary"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">100+</div>
              <p className="text-gray-400 text-lg">Enterprise Solutions</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">50+</div>
              <p className="text-gray-400 text-lg">Government Partners</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">24/7</div>
              <p className="text-gray-400 text-lg">Support & Service</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
