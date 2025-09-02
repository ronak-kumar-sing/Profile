import React, { useState } from 'react';
import { Github, ExternalLink, Mail, Code, Briefcase, GraduationCap, Menu, X, Download, FileText } from 'lucide-react';
import ProfileCard from './content/Components/ProfileCard/ProfileCard.jsx';
import SplitText from './content/TextAnimations/SplitText/SplitText.jsx';
import ScrollReveal from './content/TextAnimations/ScrollReveal/ScrollReveal.jsx';
import ShinyText from './content/TextAnimations/ShinyText/ShinyText.jsx';
import TiltedCard from './content/Components/TiltedCard/TiltedCard.jsx';
import RotatingText from './content/TextAnimations/RotatingText/RotatingText.jsx';
import LogoLoop from './content/Animations/LogoLoop/LogoLoop.jsx';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import ContactSection from './content/Components/Contact';

function App() {
  // State management
  const [activeSection, setActiveSection] = useState('home');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handlers
  const handleCardClick = (project, index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
    if (project.liveUrl && project.liveUrl !== '#') {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleNavClick = (section) => {
    setActiveSection(section.toLowerCase());
    setMobileMenuOpen(false);
    
    // Smooth scroll to section
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      const offset = 80; // Account for fixed navbar
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll spy effect
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Data
  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  ];

  const projects = [
    {
      title: "Make-it Web & App",
      description: "A comprehensive productivity and study companion mobile app with AI-powered study resources using Google Gemini 2.0.",
      image: "/makeit.png",
      tech: ["React Native", "Expo", "Next.js"],
      liveUrl: "https://make-it-three.vercel.app/",
      githubUrl: "https://github.com/ronak-kumar-sing/Make-it-app"
    },
    {
      title: "CareerCompass",
      description: "A comprehensive career development platform with AI-powered assessments, personalized roadmaps, and job matching features.",
      image: "/Career.png",
      tech: ["PHP", "MySQL", "Google Gemini API", "Tailwind CSS"],
      liveUrl: "http://careercompassss.infinityfreeapp.com/",
      githubUrl: "https://github.com/ronak-kumar-sing/College-Project"
    },
    {
      title: "StudentNest 🏠✨",
      description: "A modern student accommodation platform connecting students with verified property owners for traditional rooms and PG accommodations. Features price negotiation, real-time chat, smart filtering, and responsive design.",
      image: "/studentnest.png",
      tech: ["React.js", "Vite", "TailwindCSS", "Socket.IO", "Framer Motion", "TypeScript"],
      liveUrl: "https://studentnest-eight.vercel.app/",
      githubUrl: "https://github.com/ronak-kumar-sing/studentnest"
    }
  ];

  const skills = {
    "Frontend": ["React.js", "Next.js", "React Native", "Tailwind CSS", "JavaScript"],
    "Backend": ["PHP", "MySQL", "Node.js"],
    "Languages": ["C++", "Java", "JavaScript", "PHP"],
    "Tools & APIs": ["Google Gemini API", "Expo", "Git"]
  };

  const experience = [
    {
      title: "App Development Intern",
      company: "GDSE Lead",
      duration: "Worded",
      description: "Worked on frontend development for mobile applications, with a strong focus on designing and implementing user-friendly interfaces.",
      type: "Internship"
    }
  ];

  return (
    <div className='bg-[#060010] min-h-screen text-white' style={{ fontFamily: 'Roboto Mono, monospace' }}>
      {/* Navigation */}
      <div className='fixed top-0 left-0 right-0 z-50'>
        <nav className="bg-[#060010]/95 backdrop-blur-lg shadow-md relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="text-xl sm:text-2xl font-bold">
                <ShinyText text="Ronak Kumar Singh" speed={3} className="font-bold text-xl sm:text-2xl lg:text-3xl" />
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-4 lg:space-x-8">
                {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Resume', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className={`nav-link hover:text-purple-400 transition-colors cursor-pointer text-sm lg:text-base ${
                      activeSection === item.toLowerCase() ? 'text-purple-400 active' : 'text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white hover:text-purple-400 transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-[#060010]/95 backdrop-blur-lg border-t border-purple-500/20">
                <div className="px-4 py-4 space-y-3">
                  {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Resume', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleNavClick(item)}
                      className={`block w-full text-left hover:text-purple-400 transition-colors cursor-pointer py-2 ${
                        activeSection === item.toLowerCase() ? 'text-purple-400' : 'text-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px">
            <div className="h-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section id="home" className="pt-20 sm:pt-24 lg:pt-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className='flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-16'>
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-8">
                <SplitText
                  text="Software Engineer"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
                />
                <div className='flex flex-col sm:flex-row justify-center lg:justify-start items-center text-lg sm:text-xl lg:text-2xl font-semibold text-gray-300 gap-2'>
                  <h1>Working With</h1>
                  <RotatingText
                    texts={['React', 'Next.js', 'React Native', 'Expo', 'PHP', 'Node.js']}
                    mainClassName="px-3 sm:px-4 bg-cyan-300 text-black overflow-hidden py-1 sm:py-2 justify-center rounded-lg"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    rotationInterval={2000}
                  />
                </div>
              </div>
              
              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
                <a
                  href="/Ronak_Kumar (1).pdf"
                  download="Ronak_Kumar_Resume.pdf"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center group cursor-pointer"
                >
                  <Download className="w-4 h-4 mr-2 group-hover:translate-y-1 transition-transform" />
                  Download Resume
                </a>
                
                <button
                  onClick={() => handleNavClick('Contact')}
                  className="bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center cursor-pointer"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Get In Touch
                </button>
              </div>
            </div>
            <div className="flex-shrink-0 w-full sm:w-auto flex justify-center">
              <ProfileCard
                name="Ronak Kumar"
                title="Software Engineer"
                handle="ronakkumar"
                iconUrl='/icon.png'
                status="Online"
                contactText="Contact Me"
                avatarUrl="/profile.png"
                miniAvatarUrl="/hacker.png"
                onContactClick={() => handleNavClick('Contact')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">
            <ShinyText text="About Me" />
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className=''>

              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
              >

                Hi, I'm Ronak Kumar Singh — a web and mobile app developer who enjoys turning ideas into real products.
                I’ve had the chance to work as an App Development Intern with the GDSE Lead, where I learned a lot while building frontend experiences with React Native.
              </ScrollReveal>

              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
              >

                Over time, I’ve explored tools like React.js, Next.js, React Native, and even played around with AI APIs.
                What excites me most is creating apps that feel smooth, simple, and genuinely helpful for people.
              </ScrollReveal>

              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
              >
                Outside of coding, I love joining hackathons, experimenting with new ideas, and building projects just for fun.
                My bigger dream is to use technology in ways that make everyday life easier and a little more enjoyable for everyone.
              </ScrollReveal>

            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Frontend */}
              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/30 hover:scale-105 transition-transform duration-300">
                <Code className="w-8 h-8 text-purple-400 mb-3 animate-pulse" />
                <h3 className="font-semibold mb-2">Frontend Wizard ✨</h3>
                <p className="text-sm text-gray-400">Crafting sleek, responsive UIs with React, React Native & Tailwind — turning ideas into experiences.</p>
              </div>

              {/* Backend */}
              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30 hover:scale-105 transition-transform duration-300">
                <Briefcase className="w-8 h-8 text-blue-400 mb-3 animate-bounce" />
                <h3 className="font-semibold mb-2">Backend Explorer 🚀</h3>
                <p className="text-sm text-gray-400">Diving into Node.js, APIs & databases — building the brain behind the beauty.</p>
              </div>

              {/* Projects */}
              <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30 hover:scale-105 transition-transform duration-300">
                <GraduationCap className="w-8 h-8 text-green-400 mb-3 animate-spin-slow" />
                <h3 className="font-semibold mb-2">Project Builder ⚡</h3>
                <p className="text-sm text-gray-400">From <span className="text-green-300 font-medium">Make-it</span> to <span className="text-green-300 font-medium">BGMI Advisor</span>, I love solving problems through code.</p>
              </div>

              {/* Learner */}
              <div className="bg-pink-900/20 p-6 rounded-lg border border-pink-500/30 hover:scale-105 transition-transform duration-300">
                <Code className="w-8 h-8 text-pink-400 mb-3 animate-pulse" />
                <h3 className="font-semibold mb-2">Forever Learner 📚</h3>
                <p className="text-sm text-gray-400">Curious, adaptable & hungry for challenges — every project is a new adventure.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tech Stack Animation */}
      <div className="py-8 sm:py-12 relative overflow-hidden" style={{ height: '120px' }}>
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={40}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#060010"
          ariaLabel="Technology partners"
        />
      </div>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">
            <ShinyText text="Skills & Technologies" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-purple-500/30 rounded-xl p-4 sm:p-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-purple-300">{category}</h3>
                <div className="space-y-2">
                  {skillList.map((skill) => (
                    <div key={skill} className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm sm:text-base">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 bg-gradient-to-b from-transparent to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">
            <ShinyText text="Featured Projects" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div
                  key={index}
                  className={`group cursor-pointer transform transition-all duration-300 ${isExpanded ? 'scale-105' : 'hover:scale-102'}`}
                  onClick={() => handleCardClick(project, index)}
                >
                  <TiltedCard
                    imageSrc={project.image}
                    altText={project.title}
                    captionText={project.title}
                    overlayContent={
                      <div>
                        <h3 className="font-bold text-base sm:text-lg mb-2">{project.title}</h3>
                        <div className="flex gap-2 mb-4">
                          {project.liveUrl !== '#' && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="bg-purple-600 hover:bg-purple-700 p-2 rounded-full transition-colors cursor-pointer"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          {project.githubUrl !== '#' && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-colors cursor-pointer"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    }
                  />
                  <div className={`mt-4 sm:mt-6 p-4 sm:p-6 bg-gray-900/50 rounded-lg backdrop-blur-sm transition-all duration-300 ${isExpanded ? 'scale-105 border-2 border-purple-500/50' : ''}`}>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm sm:text-base">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-2 sm:px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-xs sm:text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">
            <ShinyText text="Experience" />
          </h2>
          <div className="max-w-4xl mx-auto">
            {experience.map((exp, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6 sm:p-8 mb-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">{exp.title}</h3>
                    <h4 className="text-base sm:text-lg text-purple-300">{exp.company}</h4>
                  </div>
                  <span className="bg-green-600/30 text-green-300 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-gray-300 text-sm sm:text-base">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-16 sm:py-20 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">
            <ShinyText text="Resume" />
          </h2>
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6 sm:p-8 hover:border-purple-400/50 transition-all duration-300">
              <div className="flex flex-col items-center space-y-6">
                <div className="bg-purple-600/20 p-6 rounded-full">
                  <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                    Download My Resume
                  </h3>
                  <p className="text-gray-300 mb-6 text-sm sm:text-base max-w-2xl">
                    Get a comprehensive overview of my experience, skills, and achievements. 
                    Download my latest resume to learn more about my professional journey.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <a
                    href="/Ronak_Kumar (1).pdf"
                    download="Ronak_Kumar_Resume.pdf"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center group cursor-pointer text-sm sm:text-base"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:translate-y-1 transition-transform" />
                    Download Resume
                  </a>
                  
                  <a
                    href="/Ronak_Kumar (1).pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center group cursor-pointer text-sm sm:text-base"
                  >
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                    View Online
                  </a>
                </div>

                <div className="text-xs sm:text-sm text-gray-400 text-center">
                  PDF • Last updated: September 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2025 Ronak Kumar Singh. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="https://github.com/ronak-kumar-sing" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Github className="w-6 h-6" />
              </a>
              <a href="mailto:ronakkumar20062006@gmail.com" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Mail className="w-6 h-6" />
              </a>
              <a href="/Ronak_Kumar (1).pdf" download="Ronak_Kumar_Resume.pdf" className="text-gray-400 hover:text-white transition-colors cursor-pointer" title="Download Resume">
                <Download className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;