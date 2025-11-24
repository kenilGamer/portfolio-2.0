import { FC, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_ffce6e5',
        'template_5u31fvp',
        formRef.current!,
        {
          publicKey: 'ugCBbxaJsWvscldSi',
        }
      )
      .then(
        () => {
          console.log('SUCCESS!');
          formRef.current?.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-5xl sm:text-6xl font-bold text-[#E6DDC4] mb-6">
            <span className="text-[#E6DDC4]">
              Get in Touch
            </span>
          </h2>
          <p className="text-xl text-[#E6DDC4]/80 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind or want to collaborate? Let's create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="backdrop-blur-sm bg-[#678983]/80 rounded-3xl p-8 shadow-2xl border border-[#E6DDC4]/20">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#E6DDC4]/70 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    className="w-full px-4 py-3 rounded-lg bg-[#678983]/60 border border-[#E6DDC4]/20 text-[#E6DDC4] placeholder-[#E6DDC4]/50 focus:outline-none focus:border-[#678983] transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    className="w-full px-4 py-3 rounded-lg bg-[#678983]/60 border border-[#E6DDC4]/20 text-[#E6DDC4] placeholder-[#E6DDC4]/50 focus:outline-none focus:border-[#678983] transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white/70 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 rounded-lg bg-[#678983]/60 border border-[#E6DDC4]/20 text-[#E6DDC4] placeholder-[#E6DDC4]/50 focus:outline-none focus:border-[#678983] transition-colors"
                  placeholder="What's this about?"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-[#678983]/60 border border-[#E6DDC4]/20 text-[#E6DDC4] placeholder-[#E6DDC4]/50 focus:outline-none focus:border-[#678983] transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#F0E9D2] text-[#181D31] py-4 rounded-lg font-medium hover:bg-[#F0E9D2]/90 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="backdrop-blur-sm bg-[#678983]/80 rounded-3xl p-8 shadow-2xl border border-[#E6DDC4]/20">
              <h3 className="text-2xl font-semibold text-[#E6DDC4] mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#678983]/40 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[#E6DDC4]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#E6DDC4]/70">Email</p>
                    <a
                      href="mailto:kenilk667@gmail.com"
                      className="text-[#E6DDC4] hover:text-[#F0E9D2] transition-colors"
                    >
                      kenilk667@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#678983]/40 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[#E6DDC4]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#E6DDC4]/70">Phone</p>
                    <a
                      href="tel:+1234567890"
                      className="text-[#E6DDC4] hover:text-[#F0E9D2] transition-colors"
                    >
                      +91 9023157933
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#678983]/40 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[#E6DDC4]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#E6DDC4]/70">Location</p>
                    <p className="text-[#E6DDC4]">Rajkot, Gujarat, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="backdrop-blur-sm bg-[#678983]/80 rounded-3xl p-8 shadow-2xl border border-[#E6DDC4]/20">
              <h3 className="text-2xl font-semibold text-[#E6DDC4] mb-6">Connect With Me</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/kenilgamer"
                  className="w-12 h-12 rounded-full bg-[#678983]/60 flex items-center justify-center hover:bg-[#678983] transition-colors"
                >
                  <svg className="w-6 h-6 text-[#E6DDC4]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-[#678983]/60 flex items-center justify-center hover:bg-[#678983] transition-colors"
                >
                  <svg className="w-6 h-6 text-[#E6DDC4]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/kenil-sangani/"
                  className="w-12 h-12 rounded-full bg-[#678983]/60 flex items-center justify-center hover:bg-[#678983] transition-colors"
                >
                  <svg className="w-6 h-6 text-[#E6DDC4]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 