// 'use client';
// import React from 'react';
// import { Edit2, MoreVertical, Plus } from 'lucide-react';
// import { IStage } from '@/interfaces/root.interface';

// interface StageProps {
//   className?: string;
//   won: IStage | undefined;
//   lost: IStage | undefined;
// }

// export const ClosedStage: React.FC<StageProps> = ({ className,won,lost }) => {
//   console.log("won,lost",won,lost);
//   const wonItems = [
//     { id: '1', title: 'Enrolled', color: 'bg-green-100' }
//   ];

//   const lostItems = [
//     { id: '1', title: 'Not Enrolled', color: 'bg-red-100' }
//   ];

//   const lostReasons = [
//     { id: '1', title: 'Negative Science Class Feedback' },
//     { id: '2', title: 'Negative English Class Feedback' },
//     { id: '3', title: 'Negative Maths Class Feedback' },
//     { id: '4', title: 'Negative Feedback for Classes' },
//     { id: '5', title: 'Positive Feedback but Enroll in Next Session' },
//     { id: '6', title: 'Board Not Available' },
//     { id: '7', title: 'Lost to competitor' },
//     { id: '8', title: 'Unknown Reason' },
//     { id: '9', title: 'Budget Issues' },
//     { id: '10', title: 'Negative SST Class Feedback' }
//   ];

//   return (
//     <div className={`flex flex-col w-full ${className}`}>
//       <div className="bg-gray-50 rounded-t-lg p-2 text-center font-medium">
//         Closed stage
//       </div>
//       <div className="border border-gray-200 rounded-b-lg p-4 space-y-4">
//         {/* Won section */}
//         <div className="bg-green-100 rounded-md p-2 font-medium">
//           Won
//         </div>
        
//         <div className="space-y-2 pl-2">
//           {wonItems.map((item) => (
//             <div 
//               key={item.id} 
//               className={`${item.color} flex items-center justify-between p-2 rounded-md`}
//             >
//               <div className="flex items-center">
//                 <span className="font-medium">{item.title}</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button className="text-gray-500 hover:text-gray-700">
//                   <Edit2 size={16} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Lost section */}
//         <div className="bg-red-100 rounded-md p-2 font-medium">
//           Lost
//         </div>
        
//         <div className="space-y-2 pl-2">
//           {lostItems.map((item) => (
//             <div 
//               key={item.id} 
//               className={`${item.color} flex items-center justify-between p-2 rounded-md`}
//             >
//               <div className="flex items-center">
//                 <span className="font-medium">{item.title}</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button className="text-gray-500 hover:text-gray-700">
//                   <Edit2 size={16} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Reason for Lost leads */}
//         <div className="pt-2">
//           <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
//             <span>Reason for Lost leads (13/25)</span>
//             <button className="text-gray-500 hover:text-gray-700">
//               <Plus size={16} />
//             </button>
//           </div>
          
//           <div className="space-y-2">
//             {lostReasons.map((reason) => (
//               <div 
//                 key={reason.id} 
//                 className="flex items-center justify-between p-2 border-b border-gray-100"
//               >
//                 <div className="flex items-center">
//                   <span className="text-sm">{reason.title}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button className="text-gray-500 hover:text-gray-700">
//                     <Edit2 size={14} />
//                   </button>
//                   <button className="text-gray-500 hover:text-gray-700">
//                     <MoreVertical size={14} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

'use client';
import React, { useState } from 'react';
import { Edit2, MoreVertical, Plus } from 'lucide-react';
import ColorPicker from '@/components/ColorPicker';
import { RootInstance } from '@/services/root.service';
import { IStage } from '@/interfaces/root.interface';

interface StageProps {
  className?: string;
  won: IStage | undefined;
  lost: IStage | undefined;
}

export const ClosedStage: React.FC<StageProps> = ({ className, won, lost }) => {
  console.log("won lost",won?.activeStatuses);
  const [isEditing, setIsEditing] = useState(false);
  const [stageName, setStageName] = useState('');
  const [stageColor, setStageColor] = useState('');
  const [stageId, setStageId] = useState('');
  const [currentType, setCurrentType] = useState<'won' | 'lost' | null>(null);

  const handleEditClick = (id: string, color: string, label: string, type: 'won' | 'lost') => {
    setIsEditing(true);
    setStageName(label);
    setStageColor(color);
    setStageId(id);
    setCurrentType(type);
  };

  const handleColorChange = (color: string) => {
    setStageColor(color);
  };

  const closePopup = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    const payload = {
      statusid: stageId,
      label: stageName,
      color: stageColor,
      type: currentType,
    };
    console.log('closed stage update', payload);
    await RootInstance.editInitialStatus(payload); // Adjust if separate API needed
    closePopup();
  };

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
    { id: '10', title: 'Negative SST Class Feedback' },
  ];

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="bg-gray-50 rounded-t-lg p-2 text-center font-medium">Closed stage</div>

      <div className="border border-green-400 rounded-lg bg-green-50 p-4 space-y-3 m-2">
        {/* Won Section Header */}
        <div className="text-green-700 font-semibold">Won</div>

        {/* Active Statuses */}
        <div className="space-y-2">
          {Array.isArray(won?.activeStatuses) && won?.activeStatuses.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between px-3 py-2 rounded-md"
              style={{ backgroundColor: item.color || '#bbf7d0' }} // fallback if color is undefined
            >
              <span className="text-sm text-gray-800">{item.label}</span>
              <button onClick={() => handleEditClick(item._id!, item.color, item.label, 'won')}>
                <Edit2 size={14} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-green-400 rounded-lg bg-green-50 p-4 space-y-3 m-2">
        {/* Won Section Header */}
        <div className="text-green-700 font-semibold">Lost</div>

        {/* Active Statuses */}
        <div className="space-y-2">
          {Array.isArray(lost?.activeStatuses) && lost?.activeStatuses.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between px-3 py-2 rounded-md"
              style={{ backgroundColor: item.color || '#bbf7d0' }} // fallback if color is undefined
            >
              <span className="text-sm text-gray-800">{item.label}</span>
              <button onClick={() => handleEditClick(item._id!, item.color, item.label, 'lost')}>
                <Edit2 size={14} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>
          ))}
        </div>
      </div>


      {/* Edit Popup */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
            <h3 className="text-xl font-medium text-gray-900 mb-6">Edit {currentType === 'won' ? 'Won' : 'Lost'} Status</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Stage Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={stageName}
                onChange={(e) => setStageName(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Choose Color</label>
              <ColorPicker onChange={handleColorChange} />
            </div>
            <p className="text-center">Selected Color: {stageColor}</p>

            <div className="flex justify-end space-x-3 pt-4">
              <button onClick={closePopup} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
