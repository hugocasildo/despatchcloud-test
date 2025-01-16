interface DropdownLabelProps {
  htmlFor: string;
  label: string;
}

export const DropdownLabel = ({ htmlFor, label }: DropdownLabelProps) => {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-[#3D444E] mb-2">
      {label}
    </label>
  );
};
