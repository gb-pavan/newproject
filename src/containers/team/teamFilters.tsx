'use client';
// File: src/containers/TeamFilter/components/TeamHeader.tsx
import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { FaUserTie, FaHeadset, FaUserShield, FaBullhorn, FaLock } from 'react-icons/fa';
import MyDropdown from '@/components/MyDropdown';

export interface UserMeta {
  role?: string;
  department?: string;
  isDeleted?: boolean;
}

export interface TeamFiltersProps {
  // userMeta: UserMeta
  // setUserMeta: (meta: UserMeta) => void; // ✅ this is totally fine
  setUserMeta: React.Dispatch<React.SetStateAction<UserMeta>>;

}


const TeamFilters:React.FC<TeamFiltersProps> = ({setUserMeta}) => {
  // State for selected values
  // const [selectedStatus, setSelectedStatus] = useState<string>('Active');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('');
  const [selectedPermission, setSelectedPermission] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Active Status dropdown options with icons
  // const activeStatusOptions = [
  //   { value: 'All', label: 'All', icon: <FaUserShield className="h-4 w-4 mr-2" /> },
  //   { value: 'Active', label: 'Active', icon: <FaUserShield className="h-4 w-4 mr-2" /> },
  //   { value: 'Inactive', label: 'Inactive', icon: <FaUserShield className="h-4 w-4 mr-2" /> },
  // ];

  // Role dropdown options
  const roleOptions = [
    { value: 'All', label: 'All', icon: <FaUserShield className="h-4 w-4 mr-2" /> },
    { value: 'root', label: 'Root', icon: <FaUserShield className="h-4 w-4 mr-2" /> },
    { value: 'admin', label: 'Admin', icon: <FaUserShield className="h-4 w-4 mr-2" /> },
    { value: 'manager', label: 'Manager', icon: <FaUserTie className="h-4 w-4 mr-2" /> },
    { value: 'caller', label: 'Caller', icon: <FaHeadset className="h-4 w-4 mr-2" /> },
    { value: 'marketing', label: 'Marketing', icon: <FaBullhorn className="h-4 w-4 mr-2" /> }
  ];

  const DeptOptions = [
    { value: 'All', label: 'All', icon: <FaUserShield className="h-4 w-4 mr-2" /> },
    { value: 'Sales', label: 'Sales', icon: <FaUserTie className="h-4 w-4 mr-2" /> },
    { value: 'Marketing', label: 'Marketing', icon: <FaBullhorn className="h-4 w-4 mr-2" /> },
    { value: 'Support', label: 'Support', icon: <FaBullhorn className="h-4 w-4 mr-2" /> }
  ];

  // Permission Template dropdown options
  const permissionTemplateOptions = [
    { value: 'all', label: 'All', icon: <FaLock className="h-4 w-4 mr-2" /> },
    { value: 'default-caller', label: 'Default Caller Permissions', icon: <FaLock className="h-4 w-4 mr-2" /> },
    { value: 'default-manager', label: 'Default Manager Permissions', icon: <FaLock className="h-4 w-4 mr-2" /> },
    { value: 'default-admin', label: 'Default Admin Permissions', icon: <FaLock className="h-4 w-4 mr-2" /> },
    { value: 'default-root', label: 'Default Root Permissions', icon: <FaLock className="h-4 w-4 mr-2" /> }
  ];

  // const handleActiveStatusChange = (value: string) => {
  //   setSelectedStatus(value);
  //   console.log('Active status changed:', value);
  // };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    // setUserMeta({ ...userMeta, role: value });
    setUserMeta(prev => ({ ...prev, role: value }));
  };

  const handleDeptChange = (value: string) => {
    setSelectedDept(value);
    // setUserMeta({ ...userMeta, role: value });
    setUserMeta(prev => ({ ...prev, role: value }));
  };

  const handlePermissionChange = (value: string) => {
    setSelectedPermission(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setUserMeta(prev => ({...prev ,search:e.target.value }));
  };


 

  return (
    <div className="bg-white border-b">
      <div className="p-4">
        
        <div className="flex items-center gap-2">
          <div className="relative grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoSearchOutline className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search team members by name or email"
              value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md w-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Filter controls - using the new MyDropdown component */}
          <div className="flex items-center gap-2">
            {/* Active status dropdown */}
            {/* <MyDropdown 
              options={activeStatusOptions}
              defaultValue={selectedStatus}
              placeholder="Active"
              icon={<FaCheck className="h-4 w-4 text-gray-500" />}
              onSelect={handleActiveStatusChange}
            /> */}

            <MyDropdown 
              options={DeptOptions}
              defaultValue={selectedDept}
              placeholder="Department"
              icon={<FaUserTie className="h-4 w-4 text-gray-500" />}
              onSelect={handleDeptChange}
            />
            
            {/* Role dropdown */}
            <MyDropdown 
              options={roleOptions}
              defaultValue={selectedRole}
              placeholder="Role"
              icon={<FaUserTie className="h-4 w-4 text-gray-500" />}
              onSelect={handleRoleChange}
            />

            {/* Permission Template dropdown */}
            <MyDropdown 
              options={permissionTemplateOptions}
              defaultValue={selectedPermission}
              placeholder="Permission Template"
              icon={<FaLock className="h-4 w-4 text-gray-500" />}
              onSelect={handlePermissionChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamFilters;