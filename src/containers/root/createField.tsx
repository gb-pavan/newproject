"use client";

import React, { useState, useCallback, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { HiOutlineDocumentText } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { BsPhone } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import CreateFieldModal from "@/containers/root/createFieldModal";
import EditFieldModal from "@/containers/root/EditFieldModal";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { MdDragIndicator } from "react-icons/md";
import { RootInstance } from "@/services/root.service";
import { CreatedLeadField } from "@/interfaces/root.interface";
import { handleError } from "@/utils/helpers";
import { AxiosError } from "axios";
import { Trash2 } from 'lucide-react';
import { FiEye } from "react-icons/fi";
import { FaRegEyeSlash } from "react-icons/fa6";

// import { create } from "domain";

interface Field {
  _id: string;
  name: string;
  type: string;
  options: string[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
  active?: boolean;
}

const FieldsSettingsPage = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Active Fields");
  const [selectedType, setSelectedType] = useState("Select type");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<CreatedLeadField | null>(null);
  const [isH1DropdownOpen, setIsH1DropdownOpen] = useState(false);
  const [isH2DropdownOpen, setIsH2DropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [selectedH1Field, setSelectedH1Field] = useState("Name");
  const [selectedH2Field, setSelectedH2Field] = useState("Phone");

  const primaryFieldOptions = [
    "Alternative number",
    "Created By",
    "Email",
    "Name",
    "State",
  ];

  // const typeOptions = [
  //   { value: "all", label: "All" },
  //   { value: "text", label: "Text" },
  //   { value: "checkbox", label: "Checkbox" },
  //   { value: "dropdown", label: "Dropdown" },
  //   { value: "email", label: "Email" },
  //   { value: "money", label: "Money" },
  //   { value: "number", label: "Number" },
  //   { value: "phone", label: "Phone" },
  //   { value: "date", label: "Date" },
  // ];
  const typeOptions = [
    { value: "text", label: "Text" },
    { value: "email", label: "Email" },
    { value: "dropdown", label: "Dropdown" },
    { value: "tags", label: "Tags" },
    { value: "phone", label: "Phone" },
    { value: "checkbox", label: "Checkbox" },
    { value: "number", label: "Number" },
    { value: "date", label: "Date" },
    { value: "url", label: "URL" },
  ];


  // Sample data for the fields
  // const [fields, setFields] = useState<Field[]>([
  //   {
  //     _id: "67c056d750770385063ce1dd",
  //     name: "class",
  //     type: "DROPDOWN",
  //     options: ["1st", "2nd"],
  //     createdAt: "2025-02-27T12:13:11.865Z",
  //     updatedAt: "2025-03-11T06:20:51.724Z",
  //     __v: 0,
  //     isHidden: false,
  //   },
  //   {
  //     _id: "67c8316e805b8529252cdcc6",
  //     name: "fatherName",
  //     type: "TEXT",
  //     options: ["academic", "upsc"],
  //     createdAt: "2025-03-05T11:11:42.096Z",
  //     updatedAt: "2025-03-05T11:11:42.096Z",
  //     __v: 0,
  //     isHidden: false,
  //   },
  //   {
  //     _id: "67c831a4805b8529252cdcc9",
  //     name: "board",
  //     type: "DROPDOWN",
  //     options: ["academic", "upsc"],
  //     createdAt: "2025-03-05T11:12:36.537Z",
  //     updatedAt: "2025-03-05T11:12:36.537Z",
  //     __v: 0,
  //     isHidden: false,
  //   },
  //   {
  //     _id: "67c831be805b8529252cdccc",
  //     name: "status",
  //     type: "TEXT",
  //     options: ["academic", "upsc"],
  //     createdAt: "2025-03-05T11:13:02.827Z",
  //     updatedAt: "2025-03-05T11:13:02.827Z",
  //     __v: 0,
  //     isHidden: false,
  //   },
  //   {
  //     _id: "67c831e4805b8529252cdccf",
  //     name: "assigned",
  //     type: "TEXT",
  //     options: ["academic", "upsc"],
  //     createdAt: "2025-03-05T11:13:40.975Z",
  //     updatedAt: "2025-03-05T11:13:40.975Z",
  //     __v: 0,
  //     isHidden: false,
  //   },
  //   {
  //     _id: "67c831fd805b8529252cdcd2",
  //     name: "leadScore",
  //     type: "TEXT",
  //     options: ["academic", "upsc"],
  //     createdAt: "2025-03-05T11:14:05.826Z",
  //     updatedAt: "2025-03-05T11:14:05.826Z",
  //     __v: 0,
  //     isHidden: false,
  //   },
  // ]);
  const [createdFields,setCreatedFields] = useState<CreatedLeadField[]>([]);
  const fetchCreatedLeadFields = async () => {
      try {
        const response = await RootInstance.getCreatedLeadFields(); // Await the API response
        setCreatedFields(response);
      } catch (error) {
        handleError(error as AxiosError,false);
      }
    };
  useEffect(() => {
    fetchCreatedLeadFields();
  }, []);
  console.log("created fields",createdFields);

  // Function to handle drag end event
  const handleDragEnd = (result:DropResult) => {
    const { destination, source } = result;
    console.log("source destination",source,destination);

    // Return if dropped outside the list or dropped in the same position
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // Create a copy of fields array
    const updatedFields = Array.from(createdFields);

    // Remove the dragged item from the array
    const [movedField] = updatedFields.splice(source.index, 1);

    // Insert the item at the destination index
    updatedFields.splice(destination.index, 0, movedField);

    // Update the state with the new order
    setCreatedFields(updatedFields);
  };

  // Function to handle creating a new field
  const handleCreateField = useCallback(async (name: string, type: string, options:string[],mandatory:boolean,toggleValue:boolean,isForm:boolean,selectedColor:string) => {
    console.log("check field createing step",mandatory,isForm,toggleValue);
    const payload :{name:string,type:string,options:string[],required:boolean,active:boolean,isForm:boolean,columnColor:string}= {name:name,type:type,options,required:mandatory,active:toggleValue,isForm,columnColor:selectedColor}
    const checkCreatedField = await RootInstance.createLeadField(payload);
    console.log("yessss",checkCreatedField);

    fetchCreatedLeadFields();
    // const newField: Field = {
    //   _id: `new-field-${Date.now()}`,
    //   name: name,
    //   type: type.toUpperCase(),
    //   options: type === "dropdown" ? ["Option 1", "Option 2"] : ["value1"],
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    //   __v: 0,
    //   isHidden: false,
    // };

    // setFields((prev) => [...prev, newField]);
    setIsCreateModalOpen(false);
  }, []);

  // Function to handle editing a field
  // const handleEditField = useCallback(
  //   (name: string, type: string, options: string[],_id:string) => {
  //     if (!editingField) return;
  //     RootInstance.EditLeadFields(name,type,options,_id);

  //     setCreatedFields((prev) =>
  //       prev.map((field) =>
  //         field._id === editingField._id
  //           ? {
  //               ...field,
  //               name,
  //               type: type.toUpperCase(),
  //               options,
  //               updatedAt: new Date().toISOString(),
  //             }
  //           : field
  //       )
  //     );

  //     setIsEditModalOpen(false);
  //     setEditingField(null);
  //   },
  //   [editingField]
  // );

  const handleDeleteField = async (fieldId:string) => {
    await RootInstance.DeleteLeadFields(fieldId);
    fetchCreatedLeadFields();
  }

  const handleEditField = useCallback(
  async (name: string, type: string, options: string[], _id: string,selectedColor:string,mandatory:boolean,isForm:boolean,active:boolean) => {
    if (!editingField) return;
    console.log("editeeeddd fields active mandatory isFOrm",active,mandatory,isForm);

    const editedResponse = await RootInstance.EditLeadFields(name, type, options, _id,selectedColor,active,mandatory,isForm);
    console.log("editedResponse",editedResponse);

    setCreatedFields((prev) =>
      prev.map((field) =>
        field._id === editingField._id
          ? {
              ...field,
              name,
              type: type.toUpperCase(),
              options,
              updatedAt: new Date().toISOString(),
            }
          : field
      )
    );

    setIsEditModalOpen(false);
    setEditingField(null);
  },
  [editingField]
);


  // Function to toggle field visibility
  const handleToggleVisibility = useCallback(async (SpecificField:Field) => {
    // await RootInstance.LeadFieldVisibility(field._id , field.active)
    if (typeof SpecificField.active === 'boolean') {
      await RootInstance.LeadFieldVisibility(SpecificField._id, SpecificField.active);
    }

    setCreatedFields((prev) =>
      prev.map((field) =>
        field.name === SpecificField.name
          ? { ...field, active: !field.active }
          : field
      )
    );

  }, []);

  // Function to handle edit button click
  const handleEditClick = useCallback(
    (fieldName: string) => {
      const field = createdFields.find((f) => f.name === fieldName);
      if (field) {
        setEditingField(field);
        setIsEditModalOpen(true);
      }
    },
    [createdFields]
  );

  // Function to toggle between Active Fields and Hidden Fields views
  const handleToggleFieldsView = useCallback(() => {
    setActiveFilter(
      activeFilter === "Active Fields" ? "Hidden Fields" : "Active Fields"
    );
  }, [activeFilter]);

  // Function to handle H1 field selection
  const handleH1Selection = useCallback((field: string) => {
    setSelectedH1Field(field);
    setIsH1DropdownOpen(false);
  }, []);

  // Function to handle H2 field selection
  const handleH2Selection = useCallback((field: string) => {
    setSelectedH2Field(field);
    setIsH2DropdownOpen(false);
  }, []);

  // Function to get the icon based on field name and type
  const getFieldIcon = (name: string, type: string) => {
    const lowerName = name.toLowerCase();
    const lowerType = type.toLowerCase();

    if (lowerType === "email" || lowerName.includes("email")) {
      return <MdOutlineEmail className="text-gray-500" />;
    } else if (
      lowerType === "phone" ||
      lowerName.includes("phone") ||
      lowerName.includes("number")
    ) {
      return <BsPhone className="text-gray-500" />;
    } else if (lowerType === "dropdown" || lowerName.includes("class")) {
      return <AiOutlineForm className="text-gray-500" />;
    } else if (
      lowerName.includes("father") ||
      lowerName.includes("mother") ||
      lowerName.includes("occupation")
    ) {
      return <FaRegUser className="text-gray-500" />;
    } else if (
      lowerType === "text" ||
      lowerName.includes("lead") ||
      lowerName.includes("type")
    ) {
      return <HiOutlineDocumentText className="text-gray-500" />;
    } else if (lowerName.includes("board")) {
      return <AiOutlineForm className="text-gray-500" />;
    } else if (lowerName.includes("created") || lowerName.includes("by")) {
      return <FaRegUser className="text-gray-500" />;
    } else {
      return <HiOutlineUser className="text-gray-500" />;
    }
  };
  
  // Filter fields based on search term, type, and active/hidden filter
  const filteredFields = createdFields?.filter((field) => {
    console.log("filtered field ccccccc",field);
    const matchesSearch = field.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
      console.log("matchessearch",matchesSearch);
    const matchesVisibility =
      activeFilter === "Active Fields" ? !field.active : field.active;
      console.log("visbility",matchesVisibility);
    const matchesType =
      selectedType === "Select type" || selectedType === "All"
        ? true
        : field.type.toLowerCase() === selectedType.toLowerCase();
    console.log("matchestype",matchesType);

    return matchesSearch && matchesVisibility && matchesType;
  });
  console.log("filteredd fieldsssss",filteredFields);

  const searchResults = filteredFields?.length;

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        {/* Header section */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <h1 className="text-lg font-medium text-gray-700">
              Fields Settings
            </h1>
            <span className="ml-2 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </div>
          <button
            className="bg-purple-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <span className="mr-1">+</span> Add a new field
          </button>
        </div>

        {/* Lead ID section */}
        {/* <div className="p-4 border-b">
          <div className="flex items-center">
            <div className="text-sm text-gray-600">Lead Id</div>
            <a href="#" className="ml-2 text-purple-500 text-sm">
              Learn more
            </a>
          </div>
          <div className="mt-1 ml-7 text-sm text-back">Phone</div>
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center">
              <BsPhone className="text-gray-400 mr-2" />
              <div className="text-gray-400 text-sm">+91 999999999</div>
            </div>
            <button className="text-purple-500 text-sm">Change</button>
          </div>
        </div> */}

        {/* Primary fields section */}
        <div className="p-4">
          <div className="text-sm font-medium text-gray-500 mb-2">
            PRIMARY FIELDS (ADMIN)
          </div>

          <div className="border rounded-md mb-4">
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">H1</span>
                <HiOutlineUser className="text-gray-400 mr-2" />
                <span>{selectedH1Field}</span>
              </div>
              <div className="flex items-center">
                {/* <button className="text-gray-400 mr-2">
                  <FiEdit />
                </button> */}
                <div className="relative">
                  {/* <button
                    className="text-gray-400 hover:text-blue-500"
                    onClick={() => setIsH1DropdownOpen(!isH1DropdownOpen)}
                  >
                    <IoIosArrowDown />
                  </button> */}
                  {isH1DropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <ul className="py-1">
                        {primaryFieldOptions.map((option) => (
                          <li
                            key={option}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleH1Selection(option)}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3">
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">H2</span>
                <BsPhone className="text-gray-400 mr-2" />
                <span>{selectedH2Field}</span>
              </div>
              <div className="flex items-center">
                {/* <button className="text-gray-400 mr-2">
                  <FiEdit />
                </button> */}
                <div className="relative">
                  {/* <button
                    className="text-gray-400 hover:text-blue-500"
                    onClick={() => setIsH2DropdownOpen(!isH2DropdownOpen)}
                  >
                    <IoIosArrowDown />
                  </button> */}
                  {isH2DropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <ul className="py-1">
                        {primaryFieldOptions.map((option) => (
                          <li
                            key={option}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleH2Selection(option)}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Other fields section */}
          <div className="text-sm font-medium text-gray-500 mb-2">
            OTHER FIELDS
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="relative flex-1 mr-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoMdSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <div className="relative mr-2">
                <button
                  className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[120px]"
                  onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                >
                  <span>{selectedType}</span>
                  <IoIosArrowDown className="ml-2" />
                </button>
                {isTypeDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {typeOptions.map((option) => (
                      <button
                        key={option.value}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setSelectedType(option.label);
                          setIsTypeDropdownOpen(false);
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-black hover:bg-purple-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onClick={handleToggleFieldsView}
              >
                <div className="flex items-center">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      activeFilter === "Active Fields"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    } mr-2`}
                  ></span>
                  <span>{activeFilter}</span>
                </div>
                <IoIosArrowDown className="ml-2" />
              </button>
            </div>
          </div>

          {/* Search results and fields list */}
          {searchResults > 0 && (
            <div className="text-sm text-gray-500 mb-2">
              {searchResults} results found
            </div>
          )}

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="fieldsList">
              {(provided) => (
                <div 
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                  className="space-y-2"
                >
                  {filteredFields?.map((field, index) => (
                    <Draggable 
                      key={field._id} 
                      draggableId={field._id} 
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`border rounded-md p-3 bg-white ${
                            snapshot.isDragging ? 'shadow-lg' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div {...provided.dragHandleProps}>
                                <MdDragIndicator className="text-gray-400 mr-2 cursor-move" />
                              </div>
                              {getFieldIcon(field.name, field.type)}
                              <span className="ml-2 font-medium">{field.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button 
                                  className="text-gray-500 hover:text-red-600"
                                  onClick={() => handleDeleteField(field._id)}
                                >
                                  <Trash2 size={16} />
                                </button>
                              <button
                                className="text-gray-400 hover:text-blue-500 mr-2"
                                onClick={() => handleEditClick(field.name)}
                              >
                                <FiEdit />
                              </button>
                              <button
                                className="text-gray-400 hover:text-blue-500"
                                onClick={() => handleToggleVisibility(field)}
                              >
                                {field.active ? (
                                  <span className="text-gray-400"><FaRegEyeSlash /></span>
                                ) : (
                                  <span className="text-green-500"><FiEye /></span>
                                )}
                              </button>
                            </div>
                          </div>
                          {/* Display options below the field name */}
                          <div className="pl-8 text-gray-500 text-sm">
                            {field.options.map((option, i) => (
                              <div key={i}>{option}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {searchResults === 0 && (
            <div className="text-center py-8 text-gray-500">
              {activeFilter === "Active Fields"
                ? "No active fields found matching your search criteria."
                : "No hidden fields found matching your search criteria."}
            </div>
          )}
        </div>
      </div>

      {/* Create Field Modal */}
      {isCreateModalOpen && (
        <CreateFieldModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateField={handleCreateField}
        />
      )}

      {/* Edit Field Modal */}
      {editingField && (
        <EditFieldModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingField(null);
          }}
          onEditField={handleEditField}
          field={editingField}
        />
      )}
    </div>
  );
};

export default FieldsSettingsPage;