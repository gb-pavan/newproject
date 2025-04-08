import React, { useState } from 'react';

const ToggleSwitch = ({ label, value, onChange }: { label: string; value: boolean; onChange: (val: boolean) => void }) => {
  return (
    <label className="flex items-center gap-4 cursor-pointer select-none">
      <span>{label}</span>
      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${value ? 'bg-blue-600' : 'bg-gray-400'}`}
        onClick={() => onChange(!value)}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${value ? 'translate-x-6' : 'translate-x-0'}`}
        ></div>
      </div>
      <span>{value ? 'True' : 'False'}</span>
    </label>
  );
};

export default ToggleSwitch;