// "use client";
// import { FormField, RegionOption } from "@/interfaces/form.interface";
// import { FormInstance } from "@/services/form.service";
// import { handleError } from "@/utils/helpers";
// import { AxiosError } from "axios";
// import React, { useState } from "react";
// import toast from 'react-hot-toast';

// interface DynamicFormProps {
//   fields: FormField[];
//   onSubmit: (data: Record<string, string>) => void;
// }

// const reg = [
//   {
//       "_id": "67cb186197eb04cf8489c916",
//       "name": "mpregion"
//   },
//   {
//       "_id": "67cc718c3020ecfe736f85c5",
//       "name": "upregion"
//   }
// ];

// const DynamicForm: React.FC<DynamicFormProps> = ({ fields }) => {
//   const [formData, setFormData] = useState<Record<string, string>>({});
//   const [regionOptions, setRegionOptions] = useState<RegionOption[]>([]);
//   console.log("regions",regionOptions);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { name, phone, ...rest } = formData;
//     const payload = {
//       name,
//       phone,
//       fields: { ...rest },
//     };
//     await FormInstance.submitForm(payload)
//     toast.success('Form submitted successfully');
//     setFormData({});
//   };

//   const fetchRegions = async () => {
//     try {
//       const response: RegionOption[] = await FormInstance.getRegions();
//       setRegionOptions(response);
//     } catch (error) {
//       handleError(error as AxiosError,true);
//     }
//   };

//   const additionalFields: FormField[] = [
//     { _id: "name", name: "name", type: "text" },
//     { _id: "phone", name: "phone", type: "text" },
//     // { _id: "region", name: "region", type: "DROPDOWN" },
//   ];

//   return (
//     <form onSubmit={handleSubmit} className="p-4 w-full mx-auto bg-white shadow-lg rounded-lg">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {[...additionalFields, ...fields].map((field) => (
//           <div key={field._id} className="flex flex-col">
//             <label className="font-semibold text-gray-700 capitalize">
//               {field.name.replace(/([A-Z])/g, " $1")}
//             </label>
//             {field.type === "DROPDOWN" && field.name === "region" ? (
//               <select
//                 name={field.name}
//                 onChange={handleChange}
//                 onClick={fetchRegions}
//                 className="border p-2 rounded-md"
//               >
//                 <option value="">Select {field.name}</option>
//                 {reg.map((option) => (
//                   <option key={option._id} value={option._id}>
//                     {option.name}
//                   </option>
//                 ))}
//               </select>
//             ) : field.type === "DROPDOWN" && field.options ? (
//               <select
//                 name={field.name}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md"
//               >
//                 <option value="">Select {field.name}</option>
//                 {field.options.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <input
//                 type={field.type.toLowerCase()}
//                 name={field.name}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md"
//                 placeholder={`Enter ${field.name}`}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//       <button type="submit" className="flex justify-center min-w-[120px] mx-auto bg-blue-500 text-white p-2 rounded-md mt-4">
//         Submit
//       </button>    
//     </form>
//   );
// };

// export default DynamicForm;

"use client";
import { FormField, RegionOption } from "@/interfaces/form.interface";
import { FormInstance } from "@/services/form.service";
import { handleError } from "@/utils/helpers";
import { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
}

const reg = [
  {
    _id: "67cb186197eb04cf8489c916",
    name: "mpregion",
  },
  {
    _id: "67cc718c3020ecfe736f85c5",
    name: "upregion",
  },
];

const DynamicForm: React.FC<DynamicFormProps> = ({ fields }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [regionOptions, setRegionOptions] = useState<RegionOption[]>([]);
  console.log("regionOptions",regionOptions);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const { name, phone, ...rest } = formData;
  //   const payload = {
  //     name,
  //     phone,
  //     fields: { ...rest },
  //   };
  //   try {
  //     await FormInstance.submitForm(payload);
  //     toast.success("Form submitted successfully");
  //     setFormData({}); // ✅ Clear form state
  //   } catch (error) {
  //     toast.error('Something went wrong!');
  //     handleError(error as AxiosError, true);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, phone, ...rest } = formData;
    const payload = {
      name,
      phone,
      fields: { ...rest },
    };

    try {
      await toast.promise(
        FormInstance.submitForm(payload),
        {
          loading: 'Submitting form...',
          success: 'Form submitted successfully!',
          error: 'Submission failed!',
        }
      );

      setFormData({}); // ✅ Clear form after success
    } catch (error) {
      handleError(error as AxiosError, true); // Optional: detailed error logging
    }
  };


  const fetchRegions = async () => {
    try {
      const response: RegionOption[] = await FormInstance.getRegions();
      setRegionOptions(response);
    } catch (error) {
      handleError(error as AxiosError, true);
    }
  };

  const additionalFields: FormField[] = [
    { _id: "name", name: "name", type: "text" },
    { _id: "phone", name: "phone", type: "text" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 w-full mx-auto bg-white shadow-lg rounded-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...additionalFields, ...fields].map((field) => (
          <div key={field._id} className="flex flex-col">
            {/* <label className="font-semibold text-gray-700 capitalize">
              {field.name.replace(/([A-Z])/g, " $1")}
            </label> */}
            <label className="font-semibold text-gray-700 capitalize">
              {field.name.replace(/([A-Z])/g, " $1")}
              {(field.name === "name" || field.name === "phone" || field.required) && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>


            {field.type === "DROPDOWN" && field.name === "region" ? (
              <select
                name={field.name}
                value={formData[field.name] || ""} // ✅ controlled
                onChange={handleChange}
                onClick={fetchRegions}
                className="border p-2 rounded-md"
              >
                <option value="">Select {field.name}</option>
                {reg.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
            ) : field.type === "DROPDOWN" && field.options ? (
              <select
                name={field.name}
                value={formData[field.name] || ""} // ✅ controlled
                onChange={handleChange}
                className="border p-2 rounded-md"
              >
                <option value="">Select {field.name}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type.toLowerCase()}
                name={field.name}
                value={formData[field.name] || ""} // ✅ controlled
                onChange={handleChange}
                className="border p-2 rounded-md"
                placeholder={`Enter ${field.name}`}
              />
            )}
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="flex justify-center min-w-[120px] mx-auto bg-blue-500 text-white p-2 rounded-md mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;



