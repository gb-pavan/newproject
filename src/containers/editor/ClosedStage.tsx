'use client';
import React, { useState } from 'react';
// import { Edit2, Trash2, RotateCw, ChevronDown, ChevronUp } from 'lucide-react';
import { Edit2 } from 'lucide-react';
import ColorPicker from '@/components/ColorPicker';
import { RootInstance } from '@/services/root.service';
import { IStage } from '@/interfaces/root.interface';
import { toast } from 'react-hot-toast';
import { handleError } from '@/utils/helpers';
import { AxiosError } from 'axios';

interface StageProps {
  className?: string;
  won: IStage | undefined;
  lost: IStage | undefined;
  setChange: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const ClosedStage: React.FC<StageProps> = ({ className, won, lost,setChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [stageName, setStageName] = useState('');
  const [stageColor, setStageColor] = useState('');
  const [stageId, setStageId] = useState('');
  const [currentType, setCurrentType] = useState<'won' | 'lost' | null>(null);
  const [bgColor,setBgColor] = useState<string>("");

  const handleEditClick = (id: string, color: string, label: string, type: 'won' | 'lost',bagColor:string) => {
    setIsEditing(true);
    setStageName(label);
    setStageColor(color);
    setStageId(id);
    setCurrentType(type);
    setBgColor(bagColor);
  };

  const handleColorChange = (color: string) => setStageColor(color);
  const handleBgColorChange = (color: string) => setBgColor(color);
  const closePopup = () => setIsEditing(false);

  // const handleSave = async () => {
  //   const statusId = currentType === 'won' ? 'stage_won': 'stage_lost';
  //   await RootInstance.editCloseStatus({
  //     statusid: stageId,
  //     label: stageName,
  //     color: stageColor,
  //     backgroundColor: bgColor
  //   },statusId);
  //   setChange((prev) => !prev);
  //   closePopup();
  // };

  const handleSave = async () => {
    const statusId = currentType === 'won' ? 'stage_won' : 'stage_lost';

    try {
      await toast.promise(
        RootInstance.editCloseStatus({
          statusid: stageId,
          label: stageName,
          color: stageColor,
          backgroundColor: bgColor,
        }, statusId),
        {
          loading: 'Saving status...',
          success: 'Status saved successfully!',
          error: 'Failed to save status!',
        }
      );

      setChange((prev) => !prev);
      closePopup();
    } catch (error) {
      handleError(error as AxiosError, true);
    }
  };


  // const handleDelete = async (id: string, type: 'won' | 'lost') => {
  //   const stageKey = type === 'won' ? 'stage_won' : 'stage_lost';
  //   await RootInstance.deleteInitialStatus({ stageId: stageKey, statusId: id });
  //   setChange((prev) => !prev);
  // };

  // const handleRestore = async (id: string, type: 'won' | 'lost') => {
  //   const stageKey = type === 'won' ? 'stage_won' : 'stage_lost';
  //   await RootInstance.restoreDeletedInitialStatus({ stageId: stageKey, statusId: id });
  //   setChange((prev) => !prev);
  // };

  const renderActiveStatuses = (
    activeItems: IStage['activeStatuses'] | undefined,
    type: 'won' | 'lost'
  ) => {
    return (activeItems || []).map((item) => (
      <div
        key={item._id}
        className="flex items-center justify-between px-3 py-2 rounded-md"
        style={{ backgroundColor: item.backgroundColor, color:item.color }}
      >
        <span className="text-sm text-gray-800" style={{ color:item.color }}>{item.label}</span>
        <div className="flex gap-2">
          <button onClick={() => handleEditClick(item.statusid!.toLocaleString(), item.color, item.label, type,item.backgroundColor)}>
            <Edit2 size={16} className="text-gray-500 hover:text-gray-700" />
          </button>
          {/* <button onClick={() => handleDelete(item.statusid.toString(), type)}>
            <Trash2 size={16} className="text-gray-500 hover:text-red-700" />
          </button> */}
        </div>
      </div>
    ));
  };

  // const renderArchivedStatuses = (
  //   archivedItems: IStage['archivedStatuses'] | undefined,
  //   type: 'won' | 'lost'
  // ) => {
  //   return (
  //     <div className="mt-4">
  //       <button
  //         className="flex items-center text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
  //         onClick={() => type === 'won' ? setShowDeletedWon(!showDeletedWon) : setShowDeletedLost(!showDeletedLost)}
  //       >
  //         <span>
  //           Deleted statuses (
  //           {Array.isArray(archivedItems) ? archivedItems.length : 0})
  //         </span>
  //         {type === 'won'
  //           ? showDeletedWon
  //             ? <ChevronUp size={16} className="ml-1" />
  //             : <ChevronDown size={16} className="ml-1" />
  //           : showDeletedLost
  //             ? <ChevronUp size={16} className="ml-1" />
  //             : <ChevronDown size={16} className="ml-1" />}
  //       </button>

  //       {(type === 'won' ? showDeletedWon : showDeletedLost) && (
  //         <div className="mt-2 space-y-2 border-t border-gray-200 pt-2">
  //           {(archivedItems || []).map((item) => (
  //             <div
  //               key={item.statusid}
  //               className="flex items-center justify-between p-2 rounded-md relative opacity-70"
  //               style={{ backgroundColor: item.color || '#f3f4f6' }}
  //             >
  //               <div className="flex items-center space-x-2">
  //                 <span className="font-medium">{item.label}</span>
  //               </div>
  //               <div className="flex items-center space-x-2">
  //                 <button
  //                   className="text-gray-500 hover:text-green-600"
  //                   onClick={() => handleRestore(item.statusid.toString(), type)}
  //                   title="Restore"
  //                 >
  //                   <RotateCw size={16} />
  //                 </button>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="bg-gray-50 rounded-t-lg p-2 text-center font-medium">Closed stage</div>

      {/* WON Section */}
      <div className="border border-green-400 rounded-lg bg-green-50 p-4 space-y-3 m-2">
        <div className="text-green-700 font-semibold">Won</div>
        <div className="space-y-2">{renderActiveStatuses(won?.activeStatuses, 'won')}</div>
        {/* {renderArchivedStatuses(won?.archivedStatuses, 'won')} */}
      </div>

      {/* LOST Section */}
      <div className="border border-green-400 rounded-lg bg-green-50 p-4 space-y-3 m-2">
        <div className="text-green-700 font-semibold">Lost</div>
        <div className="space-y-2">{renderActiveStatuses(lost?.activeStatuses, 'lost')}</div>
        {/* {renderArchivedStatuses(lost?.archivedStatuses, 'lost')} */}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Choose Background Color</label>
              <ColorPicker onChange={handleBgColorChange} />
            </div>
            <p className="text-center">Selected Background Color: {bgColor}</p>

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


