interface SelectedBadgeProps {
  option: string;
  onRemove: (option: string) => void;
}

export const SelectedBadge = ({ option, onRemove }: SelectedBadgeProps) => {
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemove(option);
  };

  return (
    <div className="inline-flex items-center bg-[#E1E6EB] text-gray-800 text-sm font-medium px-2.5 py-1.5 rounded-[3px]">
      {option}
      <button
        onClick={handleRemove}
        className="ml-2 text-[#6D7886] hover:text-gray-800"
      >
        &times;
      </button>
    </div>
  );
};
