import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://ieisc-rcciit.onrender.com';

// Local fallback images
const fallbackImages = {
  logo: "SC_Draft/images/deptlogo.jpg",
  dept: "https://drive.google.com/file/d/1tuVP4c61Jx6tl2SQU63Exndouf4TsoN4/view?usp=drive_link",
  error: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='18' fill='white'%3EImage Not Found%3C/text%3E%3C/svg%3E"
};

const HomePage = () => {
  const [isLogoActive, setIsLogoActive] = useState(false);
  const [isDeptLogoActive, setIsDeptLogoActive] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Using reliable image URLs with fallbacks
  const campusImageUrl = "https://rcciit.edu.in/uploads/home_about/1755170374_aboutbg.jpg";
  const logoImageUrl = "https://upload.wikimedia.org/wikipedia/commons/a/ab/Regional_Computer_Centre_Institute_Of_Information_Technology.png";
  
  // Using data URI fallbacks instead of external URLs
  const deptlogourl = fallbackImages.logo;
  const deptpicurl = fallbackImages.dept;

  // SEO: Update document title and meta tags
  useEffect(() => {
    // Update page title
    document.title = "IEI Student Chapter RCCIIT | Institution of Engineers India | IT Department | Engineering College Kolkata";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Official IEI Student Chapter at RCCIIT Kolkata - Department of Information Technology. Join for engineering workshops, project funding, technical events, and professional development.";

    // Add canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = "https://ie-i-scrcciit.vercel.app/";

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "IEI Student Chapter RCCIIT",
      "alternateName": "Institution of Engineers India Student Chapter RCCIIT",
      "url": "https://ie-i-scrcciit.vercel.app/",
      "logo": "https://ie-i-scrcciit.vercel.app/images/Official_ieircciit_Logo.png",
      "description": "Official Student Chapter of The Institution of Engineers (India) at RCC Institute of Information Technology, Kolkata. Engineering student community for technical workshops, projects, and professional development.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "RCC Institute of Information Technology, Canal South Road, Beliaghata",
        "addressLocality": "Kolkata",
        "addressRegion": "West Bengal",
        "postalCode": "700015",
        "addressCountry": "IN"
      },
      "memberOf": {
        "@type": "Organization",
        "name": "The Institution of Engineers (India)"
      },

      // ADDED: SameAs links for verification
    "sameAs": {
      "https://www.facebook.com/people/IEI-Student-Chapter-Rcciit/61580277516704/?rdid=KgNMdfLialfNKTYG&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1A8UNu3DU7%2F",
      "https://www.linkedin.com/company/ie-i-student-chapter-rcciit/",
      "https://www.instagram.com/ieisc_rcciit",
      "https://linktr.ee/ieisc_rcciit"
      }
    };

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
  try {
    setLoading(true);
    
    // Fetch all events (same as EventsPage)
    const response = await fetch(`${API_BASE_URL}/api/events/`);
    
    if (response.ok) {
      const eventsData = await response.json();
      
      // Use the exact same filtering logic as EventsPage for ongoing events
      const now = new Date();
      const ongoing = eventsData.filter(event => {
        if (!event.date) return false;
        const eventDate = new Date(event.date);
        return eventDate >= now;
      });

      setUpcomingEvents(ongoing.slice(0, 3)); // Show only first 3 ongoing/upcoming events
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  } finally {
    setLoading(false);
  }
};

  // Format date function with better error handling
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Date TBA";
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return "Date TBA";
    }
  };

  // Handle image errors with inline SVG fallback
  const handleImageError = (e) => {
    e.target.src = fallbackImages.error;
    e.target.onerror = null; // Prevent infinite loop
  };

  return (
    
    <div className="space-y-28 animate-fade-in-up">
      {/* Hero Section */}
      <section className="relative text-center py-20 bg-gradient-to-br from-blue-800/20 to-cyan-800/80 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10 p-8 flex flex-col items-center">
          <div className="my-6 bg-white p-3 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <img
              src="https://ie-i-scrcciit.vercel.app/images/Official_ieircciit_Logo.png"
              alt="The Institution of Engineers India IEI Logo Official - IEI Student Chapter RCCIIT"
              className="h-28 w-auto object-contain"
              onError={handleImageError}
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            The Institution of Engineers (India) 
          </h1>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Student Chapter
          </h1>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            RCCIIT
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-gray-300 mt-4 font-light">
            Fostering Engineering Excellence and Innovation at RCCIIT
          </p>
          <p className="max-w-2xl mx-auto text-2xl text-white font-semibold mb-8 mt-2 bg-blue-600/20 px-6 py-2 rounded-full">
            Department of Information Technology
          </p>
          <Link
            to="/join"
            className="relative inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-4 px-10 rounded-full text-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-cyan-500/30 group"
          >
            <span className="relative z-10">Join Us Today</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        </div>
      </section>

      {/* About RCCIIT Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-blue-500 to-white bg-clip-text text-transparent">
              About RCCIIT
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              RCC Institute of Information Technology (RCCIIT) was set up in 1999 by the erstwhile Regional Computer Centre (RCC), Calcutta (in JU) as a unique joint venture of NIC, Ministry of Communication & IT, Govt. of India and Dept. of Higher Education, Govt. of West Bengal. In 2003 the lead role of management of RCCIIT was transferred to the State Govt. from&nbsp;Govt.&nbsp;of&nbsp;India.
            </p>
            <div className="flex gap-4 flex-wrap">
              <span className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium">Est. 1999</span>
              <span className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium">NAAC Accredited</span>
              <span className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium">AICTE Approved</span>
            </div>
          </div>
          <div 
            className="relative rounded-2xl shadow-2xl overflow-hidden aspect-video bg-gray-800 group"
            onMouseLeave={() => setIsLogoActive(false)}
          >
            <img 
              src={campusImageUrl} 
              alt="RCCIIT Campus Kolkata - RCC Institute of Information Technology Campus View"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out transform ${
                isLogoActive ? 'opacity-0 scale-110 blur-sm' : 'opacity-100 scale-100 blur-0'
              } group-hover:scale-105`}
              onError={handleImageError}
            />
            <img 
              src={logoImageUrl} 
              alt="RCCIIT Logo - RCC Institute of Information Technology Official Logo"
              className={`absolute inset-0 w-full h-full object-contain p-8 transition-all duration-700 ease-in-out transform ${
                isLogoActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              } bg-white/90`}
              onError={handleImageError}
            />
            <div 
              className="absolute top-6 right-6 w-16 h-16 p-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl cursor-pointer transition-all duration-500 transform hover:scale-110 hover:rotate-12 z-10"
              onMouseEnter={() => setIsLogoActive(true)}
            >
              <img 
                src={isLogoActive ? campusImageUrl : logoImageUrl}
                alt="Toggle RCCIIT View"
                className="w-full h-full object-contain transition-all duration-500"
                onError={handleImageError}
              />
            </div>
          </div>
        </div>
      </section>

      {/* The IT Department Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-blue-500 to-white bg-clip-text text-transparent">
              The Department of Information Technology
        </h2>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div 
            
            className="relative rounded-2xl shadow-2xl overflow-hidden aspect-video bg-gray-800 group"
            onMouseLeave={() => setIsDeptLogoActive(false)}
            
          >
            
            <img 
              src="/images/deptpic.jpg" 
              alt="IT Department RCCIIT - Department of Information Technology at RCC Institute of Information Technology"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out transform ${
                isDeptLogoActive ? 'opacity-0 scale-110 blur-sm' : 'opacity-100 scale-100 blur-0'
              } group-hover:scale-105`}
              onError={handleImageError}
            />
            <img 
              src="/images/deptlogo.jpg" 
              alt="IT Department Logo - Department of Information Technology Official Logo"
              className={`absolute inset-0 w-full h-full object-contain p-8 transition-all duration-700 ease-in-out transform ${
                isDeptLogoActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              } bg-white/90`}
              onError={handleImageError}
            />
            <div 
              className="absolute top-6 right-6 w-16 h-16 p-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl cursor-pointer transition-all duration-500 transform hover:scale-110 hover:rotate-12 z-10"
              onMouseEnter={() => setIsDeptLogoActive(true)}
            >
              <img 
                src={isDeptLogoActive ? "/images/deptpic.jpg" : "/images/deptlogo.jpg"}
                alt="Toggle IT Department View"
                className="w-full h-full object-contain transition-all duration-500"
                onError={handleImageError}
              />
            </div>
          </div>
          <div>
            
            <p className="text-xl text-blue-400 italic mt-2 mb-6 font-light">
              "Legacy of Excellence, Vision for Tomorrow."
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The Information Technology Department of RCCIIT, established in 1999, is one of the institute's oldest departments and continues the legacy of RCC, Calcutta, in delivering quality IT education. It has an excellent record in academics and placements, with alumni excelling in leading MNCs, research, and academia worldwide.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-600/10 rounded-xl">
                <div className="text-2xl font-bold text-blue-400">20+</div>
                <div className="text-sm text-gray-400">Years of Excellence</div>
              </div>
              <div className="text-center p-4 bg-blue-600/10 rounded-xl">
                <div className="text-2xl font-bold text-blue-400">1000+</div>
                <div className="text-sm text-gray-400">Successful Alumni</div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* About IEI Student Chapter RCCIIT Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-2xl p-12 border border-blue-600/30">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-500 to-white bg-clip-text text-transparent">
              About IEI Student Chapter RCCIIT
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Empowering the next generation of engineers through innovation, collaboration, and professional development
            </p>
            
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Our Mission & Vision</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-600/20 p-3 rounded-full mr-4">
                    <span className="text-blue-400 text-xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Our Mission</h4>
                    <p className="text-gray-300">
                      To foster engineering excellence among students by providing platforms for technical growth, 
                      innovation, and professional development through workshops, projects, and industry interactions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600/20 p-3 rounded-full mr-4">
                    <span className="text-blue-400 text-xl">👁️</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Our Vision</h4>
                    <p className="text-gray-300">
                      To create a vibrant community of engineering professionals who drive technological innovation 
                      and contribute meaningfully to society through their technical expertise and leadership.
                    </p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-600/10 rounded-lg border border-blue-600/20">
                  <p className="text-gray-300 text-sm">
                    <strong>About The Institution of Engineers (India):</strong> IEI is the premier professional organization for engineers in India, 
                    established in 1920. It plays a crucial role in promoting engineering education, research, and practice across the nation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/80 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Why Join IEI Student Chapter?</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-4">✓</div>
                  <span className="text-gray-300">Access to exclusive workshops and technical sessions</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-4">✓</div>
                  <span className="text-gray-300">Project funding and mentorship opportunities</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-4">✓</div>
                  <span className="text-gray-300">Networking with industry professionals and alumni</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-4">✓</div>
                  <span className="text-gray-300">Participation in national-level competitions</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-4">✓</div>
                  <span className="text-gray-300">Professional development and certification programs</span>
                </div>
              </div>
              <div className="text-center mt-6 space-y-3">
                <a 
                  href="https://www.ieindia.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                >
                  Learn more about IEI Org.
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Focus Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-4xl font-bold text-white mb-12 text-center bg-gradient-to-r from-blue-500 to-white bg-clip-text text-transparent">
          IEI Student Chapter Focus and Uniqueness
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: "💻", title: "Software Development", description: "Learn programming languages, algorithms, and software engineering principles to build innovative applications." },
            { icon: "🔌", title: "Hardware Engineering", description: "Explore electronics, embedded systems, and hardware design to create the technology of tomorrow." },
            { icon: "🚀", title: "Student Projects", description: "Work on real-world projects that solve problems and make a difference in society through technology." },
            { icon: "🎓", title: "Tech Education", description: "Receive world-class education with a focus on practical, hands-on learning in cutting-edge technologies." }
          ].map((area, index) => (
            <div 
              key={index}
              className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-gray-800 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl group"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">{area.icon}</div>
              <h3 className="text-xl font-semibold text-blue-400 mb-4 group-hover:text-white transition-colors duration-300">{area.title}</h3>
              <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Project Funding Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
        <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-2xl p-10 border border-blue-600/30">
          <h2 className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Project Funding Support
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                The IE(I) Student Chapter provides financial support and resources for innovative student projects. 
                We believe in nurturing practical implementation of engineering concepts through hands-on projects 
                that solve real-world problems.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-600/20 p-2 rounded-full mr-4">
                    <span className="text-blue-400 text-xl">💰</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Financial Grants</h4>
                    <p className="text-gray-400 text-sm">Get funding for components, materials, and resources for your innovative projects</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600/20 p-2 rounded-full mr-4">
                    <span className="text-blue-400 text-xl">👨‍🏫</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Mentorship</h4>
                    <p className="text-gray-400 text-sm">Guidance from faculty experts and industry professionals</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600/20 p-2 rounded-full mr-4">
                    <span className="text-blue-400 text-xl">🏆</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Recognition</h4>
                    <p className="text-gray-400 text-sm">Showcase your projects at IE(I) events and competitions</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/80 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-blue-400 mb-4 text-center">How to Apply for Funding</h3>
              <ol className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">1</span>
                  <span>Submit a detailed project proposal with objectives, timeline, and budget</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">2</span>
                  <span>Present your idea to the project evaluation committee</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">3</span>
                  <span>Receive approval and funding disbursement upon selection</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">4</span>
                  <span>Implement your project with regular progress reviews</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">5</span>
                  <span>Showcase your completed project at IE(I) events</span>
                </li>
              </ol>
              <div className="text-center mt-6">
                <Link to="/join" className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-2 px-6 rounded-lg text-sm hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
                  Before applying become a member by joining us.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <h2 className="text-4xl font-bold text-white mb-12 text-center bg-gradient-to-r from-blue-500 to-white bg-clip-text text-transparent">
          Upcoming Events
        </h2>
        
        {error && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mb-8">
            <p className="text-yellow-200">{error}</p>
          </div>
        )}
        
        {loading ? (
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading events...</p>
          </div>
        ) : upcomingEvents.length > 0 ? (
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden mb-8">
            {upcomingEvents.map((event, index) => (
              <Link
                key={event.id || index}
                to="/events"
                className="block p-6 border-b border-blue-600/20 last:border-b-0 hover:bg-blue-600/10 transition-all duration-300 group"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      📅 {formatDate(event.date)} • {event.event_type}
                    </p>
                  </div>
                  <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-12 text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-2xl font-medium text-white mb-2">No Upcoming Events</h3>
            <p className="text-gray-400 mb-6">Stay tuned for exciting workshops, seminars, and competitions!</p>
          </div>
        )}
        
        <div className="text-center">
          <Link
            to="/events"
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-500 transform hover:scale-105 shadow-lg"
          >
            View All Events
          </Link>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '1s' }}>
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            Become part of a vibrant community of engineers and innovators shaping the future of technology.
          </p>
          <Link
            to="/join"
            className="inline-block bg-white text-blue-600 font-bold py-4 px-12 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
