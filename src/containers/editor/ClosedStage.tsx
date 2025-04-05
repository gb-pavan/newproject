// 'use client';
// import React, { useState } from 'react';
// import { Edit2, Trash2, RotateCw } from 'lucide-react';
// import ColorPicker from '@/components/ColorPicker';
// import { RootInstance } from '@/services/root.service';
// import { IStage } from '@/interfaces/root.interface';

// interface StageProps {
//   className?: string;
//   won: IStage | undefined;
//   lost: IStage | undefined;
// }

// export const ClosedStage: React.FC<StageProps> = ({ className, won, lost }) => {
//       console.log("wonnnn lost",won,lost);

//   const [isEditing, setIsEditing] = useState(false);
//   const [stageName, setStageName] = useState('');
//   const [stageColor, setStageColor] = useState('');
//   const [stageId, setStageId] = useState('');
//   const [currentType, setCurrentType] = useState<'won' | 'lost' | null>(null);

//   const handleEditClick = (id: string, color: string, label: string, type: 'won' | 'lost') => {

//     setIsEditing(true);
//     setStageName(label);
//     setStageColor(color);
//     setStageId(id);
//     setCurrentType(type);
//   };

//   const handleColorChange = (color: string) => {
//     setStageColor(color);
//   };

//   const closePopup = () => {
//     setIsEditing(false);
//   };

//   const handleSave = async () => {
//     const payload = {
//       statusid: stageId,
//       label: stageName,
//       color: stageColor,
//       type: currentType,
//     };
//     await RootInstance.editInitialStatus(payload);
//     closePopup();
//   };

//   const handleDelete = async (id: string, type: 'won' | 'lost') => {
//         console.log("won schekgininid,typeg del ",id,type);
//         if (type === 'won'){
//           await RootInstance.deleteInitialStatus({ stageId:'stage_won', statusId:id });
//         } else if(type === 'lost'){
//           await RootInstance.deleteInitialStatus({ stageId:'stage_lost', statusId:id });
//         }
//   };

//   const handleRestore = async (id: string, type: 'won' | 'lost') => {
//     // await RootInstance.restoreDeletedInitialStatus({ statusid: id, type });
//     console.log("won schekgininid,typeg restore",id,type);
//     // await RootInstance.restoreDeletedInitialStatus({
//     //   stageId: initial?.stageid.toString() || '',
//     //   statusId,
//     // });
//   };

//   const renderStatusList = (
//     items: IStage['activeStatuses'] | undefined,
//     type: 'won' | 'lost'
//   ) => {
//     if (!Array.isArray(items)) return null;

//     return items.map((item) => {
//       const isDeleted = item.deleted === true;

//       return (
//         <div
//           key={item._id}
//           className={`flex items-center justify-between px-3 py-2 rounded-md ${
//             isDeleted ? 'bg-gray-200 opacity-70' : ''
//           }`}
//           style={{ backgroundColor: !isDeleted ? item.color || '#bbf7d0' : '' }}
//         >
//           <span className={`text-sm ${isDeleted ? 'line-through text-gray-600' : 'text-gray-800'}`}>
//             {item.label}
//           </span>
//           <div className="flex gap-2">
//             {!isDeleted && (
//               <>
//                 <button onClick={() => handleEditClick(item._id!, item.color, item.label, type)}>
//                   <Edit2 size={14} className="text-gray-500 hover:text-gray-700" />
//                 </button>
//                 <button onClick={() => handleDelete(item.statusid.toLocaleString(), type)}>
//                   <Trash2 size={14} className="text-red-500 hover:text-red-700" />
//                 </button>
//               </>
//             )}
//             {isDeleted && (
//               <button onClick={() => handleRestore(item._id!, type)}>
//                 <RotateCw size={14} className="text-green-600 hover:text-green-800" />
//               </button>
//             )}
//           </div>
//         </div>
//       );
//     });
//   };

//   return (
//     <div className={`flex flex-col w-full ${className}`}>
//       <div className="bg-gray-50 rounded-t-lg p-2 text-center font-medium">Closed stage</div>

//       {/* WON Section */}
//       <div className="border border-green-400 rounded-lg bg-green-50 p-4 space-y-3 m-2">
//         <div className="text-green-700 font-semibold">Won</div>
//         <div className="space-y-2">{renderStatusList(won?.activeStatuses, 'won')}</div>
//       </div>

//       {/* LOST Section */}
//       <div className="border border-green-400 rounded-lg bg-green-50 p-4 space-y-3 m-2">
//         <div className="text-green-700 font-semibold">Lost</div>
//         <div className="space-y-2">{renderStatusList(lost?.activeStatuses, 'lost')}</div>
//       </div>

//       {/* Edit Popup */}
//       {isEditing && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
//             <h3 className="text-xl font-medium text-gray-900 mb-6">Edit {currentType === 'won' ? 'Won' : 'Lost'} Status</h3>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Stage Name</label>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={stageName}
//                 onChange={(e) => setStageName(e.target.value)}
//               />
//             </div>

//             <div className="mb-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Choose Color</label>
//               <ColorPicker onChange={handleColorChange} />
//             </div>
//             <p className="text-center">Selected Color: {stageColor}</p>

//             <div className="flex justify-end space-x-3 pt-4">
//               <button onClick={closePopup} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
//                 Cancel
//               </button>
//               <button onClick={handleSave} className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
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
import { Edit2, Trash2, RotateCw, ChevronDown, ChevronUp } from 'lucide-react';
import ColorPicker from '@/components/ColorPicker';
import { RootInstance } from '@/services/root.service';
import { IStage } from '@/interfaces/root.interface';

interface StageProps {
  className?: string;
  won: IStage | undefined;
  lost: IStage | undefined;
  setChange: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const ClosedStage: React.FC<StageProps> = ({ className, won, lost,setChange }) => {
  console.log("won lost",won,lost);
  const [isEditing, setIsEditing] = useState(false);
  const [stageName, setStageName] = useState('');
  const [stageColor, setStageColor] = useState('');
  const [stageId, setStageId] = useState('');
  const [currentType, setCurrentType] = useState<'won' | 'lost' | null>(null);

  const [showDeletedWon, setShowDeletedWon] = useState(false);
  const [showDeletedLost, setShowDeletedLost] = useState(false);

  const handleEditClick = (id: string, color: string, label: string, type: 'won' | 'lost') => {
    setIsEditing(true);
    setStageName(label);
    setStageColor(color);
    setStageId(id);
    setCurrentType(type);
  };

  const handleColorChange = (color: string) => setStageColor(color);
  const closePopup = () => setIsEditing(false);

  const handleSave = async () => {
    const statusId = currentType === 'won' ? 'stage_won': 'stage_lost';
    await RootInstance.editCloseStatus({
      statusid: stageId,
      label: stageName,
      color: stageColor,
    },statusId);
    setChange((prev) => !prev);
    closePopup();
  };

  const handleDelete = async (id: string, type: 'won' | 'lost') => {
    const stageKey = type === 'won' ? 'stage_won' : 'stage_lost';
    await RootInstance.deleteInitialStatus({ stageId: stageKey, statusId: id });
    setChange((prev) => !prev);
  };

  const handleRestore = async (id: string, type: 'won' | 'lost') => {
    const stageKey = type === 'won' ? 'stage_won' : 'stage_lost';
    await RootInstance.restoreDeletedInitialStatus({ stageId: stageKey, statusId: id });
    setChange((prev) => !prev);
  };

  const renderActiveStatuses = (
    activeItems: IStage['activeStatuses'] | undefined,
    type: 'won' | 'lost'
  ) => {
    return (activeItems || []).map((item) => (
      <div
        key={item._id}
        className="flex items-center justify-between px-3 py-2 rounded-md"
        style={{ backgroundColor: item.color || '#bbf7d0' }}
      >
        <span className="text-sm text-gray-800">{item.label}</span>
        <div className="flex gap-2">
          <button onClick={() => handleEditClick(item.statusid.toLocaleString(), item.color, item.label, type)}>
            <Edit2 size={16} className="text-gray-500 hover:text-gray-700" />
          </button>
          <button onClick={() => handleDelete(item.statusid.toString(), type)}>
            <Trash2 size={16} className="text-gray-500 hover:text-red-700" />
          </button>
        </div>
      </div>
    ));
  };

  const renderArchivedStatuses = (
    archivedItems: IStage['archivedStatuses'] | undefined,
    type: 'won' | 'lost'
  ) => {
    return (
      <div className="mt-4">
        <button
          className="flex items-center text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => type === 'won' ? setShowDeletedWon(!showDeletedWon) : setShowDeletedLost(!showDeletedLost)}
        >
          <span>
            Deleted statuses (
            {Array.isArray(archivedItems) ? archivedItems.length : 0})
          </span>
          {type === 'won'
            ? showDeletedWon
              ? <ChevronUp size={16} className="ml-1" />
              : <ChevronDown size={16} className="ml-1" />
            : showDeletedLost
              ? <ChevronUp size={16} className="ml-1" />
              : <ChevronDown size={16} className="ml-1" />}
        </button>

        {(type === 'won' ? showDeletedWon : showDeletedLost) && (
          <div className="mt-2 space-y-2 border-t border-gray-200 pt-2">
            {(archivedItems || []).map((item) => (
              <div
                key={item.statusid}
                className="flex items-center justify-between p-2 rounded-md relative opacity-70"
                style={{ backgroundColor: item.color || '#f3f4f6' }}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="text-gray-500 hover:text-green-600"
                    onClick={() => handleRestore(item.statusid.toString(), type)}
                    title="Restore"
                  >
                    <RotateCw size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="bg-gray-50 rounded-t-lg p-2 text-center font-medium">Closed stage</div>

      {/* WON Section */}
      <div className="border border-green-400 rounded-lg bg-green-50 p-4 space-y-3 m-2">
        <div className="text-green-700 font-semibold">Won</div>
        <div className="space-y-2">{renderActiveStatuses(won?.activeStatuses, 'won')}</div>
        {renderArchivedStatuses(won?.archivedStatuses, 'won')}
      </div>

      {/* LOST Section */}
      <div className="border border-green-400 rounded-lg bg-green-50 p-4 space-y-3 m-2">
        <div className="text-green-700 font-semibold">Lost</div>
        <div className="space-y-2">{renderActiveStatuses(lost?.activeStatuses, 'lost')}</div>
        {renderArchivedStatuses(lost?.archivedStatuses, 'lost')}
      </div>

      {/* Edit Popup */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
            <h3 className="text-xl font-medium text-gray-900 mb-6">
              Edit {currentType === 'won' ? 'Won' : 'Lost'} Status
            </h3>

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
              <button
                onClick={closePopup}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
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


