import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div 
        className="relative bg-purple-700 text-white p-6 rounded-lg w-[800px] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-xl bg-transparent border-none cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
