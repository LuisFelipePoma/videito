import * as React from "react";

interface TabToggleProps {
  tabs: { value: string; label: string }[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

export function TabToggle({
  tabs,
  value,
  setValue,
  className,
}: TabToggleProps) {
  const handleTabClick = (value: string) => {
    setValue(value);
  };

  return (
    <div
      className={`flex w-full rounded-md overflow-hidden p-1
		bg-muted
	${className}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabClick(tab.value)}
          className={`flex-1 p-1 text-center transition-colors rounded-md ${
            value === tab.value
              ? "bg-primary-foreground text-gray-800 font-medium shadow-sm"
              : " hover:bg-gray-100 text-gray-600"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
