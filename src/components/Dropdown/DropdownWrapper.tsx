interface DropdownWrapperProps {
  children: React.ReactNode;
}
export const DropdownWrapper = ({ children }: DropdownWrapperProps) => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#E6E6E9]">
      {children}
    </div>
  );
};
