const AboutUs = () => {
  return (
    <div className="p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">About AeroNova 🚀</h1>
        <p className="mt-2 text-gray-500">
          Learn more about our mission, vision, and values
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-8">

        {/* Mission Section */}
        <div className="card bg-base-100 shadow-lg mb-8">
          <div className="card-body">
            <h2 className="card-title text-3xl text-primary">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At AeroNova, our mission is to revolutionize the aerospace
              industry by providing cutting-edge products and services. We are
              committed to fostering innovation, sustainability, and excellence
              in everything we do. Our goal is to empower businesses and
              individuals with the tools they need to succeed in the modern
              world.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="card bg-base-100 shadow-lg mb-8">
          <div className="card-body">
            <h2 className="card-title text-3xl text-primary">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We envision a future where aerospace technology is accessible,
              affordable, and environmentally sustainable. By continuously
              innovating and pushing boundaries, we strive to be the global
              leader in aerospace solutions that inspire progress and create
              positive change.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="card bg-base-100 shadow-lg mb-8">
          <div className="card-body">
            <h2 className="card-title text-3xl text-primary">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="badge badge-lg badge-primary">✨ Innovation</div>
              <div className="badge badge-lg badge-primary">🤝 Integrity</div>
              <div className="badge badge-lg badge-primary">
                🌱 Sustainability
              </div>
              <div className="badge badge-lg badge-primary">🎯 Excellence</div>
              <div className="badge badge-lg badge-primary">
                👥 Collaboration
              </div>
              <div className="badge badge-lg badge-primary">💡 Creativity</div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-3xl text-primary">
              Why Choose AeroNova?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 mt-4">
              <li>Industry-leading expertise and innovation</li>
              <li>Comprehensive product range for all your needs</li>
              <li>Exceptional customer support and service</li>
              <li>Commitment to quality and reliability</li>
              <li>Competitive pricing with unmatched value</li>
              <li>Dedicated to sustainable and ethical practices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
