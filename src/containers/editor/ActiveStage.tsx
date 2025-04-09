// 'use client';
// import React, { useState } from 'react';
// import { Edit2, Trash2, ChevronDown, ChevronUp, RefreshCcw } from 'lucide-react';
// import {  IStage } from '@/interfaces/root.interface';
// import { RootInstance } from '@/services/root.service';
// import ColorPicker from '@/components/ColorPicker';

// interface StageProps {
//   className?: string;
//   // fullObject: Record<string, string | number | boolean | IEditStatus[]>;
//   fullObject:IStage | undefined;
//   setChange: (value: boolean | ((prev: boolean) => boolean)) => void;
// }

// export const ActiveStage: React.FC<StageProps> = ({ className,fullObject,setChange }) => {
  

//   // Deleted status items
  
//   const [showDeletedItems, setShowDeletedItems] = useState(false);
//   const [editingItem, setEditingItem] = useState<string>("");
//   const [isAddingNew, setIsAddingNew] = useState(false);
//   const [selectedColor, setSelectedColor] = useState<string>("");
//   const [stageName, setStageName] = useState<string>("");
//   const [bgColor,setBgColor] = useState<string>("");

//   const handleEditClick = async (itemId: string, color: string, title: string, bagColor:string) => {
      
//     setEditingItem(itemId);
//     setSelectedColor(color);
//     setStageName(title);
//     setIsAddingNew(false);
//     setBgColor(bagColor);
//   };


//   const handleColorChange = (colorValue: string) => {
//     setSelectedColor(colorValue);
//   };

//   const handleBgColorChange = (colorValue: string) => {
//     setBgColor(colorValue);
//   };

//   const handleCreateStatus = async () => {

//     console.log("isAddingNew",isAddingNew);

//     const id = isAddingNew ? Number(fullObject?.activeStatuses?.length) + 1 : editingItem;
//     const statusCreated = {
//       statusid:Number(id),
//       color:selectedColor,
//       label:stageName,
//       backgroundColor:bgColor
//     }
//     console.log("status feture",statusCreated);
//     await RootInstance.createStatus(statusCreated);
//     setChange(prev=>!prev);
//     closePopup();
//   }

//   const handleDeleteItem = async (stageId: string,statusId:string) => {
//     await RootInstance.deleteStatus({stageId,statusId});
//     setChange(prev => !prev);
//   };

//   const handleRestoreItem = async (stageId:string,statusId: string) => {
//     await RootInstance.restoreDeletedStatus({stageId,statusId});
//     setChange(prev => !prev);
//   };

//   const handleAddNew = () => {
//     setIsAddingNew(true);
//     setEditingItem("");
//     setSelectedColor("");
//     setStageName("");
//     setBgColor('');
//   };

//   const closePopup = () => {
//     setEditingItem("");
//     setIsAddingNew(false);
//   };

//   const toggleDeletedItems = () => {
//     setShowDeletedItems(!showDeletedItems);
//   };

//   return (
//     <div className={`flex flex-col w-full ${className}`}>
//       {/* Header styled to match the screenshot */}
//       <div className="bg-green-50 rounded-t-lg p-2 text-center font-medium border border-green-200 border-b-0">
//         Active stage
//       </div>
      
//       <div className="border border-gray-200 rounded-b-lg p-4">
//         {/* Centered "+ Add" button */}
//         <div className="flex items-center justify-center mb-4">
//           <div 
//             className="flex items-center justify-center w-full border border-gray-300 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-50"
//             onClick={handleAddNew}
//           >
//             <div className="text-black flex items-center justify-center">
//               <span>+ Add</span>
//             </div>
//           </div>
//         </div>
        
//         <div className="space-y-2 max-h-64 overflow-y-auto">
//           {Array.isArray(fullObject?.activeStatuses) &&fullObject?.activeStatuses?.map((item) => (
//             <div 
//               key={item.statusid} 
//               className={`flex items-center justify-between p-2 rounded-md relative`}
//               style={{ backgroundColor: item.backgroundColor,color:item.color }}
//             >
//               <div className="flex items-center space-x-2">
//                 {/* {item.icon} */}
//                 <span className="font-medium">{item.label}</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button 
//                   className="text-gray-500 hover:text-gray-700"
//                   onClick={() => handleEditClick(item.statusid.toLocaleString(), item.color, item.label,item.backgroundColor)}
//                 >
//                   <Edit2 size={16} />
//                 </button>
//                 <button 
//                   className="text-gray-500 hover:text-red-600"
//                   onClick={() => handleDeleteItem(fullObject?.stageid.toLocaleString(),item.statusid.toLocaleString())}
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* Deleted statuses section */}
//         <div className="mt-4">
//           <button 
//             className="flex items-center text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
//             onClick={toggleDeletedItems}
//           >
//             <span>Deleted statuses ({Array.isArray(fullObject?.archivedStatuses) &&fullObject?.archivedStatuses.length})</span>
//             {showDeletedItems ? (
//               <ChevronUp size={16} className="ml-1" />
//             ) : (
//               <ChevronDown size={16} className="ml-1" />
//             )}
//           </button>
          
//           {/* Deleted items list */}
//           {showDeletedItems && (
//             <div className="mt-2 space-y-2 border-t border-gray-200 pt-2 max-h-64 overflow-y-auto">
             
//               {Array.isArray(fullObject?.archivedStatuses) &&fullObject?.archivedStatuses.map((item) => (
//                 <div 
//                   key={item.statusid} 
//                   className="flex items-center justify-between p-2 rounded-md relative opacity-70"
//                   style={{ backgroundColor: item.color }} // ✅ Apply background color here
//                 >
//                   <div className="flex items-center space-x-2">
//                     {/* {item.icon} */}
//                     <span className="font-medium">{item.label}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <button 
//                       className="text-gray-500 hover:text-green-600"
//                       onClick={() => handleRestoreItem(fullObject?.stageid.toLocaleString(),item.statusid.toLocaleString())}
//                       title="Restore"
//                     >
//                       <RefreshCcw size={16} />
//                     </button>
//                   </div>
//                 </div>
//               ))}

//             </div>
//           )}
//         </div>
//       </div>

//       {/* Edit/Add popup */}
//       {(editingItem !== "" || isAddingNew) && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
//             <h3 className="text-lg font-semibold mb-4">
//               {isAddingNew ? "Add New Stage" : "Edit Stage"}
//             </h3>
            
//             {/* Stage Name input field (now shown for both edit and add) */}
//             <div className="mb-4">
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
            
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Color
//             </label>
//             <div className="grid grid-cols-4 gap-2 mb-6">              
//               {/* <ColorPicker onChange={handleColorChange} /> */}
//               <ColorPicker
//                 onChange={handleColorChange}
//                 {...(!isAddingNew && { color: selectedColor })}
//               />
//             </div>

//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Background Color
//             </label>
//             <div className="grid grid-cols-4 gap-2 mb-6">              
//               {/* <ColorPicker onChange={handleBgColorChange} /> */}
//               <ColorPicker
//                 onChange={handleBgColorChange}
//                 {...(!isAddingNew && { color: bgColor })}
//               />
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
//                 onClick={handleCreateStatus}
//                 disabled={stageName.trim() === ""}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

'use client';
import React, { useState } from 'react';
import { Edit2, Trash2, ChevronDown, ChevronUp, RefreshCcw } from 'lucide-react';
import { IStage } from '@/interfaces/root.interface';
import { RootInstance } from '@/services/root.service';
import ColorPicker from '@/components/ColorPicker';
import { toast } from 'react-hot-toast';
import { handleError } from '@/utils/helpers';
import { AxiosError } from 'axios';

interface StageProps {
  className?: string;
  fullObject: IStage | undefined;
  setChange: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const ActiveStage: React.FC<StageProps> = ({ className, fullObject, setChange }) => {
  const [showDeletedItems, setShowDeletedItems] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [stageName, setStageName] = useState('');
  const [textColor, setTextColor] = useState('');
  const [bgColor, setBgColor] = useState('');

  const resetForm = () => {
    setEditingItemId(null);
    setIsAddingNew(false);
    setStageName('');
    setTextColor('');
    setBgColor('');
  };

  const handleEditClick = (itemId: string, color: string, label: string, background: string) => {
    setEditingItemId(itemId);
    setIsAddingNew(false);
    setStageName(label);
    setTextColor(color);
    setBgColor(background);
  };

  const handleAddNew = () => {
    resetForm();
    setIsAddingNew(true);
  };

  // const handleSave = async () => {
  //   const payload = {
  //     ...(editingItemId && { statusid: Number(editingItemId) }), // Only include ID if editing
  //     color: textColor,
  //     label: stageName,
  //     backgroundColor: bgColor,
  //   };

  //   await RootInstance.createStatus(payload);
  //   setChange(prev => !prev);
  //   resetForm();
  // };

  const handleSave = async () => {
    const payload = {
      ...(editingItemId && { statusid: Number(editingItemId) }),
      color: textColor,
      label: stageName,
      backgroundColor: bgColor,
    };

    try {
      await toast.promise(
        RootInstance.createStatus(payload),
        {
          loading: editingItemId ? 'Updating status...' : 'Creating status...',
          success: editingItemId ? 'Status updated successfully!' : 'Status created successfully!',
          error: 'Failed to save status!',
        }
      );

      setChange(prev => !prev);
      resetForm();
    } catch (error) {
      handleError(error as AxiosError, true);
    }
  }


  // const handleDelete = async (stageId: string, statusId: string) => {
  //   await RootInstance.deleteStatus({ stageId, statusId });
  //   setChange(prev => !prev);
  // };

  // const handleRestore = async (stageId: string, statusId: string) => {
  //   await RootInstance.restoreDeletedStatus({ stageId, statusId });
  //   setChange(prev => !prev);
  // };
  const handleDelete = async (stageId: string, statusId: string) => {
    try {
      await toast.promise(
        RootInstance.deleteStatus({ stageId, statusId }),
        {
          loading: 'Deleting status...',
          success: 'Status deleted successfully!',
          error: 'Failed to delete status!',
        }
      );

      setChange(prev => !prev);
    } catch (error) {
      handleError(error as AxiosError, true);
    }
  };

  const handleRestore = async (stageId: string, statusId: string) => {
    try {
      await toast.promise(
        RootInstance.restoreDeletedStatus({ stageId, statusId }),
        {
          loading: 'Restoring status...',
          success: 'Status restored successfully!',
          error: 'Failed to restore status!',
        }
      );

      setChange(prev => !prev);
    } catch (error) {
      handleError(error as AxiosError, true);
    }
  };



  const toggleDeletedItems = () => setShowDeletedItems(prev => !prev);

  const stageId = fullObject?.stageid?.toString() || '';

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="bg-green-50 rounded-t-lg p-2 text-center font-medium border border-green-200 border-b-0">
        Active stage
      </div>

      <div className="border border-gray-200 rounded-b-lg p-4">
        {/* + Add Button */}
        <div className="flex justify-center mb-4">
          <button
            className="w-full border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50"
            onClick={handleAddNew}
          >
            + Add
          </button>
        </div>

        {/* Active Statuses */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {fullObject?.activeStatuses?.map(item => (
            <div
              key={item.statusid}
              className="flex items-center justify-between p-2 rounded-md"
              style={{ backgroundColor: item.backgroundColor, color: item.color }}
            >
              <span className="font-medium">{item.label}</span>
              <div className="flex items-center space-x-2">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => handleEditClick(item?.statusid?.toString()!, item.color, item.label, item.backgroundColor)}
                >
                  <Edit2 size={16} />
                </button>
                <button
                  className="text-gray-500 hover:text-red-600"
                  onClick={() => handleDelete(stageId, item?.statusid?.toString()!)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Deleted Statuses Toggle */}
        <div className="mt-4">
          <button
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            onClick={toggleDeletedItems}
          >
            <span>
              Deleted statuses ({fullObject?.archivedStatuses?.length || 0})
            </span>
            {showDeletedItems ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
          </button>

          {/* Archived Statuses */}
          {showDeletedItems && (
            <div className="mt-2 border-t border-gray-200 pt-2 space-y-2 max-h-64 overflow-y-auto">
              {fullObject?.archivedStatuses?.map(item => (
                <div
                  key={item.statusid}
                  className="flex items-center justify-between p-2 rounded-md opacity-70"
                  style={{ backgroundColor: item.color }}
                >
                  <span className="font-medium">{item.label}</span>
                  <button
                    className="text-gray-500 hover:text-green-600"
                    onClick={() => handleRestore(stageId, item?.statusid?.toString()!)}
                    title="Restore"
                  >
                    <RefreshCcw size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit/Add Modal */}
      {(isAddingNew || editingItemId) && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {isAddingNew ? 'Add New Stage' : 'Edit Stage'}
            </h3>

            {/* Stage Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Stage Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={stageName}
                onChange={e => setStageName(e.target.value)}
                placeholder="Enter stage name"
              />
            </div>

            {/* Color Pickers */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Color</label>
              <ColorPicker onChange={setTextColor} color={textColor} />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Background Color</label>
              <ColorPicker onChange={setBgColor} color={bgColor} />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300" onClick={resetForm}>
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                onClick={handleSave}
                disabled={!stageName.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
