// import { useState } from "react";
// import { Plus, Trash } from "lucide-react";

// const DynamicInputList = () => {
//   const [inputs, setInputs] = useState([""]);

//   const handleAdd = () => {
//     setInputs([...inputs, ""]);
//   };

//   const handleDelete = (index: number) => {
//     setInputs(inputs.filter((_, i) => i !== index));
//   };

//   const handleChange = (index: number, value: string) => {
//     const newInputs = [...inputs];
//     newInputs[index] = value;
//     setInputs(newInputs);
//   };

//   return (
//     <div className="space-y-2">
//       {inputs.map((input, index) => (
//         <div key={index} className="flex items-center space-x-2 border p-2 rounded">
//           <div className="w-4 h-6 bg-brown-700"></div>
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => handleChange(index, e.target.value)}
//             className="border-red-500 border rounded px-2 py-1 flex-1"
//           />
//           <button onClick={handleAdd} className="text-gray-500 hover:text-gray-700">
//             <Plus size={16} />
//           </button>
//           {inputs.length > 1 && (
//             <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700">
//               <Trash size={16} />
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DynamicInputList;

import { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";

interface DynamicInputListProps {
  onChange?: (values: string[]) => void;
}

const DynamicInputList = ({ onChange }: DynamicInputListProps) => {
  const [inputs, setInputs] = useState([""]);

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(inputs);
    }
  }, [inputs, onChange]);

  const handleAdd = () => {
    setInputs([...inputs, ""]);
  };

  const handleDelete = (index: number) => {
    setInputs(inputs.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  return (
    <div className="space-y-2">
      {inputs.map((input, index) => (
        <div key={index} className="flex items-center space-x-2 border p-2 rounded">
          <div className="w-4 h-6 bg-brown-700"></div>
          <input
            type="text"
            value={input}
            onChange={(e) => handleChange(index, e.target.value)}
            className="border-red-500 border rounded px-2 py-1 flex-1"
          />
          <button onClick={handleAdd} className="text-gray-500 hover:text-gray-700">
            <Plus size={16} />
          </button>
          {inputs.length > 1 && (
            <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700">
              <Trash size={16} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicInputList;
