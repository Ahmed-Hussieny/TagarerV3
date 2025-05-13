import { useState, useRef, useEffect } from "react";

interface DropdownItem {
  value: string;
  label: string;
  count:number;
}

const Dropdown = ({
  label,
  options,
  selectedValue,
  onChange,
}: {
  label?: string;
  options: DropdownItem[];
  selectedValue: string;
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  function normalizeArabic(text: string = "") {
    return text
      .toString()
      .replace(/[\u064B-\u065F]/g, "")
      .replace(/ى/g, "ي")
      .replace(/ئ/g, "ي")
      .replace(/أ|إ|آ/g, "ا")
      .replace(/ؤ/g, "و")
      .replace(/ة/g, "ه")
      .replace(/-/g, " ")
      .replace(/ك/g, "ک")
      .replace(/ي/g, "ی")
      .toLowerCase();
  }

  const filteredOptions = options.filter((option) =>
    normalizeArabic(option?.label).includes(normalizeArabic(searchTerm))
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const matched = options.find((opt) => opt.value === selectedValue);
    if (matched) {
      setSearchTerm(matched.label !== "الكل" ? matched.label : "");
    }

  }, [selectedValue, options]);

  const handleSelectOption = (value: string, label: string) => {
    onChange(value);
    setSearchTerm(label !== "الكل" ? label : "");
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        (prev - 1 + filteredOptions.length) % filteredOptions.length
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredOptions[highlightedIndex];
      if (selected) {
        handleSelectOption(selected.value, selected.label);
      }
    }
  };

  return (
    <div className="dropdown relative cursor-pointer" ref={dropdownRef}>
      {/* {label && <label className="block text-gray-700 mb-1">{label}</label>} */}
      <div className="dropdown-container relative text-main_color">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
              setHighlightedIndex(0);
            }}
            onClick={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="w-full bg-white p-2 rounded-lg border border-gray-300 placeholder:text-gray-800"
            placeholder={label}
          />
          <span
            onClick={(e) => {
              e.stopPropagation(); // prevent triggering input onClick
              setIsOpen((prev) => !prev);
            }}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>

        </div>

        {isOpen && (
          <div className="dropdown-menu absolute z-10 bg-white border border-gray-300 max-h-64 overflow-auto rounded-md mt-1 w-full">
            {filteredOptions.length > 0 ? (
              <ul>
                <li
                  key={0}
                  className={`p-2 cursor-pointer ${0 === highlightedIndex ? "bg-gray-200" : ""
                    }`}
                  onClick={() => handleSelectOption('', "")}
                  onMouseEnter={() => setHighlightedIndex(0)}
                >
                  {"الكل"}
                </li>
                {filteredOptions.map((option, index) => (
                  <li
                    key={option.value}
                    className={`p-2 cursor-pointer ${index + 1 === highlightedIndex ? "bg-gray-200" : ""
                      }`}
                    onClick={() => handleSelectOption(option.value, option.label)}
                    onMouseEnter={() => setHighlightedIndex(index + 1)}
                  >
                    {option.label} ({option.count})
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-2 text-gray-500">لا توجد نتائج</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
