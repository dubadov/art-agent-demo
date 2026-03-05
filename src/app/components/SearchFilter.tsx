"use client";

interface FilterOption {
  value: string;
  label: string;
}

interface SearchFilterProps {
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters: {
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  }[];
}

export default function SearchFilter({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  filters,
}: SearchFilterProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <svg
            className="absolute inset-e-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pe-10 ps-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-sm"
          />
        </div>

        {filters.map((filter, i) => (
          <select
            key={i}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-sm min-w-[150px]"
          >
            <option value="">{filter.label}</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}
      </div>
    </div>
  );
}
