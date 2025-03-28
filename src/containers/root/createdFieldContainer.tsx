import React from 'react';
import { MdDragIndicator } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { Draggable } from '@hello-pangea/dnd';

interface FieldContainerProps {
  icon: React.ReactNode;
  name: string;
  type: string;
  options: string[];
  isHidden: boolean;
  onEdit: (name: string) => void;
  onToggleVisibility: (name: string) => void;
  index: number;
  id: string;
}

const FieldContainer: React.FC<FieldContainerProps> = ({ 
  icon, 
  name, 
  options, 
  isHidden, 
  onEdit, 
  onToggleVisibility,
  index,
  id
}) => {
  // Format the field name to be more readable (e.g., "fatherName" -> "Father Name")
  const formatFieldName = (name: string) => {
    // Handle camelCase (e.g., "fatherName" -> "Father Name")
    const fromCamelCase = name.replace(/([A-Z])/g, ' $1');
    
    // Handle snake_case (e.g., "father_name" -> "Father Name")
    const fromSnakeCase = fromCamelCase.replace(/_/g, ' ');
    
    // Capitalize the first letter of each word
    return fromSnakeCase
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div 
          className={`border rounded-md mb-2 p-3 bg-white ${
            snapshot.isDragging ? 'shadow-lg' : ''
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div {...provided.dragHandleProps}>
                <MdDragIndicator className="text-gray-400 mr-2 cursor-move" />
              </div>
              {icon}
              <span className="ml-2 font-medium">{formatFieldName(name)}</span>
            </div>
            <div className="flex items-center">
              <button
                className="text-gray-400 hover:text-blue-500 mr-2"
                onClick={() => onEdit(name)}
                title="Edit field"
              >
                <FiEdit />
              </button>
              <button
                className="text-gray-400 hover:text-blue-500"
                onClick={() => onToggleVisibility(name)}
                title={isHidden ? "Show field" : "Hide field"}
              >
                {isHidden ? (
                  <span className="text-gray-400">Hidden</span>
                ) : (
                  <span className="text-green-500">Visible</span>
                )}
              </button>
            </div>
          </div>
          {/* Display options below the field name */}
          <div className="pl-8 text-gray-500 text-sm">
            {options.map((option, i) => (
              <div key={i}>{option}</div>
            ))}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default FieldContainer;
