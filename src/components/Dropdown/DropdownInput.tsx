interface DropdownInputProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const DropdownInput = ({ value, placeholder, onChange, onKeyDown }: DropdownInputProps) => {

  return (
    <input
      type="text"
      className="flex-grow px-1 py-1 border-none focus:outline-none"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};
