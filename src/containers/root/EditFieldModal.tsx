// containers/admin/EditFieldModal.tsx
import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';

interface EditFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditField: (name: string, type: string, options: string[],_id:string) => void;
  field: {
    name: string;
    type: string;
    options: string[];
    _id:string
  };
}

const EditFieldModal: React.FC<EditFieldModalProps> = ({ isOpen, onClose, onEditField, field }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState('');


  // Reset form when field changes
  useEffect(() => {
    if (field) {
      setName(field.name);
      setType(field.type);
      setOptions([...field.options]);
    }
  }, [field]);
  
  // const handleAddOption = () => {
  //   if (newOption.trim() !== '') {
  //     setOptions([...options, newOption.trim()]);
  //     setNewOption('');
  //   }
  // };
  const handleAddOption = async () => {
  if (newOption.trim() !== '') {
    await new Promise(resolve => setTimeout(resolve, 100));
    setOptions(prev => [...prev, newOption.trim()]);
    setNewOption('');
  }
};
  // const handleAddOption = async () => {
  //   if (newOption.trim() !== '') {
  //     // Example: pretend there's an async call here
  //     await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay

  //     setOptions(prev => [...prev, newOption.trim()]);
  //     setNewOption('');
  //   }
  // };


  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };
  // const handleRemoveOption = async (index: number) => {
  //   // Simulated delay
  //   await new Promise(resolve => setTimeout(resolve, 100));

  //   setOptions(prev => prev.filter((_, i) => i !== index));
  // };


  // const handleSubmit = (e: React.FormEvent) => {
  //   console.log("checking form");
  //   e.preventDefault();
  //   if (name.trim() === '') return; 
  //   console.log("check after",name,type,options.length > 0 ? options : [],field._id )
  //   // onEditField(name, type, options.length > 0 ? options : ['value1']);
  //   onEditField(name, type, options.length > 0 ? options : [],field._id);
  // };
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (name.trim() === '') return;

  const finalOptions =
    newOption.trim() !== ''
      ? [...options, newOption.trim()]
      : options;

  // Optional: also update state to reflect UI immediately
  if (newOption.trim() !== '') {
    setOptions(finalOptions);
    setNewOption('');
  }

  onEditField(name, type, finalOptions.length > 0 ? finalOptions : [], field._id);
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Edit Field</h2>
          <button 
            className="text-gray-400 hover:text-gray-600" 
            onClick={onClose}
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <div className="relative">
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                {/* <option value="TEXT">Text</option>
                <option value="EMAIL">Email</option>
                <option value="DROPDOWN">Dropdown</option>
                <option value="PHONE">Phone</option>
                <option value="NUMBER">Number</option>
                <option value="DATE">Date</option> */}
                <option value="TEXT">Text</option>
                <option value="EMAIL">Email</option>
                <option value="DROPDOWN">Dropdown</option>
                <option value="TAGS">Tags</option>
                <option value="PHONE">Phone</option>
                <option value="CHECKBOX">Checkbox</option>
                <option value="NUMBER">Number</option>
                <option value="DATE">Date</option>
                <option value="URL">URL</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <IoIosArrowDown className="text-gray-400" />
              </div>
            </div>
          </div>
          
          {type === 'DROPDOWN' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
              <div className="space-y-2 mb-2">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[index] = e.target.value;
                        setOptions(newOptions);
                      }}
                      required
                    />
                    <button
                      type="button"
                      className="ml-2 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveOption(index)}
                    >
                      <AiOutlineClose size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Add option"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                />
                <button
                  type="button"
                  className="ml-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
                  onClick={handleAddOption}
                >
                  <AiOutlinePlus size={18} />
                </button>
              </div>
            </div>
          )}
          
          <div className="flex justify-end mt-6 space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFieldModal;