import React from "react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "ModelContainer") {
      onClose();
    }
  };

  if (isOpen !== true) return null;
  return (
    <div
      id="ModelContainer"
      onClick={handleCloseModal}
      className="fixed inset-0 bg-black flex justify-center items-center bg-opacity-60 backdrop-blur-sm"
    >
      <div className="p-2 bg-white w-10/12 md:w-1/2 lg:1/3 shadow-inner border-e-emerald-600 rounded-lg py-5">
        <div className="w-full p-3 justify-center items-center">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
