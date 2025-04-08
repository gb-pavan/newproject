import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import { BsCheckSquare } from 'react-icons/bs';
import { BsCalendarDate } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { FaMoneyBillWave } from 'react-icons/fa';
import { BsPhone } from 'react-icons/bs';
import { AiOutlineNumber } from 'react-icons/ai';
import { BsTag } from 'react-icons/bs';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { BiWorld } from 'react-icons/bi';
// import { AiOutlineImport } from 'react-icons/ai';
// import { BsEyeFill } from 'react-icons/bs';
// import { FaLock } from 'react-icons/fa';
// import { MdOutlineScreenSearchDesktop } from 'react-icons/md';
// import { TbArrowsRightLeft } from 'react-icons/tb';
import DynamicInputList from '@/components/DynamicDropdownOptions';
import ColorPicker from '@/components/ColorPicker';
import ToggleSwitch from '@/components/ToggleSwitch';

interface CreateFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateField: (name: string, type: string, properties: string[],mandatory:boolean,isForm:boolean,toggleValue:boolean,selectedColor:string) => void;
}

// Field type options
const fieldTypeOptions = [
  { value: 'text', label: 'Text', icon: <HiOutlineDocumentText /> },
  { value: 'checkbox', label: 'Checkbox', icon: <BsCheckSquare /> },
  { value: 'date', label: 'Date', icon: <BsCalendarDate /> },
  { value: 'dropdown', label: 'Dropdown', icon: <IoIosArrowDown /> },
  { value: 'email', label: 'Email', icon: <MdOutlineEmail /> },
  { value: 'money', label: 'Money', icon: <FaMoneyBillWave /> },
  { value: 'number', label: 'Number', icon: <AiOutlineNumber /> },
  { value: 'phone', label: 'Phone', icon: <BsPhone /> },
  { value: 'tags', label: 'Tags', icon: <BsTag /> },
  { value: 'website', label: 'Website', icon: <BiWorld /> },
  { value: 'dependent-dropdown', label: 'Dependent Dropdown', icon: <IoIosArrowDown /> },
  { value: 'recurring-date', label: 'Recurring Date', icon: <BsCalendarDate /> },
];

// Field property options
// const fieldPropertyOptions = [
//   { value: 'import', label: 'Show in import', icon: <AiOutlineImport /> },
//   { value: 'quickAdd', label: 'Show in quick add', icon: <BsEyeFill /> },
//   { value: 'lockAfterCreate', label: 'Lock after create', icon: <FaLock /> },
//   { value: 'canUseVariable', label: 'Can use variable', icon: <TbArrowsRightLeft /> },
//   { value: 'searchable', label: 'Searchable', icon: <MdOutlineScreenSearchDesktop /> },
// ];

const CreateFieldModal: React.FC<CreateFieldModalProps> = ({ isOpen, onClose, onCreateField }) => {
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState('text');
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  // const [isPropertiesOpen, setIsPropertiesOpen] = useState(true);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [toggleValue, setToggleValue] = useState(false);
  const [isForm,setIsForm] = useState<boolean>(false);
  const [mandatory,setMandatory] = useState<boolean>(false);


  // const [minLength, setMinLength] = useState('1');
  // const [maxLength, setMaxLength] = useState('100');
  // const [dropDownOptions,setDropdownOptions] = useState<string[]>([]);
  
  // Find the selected type object
  const selectedType = fieldTypeOptions.find(option => option.value === fieldType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("form fields",fieldName,fieldType);
    // const payload :{name:string,type:string}= {name:fieldName,type:fieldType}
    // await RootInstance.createLeadField(payload);
    // if (fieldType === "dropdown") {
    //   payload.options = selectedProperties; // Assuming selectedProperties holds dropdown options
    // }
    console.log("field creation cheching",mandatory,isForm,toggleValue);
    await onCreateField(fieldName, fieldType, selectedProperties, mandatory,isForm,toggleValue,selectedColor);
    if (fieldName.trim()) {
      // onCreateField(fieldName, fieldType, selectedProperties);
      setFieldName('');
      setFieldType('text');
      // setIsPropertiesOpen(true);
      setSelectedProperties([]);
      onClose();
    }
  };

  const handleColorChange = (colorValue: string) => {
    setSelectedColor(colorValue);
  };

  // const toggleProperty = (property: string) => {
  //   setSelectedProperties(prev => 
  //     prev.includes(property) 
  //       ? prev.filter(p => p !== property) 
  //       : [...prev, property]
  //   );
  // };

  if (!isOpen) return null;

  const handleOptionsChange = (updatedOptions: string[]) => {
    setSelectedProperties(updatedOptions);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Create Field</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoMdClose size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter field name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                  className="w-full flex items-center justify-between border border-gray-300 rounded-md py-2 px-3 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <div className="flex items-center">
                    {selectedType?.icon && <span className="mr-2">{selectedType.icon}</span>}
                    <span>{selectedType?.label}</span>
                  </div>
                  <IoIosArrowDown />
                </button>
                
                {isTypeDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {fieldTypeOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setFieldType(option.value);
                          setIsTypeDropdownOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100"
                      >
                        <span className="mr-2">{option.icon}</span>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
                {/* {fieldType === 'dropdown' && <DynamicInputList onChange={handleOptionsChange} />} */}
                {fieldType === 'dropdown' && (
  <div onMouseDown={(e) => e.stopPropagation()}>
    <DynamicInputList onChange={handleOptionsChange} />
  </div>
)}

              </div>
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Color
            </label>
            <div className="grid grid-cols-4 gap-2 mb-6">
              
              <ColorPicker onChange={handleColorChange} />
            </div>

            <div className="flex items-center gap-4">
              {/* <label className="block text-sm font-medium text-gray-700">Active</label> */}
              <ToggleSwitch
                label="Active"
                value={toggleValue}
                onChange={setToggleValue}
              />
            </div>

            <div className="flex items-center gap-4">
              {/* <label className="block text-sm font-medium text-gray-700">Is Form</label> */}
              <ToggleSwitch
                label="Is Form"
                value={isForm}
                onChange={setIsForm}
              />
            </div>

            <div className="flex items-center gap-4">
              {/* <label className="block text-sm font-medium text-gray-700">Required</label> */}
              <ToggleSwitch
                label="Required"
                value={mandatory}
                onChange={setMandatory}
              />
            </div>

            {/* <div className="mb-4">
              <button
                type="button"
                className="flex items-center text-sm text-gray-600 hover:text-purple-500"
                onClick={() => setIsPropertiesOpen(!isPropertiesOpen)}
              >
                <span className="mr-1">Properties</span>
                {isPropertiesOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </button>
              
              {isPropertiesOpen && (
                <div className="mt-2">
                  {fieldPropertyOptions.map((option) => (
                    <div key={option.value} className="mb-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="mr-2 text-gray-500">{option.icon}</span>
                        <span className="text-sm">{option.label}</span>
                        <span className="ml-1 text-gray-400"><BsInfoCircle size={12} /></span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={selectedProperties.includes(option.value)}
                          onChange={() => toggleProperty(option.value)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                  
                  {fieldType === 'text' && (
                    <div className="mt-4">
                      <div className="flex items-center mb-2">
                        <span className="mr-2 text-gray-500"><TbArrowsRightLeft /></span>
                        <span className="text-sm">Length Range</span>
                        <span className="ml-1 text-gray-400"><BsInfoCircle size={12} /></span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">From</span>
                        <input
                          type="number"
                          value={minLength}
                          onChange={(e) => setMinLength(e.target.value)}
                          className="w-16 border border-gray-300 rounded-md py-1 px-2 text-sm"
                        />
                        <span className="text-sm text-gray-500 mx-2">To</span>
                        <input
                          type="number"
                          value={maxLength}
                          onChange={(e) => setMaxLength(e.target.value)}
                          className="w-16 border border-gray-300 rounded-md py-1 px-2 text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div> */}
          </div>

          <div className="flex justify-end p-4 border-t bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 mr-2"
            >
              Cancel
            </button>
            <button
            type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFieldModal;
