import React from 'react';

interface DropdownMenuProps {
  options: string[];
  highlightedIndex: number;
  onSelect: (option: string) => void;
  highlightMatch: (option: string, query: string, isHighlighted: boolean) => string;
  searchValue: string;
}

export const DropdownMenu = React.memo(({ options, highlightedIndex, onSelect, highlightMatch, searchValue }: DropdownMenuProps) => {

  const handleOnClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    onSelect(e.currentTarget.innerText);
    console.log(e.currentTarget.innerText);
  };

  return (
    <div>
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-4 h-4 bg-white border-t border-l border-gray-300 rotate-45"></div>
      <div className="absolute z-10 mt-2 w-full bg-white border border-[#C6CCD7] rounded-md shadow-lg">
        <ul>
          {options.length > 0 ? (
            options.map((option, index) => (
              <li
                key={`option-${index}`}
                className={`px-4 py-2 text-sm text-gray-700 cursor-pointer ${index === highlightedIndex ? 'bg-[#E1E6EB] font-bold' : ''
                  } hover:bg-gray-200`}
                onClick={handleOnClick}
                dangerouslySetInnerHTML={{
                  __html: highlightMatch(option, searchValue, index === highlightedIndex)
                }}
              />
            ))
          ) : (
            <li
              className={`px-4 text-sm text-gray-500 cursor-default flex justify-between py-3 ${highlightedIndex === 0 ? 'bg-[#E1E6EB]' : ''
                }`}
            >
              <span className="mr-2">{searchValue}</span> <span className="text-[#6C7987]">(new value)</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
});
