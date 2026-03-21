import React, { useState } from 'react';
import { EnvelopeIcon } from '../constants';

// Add missing icon components
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.极狐l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://ieisc-rcciit.onrender.com';

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState('social');

  // Social media links and contact information
  const contactInfo = {
    email: 'iei.it@rcciit.edu.in',
    address: 'RCC Institute of Information Technology, Canal South Road, Beliaghata, Kolkata - 700015, West Bengal',
    officeHours: 'Monday to Friday: 10:00 AM - 4:00 PM',
    socialMedia: [
      {
        name: 'LinkedIn',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        ),
        url: 'https://www.linkedin.com/company/ie-i-student-chapter-rcciit/',
        color: 'hover:text-blue-600',
        handle: '@ie-i-student-chapter-rcciit'
      },
      {
        name: 'Instagram',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 极狐 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-极狐.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        ),
        url: 'https://www.instagram.com/ieisc_rcciit/',
        color: 'hover:text-pink-600',
        handle: '@ieisc_rcciit'
      },
      
      {
        name: 'Facebook',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        ),
        url: 'https://www.facebook.com/share/1A8UNu3DU7/',
        color: 'hover:text-blue-700',
        handle: '@IEI Student Chapter RCCIIT'
      },
      {
          name: 'Linktree',
          icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.736 5.853h4.756c.102 0 .203.022.296.064.215.098.372.289.415.51.043.22-.009.452-.14.638l-4.193 6.174 5.194 3.697c.191.135.32.342.354.572.034.23-.036.46-.192.633-.157.172-.379.273-.612.279h-4.755c-.102 0-.203-.022-.296-.064-.215-.098-.372-.289-.415-.51-.043-.22.009-.452.14-.638l4.193-6.174-5.194-3.697c-.191-.135-.32-.342-.354-.572-.034-.23.036-.46.192-.633.157-.172.379-.273.612-.279zm-10.069 0h4.756c.102 0 .203.022.296.064.215.098.372.289.415.51.043.22-.009.452-.14.638l4.193 6.174-5.194 3.697c-.191.135-.32.342-.354.572-.034.23.036.46.192.633.157.172.379.273.612.279H3.667c-.102 0-.203-.022-.296-.064-.215-.098-.372-.289-.415-.51-.043-.22.009-.452.14-.638l4.193-6.174-5.194-3.697c-.191-.135-.32-.342-.354-.572-.034-.23.036-.46.192-.633.157-.172.379-.273.612-.279z"/>
            </svg>
          ),
          url: 'https://linktr.ee/ieisc_rcciit',
          color: 'hover:text-green-600',
          handle: '@ieisc_rcciit'
        }
      
      
    ]
  };

  const facultyContacts = [
    {
      name: 'Prof. Dr. Soumyadip Dhar',
      role: 'Faculty Advisor',
      email: 'soumyadip.dhar@rcciit.org.in',
      
      image: 'images/WhatsApp Image 2025-09-07 at 21.43.41_c180d4b5.jpg'
    },
    {
      name: 'Prof. Dr. Hiranmoy Roy',
      role: 'Faculty Advisor', 
      email: 'hiranmoy.roy@rcciit.org.in',
      
      image: 'images/Screenshot 2025-09-07 221306.png'
    }
  ];

  const studentContacts = [
    {
      name: 'Debjoy Sarkar',
      role: 'Convenor',
      email: 'debjoyyofficial5@gmail.com',
      
      image: 'images/IMG_2025_03_20_1328400050.jpg'
    },
    {
      name: 'Vageesha Kriti',
      role: 'Convenor',
      email: 'vageeshakriti620@gmail.com',
      
      image: 'images/Image - Vageesha Kriti - Vageesha Kriti.jpg'
    }
  ];

  return (
    <>
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-white mb-6 border-b-2 border-brand-primary pb-2">Contact Us</h1>
        
        {/* Navigation Tabs */}
        <div className="mb-8 flex space-x-1 rounded-lg bg-brand-secondary/80 backdrop-blur-sm p-1">
          {['social', 'team'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-300 transform hover:scale-105 after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full ${
                activeTab === tab 
                  ? 'bg-brand-primary text-white shadow scale-105 after:bg-white' 
                  : 'text-brand-text-muted hover:bg-white/[0.12] hover:text-white after:bg-brand-primary'
              }`}
            >
              {tab === 'social' && 'Social Media & Contact'}
              {tab === 'team' && 'Contact Persons'}
            </button>
          ))}
        </div>

        {/* Social Media Tab */}
        {activeTab === 'social' && (
          <div className="max-w-6xl mx-auto">
            {/* Social Media Platforms */}
            <div className="bg-brand-secondary/80 backdrop-blur-sm p-8 rounded-lg shadow-xl mb-8">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Connect With Us</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 center">
                {contactInfo.socialMedia.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center p-6 rounded-xl bg-brand-background/50 border border-slate-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${social.color}`}
                  >
                    <div className="text-3xl mb-3">
                      {social.icon}
                    </div>
                    <span className="text-white font-medium text-sm">{social.name}</span>
                    
                  </a>
                ))}
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-brand-primary/10 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-brand-primary mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-brand-background/30 rounded-lg">
                      <EnvelopeIcon />
                      <div>
                        <p className="text-white font-medium">Email</p>
                        <a href={`mailto:${contactInfo.email}`} className="text-brand-text-muted hover:text-white transition-colors">
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-3 bg-brand-background/30 rounded-lg">
                      <MapPinIcon />
                      <div>
                        <p className="text-white font-medium">Address</p>
                        <p className="text-brand-text-muted">{contactInfo.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-brand-background/30 rounded-lg">
                      <CalendarIcon />
                      <div>
                        <p className="text-white font-medium">Office Hours</p>
                        <p className="text-brand-text-muted">{contactInfo.officeHours}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Map */}
                <div className="bg-brand-primary/10 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-brand-primary mb-4">Find Us</h3>
                  <div className="aspect-video bg-brand-background/30 rounded-lg overflow-hidden">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.857157037629!2d88.3893143153591!3d22.51826288521468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271237f28abe9%3A0xd047bab9138c8ab0!2sRCC%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2sin!4v1632998189999!5m2!1sen!2sin" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen="" 
                      loading="lazy" 
                      className="rounded-lg"
                      title="RCCIIT Location"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-brand-primary to-cyan-600 p-8 rounded-lg shadow-xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Stay Updated and Connected</h3>
                <p className="text-white/90 mb-6">For event updates and news</p>
                
              </div>
            </div>
          </div>
        )}

        {/* Team Contacts Tab */}
        {activeTab === 'team' && (
          <div className="max-w-6xl mx-auto bg-brand-secondary/80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Contact Persons</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Faculty Contacts */}
              <div>
                <h3 className="text-xl font-semibold text-brand-primary mb-6 pb-2 border-b border-brand-primary/30">Faculty Coordinators</h3>
                <div className="space-y-6">
                  {facultyContacts.map((contact, index) => (
                    <div key={index} className="bg-brand-background/50 p-6 rounded-xl border border-slate-600 flex items-center space-x-4">
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-lg">{contact.name}</h4>
                        <p className="text-brand-primary text-sm mb-2">{contact.role}</p>
                        <div className="space-y-1">
                          <a href={`mailto:${contact.email}`} className="flex items-center text-brand-text-muted hover:text-white text-sm">
                            <EnvelopeIcon className="h-4 w-4 mr-2" />
                            <span>{contact.email}</span>
                          </a>
                          
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Contacts */}
              <div>
                <h3 className="text-xl font-semibold text-brand-primary mb-6 pb-2 border-b border-brand-primary/30">Student Leads</h3>
                <div className="space-y-6">
                  {studentContacts.map((contact, index) => (
                    <div key={index} className="bg-brand-background/50 p-6 rounded-xl border border-slate-600 flex items-center space-x-4">
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-lg">{contact.name}</h4>
                        <p className="text-brand-primary text-sm mb-2">{contact.role}</p>
                        <div className="space-y-1">
                          <a href={`mailto:${contact.email}`} className="flex items-center text-brand-text-muted hover:text-white text-sm">
                            <EnvelopeIcon className="h-4 w-4 mr-2" />
                            <span>{contact.email}</span>
                          </a>
                          
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Response Info */}
            <div className="bg-brand-primary/20 p-6 rounded-xl text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Quick Response</h3>
              <p className="text-brand-text-muted">
                For urgent matters, please contact our student leads directly. For general inquiries, 
                reach out to us through our social media channels or email.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactPage;
