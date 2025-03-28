'use client';
import React from 'react';
import { Edit2, MoreVertical } from 'lucide-react';

interface StageProps {
  className?: string;
}

export const InitialStage: React.FC<StageProps> = ({ className }) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="bg-gray-50 rounded-t-lg p-2 text-center font-medium">
        Initial stage
      </div>
      <div className="border border-gray-200 rounded-b-lg p-4">
        <div className="space-y-2">
          <div className="bg-gray-100 flex items-center justify-between p-2 rounded-md">
            <div className="flex items-center">
              <span className="font-medium">Default</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-500 hover:text-gray-700">
                <Edit2 size={16} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};