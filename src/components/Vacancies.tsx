import React, { useState } from 'react';

export function Vacancies() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const salesConsultantDetails = {
    id: 'sales-consultant',
    title: 'Sales Consultant',
    location: '400 Sackville Drive',
    salary: '$3000',
    tasks: [
      'Build strong relationships with customers assisting them in selecting a vehicle that meets their needs.',
      'Conect of vehicles in accordance with dealership procedures with a focus on increasing sales volume.',
      'Ensure all guests of the dealership are dealt with in a positive and professional manner.',
      'Develop an in-depth understanding of vehicle inventory and deliver strong product knowledge.',
      'Perform high quality and professional vehicle demonstrations for customers.',
      'Follow up on delivered vehicles to ensure optimum customer satisfaction.',
      'Other duties, projects, etc. as requested by management'
    ],
    qualifications: [
      'Demonstrated ability to interact effectively with clients, visitors, and fellow team members, exhibiting diplomacy and tact',
      'Well-groomed, professional appearance',
      'A strong desire to exceed goals and objective by taking initiative',
      'Excellent customer service skills to support both internal and external clients',
      'Detail-oriented with a sense of pride in quality work',
      'High degree of honesty and integrity to ensure confidentiality and best practices are being upheld',
      'Demonstrates problem solving skills; ability to prioritize workload',
      'Superior communication and interpersonal skills are essential',
      'A valid class 5 license with a clean driver\'s abstract'
    ]
  };

  // If a job is selected, show detail view
  if (selectedJob === 'sales-consultant') {
    return (
      <div className="min-h-screen w-full bg-[rgb(250,_250,_253)]">
        <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
          
          {/* Job Detail Header */}
          <section className="py-12 md:py-16 bg-[rgb(250,_250,_253)]">
            <div className="w-full px-4 md:px-8 lg:px-20">
              <div className="max-w-6xl mx-auto">
                
                {/* Back Button */}
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="flex items-center gap-2 text-[rgb(139,_130,_246)] text-sm mb-8 hover:opacity-80 transition-opacity"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back to Vacancies
                </button>

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                  <div>
                    <p className="text-[rgb(139,_130,_246)] text-xs uppercase tracking-[1.5px] mb-3">
                      {salesConsultantDetails.location}
                    </p>
                    <h1 className="font-semibold text-[rgb(5,_15,_35)] text-3xl md:text-4xl lg:text-5xl">
                      {salesConsultantDetails.title}
                    </h1>
                  </div>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[rgb(5,_15,_35)]">
                    {salesConsultantDetails.salary}
                  </div>
                </div>

                <button className="bg-[rgb(139,_130,_246)] text-white font-semibold px-8 py-3 rounded-full hover:bg-[rgb(120,_110,_230)] transition-colors text-base">
                  Apply Now
                </button>
              </div>
            </div>
          </section>

          {/* Job Details Content */}
          <section className="py-12 bg-white">
            <div className="w-full px-4 md:px-8 lg:px-20">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  
                  {/* Tasks */}
                  <div>
                    <h2 className="font-semibold text-[rgb(5,_15,_35)] text-2xl mb-6">
                      Tasks
                    </h2>
                    <div className="space-y-4">
                      {salesConsultantDetails.tasks.map((task, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <span className="text-[rgb(5,_15,_35)] opacity-[0.5] mt-1">{index + 1}.</span>
                          <p className="text-[rgb(5,_15,_35)] opacity-[0.7] leading-relaxed">
                            {task}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Qualifications */}
                  <div>
                    <h2 className="font-semibold text-[rgb(5,_15,_35)] text-2xl mb-6">
                      The Qualifications
                    </h2>
                    <div className="space-y-4">
                      {salesConsultantDetails.qualifications.map((qual, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <span className="text-[rgb(5,_15,_35)] opacity-[0.5] mt-1">{index + 1}.</span>
                          <p className="text-[rgb(5,_15,_35)] opacity-[0.7] leading-relaxed">
                            {qual}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    );
  }

  // Default list view
  return (
    <div className="min-h-screen w-full bg-[rgb(250,_250,_253)]">
      <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
        
        {/* Hero Section */}
        <section className="py-16 md:py-20 bg-[rgb(250,_250,_253)]">
          <div className="w-full px-4 md:px-8 lg:px-20">
            <div className="max-w-4xl mx-auto">
              <p className="text-[rgb(139,_130,_246)] text-sm uppercase tracking-[2px] mb-3">
                WE ARE HIRING!
              </p>
              <h1 className="font-semibold text-[rgb(5,_15,_35)] text-4xl md:text-5xl lg:text-6xl mb-12">
                Vacancies
              </h1>

              {/* Sales Consultant Job Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-2 mb-4">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-1 flex-shrink-0">
                    <path d="M8 14s6-4 6-8.5C14 3 11.3 1 8 1S2 3 2 5.5C2 10 8 14 8 14z" stroke="rgb(139, 130, 246)" strokeWidth="1.5" fill="none"/>
                    <circle cx="8" cy="5.5" r="1.5" fill="rgb(139, 130, 246)"/>
                  </svg>
                  <p className="text-[rgb(139,_130,_246)] text-sm">
                    400 Sackville Drive
                  </p>
                </div>
                
                <h2 className="font-semibold text-[rgb(5,_15,_35)] text-2xl md:text-3xl mb-6">
                  Sales Consultant
                </h2>

                <button 
                  onClick={() => setSelectedJob('sales-consultant')}
                  className="flex items-center gap-2 text-[rgb(5,_15,_35)] text-base hover:text-[rgb(139,_130,_246)] transition-colors"
                >
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
