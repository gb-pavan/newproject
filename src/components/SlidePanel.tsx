// import { X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { cn } from "@/utils/cn";

// interface SlidingPanelProps {
//   children: React.ReactNode;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const SlidingPanel: React.FC<SlidingPanelProps> = ({ children, isOpen, onClose }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ x: "100%" }}
//           animate={{ x: 0 }}
//           exit={{ x: "100%" }}
//           transition={{ type: "spring", stiffness: 100, damping: 15 }}
//           className={cn(
//             "fixed top-0 right-0 h-full w-fit bg-white shadow-lg z-50 p-4",
//             "dark:bg-gray-900"
//           )}
//         >
//           <button onClick={onClose} className="absolute top-4 left-4 p-2">
//             <X size={24} />
//           </button>
//           <div className="mt-12">{children}</div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default SlidingPanel;

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

interface SlidingPanelProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const SlidingPanel: React.FC<SlidingPanelProps> = ({ children, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-end"
          onClick={onClose} // clicking outside the panel
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className={cn(
              "h-full w-fit bg-white shadow-lg relative p-4",
              "dark:bg-gray-900"
            )}
            onClick={(e) => e.stopPropagation()} // prevent click bubbling
          >
            <button onClick={onClose} className="absolute top-4 left-4 p-2">
              <X size={24} />
            </button>
            <div className="mt-12">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SlidingPanel;

