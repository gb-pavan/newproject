'use client';
import React from 'react';
import { Edit2, MoreVertical, Plus } from 'lucide-react';

interface StageProps {
  className?: string;
}

export const ClosedStage: React.FC<StageProps> = ({ className }) => {
  const wonItems = [
    { id: '1', title: 'Enrolled', color: 'bg-green-100' }
  ];

  const lostItems = [
    { id: '1', title: 'Not Enrolled', color: 'bg-red-100' }
  ];

  const lostReasons = [
    { id: '1', title: 'Negative Science Class Feedback' },
    { id: '2', title: 'Negative English Class Feedback' },
    { id: '3', title: 'Negative Maths Class Feedback' },
    { id: '4', title: 'Negative Feedback for Classes' },
    { id: '5', title: 'Positive Feedback but Enroll in Next Session' },
    { id: '6', title: 'Board Not Available' },
    { id: '7', title: 'Lost to competitor' },
    { id: '8', title: 'Unknown Reason' },
    { id: '9', title: 'Budget Issues' },
    { id: '10', title: 'Negative SST Class Feedback' }
  ];

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="bg-gray-50 rounded-t-lg p-2 text-center font-medium">
        Closed stage
      </div>
      <div className="border border-gray-200 rounded-b-lg p-4 space-y-4">
        {/* Won section */}
        <div className="bg-green-100 rounded-md p-2 font-medium">
          Won
        </div>
        
        <div className="space-y-2 pl-2">
          {wonItems.map((item) => (
            <div 
              key={item.id} 
              className={`${item.color} flex items-center justify-between p-2 rounded-md`}
            >
              <div className="flex items-center">
                <span className="font-medium">{item.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <Edit2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Lost section */}
        <div className="bg-red-100 rounded-md p-2 font-medium">
          Lost
        </div>
        
        <div className="space-y-2 pl-2">
          {lostItems.map((item) => (
            <div 
              key={item.id} 
              className={`${item.color} flex items-center justify-between p-2 rounded-md`}
            >
              <div className="flex items-center">
                <span className="font-medium">{item.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <Edit2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reason for Lost leads */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Reason for Lost leads (13/25)</span>
            <button className="text-gray-500 hover:text-gray-700">
              <Plus size={16} />
            </button>
          </div>
          
          <div className="space-y-2">
            {lostReasons.map((reason) => (
              <div 
                key={reason.id} 
                className="flex items-center justify-between p-2 border-b border-gray-100"
              >
                <div className="flex items-center">
                  <span className="text-sm">{reason.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <Edit2 size={14} />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <MoreVertical size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};