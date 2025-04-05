// // src/components/ColorPicker.tsx

// import React, { useState } from 'react';
// import { ChromePicker } from 'react-color';

// interface ColorPickerProps {
//   onChange: (color: string) => void;
// }

// const ColorPicker: React.FC<ColorPickerProps> = ({ onChange }) => {
//   const [color, setColor] = useState<string>('#ffffff');

//   const handleColorChange = (color: any) => {
//     const hexColor = color.hex;
//     setColor(hexColor);
//     onChange(hexColor);
//   };

//   return (
//     <div>
//       <ChromePicker color={color} onChangeComplete={handleColorChange} />
//       <div style={{ marginTop: '10px' }}>
//         <strong>Selected Color:</strong> {color}
//       </div>
//     </div>
//   );
// };

// export default ColorPicker;

// src/components/ColorPicker.tsx

import React, { useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';

interface ColorPickerProps {
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onChange }) => {
  const [color, setColor] = useState<string>('#ffffff');

  // Proper type for the color parameter
  const handleColorChange = (color: ColorResult) => {
    const hexColor = color.hex;
    setColor(hexColor);
    onChange(hexColor);
  };

  return (
    <div>
      <ChromePicker color={color} onChangeComplete={handleColorChange} />
      {/* <div style={{ marginTop: '10px' }}>
        <strong>Selected Color:</strong> {color}
      </div> */}
    </div>
  );
};

export default ColorPicker;

