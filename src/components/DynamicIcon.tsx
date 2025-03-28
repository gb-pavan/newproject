// import { GoPerson, GoHome } from "react-icons/go";

// const icons = {
//   GoPerson,
//   GoHome,
// };

// interface IconProps {
//   name: keyof typeof icons; // Ensure only valid icon names can be used
//   size?: number;
//   className?: string;
// }

// const DynamicIcon: React.FC<IconProps> = ({ name, size = 24, className }) => {
//   const IconComponent = icons[name];

//   if (!IconComponent) {
//     return null; // Handle case where icon is not found
//   }

//   return <IconComponent className={className} size={size} />;
// };

// export default DynamicIcon;

import { GoPerson, GoHome } from "react-icons/go";

const icons = {
  GoPerson,
  GoHome,
};

interface IconProps {
  name: string; // Allow dynamic string values
  size?: number;
  className?: string;
}

const DynamicIcon: React.FC<IconProps> = ({ name, size = 24, className }) => {
  const IconComponent = name in icons ? icons[name as keyof typeof icons] : null;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent className={className} size={size} />;
};

export default DynamicIcon;
