'use client';
import React, { useState } from 'react';
import { Edit2, Trash2, ChevronDown, ChevronUp, RefreshCcw } from 'lucide-react';
import {  IStage } from '@/interfaces/root.interface';
import { RootInstance } from '@/services/root.service';
import ColorPicker from '@/components/ColorPicker';

interface StageProps {
  className?: string;
  // fullObject: Record<string, string | number | boolean | IEditStatus[]>;
  fullObject:IStage | undefined;
  setChange: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const ActiveStage: React.FC<StageProps> = ({ className,fullObject,setChange }) => {
  

  // Deleted status items
  
  const [showDeletedItems, setShowDeletedItems] = useState(false);
  const [editingItem, setEditingItem] = useState<string>("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [stageName, setStageName] = useState<string>("");
  const [bgColor,setBgColor] = useState<string>("");

  const handleEditClick = async (itemId: string, color: string, title: string, bagColor:string) => {
      
    setEditingItem(itemId);
    setSelectedColor(color);
    setStageName(title);
    setIsAddingNew(false);
    setBgColor(bagColor);
  };


  const handleColorChange = (colorValue: string) => {
    setSelectedColor(colorValue);
  };

  const handleBgColorChange = (colorValue: string) => {
    setBgColor(colorValue);
  };

  const handleCreateStatus = async () => {

    const id = isAddingNew ? Number(fullObject?.activeStatuses?.length) + 1 : editingItem;
    const statusCreated = {
      statusid:Number(id),
      color:selectedColor,
      label:stageName,
      backgroundColor:bgColor
    }
    await RootInstance.createStatus(statusCreated);
    setChange(prev=>!prev);
    closePopup();
  }

  const handleDeleteItem = async (stageId: string,statusId:string) => {
    await RootInstance.deleteStatus({stageId,statusId});
    setChange(prev => !prev);
  };

  const handleRestoreItem = async (stageId:string,statusId: string) => {
    await RootInstance.restoreDeletedStatus({stageId,statusId});
    setChange(prev => !prev);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingItem("");
    setSelectedColor("");
    setStageName("");
    setBgColor('');
  };

  const closePopup = () => {
    setEditingItem("");
    setIsAddingNew(false);
  };

  const toggleDeletedItems = () => {
    setShowDeletedItems(!showDeletedItems);
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {/* Header styled to match the screenshot */}
      <div className="bg-green-50 rounded-t-lg p-2 text-center font-medium border border-green-200 border-b-0">
        Active stage
      </div>
      
      <div className="border border-gray-200 rounded-b-lg p-4">
        {/* Centered "+ Add" button */}
        <div className="flex items-center justify-center mb-4">
          <div 
            className="flex items-center justify-center w-full border border-gray-300 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-50"
            onClick={handleAddNew}
          >
            <div className="text-black flex items-center justify-center">
              <span>+ Add</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          {Array.isArray(fullObject?.activeStatuses) &&fullObject?.activeStatuses?.map((item) => (
            <div 
              key={item.statusid} 
              className={`flex items-center justify-between p-2 rounded-md relative`}
              style={{ backgroundColor: item.backgroundColor,color:item.color }}
            >
              <div className="flex items-center space-x-2">
                {/* {item.icon} */}
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => handleEditClick(item.statusid.toLocaleString(), item.color, item.label,item.backgroundColor)}
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  className="text-gray-500 hover:text-red-600"
                  onClick={() => handleDeleteItem(fullObject?.stageid.toLocaleString(),item.statusid.toLocaleString())}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Deleted statuses section */}
        <div className="mt-4">
          <button 
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={toggleDeletedItems}
          >
            <span>Deleted statuses ({Array.isArray(fullObject?.archivedStatuses) &&fullObject?.archivedStatuses.length})</span>
            {showDeletedItems ? (
              <ChevronUp size={16} className="ml-1" />
            ) : (
              <ChevronDown size={16} className="ml-1" />
            )}
          </button>
          
          {/* Deleted items list */}
          {showDeletedItems && (
            <div className="mt-2 space-y-2 border-t border-gray-200 pt-2">
             
              {Array.isArray(fullObject?.archivedStatuses) &&fullObject?.archivedStatuses.map((item) => (
                <div 
                  key={item.statusid} 
                  className="flex items-center justify-between p-2 rounded-md relative opacity-70"
                  style={{ backgroundColor: item.color }} // ✅ Apply background color here
                >
                  <div className="flex items-center space-x-2">
                    {/* {item.icon} */}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      className="text-gray-500 hover:text-green-600"
                      onClick={() => handleRestoreItem(fullObject?.stageid.toLocaleString(),item.statusid.toLocaleString())}
                      title="Restore"
                    >
                      <RefreshCcw size={16} />
                    </button>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>

      {/* Edit/Add popup */}
      {(editingItem !== "" || isAddingNew) && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {isAddingNew ? "Add New Stage" : "Edit Stage"}
            </h3>
            
            {/* Stage Name input field (now shown for both edit and add) */}
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
            
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Color
            </label>
            <div className="grid grid-cols-4 gap-2 mb-6">              
              <ColorPicker onChange={handleColorChange} />
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Background Color
            </label>
            <div className="grid grid-cols-4 gap-2 mb-6">              
              <ColorPicker onChange={handleBgColorChange} />
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
                onClick={handleCreateStatus}
                disabled={stageName.trim() === ""}
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