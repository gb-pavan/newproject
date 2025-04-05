// 'use client';
// import React from 'react';
// import { Edit2, MoreVertical } from 'lucide-react';
// import { IStage } from '@/interfaces/root.interface';

// interface StageProps {
//   className?: string;
//   initial: IStage | undefined;
// }

// export const InitialStage: React.FC<StageProps> = ({ className }) => {
//   return (
//     <div className={`flex flex-col w-full ${className}`}>
//       <div className="bg-gray-50 rounded-t-lg p-2 text-center font-medium">
//         Initial stage
//       </div>
//       <div className="border border-gray-200 rounded-b-lg p-4">
//         <div className="space-y-2">
//           <div className="bg-gray-100 flex items-center justify-between p-2 rounded-md">
//             <div className="flex items-center">
//               <span className="font-medium">Default</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <button className="text-gray-500 hover:text-gray-700">
//                 <Edit2 size={16} />
//               </button>
//               <button className="text-gray-500 hover:text-gray-700">
//                 <MoreVertical size={16} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

'use client';
import React, { useState } from 'react';
import { Edit2, MoreVertical } from 'lucide-react';
import { IStage } from '@/interfaces/root.interface';
import ColorPicker from '@/components/ColorPicker';
import { RootInstance } from '@/services/root.service';

interface StageProps {
  className?: string;
  initial: IStage | undefined;
  setChange: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const InitialStage: React.FC<StageProps> = ({ className, initial, setChange }) => {
  console.log("initial object",initial);
  const [isEditing, setIsEditing] = useState(false);
  const [stageName, setStageName] = useState<string>("");
  const [stageColor, setStageColor] = useState<string>("");
  const [stageId,setStageId] = useState<string>("");
  // const [selectedColor, setSelectedColor] = useState<string>(fullObject?.initialStatus?.color || '');
  // const [stageName, setStageName] = useState<string>(fullObject?.initialStatus?.label || '');

  const handleEditClick = (id:string,color:string,label:string) => {
    console.log("iniiiicolros",id,color,label);
    setIsEditing(true);
    setStageName(label);
    setStageColor(color);
    setStageId(id);
    // setSelectedColor(fullObject?.initialStatus?.color || '');
    // setStageName(fullObject?.initialStatus?.label || '');
  };

  const handleColorChange = (colorValue: string) => {
    // setSelectedColor(colorValue);
    setStageColor(colorValue);
  };

  const closePopup = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    const payload = {
      // stageId: fullObject?.stageid.toString(),
      // statusId: fullObject?.initialStatus?.statusid.toString(),
      // label: stageName,
      // color: selectedColor,
      statusid : stageId,
      label:stageName,
      color:stageColor
    };
    console.log("initial stage",payload);
    await RootInstance.editInitialStatus(payload);

    // await RootInstance.updateStatus(payload);
    setChange(prev => !prev);
    closePopup();
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="bg-gray-50 rounded-t-lg p-2 text-center font-medium">
        Initial stage
      </div>

      <div className="border border-gray-200 rounded-b-lg p-4">
       
        <div className="space-y-2">
          {Array.isArray(initial?.activeStatuses) && initial?.activeStatuses?.map((item) => (
            <div 
              key={item.statusid} 
              className={`flex items-center justify-between p-2 rounded-md relative`}
              style={{ backgroundColor: item.color }}
            >
              <div className="flex items-center space-x-2">
                {/* {item.icon} */}
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => handleEditClick(item.statusid.toLocaleString(), item.color, item.label)}
                >
                  <Edit2 size={16} />
                </button>
                
              </div>
            </div>
          ))}
        </div>
      </div>
      

      {/* Edit Popup */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Initial Stage</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Stage Name</label>
              {/* <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={stageName}
                onChange={(e) => setStageName(e.target.value)}
                placeholder="Enter stage name"
              /> */}
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-2">Select Color</label>
            <div className="grid grid-cols-4 gap-2 mb-6">
              <ColorPicker onChange={handleColorChange} />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={closePopup}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleSave}
                // disabled={stageName.trim() === ''}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditing && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
      <h3 className="text-xl font-medium text-gray-900 mb-6">Edit Status</h3>

      {/* <div className="mb-4">
        <p className="text-gray-800 text-base">
          Prospects <span className="text-gray-400 float-right">31</span>
        </p>
        <hr className="mt-2" />
      </div> */}
       <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stage Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={stageName}
                onChange={(e) => setStageName(e.target.value)}
                placeholder="Enter stage name"
              />
            </div>

      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Choose Color</label>
        <ColorPicker onChange={handleColorChange} />
      </div>
      <p className='text-center'>Selected Color : {stageColor}</p>

      <div className="flex justify-end space-x-3">
        <button
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          onClick={closePopup}
        >
          Cancel
        </button>
        <button
          // className={`px-4 py-2 text-sm rounded-md ${
          //   isDisabled ? 'bg-purple-200 text-white' : 'bg-purple-500 text-white hover:bg-purple-600'
          // }`}
          onClick={handleSave}
          // disabled={isDisabled}
        >
          Proceed
        </button>
      </div>
    </div>
  </div>
)}

     

    </div>
  );
};
