import { FC } from "react";

interface ChipProps {
  label: string;
  onDelete: () => void;
}

const Chip: FC<ChipProps> = ({ label, onDelete }) => {
  return (
    <div className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium py-1 px-2 mr-1 mb-1 rounded-full">
      {label}
      <button
        onClick={onDelete}
        className="ml-2 text-blue-800 hover:text-blue-600 focus:outline-none"
      >
        &times;
      </button>
    </div>
  );
};

export default Chip;
