'use client';
import React, { useState } from 'react';
import { Edit2, Trash2, ChevronDown, ChevronUp, RefreshCcw } from 'lucide-react';
import { IEditableStatusBox, IStage } from '@/interfaces/root.interface';
import { RootInstance } from '@/services/root.service';
import ColorPicker from '@/components/ColorPicker';

interface StageProps {
  className?: string;
  // fullObject: Record<string, string | number | boolean | IEditStatus[]>;
  fullObject:IStage | undefined;
}

// interface StageItem {
//   id: string;
//   title: string;
//   color: string;
//   icon: React.ReactNode;
//   deleted?: boolean;
// }

export const ActiveStage: React.FC<StageProps> = ({ className,fullObject }) => {
  
  // const [stageItems, setStageItems] = useState<IEditableStatusBox[]>([]);

  console.log("fullObj",fullObject);

  // Deleted status items
  const [deletedItems, setDeletedItems] = useState<IEditableStatusBox[]>([
    { statusid: 'd1', label: 'Not Interested', color: 'bg-gray-100'},
    { statusid: 'd2', label: 'Lost Opportunity', color: 'bg-red-100'},
    { statusid: 'd3', label: 'Duplicate Lead', color: 'bg-yellow-100'}
  ]);
  
  const [showDeletedItems, setShowDeletedItems] = useState(false);
  const [editingItem, setEditingItem] = useState<string>("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [stageName, setStageName] = useState<string>("");

  // const colorOptions = [
  //   { name: 'Green', value: 'bg-green-100', icon: <Circle size={16} className="text-green-600" /> },
  //   { name: 'Red', value: 'bg-red-100', icon: <Circle size={16} className="text-red-600" /> },
  //   { name: 'Yellow', value: 'bg-yellow-100', icon: <Circle size={16} className="text-yellow-600" /> },
  //   { name: 'Purple', value: 'bg-purple-100', icon: <Circle size={16} className="text-purple-600" /> },
  //   { name: 'Blue', value: 'bg-blue-100', icon: <Circle size={16} className="text-blue-600" /> },
  //   { name: 'Orange', value: 'bg-orange-100', icon: <Circle size={16} className="text-orange-600" /> },
  //   { name: 'Pink', value: 'bg-pink-100', icon: <Circle size={16} className="text-pink-600" /> },
  //   { name: 'Gray', value: 'bg-gray-100', icon: <Circle size={16} className="text-gray-600" /> }
  // ];

  const handleEditClick = (itemId: string, color: string, title: string) => {
    console.log("id,col,tit",itemId,color,title);
    // const response = RootInstance.editStatus({"statusid":itemId,"label":title,"color":color})
    // console.log("editable",response);
    
    setEditingItem(itemId);
    setSelectedColor(color);
    setStageName(title);
    setIsAddingNew(false);
  };


  // const handleEditClick = (itemId: string, color: string, title: string) => {
  //   console.log("id,col,tit", itemId, color, title);
  //   console.log("before edit", editingItem, selectedColor, stageName);

  //   // Skip change detection on the first click
  //   if (!isInitialized) {
  //     setEditingItem(itemId);
  //     setSelectedColor(color);
  //     setStageName(title);
  //     setIsInitialized(true); // Mark as initialized
  //     setIsAddingNew(false);
  //     return;
  //   }

  //   // Check if any value has changed before updating the state
  //   const isChanged =
  //     itemId !== editingItem || color !== selectedColor || title !== stageName;

  //   if (isChanged) {
  //     setEditingItem(itemId);
  //     setSelectedColor(color);
  //     setStageName(title);

  //     // Call API only if there is a change
  //     RootInstance.editStatus({
  //       statusid: itemId,
  //       label: title,
  //       color: color,
  //     });
  //   }

  //   setIsAddingNew(false);
  // };


  const handleColorChange = (colorValue: string) => {
    setSelectedColor(colorValue);
  };

  const handleCreateStatus = () => {
    console.log("creating status");
    const id = Number(fullObject?.activeStatuses?.length) + 1;
    const statusCreated = {
      statusid:id,
      color:selectedColor,
      label:stageName
    }
    const response = RootInstance.createStatus(statusCreated);
    console.log("respooo status created",response);
    closePopup();
  }

  const handleSaveChanges = () => {
    
    if (stageName.trim() === "") {
      return; // Don't save if name is empty
    }
    console.log("editzzzzz",editingItem,stageName,selectedColor);

    const response = RootInstance.editStatus({"statusid":editingItem,"label":stageName,"color":selectedColor})
    console.log("editable",response);
    
    // if (editingItem) {
    //   // Update existing item
    //   const updatedItems = stageItems.map(item => {
    //     if (item.statusid === editingItem) {
    //       // const iconColor = selectedColor.replace('bg-', 'text-').replace('-100', '-600');
    //       return {
    //         ...item,
    //         title: stageName,
    //         color: selectedColor,
    //         icon: 'Circle'
    //       };
    //     }
    //     return item;
    //   });
    //   setStageItems(updatedItems);
    // } else if (isAddingNew) {
    //   // Add new item
    //   // const iconColor = selectedColor.replace('bg-', 'text-').replace('-100', '-600');
    //   const newItem = {
    //     statusid: Date.now().toString(),
    //     label: stageName,
    //     color: selectedColor,
    //     icon:'Circle'
    //   };
    //   setStageItems([...stageItems, newItem]);
    // }
    
    closePopup();
  };

  const handleDeleteItem = async (stageId: string,statusId:string) => {
    await RootInstance.deleteStatus({stageId,statusId});
    // const itemToDelete = stageItems.find(item => item.statusid === stageId);
    // if (itemToDelete) {
    //   // Remove from active items
    //   const updatedItems = stageItems.filter(item => item.statusid !== stageId);
    //   setStageItems(updatedItems);
    // }
  };

  const handleRestoreItem = (stageId:string,statusId: string) => {
    RootInstance.restoreDeletedStatus({stageId,statusId});
    const itemToRestore = deletedItems.find(item => item.statusid === statusId);
    if (itemToRestore) {
      // Remove from deleted items
      const updatedDeletedItems = deletedItems.filter(item => item.statusid !== statusId);
      setDeletedItems(updatedDeletedItems);
      
      // Add to active items
      // setStageItems([...stageItems, {...itemToRestore, deleted: false}]);
    }
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingItem("");
    setSelectedColor("bg-green-100");
    setStageName("");
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
            <span>Deleted statuses ({deletedItems.length})</span>
            {showDeletedItems ? (
              <ChevronUp size={16} className="ml-1" />
            ) : (
              <ChevronDown size={16} className="ml-1" />
            )}
          </button>
          
          {/* Deleted items list */}
          {showDeletedItems && (
            <div className="mt-2 space-y-2 border-t border-gray-200 pt-2">
              {/* {fullObject?.archivedStatuses.map((item) => (
                <div 
                  key={item.statusid} 
                  className={`${item.color} flex items-center justify-between p-2 rounded-md relative opacity-70`}
                >
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      className="text-gray-500 hover:text-green-600"
                      onClick={() => handleRestoreItem(item.statusid)}
                      title="Restore"
                    >
                      <RefreshCcw size={16} />
                    </button>
                  </div>
                </div>
              ))} */}
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
              {/* {colorOptions.map((color) => (
                <button
                  key={color.value}
                  className={`${color.value} h-8 w-8 rounded-full border-2 ${selectedColor === color.value ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => handleColorChange(color.value)}
                />
              ))} */}
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