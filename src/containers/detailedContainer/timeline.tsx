import React from 'react';

interface TimelineItem {
  date: string;
  time: string;
  description: string;
  badge?: string;
  badgeColor?: string;
}

interface TimelineSection {
  month: string;
  year: string;
  items: TimelineItem[];
}

const Timeline: React.FC<{ sections: TimelineSection[] }> = ({ sections }) => {
  // Get the appropriate icon based on the description content
  const getIcon = (description: string) => {
    if (description.includes('Viewed Landing Page')) {
      return '👁';
    } else if (description.includes('Call to')) {
      return '📞';
    } else if (description.includes('Follow Up Call')) {
      return '📌';
    } else if (description.includes('Document Collection')) {
      return '📄';
    } else if (description.includes('Education Application')) {
      return '🎓';
    } else if (description.includes('Email received')) {
      return '📧';
    } 
    return '•';
  };

  // Process description to remove emoji prefix if present
  const processDescription = (description: string) => {
    const emojis = ['👁', '📞', '📌', '📄', '🎓', '📧'];
    for (const emoji of emojis) {
      if (description.startsWith(emoji)) {
        return description.substring(emoji.length).trim();
      }
    }
    return description;
  };

  // Background color for month headers and date/time columns
  const bgColor = "bg-[#E9EDF5]";

  return (
    <div className="relative w-full min-h-[200px]">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-0 relative">
          {/* Month & Year Header */}
          <div className={`${bgColor} text-black py-3 px-4 border-[1px] border-solid border-[#B9B9B9]`}>
            {section.month} {section.year}
          </div>
          
          {/* Timeline Items */}
          <div className="relative">
            {/* Vertical timeline line - runs through the entire section */}
            <div className="absolute left-[69px] top-0 bottom-0 w-[1px] ml-16 bg-[#FFFFFF] z-0 border-t border-r-0 border-b border-l border-solid border-[#B9B9B9]"></div>
            
            {section.items.map((item, itemIndex) => {
              const icon = getIcon(item.description);
              const cleanDescription = processDescription(item.description);
              // const isLastItem = itemIndex === section.items.length - 1 && 
              //                    sectionIndex === sections.length - 1;
              
              return (
                <div 
                  key={itemIndex} 
                  className="flex items-center relative border-solid border-[#B9B9B9] border-b-[1px] border-l-[1px]"
                >
                  {/* Date & Time Column with matching background color */}
                  <div className="text-center w-[135px] h-[50px] mr-2 bg-[#E9EDF5] p-2 inline-block border-r-[1px] border-solid border-[#B9B9B9]">
                    <div className="text-[#000000] font-medium">{item.date}</div>
                    <div className="text-[#000000] text-sm">{item.time}</div>
                  </div>

                  {/* Icon Column with background to cover the line */}
                  <div className="mx-6 mt-1 w-6 text-center z-10 bg-white rounded-full relative">
                    <div className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-white"></div>
                    <span className="relative z-10">{icon}</span>
                  </div>

                  {/* Description Column without emoji prefix */}
                  <div className="flex-1 text-gray-800 text-sm leading-relaxed">
                    {cleanDescription}
                  </div>

                  {/* Badge Column */}
                  {item.badge && (
                    <div 
                      className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                        item.badge.includes('+20') || item.badge.includes('+25') 
                          ? 'bg-[#FEF3C7] text-[#92400E]' 
                          : item.badge.includes('+12') || item.badge.includes('+5')
                          ? 'bg-[#E4EDFA] text-[#184574]'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {item.badge}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
