import React from 'react';


const JoinUsPage = () => {
  return (
    <div className="animate-fade-in-up">
      <h1 className="text-3xl font-bold text-white mb-6 border-b-2 border-brand-primary pb-2">Join Our Community</h1>
      <div className="bg-brand-secondary/80 backdrop-blur-sm p-8 rounded-lg shadow-xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-brand-primary mb-3">Why Join IEI?</h2>
          <p className="text-brand-text-muted">
            Becoming a member of the IEI Student Chapter opens up a world of opportunities. You'll gain access to exclusive workshops, networking events with industry professionals, technical competitions, and a community of like-minded peers passionate about engineering.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-brand-primary mb-3">Membership Benefits</h2>
          <ul className="list-disc list-inside text-brand-text-muted space-y-2">
            <li>Access to technical journals, publications, and e-books.</li>
            <li>On valid project ideas being a member you will get a chance to get fund to bring your creative innovasion into reality.</li>
            <li>Guidance and mentorship from senior members and faculty.</li>
            <li>Enhanced leadership and teamwork skills through event organization.</li>
            <li>Certificate of membership and recognition for contributions.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-brand-primary mb-3">How to Join</h2>
          <p className="text-brand-text-muted mb-4">
            Joining is simple! Fill the form link provided and reach out to one of our student coordinators or visit the faculty advisor's office for a membership. We welcome students from all engineering disciplines.
          </p>
          <a
            href="https://forms.gle/DruVpymVTc3Z1DbUA"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-brand-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Apply through this link and process mentioned. For any query connect us as instructed.
          </a>
        </div>
      </div>
    </div>
  );
};

export default JoinUsPage;
