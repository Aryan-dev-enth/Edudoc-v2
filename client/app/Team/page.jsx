'use client'
import React, { useState } from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const TeamPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      name: 'Aryan Singh',
      role: 'Fullstack Developer',
      imgSrc: 'aryan.jpg',
      twitter: 'https://twitter.com/just_i_aryan_28',
      linkedin: 'https://www.linkedin.com/in/aryan-singh-459b6b225',
      github: 'https://github.com/Aryan-dev-enth',
      about: 'Hi, Im Aryan. A full-stack developer with a strong passion for building end-to-end web applications. I enjoy working on both the frontend and backend to create seamless user experiences.',
      course: 'Currently pursuing B.Tech in Computer Science Engineering',
      university: 'SRM University'
    },
    {
      name: 'Deepak Kumar',
      role: 'Frontend Developer',
      imgSrc: '/deepak.jpg',
      twitter: 'https://twitter.com/devwithdeepak',
      linkedin: 'https://www.linkedin.com/in/deepak-kumar-a86003250',
      github: 'https://github.com/deepak16375',
      about: 'Hi, Im Deepak. A passionate frontend developer who loves creating beautiful and functional user interfaces.',
      course: 'Currently pursuing BCA',
      university: 'SRM university'
    },
  ];

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMember(null);
    setIsModalOpen(false);
  };

  return (
    <div className='py-20 bg-gray-50'>
      <div className='container mx-auto px-6 md:px-12 lg:px-8'>
        <div className='mb-12 text-center'>
          <h1 className='text-4xl font-bold text-gray-900 md:text-5xl pt-28 pb-16'>Our Team</h1>
        </div>
        <div className='flex flex-wrap justify-center gap-12'>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className='border-t-4 border-blue-500 p-6 bg-white rounded-lg shadow-lg space-y-6 text-center'
              style={{ width: '400px', minHeight: '300px' }}
            >
              <div className='w-32 h-32 -mt-16 mx-auto rounded-full overflow-hidden'>
                <img
                  src={member.imgSrc}
                  alt={member.name}
                  className='w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110'
                />
              </div>
              <div className='text-center'>
                <h2 className='text-xl font-bold text-gray-900'>{member.name}</h2>
                <p className='text-gray-600'>{member.role}</p>
              </div>
              <div className='flex justify-center space-x-4'>
                <a href={member.twitter} aria-label={`${member.name} on Twitter`} className='text-blue-500 hover:text-blue-700 transition-colors duration-200' target='_blank'>
                  <FaTwitter size={24} />
                </a>
                <a href={member.linkedin} aria-label={`${member.name} on LinkedIn`} className='text-blue-700 hover:text-blue-900 transition-colors duration-200' target='_blank'>
                  <FaLinkedin size={24} />
                </a>
                <a href={member.github} aria-label={`${member.name} on GitHub`} className='text-gray-900 hover:text-gray-700 transition-colors duration-200' target='_blank'>
                  <FaGithub size={24}  />
                </a>
              </div>
              <button
                onClick={() => openModal(member)}
                className='mt-4 text-blue-500 hover:text-blue-700 transition-colors duration-200 underline'
              >
                Know More
              </button>
            </div>
          ))}
        </div>

        {isModalOpen && selectedMember && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <div className='bg-white rounded-lg p-8 w-11/12 md:w-2/3 lg:w-1/2 relative'>
              <div className='flex justify-end'>
                <button onClick={closeModal} className='text-gray-600 hover:text-gray-900 text-2xl'>
                  &times;
                </button>
              </div>
              <div className='text-center'>
                <div className='w-32 h-32 mx-auto rounded-full overflow-hidden mb-4'>
                  <img
                    src={selectedMember.imgSrc}
                    alt={selectedMember.name}
                    className='w-full h-full object-cover'
                  />
                </div>
                <h2 className='text-2xl font-bold text-gray-900'>{selectedMember.name}</h2>
                <p className='text-gray-600 mb-4'>{selectedMember.role}</p>
                <p className='text-gray-600 mb-4'>{selectedMember.about}</p>
                <p className='text-gray-600 mb-4'><strong>Course:</strong> {selectedMember.course}</p>
                <p className='text-gray-600 mb-4'><strong>University:</strong> {selectedMember.university}</p>
                <div className='flex justify-center space-x-4 mt-4'>
                  <a href={selectedMember.twitter} aria-label={`${selectedMember.name} on Twitter`} className='text-blue-500 hover:text-blue-700 transition-colors duration-200' target='_blank'>
                    <FaTwitter size={24} />
                  </a>
                  <a href={selectedMember.linkedin} aria-label={`${selectedMember.name} on LinkedIn`} className='text-blue-700 hover:text-blue-900 transition-colors duration-200'target='_blank'>
                    <FaLinkedin size={24} />
                  </a>
                  <a href={selectedMember.github} aria-label={`${selectedMember.name} on GitHub`} className='text-gray-900 hover:text-gray-700 transition-colors duration-200' target='_blank'>
                    <FaGithub size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamPage;
