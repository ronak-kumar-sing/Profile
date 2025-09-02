import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import ShinyText from '../TextAnimations/ShinyText/ShinyText';

// ShinyText component for animated text effect
// const ShinyText = ({ text }) => {
//   return (
//     <span className="relative bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
//       {text}
//     </span>
//   );
// };

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = async () => {
    setStatus('sending');
    setStatusMessage('Sending your message...');

    try {
      // Using EmailJS service (free tier available)
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID, // from .env
          template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // from .env
          user_id: import.meta.env.VITE_EMAILJS_USER_ID, // from .env
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: 'ronakkumar20062006@gmail.com'
          }
        })
      });

      if (response.ok) {
        setStatus('success');
        setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('Failed to send message. Please try the mailto option or contact me directly at ronakkumar20062006@gmail.com');
    }

    // Clear status after 5 seconds
    setTimeout(() => {
      setStatus('');
      setStatusMessage('');
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields.');
      setTimeout(() => {
        setStatus('');
        setStatusMessage('');
      }, 3000);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setStatusMessage('Please enter a valid email address.');
      setTimeout(() => {
        setStatus('');
        setStatusMessage('');
      }, 3000);
      return;
    }

    sendEmail();
  };

  // Mailto function (fallback option)
  const handleMailto = () => {
    const subject = encodeURIComponent(`Contact from ${formData.name || 'Website Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:ronakkumar20062006@gmail.com?subject=${subject}&body=${body}`);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-gradient-to-b from-transparent to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">
          <ShinyText text="Let's Connect" />
        </h2>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-white">Get In Touch</h3>
              <p className="text-gray-300 mb-8 text-sm sm:text-base leading-relaxed">
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
                Feel free to reach out!
              </p>
              <div className="space-y-4">
                <div className="flex items-center group cursor-pointer">
                  <Mail className="w-5 h-5 text-purple-400 mr-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <a
                    href="mailto:ronakkumar20062006@gmail.com"
                    className="text-gray-300 hover:text-purple-400 transition-colors text-sm sm:text-base break-all"
                  >
                    ronakkumar20062006@gmail.com
                  </a>
                </div>
                <div className="flex items-center group cursor-pointer">
                  <Phone className="w-5 h-5 text-purple-400 mr-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <a
                    href="tel:+917009097789"
                    className="text-gray-300 hover:text-purple-400 transition-colors text-sm sm:text-base"
                  >
                    +91 7009097789
                  </a>
                </div>
                <div className="flex items-center group">
                  <MapPin className="w-5 h-5 text-purple-400 mr-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">India</span>
                </div>
              </div>

              {/* Status Messages */}
              {status && (
                <div className={`mt-6 p-4 rounded-lg flex items-center ${status === 'success' ? 'bg-green-900/30 border border-green-500/30' :
                  status === 'error' ? 'bg-red-900/30 border border-red-500/30' :
                    'bg-blue-900/30 border border-blue-500/30'
                  }`}>
                  {status === 'success' && <CheckCircle className="w-5 h-5 text-green-400 mr-3" />}
                  {status === 'error' && <AlertCircle className="w-5 h-5 text-red-400 mr-3" />}
                  {status === 'sending' && <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mr-3" />}
                  <span className={`text-sm ${status === 'success' ? 'text-green-300' :
                    status === 'error' ? 'text-red-300' :
                      'text-blue-300'
                    }`}>
                    {statusMessage}
                  </span>
                </div>
              )}

              {/* Setup Instructions */}
              {/* <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-300 mb-2">Setup Instructions:</h4>
                <p className="text-xs text-blue-200">
                  To enable the contact form email functionality, sign up at{' '}
                  <a href="https://emailjs.com" target="_blank" rel="noopener noreferrer" className="underline">
                    emailjs.com
                  </a>{' '}
                  and replace the placeholder IDs in the code with your actual EmailJS credentials.
                </p>
              </div> */}
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6 sm:p-8 hover:border-purple-400/50 transition-all duration-300">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 text-sm sm:text-base"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 text-sm sm:text-base"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 resize-none text-sm sm:text-base"
                    placeholder="Your message..."
                  />
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={handleSubmit}
                    disabled={status === 'sending'}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center group cursor-pointer text-sm sm:text-base"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleMailto}
                    className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center group cursor-pointer"
                    title="Open in your default email client"
                  >
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 text-center">
                  * Required fields. You can also click the mail icon to open your default email client.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;