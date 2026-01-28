import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add API call to send email or save to database
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Contact Us 📧</h1>
        <p className="mt-2 text-gray-500">
          We'd love to hear from you. Get in touch with us anytime.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Email */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">✉️</span>
                  <div>
                    <h3 className="card-title text-lg">Email</h3>
                    <p className="text-gray-600">support@aeronova.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📞</span>
                  <div>
                    <h3 className="card-title text-lg">Phone</h3>
                    <p className="text-gray-600">+1 (800) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📍</span>
                  <div>
                    <h3 className="card-title text-lg">Location</h3>
                    <p className="text-gray-600">
                      123 Aerospace Avenue
                      <br />
                      Tech City, TC 12345
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🕐</span>
                  <div>
                    <h3 className="card-title text-lg">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Send us a Message</h2>

              {submitted && (
                <div className="alert alert-success shadow-lg mb-4">
                  <span>✅ Thank you! We'll get back to you soon.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Email *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Subject *</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Message Subject"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Message *</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    className="textarea textarea-bordered w-full h-32"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
