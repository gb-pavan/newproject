// 'use client';
// import React, { useState } from 'react';
// import { Edit2, MoreVertical } from 'lucide-react';
// import { IStage } from '@/interfaces/root.interface';
// import ColorPicker from '@/components/ColorPicker';
// import { RootInstance } from '@/services/root.service';

// interface StageProps {
//   className?: string;
//   initial: IStage | undefined;
//   setChange: (value: boolean | ((prev: boolean) => boolean)) => void;
// }

// export const InitialStage: React.FC<StageProps> = ({ className, initial, setChange }) => {
//   console.log("initial object",initial);
//   const [isEditing, setIsEditing] = useState(false);
//   const [stageName, setStageName] = useState<string>("");
//   const [stageColor, setStageColor] = useState<string>("");
//   const [stageId,setStageId] = useState<string>("");


//   const handleEditClick = (id:string,color:string,label:string) => {
//     console.log("iniiiicolros",id,color,label);
//     setIsEditing(true);
//     setStageName(label);
//     setStageColor(color);
//     setStageId(id);
//     // setSelectedColor(fullObject?.initialStatus?.color || '');
//     // setStageName(fullObject?.initialStatus?.label || '');
//   };

//   const handleColorChange = (colorValue: string) => {
//     // setSelectedColor(colorValue);
//     setStageColor(colorValue);
//   };

//   const closePopup = () => {
//     setIsEditing(false);
//   };

//   const handleSave = async () => {
//     const payload = {
//       statusid : stageId,
//       label:stageName,
//       color:stageColor
//     };
//     console.log("initial stage",payload);
//     await RootInstance.editInitialStatus(payload);
//     setChange(prev => !prev);
//     closePopup();
//   };

//   return (
//     <div className={`flex flex-col w-full ${className}`}>
//       <div className="bg-gray-50 rounded-t-lg p-2 text-center font-medium">
//         Initial stage
//       </div>

//       <div className="border border-gray-200 rounded-b-lg p-4">
       
//         <div className="space-y-2">
//           {Array.isArray(initial?.activeStatuses) && initial?.activeStatuses?.map((item) => (
//             <div 
//               key={item.statusid} 
//               className={`flex items-center justify-between p-2 rounded-md relative`}
//               style={{ backgroundColor: item.color }}
//             >
//               <div className="flex items-center space-x-2">
//                 {/* {item.icon} */}
//                 <span className="font-medium">{item.label}</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button 
//                   className="text-gray-500 hover:text-gray-700"
//                   onClick={() => handleEditClick(item.statusid.toLocaleString(), item.color, item.label)}
//                 >
//                   <Edit2 size={16} />
//                 </button>
                
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
      

//       {/* Edit Popup */}
//       {isEditing && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
//             <h3 className="text-lg font-semibold mb-4">Edit Initial Stage</h3>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Stage Name</label>
//               {/* <input
//                 type="text"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={stageName}
//                 onChange={(e) => setStageName(e.target.value)}
//                 placeholder="Enter stage name"
//               /> */}
//             </div>

//             <label className="block text-sm font-medium text-gray-700 mb-2">Select Color</label>
//             <div className="grid grid-cols-4 gap-2 mb-6">
//               <ColorPicker onChange={handleColorChange} />
//             </div>

//             <div className="flex justify-end space-x-2">
//               <button
//                 className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
//                 onClick={closePopup}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                 onClick={handleSave}
//                 // disabled={stageName.trim() === ''}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {isEditing && (
//   <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//     <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
//       <h3 className="text-xl font-medium text-gray-900 mb-6">Edit Status</h3>

//       {/* <div className="mb-4">
//         <p className="text-gray-800 text-base">
//           Prospects <span className="text-gray-400 float-right">31</span>
//         </p>
//         <hr className="mt-2" />
//       </div> */}
//        <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Stage Name
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={stageName}
//                 onChange={(e) => setStageName(e.target.value)}
//                 placeholder="Enter stage name"
//               />
//             </div>

//       <div className="mb-2">
//         <label className="block text-sm font-medium text-gray-700 mb-2">Choose Color</label>
//         <ColorPicker onChange={handleColorChange} />
//       </div>
//       <p className='text-center'>Selected Color : {stageColor}</p>

//       <div className="flex justify-end space-x-3">
//         <button
//           className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
//           onClick={closePopup}
//         >
//           Cancel
//         </button>
//         <button
//           // className={`px-4 py-2 text-sm rounded-md ${
//           //   isDisabled ? 'bg-purple-200 text-white' : 'bg-purple-500 text-white hover:bg-purple-600'
//           // }`}
//           onClick={handleSave}
//           // disabled={isDisabled}
//         >
//           Proceed
//         </button>
//       </div>
//     </div>
//   </div>
// )}

     

//     </div>
//   );
// };

'use client';
import React, { useState } from 'react';
// import { Edit2, Trash2, RefreshCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { Edit2 } from 'lucide-react';

import { IEditStatus, IStage } from '@/interfaces/root.interface';
import ColorPicker from '@/components/ColorPicker';
import { RootInstance } from '@/services/root.service';

interface StageProps {
  className?: string;
  initial: IStage | undefined;
  setChange: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const InitialStage: React.FC<StageProps> = ({ className, initial, setChange }) => {
  console.log("initial",initial);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [stageName, setStageName] = useState<string>("");
  const [stageColor, setStageColor] = useState<string>("");
  const [stageId, setStageId] = useState<string>("");
  const [bgColor,setBgColor] = useState<string>("");
  // const [showDeletedItems, setShowDeletedItems] = useState(false);

  const handleEditClick = (id: string, color: string, label: string,bagColor:string) => {
    setIsEditing(true);
    setStageName(label);
    setStageColor(color);
    setStageId(id);
    setIsAddingNew(false);
    setBgColor(bagColor);
  };

  // const handleAddNew = () => {
  //   setIsEditing(true);
  //   setIsAddingNew(true);
  //   setStageName('');
  //   setStageColor('');
  //   setStageId('');
  // };

  const handleColorChange = (colorValue: string) => {
    setStageColor(colorValue);
  };

  const handleBgColorChange = (bgColorValue: string) => {
    setBgColor(bgColorValue);
  };

  const handleSave = async () => {
    const payload:IEditStatus = {
      statusid: isAddingNew
        ? (Number(initial?.activeStatuses?.length ?? 0) + 1)
        : Number(stageId),
      label: stageName,
      color: stageColor,
      backgroundColor:bgColor
    };
    console.log("check edit",payload);
    await RootInstance.createInitialStatus(payload);
    setChange((prev) => !prev);
    closePopup();
  };

  // const handleDelete = async (statusId: string) => {
  //   await RootInstance.deleteInitialStatus({
  //     stageId: initial?.stageid.toString() || '',
  //     statusId,
  //   });
  //   setChange((prev) => !prev);
  // };

  // const handleRestore = async (statusId: string) => {
  //   await RootInstance.restoreDeletedInitialStatus({
  //     stageId: initial?.stageid.toString() || '',
  //     statusId,
  //   });
  //   setChange((prev) => !prev);
  // };

  // const toggleDeletedItems = () => {
  //   setShowDeletedItems(!showDeletedItems);
  // };

  const closePopup = () => {
    setIsEditing(false);
    setIsAddingNew(false);
    setStageName('');
    setStageColor('');
    setStageId('');
    setBgColor('');
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="bg-gray-50 rounded-t-lg p-2 text-center font-medium border border-gray-200 border-b-0">
        Initial stage
      </div>

      <div className="border border-gray-200 rounded-b-lg p-4">
        {/* <div className="flex items-center justify-center mb-4">
          <div
            className="flex items-center justify-center w-full border border-gray-300 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-50"
            onClick={handleAddNew}
          >
            <span className="text-black">+ Add</span>
          </div>
        </div> */}

        <div className="space-y-2">
          {Array.isArray(initial?.activeStatuses) &&
            initial?.activeStatuses.map((item) => (
              <div
                key={item.statusid}
                className="flex items-center justify-between p-2 rounded-md"
                style={{ backgroundColor: item.backgroundColor, color: item.color  }}
              >
                <span className="font-medium">{item.label}</span>
                <div className="flex items-center space-x-2">
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() =>
                      handleEditClick(
                        item.statusid.toString(),
                        item.color,
                        item.label,
                        item.backgroundColor
                      )
                    }
                  >
                    <Edit2 size={16} />
                  </button>
                  {/* <button
                    className="text-gray-600 hover:text-red-600"
                    onClick={() => handleDelete(item.statusid.toString())}
                  >
                    <Trash2 size={16} />
                  </button> */}
                </div>
              </div>
            ))}
        </div>

        {/* Deleted statuses */}
        {/* <div className="mt-4">
          <button
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            onClick={toggleDeletedItems}
          >
            <span>
              Deleted statuses (
              {initial?.archivedStatuses?.length ?? 0})
            </span>
            {showDeletedItems ? (
              <ChevronUp size={16} className="ml-1" />
            ) : (
              <ChevronDown size={16} className="ml-1" />
            )}
          </button>

          {showDeletedItems && (
            <div className="mt-2 space-y-2 border-t border-gray-200 pt-2">
              {initial?.archivedStatuses?.map((item) => (
                <div
                  key={item.statusid}
                  className="flex items-center justify-between p-2 rounded-md opacity-70"
                  style={{ backgroundColor: item.color }}
                >
                  <span className="font-medium">{item.label}</span>
                  <button
                    className="text-gray-500 hover:text-green-600"
                    onClick={() => handleRestore(item.statusid.toString())}
                    title="Restore"
                  >
                    <RefreshCcw size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div> */}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
            <h3 className="text-xl font-medium text-gray-900 mb-6">
              {isAddingNew ? 'Add Initial Stage' : 'Edit Initial Stage'}
            </h3>

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

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Background Color
              </label>
              <ColorPicker onChange={handleBgColorChange} />
              <p className="text-center mt-2 text-sm">Selected Color: {bgColor}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Color
              </label>
              <ColorPicker onChange={handleColorChange} />
              <p className="text-center mt-2 text-sm">Selected Color: {stageColor}</p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                onClick={closePopup}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                onClick={handleSave}
                disabled={stageName.trim() === ''}
              >
                {isAddingNew ? 'Create' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

