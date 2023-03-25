import { useState } from "react";
import Chip from "./Chip";

interface KeywordInputProps {
  presets: string[];
  chips: string[];
  setChips: React.Dispatch<React.SetStateAction<string[]>>;
  title: string;
  placeholder?: string;
}

const KeywordInput: React.FC<KeywordInputProps> = ({
  presets,
  chips,
  setChips,
  title,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setChips([...chips, inputValue]);
      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "") {
      setChips(chips.slice(0, -1));
    }
  };

  const handleDeleteChip = (index: number) => {
    setChips(chips.filter((_chip, i) => i !== index));
  };

  const handleSelectPreset = (preset: string) => {
    setChips([...chips, preset]);
    setInputValue("");
  };

  const filteredPresets = presets.filter((preset) =>
    preset.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  const maxResults = 8;
  const limitedPresets = filteredPresets.slice(0, maxResults);

  return (
    <div className="relative w-full">
      <p className="self-start font-medium mx-auto sm:w-full max-w-screen-lg">
        {title}
      </p>
      <div className="flex flex-wrap items-center bg-white border border-gray-300 rounded-md shadow-sm focus-within:border-blue-500 focus-within:ring-blue-500 p-2">
        {chips.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            onDelete={() => handleDeleteChip(index)}
          />
        ))}
        <input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyPress}
          className="flex-1 outline-none"
          placeholder={placeholder || "Type a keyword and press enter..."}
        />
      </div>
      <div className="absolute left-0 w-full bg-white shadow-lg border border-gray-200 rounded-md z-10">
        {inputValue !== "" &&
          limitedPresets.map((preset) => (
            <div
              key={preset}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectPreset(preset)}
            >
              {preset}
            </div>
          ))}
      </div>
    </div>
  );
};

export default KeywordInput;
