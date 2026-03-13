import React, { useState, useEffect } from 'react';

// API base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://ieisc-rcciit.onrender.com';

// --- ENUMS ---
const StudentSubCategory = {
  convenors: 'Convenors',
  committee: 'Committee',
  members: 'Members',
  tech: 'Tech Team',
  graphics: 'Graphics Team',
  pr: 'PR Team',
  manage: 'Management Team',
};

const TeamCategory = {
  FACULTY: 'Faculty Coordinators',
  STUDENT: 'Student Members'
};

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// --- COMPONENTS ---
const MemberCard = ({ member }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Construct the full image URL
  const imageUrl = member.image 
    ? `${API_BASE_URL}${member.image}`
    : member.imageUrl 
    ? `${API_BASE_URL}${member.imageUrl}`
    : null;

  // Check if social links exist in different possible formats
  const linkedinUrl = member.linkedin || member.linkedin_url;
  const instagramUrl = member.instagram || member.instagram_url;

  return (
    <div className="bg-brand-secondary/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden text-center transition-transform transform hover:-translate-y-2 duration-300 h-full flex flex-col">
      {/* Image Container with fixed aspect ratio */}
      <div className="relative w-full pt-[100%] bg-brand-background/50 overflow-hidden">
        {imageUrl && !imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-12 h-12 text-brand-text-muted animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
            <img 
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              src={imageUrl}
              alt={member.name}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                console.error('Image failed to load:', imageUrl);
                setImageError(true);
                setImageLoaded(true);
              }}
              loading="lazy"
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-16 h-16 text-brand-text-muted" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">{member.name}</h3>
        <p className="text-brand-primary text-sm mb-2 line-clamp-2">{member.role}</p>
        
        {/* Social Media Links */}
        {(linkedinUrl || instagramUrl) && (
          <div className="mt-2 mb-3 flex justify-center space-x-4">
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:text-cyan-400 transition-colors duration-200 inline-block"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}
            
          </div>
        )}
        
        {/* Category badge */}
        <div className="mt-auto">
          <span className="inline-block bg-brand-primary/20 text-brand-primary text-xs px-2 py-1 rounded-full">
            {member.category}
          </span>
        </div>
      </div>
    </div>
  );
};

const TeamPage = () => {
  const [activeTab, setActiveTab] = useState(TeamCategory.FACULTY);
  const [activeStudentTab, setActiveStudentTab] = useState(StudentSubCategory.convenors);
  const [teamData, setTeamData] = useState({
    faculty: [],
    students: {
      convenors: [],
      committee: [],
      members: [],
      tech: [],
      graphics: [],
      pr: [],
      manage: []
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/team/`);
      
      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch team data: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('API Data received:', data);
      
      // Let's log the first member to see what fields we're getting
      if (data.length > 0) {
        console.log('Sample member data:', data[0]);
      }
      
      // Transform the array response into the expected object structure
      const transformData = (membersArray) => {
        // Shuffle the entire array first
        // const shuffledArray = shuffleArray(membersArray);
        
        const faculty = membersArray.filter(member => member.category === 'faculty');
        
        // Get all student categories separately
        const convenors = membersArray.filter(member => member.category === 'convenor');
        const committee = membersArray.filter(member => member.category === 'committee');
        const regularMembers = membersArray.filter(member => member.category === 'member'); // Only actual 'member' category
        const tech = membersArray.filter(member => member.category === 'tech');
        const graphics = membersArray.filter(member => member.category === 'graphics');
        const pr = membersArray.filter(member => member.category === 'pr');
        const manage = membersArray.filter(member => member.category === 'manage');
        
        // Create combined members array that includes:
        // 1. Regular members (category = 'member')
        // 2. Committee members (category = 'committee') 
        // 3. Convenor members (category = 'convenor')
        const allMembers = [
          ...regularMembers,
          ...convenors,
          ...committee
        ];
        
        // Shuffle each category individually as well
        const students = {
          convenors: convenors,
          committee: shuffleArray(committee),
          members: allMembers, // Includes regular members + convenors + committee
          tech: shuffleArray(tech),
          graphics: shuffleArray(graphics),
          pr: shuffleArray(pr),
          manage: shuffleArray(manage)
        };
        
        return { faculty: faculty, students };
      };
      
      const transformedData = transformData(data);
      setTeamData(transformedData);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching team data';
      setError(errorMessage);
      console.error('Error fetching team data..check network connection:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderMembers = (members, categoryName) => {
    if (loading) {
      return (
        <div className="text-center py-16 bg-brand-secondary/60 backdrop-blur-sm rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
          <p className="mt-4 text-brand-text-muted">Loading team members...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="text-center py-16 bg-brand-secondary/60 backdrop-blur-sm rounded-lg">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-2 text-xl font-medium text-white">Error Loading Data. Check your network connection.</h3>
          <p className="mt-1 text-brand-text-muted">{error}</p>
          <button
            onClick={fetchTeamData}
            className="mt-4 px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }
    
    if (members.length === 0) {
      return (
        <div className="text-center py-16 bg-brand-secondary/60 backdrop-blur-sm rounded-lg">
          <svg className="mx-auto h-12 w-12 text-brand-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 013 1.803M15 21a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-xl font-medium text-white">No Members Yet</h3>
          <p className="mt-1 text-brand-text-muted">
            Team members for the '{categoryName}' category will be listed here soon.
          </p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    );
  };
  
  const renderStudentSection = () => {
    const studentSubCategories = Object.values(StudentSubCategory);
    
    const getMembersForSubCategory = (subCategory) => {
      switch (subCategory) {
        case StudentSubCategory.convenors: return teamData.students.convenors || [];
        case StudentSubCategory.committee: return teamData.students.committee || [];
        case StudentSubCategory.members: return teamData.students.members || [];
        case StudentSubCategory.tech: return teamData.students.tech || [];
        case StudentSubCategory.graphics: return teamData.students.graphics || [];
        case StudentSubCategory.pr: return teamData.students.pr || [];
        case StudentSubCategory.manage: return teamData.students.manage || [];
        default: return [];
      }
    };
    
    return (
      <div>
        <div className="mb-8 flex flex-wrap justify-center gap-2 rounded-lg bg-brand-secondary/80 backdrop-blur-sm p-2">
          {studentSubCategories.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveStudentTab(tab)}
              className={`relative flex-grow rounded-md px-3 py-2 text-xs sm:text-sm font-medium leading-5 transition-all duration-300 transform hover:scale-105 basis-1/3 md:basis-auto after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full ${activeStudentTab === tab ? 'bg-brand-primary text-white shadow scale-105 after:bg-white' : 'text-brand-text-muted hover:bg-white/[0.12] hover:text-white after:bg-brand-primary'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div>
          {renderMembers(getMembersForSubCategory(activeStudentTab), activeStudentTab)}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in-up min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6 border-b-2 border-brand-primary pb-2">Our Team</h1>
      
      <div className="mb-8 flex space-x-1 rounded-lg bg-brand-secondary/80 backdrop-blur-sm p-1">
        <button
          onClick={() => setActiveTab(TeamCategory.FACULTY)}
          className={`relative w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-300 transform hover:scale-105 after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full ${activeTab === TeamCategory.FACULTY ? 'bg-brand-primary text-white shadow scale-105 after:bg-white' : 'text-brand-text-muted hover:bg-white/[0.12] hover:text-white after:bg-brand-primary'}`}
        >
          {TeamCategory.FACULTY}
        </button>
        <button
          onClick={() => setActiveTab(TeamCategory.STUDENT)}
          className={`relative w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-300 transform hover:scale-105 after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full ${activeTab === TeamCategory.STUDENT ? 'bg-brand-primary text-white shadow scale-105 after:bg-white' : 'text-brand-text-muted hover:bg-white/[0.12] hover:text-white after:bg-brand-primary'}`}
        >
          {TeamCategory.STUDENT}
        </button>
      </div>

      <div>
        {activeTab === TeamCategory.FACULTY && renderMembers(teamData.faculty, TeamCategory.FACULTY)}
        {activeTab === TeamCategory.STUDENT && renderStudentSection()}
      </div>
    </div>
  );
};

export default TeamPage;
