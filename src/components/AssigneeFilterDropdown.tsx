// import React, { useState } from 'react';
// import { Check } from 'lucide-react';

// const sampleUsers = [
//   {
//     _id: '67f8f1dd20aa75c3b96889dc',
//     name: 'Vanshika Oniyal',
//     email: 'vanshika@intellisoft.com',
//   },
//   {
//     _id: '67f8f1dd20aa75c3b96889dd',
//     name: 'Prashant Kumar',
//     email: 'prashant.kumar@intellisoft.com',
//   },
//   {
//     _id: '67f8f1dd20aa75c3b96889de',
//     name: 'Nayib Shafi',
//     email: 'nayib.shafi@intellisoft.com',
//   },
//   {
//     _id: '67f8f1dd20aa75c3b96889df',
//     name: 'Manish Kumar',
//     email: 'manish.kumar@intellisoft.com',
//   },
// ];

// const MultiSelectDropdown = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [search, setSearch] = useState('');

//   const handleToggleOption = (id) => {
//     if (selectedIds.includes(id)) {
//       setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
//     } else {
//       setSelectedIds([...selectedIds, id]);
//     }
//   };

//   const handleSelectAll = () => {
//     if (selectedIds.length === filteredUsers.length) {
//       setSelectedIds([]);
//     } else {
//       setSelectedIds(filteredUsers.map((u) => u._id));
//     }
//   };

//   const filteredUsers = sampleUsers.filter(
//     (user) =>
//       user.name.toLowerCase().includes(search.toLowerCase()) ||
//       user.email.toLowerCase().includes(search.toLowerCase())
//   );

//   const selectedOptions = sampleUsers.filter((option) => selectedIds.includes(option._id));

//   const getInitials = (name) =>
//     name
//       .split(' ')
//       .map((word) => word[0]?.toUpperCase())
//       .join('');

//   return (
//     <div className="p-4 max-w-sm mx-auto">
//       <div className="relative w-full">
//         <div
//           className="border rounded p-2 flex flex-wrap gap-2 cursor-pointer"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {selectedOptions.map((option) => (
//             <div
//               key={option._id}
//               className="w-8 h-8 rounded-full bg-violet-200 text-violet-800 font-semibold flex items-center justify-center text-xs"
//             >
//               {getInitials(option.name)}
//             </div>
//           ))}
//           <input
//             className="flex-grow focus:outline-none"
//             placeholder={selectedOptions.length === 0 ? 'Select users...' : ''}
//             readOnly
//           />
//         </div>

//         {isOpen && (
//           <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow">
//             <div className="p-2 border-b sticky top-0 bg-white">
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search"
//                 className="w-full p-1 border rounded focus:outline-none"
//               />
//             </div>
//             <div className="p-2 text-sm text-gray-700 font-medium">Active users</div>
//             <div
//               className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm font-medium flex items-center gap-2"
//               onClick={handleSelectAll}
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedIds.length === filteredUsers.length}
//                 readOnly
//               />
//               Select All
//             </div>
//             <div className="max-h-60 overflow-y-auto">
//               {filteredUsers.map((option) => (
//                 <div
//                   key={option._id}
//                   className={`px-4 py-2 cursor-pointer flex items-start gap-3 hover:bg-gray-100 ${
//                     selectedIds.includes(option._id) ? 'bg-gray-100' : ''
//                   }`}
//                   onClick={() => handleToggleOption(option._id)}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedIds.includes(option._id)}
//                     onChange={() => handleToggleOption(option._id)}
//                   />
//                   <div>
//                     <div className="font-medium text-sm">{option.name}</div>
//                     <div className="text-xs text-gray-600 truncate max-w-[180px]">{option.email}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       <p className="mt-4">Selected IDs: {JSON.stringify(selectedIds)}</p>
//     </div>
//   );
// };

// export default MultiSelectDropdown;

// import React, { useState } from 'react';

// const sampleUsers = [
//   {
//     _id: '1',
//     name: 'Vanshika Oniyal',
//     email: 'vanshika@intellisoft.com',
//     isDeleted: false,
//     role: 'executive',
//     depth: 0,
//   },
//   {
//     _id: '2',
//     name: 'Prashant Kumar',
//     email: 'prashant.kumar@intellisoft.com',
//     isDeleted: false,
//     role: 'executive',
//     depth: 0,
//   },
//   {
//     _id: '3',
//     name: 'Nayib Shafi',
//     email: 'nayib.shafi@intellisoft.com',
//     isDeleted: true,
//     role: 'executive',
//     depth: 0,
//   },
//   {
//     _id: '4',
//     name: 'Manish Kumar',
//     email: 'manish.kumar@intellisoft.com',
//     isDeleted: true,
//     role: 'executive',
//     depth: 0,
//   },
// ];

// const groupUsersByDeleted = (users) => {
//   return [
//     {
//       label: 'Active',
//       options: users.filter((user) => !user.isDeleted),
//     },
//     {
//       label: 'Deleted',
//       options: users.filter((user) => user.isDeleted),
//     },
//   ];
// };

// const groupedOptions = groupUsersByDeleted(sampleUsers);

// const MultiSelectDropdown = ({ groups }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [search, setSearch] = useState('');

//   const getInitials = (name) =>
//     name
//       .split(' ')
//       .map((word) => word[0]?.toUpperCase())
//       .join('');

//   const handleToggleOption = (id) => {
//     if (selectedIds.includes(id)) {
//       setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
//     } else {
//       setSelectedIds([...selectedIds, id]);
//     }
//   };

//   const handleSelectAll = (options) => {
//     const allIds = options.map((o) => o._id);
//     const allSelected = allIds.every((id) => selectedIds.includes(id));

//     if (allSelected) {
//       setSelectedIds(selectedIds.filter((id) => !allIds.includes(id)));
//     } else {
//       setSelectedIds([...new Set([...selectedIds, ...allIds])]);
//     }
//   };

//   const selectedOptions = groups.flatMap((group) =>
//     group.options.filter((option) => selectedIds.includes(option._id))
//   );

//   return (
//     <div className="p-4 max-w-sm mx-auto">
//       <div className="relative w-full">
//         <div
//           className="border rounded p-2 flex flex-wrap gap-2 cursor-pointer"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {selectedOptions.map((option) => (
//             <div
//               key={option._id}
//               className="w-8 h-8 rounded-full bg-violet-200 text-violet-800 font-semibold flex items-center justify-center text-xs"
//             >
//               {getInitials(option.name)}
//             </div>
//           ))}
//           <input
//             className="flex-grow focus:outline-none"
//             placeholder={selectedOptions.length === 0 ? 'Select users...' : ''}
//             readOnly
//           />
//         </div>

//         {isOpen && (
//           <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow">
//             <div className="p-2 border-b sticky top-0 bg-white">
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search"
//                 className="w-full p-1 border rounded focus:outline-none"
//               />
//             </div>
//             <div className="max-h-60 overflow-y-auto">
//               {groups.map((group) => {
//                 const filtered = group.options.filter(
//                   (user) =>
//                     user.name.toLowerCase().includes(search.toLowerCase()) ||
//                     user.email.toLowerCase().includes(search.toLowerCase())
//                 );
//                 return (
//                   <div key={group.label}>
//                     <div className="p-2 text-sm font-semibold text-gray-700">{group.label}</div>
//                     <div
//                       className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm font-medium flex items-center gap-2"
//                       onClick={() => handleSelectAll(filtered)}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={filtered.every((u) => selectedIds.includes(u._id))}
//                         readOnly
//                       />
//                       Select All
//                     </div>
//                     {filtered.map((option) => (
//                       <div
//                         key={option._id}
//                         className={`px-4 py-2 cursor-pointer flex items-start gap-3 hover:bg-gray-100 ${
//                           selectedIds.includes(option._id) ? 'bg-gray-100' : ''
//                         }`}
//                         onClick={() => handleToggleOption(option._id)}
//                       >
//                         <input
//                           type="checkbox"
//                           checked={selectedIds.includes(option._id)}
//                           onChange={() => handleToggleOption(option._id)}
//                         />
//                         <div>
//                           <div className="font-medium text-sm">{option.name}</div>
//                           <div className="text-xs text-gray-600 truncate max-w-[180px]">{option.email}</div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>

//       <p className="mt-4">Selected IDs: {JSON.stringify(selectedIds)}</p>
//     </div>
//   );
// };

// export default function App() {
//   return <MultiSelectDropdown groups={groupedOptions} />;
// }


import React, { useState } from 'react';

type User = {
  _id: string;
  name: string;
  email: string;
  isDeleted: boolean;
  role: string;
  depth: number;
};

type Group = {
  label: string;
  options: User[];
};

type Props = {
  groups: Group[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
};

const GroupedMultiSelect: React.FC<Props> = ({ groups, selectedIds, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((w) => w[0]?.toUpperCase())
      .join('');

  const toggleOption = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const selectAll = (options: User[]) => {
    const ids = options.map((o) => o._id);
    const allSelected = ids.every((id) => selectedIds.includes(id));
    onChange(
      allSelected
        ? selectedIds.filter((id) => !ids.includes(id))
        : [...new Set([...selectedIds, ...ids])]
    );
  };

  const filteredGroups = groups.map((group) => ({
    label: group.label,
    options: group.options.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <div className="w-full max-w-sm z-100">
      <div className="relative">
        <div
          className="border rounded p-2 flex flex-wrap gap-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {groups
            .flatMap((g) => g.options)
            .filter((user) => selectedIds.includes(user._id))
            .map((user) => (
              <div
                key={user._id}
                className="w-8 h-8 rounded-full bg-violet-200 text-violet-800 font-semibold flex items-center justify-center text-xs"
              >
                {getInitials(user.name)}
              </div>
            ))}
          <input className="flex-grow focus:outline-none" placeholder="Select users..." readOnly />
        </div>

        {isOpen && (
          <div className="absolute z-20 w-full mt-1 bg-white border rounded shadow">
            <div className="p-2 sticky top-0 bg-white border-b">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="w-full p-1 border rounded focus:outline-none"
              />
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredGroups.map((group) => (
                <div key={group.label}>
                  <div className="p-2 text-sm font-semibold text-gray-700">{group.label}</div>
                  <div
                    className="px-4 py-2 text-sm font-medium flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => selectAll(group.options)}
                  >
                    <input
                      type="checkbox"
                      readOnly
                      checked={group.options.every((u) => selectedIds.includes(u._id))}
                    />
                    Select All
                  </div>
                  {group.options.filter((user) => user.name !== 'Select All').map((user) => (
                    <div
                      key={user._id}
                      className="px-4 py-2 flex gap-2 items-start hover:bg-gray-100 cursor-pointer"
                      onClick={() => toggleOption(user._id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(user._id)}
                        onChange={() => toggleOption(user._id)}
                      />
                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-gray-600 truncate max-w-[180px]">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupedMultiSelect;


