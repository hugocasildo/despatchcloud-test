import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  DropdownWrapper,
  DropdownLabel,
  DropdownInput,
  SelectedBadge,
  DropdownMenu,
} from '../components';

export const Dropdown = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const PLACEHOLDER = 'Type to search...';

  const options = [
    'Line chart',
    'Area chart',
    'Column chart',
    'Bar chart',
    'Pie chart',
    'Scatter chart',
    'Bubble chart',
  ];

  const filteredOptions = useMemo(() => {
    return searchValue
      ? options.filter((option) =>
        option.toLowerCase().includes(searchValue.toLowerCase())
      )
      : [];
  }, [searchValue, options]);


  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setHighlightedIndex(0);
  }, []);

  const handleSelect = (option: string) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
    setSearchValue('');
  };

  const handleRemoveBadge = (option: string) => {
    setSelectedOptions(selectedOptions.filter((selected) => selected !== option));
  };

  const highlightMatch = (option: string, query: string, isHighlighted: boolean) => {
    if (!query) return option;
    const regex = new RegExp(`(${query})`, 'gi');
    return option.replace(
      regex,
      (match) =>
        `<span class="${isHighlighted ? 'font-bold underline' : 'underline'}">${match}</span>`
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) =>
        prevIndex >= filteredOptions.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) =>
        prevIndex === 0 ? filteredOptions.length - 1 : Math.max(prevIndex - 1, 0)
      );
    } else if (e.key === 'Enter') {
      const selectedOption = filteredOptions[highlightedIndex] || searchValue;
      if (selectedOption && selectedOption !== '(new value)') {
        handleSelect(selectedOption);
      }
    } else if (e.ctrlKey && e.key === 'a') {
      e.preventDefault();
      const allOptions = Array.from(new Set([...selectedOptions, ...options]));
      setSelectedOptions(allOptions);
    }
  };

  useEffect(() => {
    // If you select any option and type something, the selected option will be the first option
    if (searchValue && filteredOptions.length === 0) {
      setHighlightedIndex(0); // Highlight new value
    }
  }, [searchValue, filteredOptions.length]);

  return (
    <DropdownWrapper>
      <div className="w-[560px] p-4 h-64">
        <DropdownLabel htmlFor="chart-type" label="Chart type" />
        <div className="relative">
          <div className="flex flex-wrap gap-1 items-center border-2 border-gray-300 bg-white rounded-md px-1 py-1 focus-within:ring-2 focus-within:ring-[#026EAB] focus-within:border-[#026EAB]">
            {selectedOptions.map((option, index) => (
              <SelectedBadge key={`selected-badge-${index}`} option={option} onRemove={handleRemoveBadge} />
            ))}
            <DropdownInput
              value={searchValue}
              placeholder={PLACEHOLDER}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          {searchValue.length > 0 && (
            <DropdownMenu
              options={filteredOptions}
              highlightedIndex={highlightedIndex}
              onSelect={handleSelect}
              searchValue={searchValue}
              highlightMatch={highlightMatch}
            />
          )}
        </div>
      </div>
    </DropdownWrapper>
  );
};

