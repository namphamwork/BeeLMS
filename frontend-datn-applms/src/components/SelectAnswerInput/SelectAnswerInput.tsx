// SelectAnswerInput.tsx
import React from "react";
import Select from "react-select";

interface SelectAnswerInputProps {
  options: string[];
  values: string[];
  onChange: (selectedAnswers: string[]) => void;
}

const SelectAnswerInput: React.FC<SelectAnswerInputProps> = ({
  options,
  values,
  onChange,
}) => {
  const selectOptions = options.map((option) => ({
    value: option,
    label: option,
  }));

  const selectedOptions = values.map((value) => ({
    value,
    label: value,
  }));

  return (
    <Select
      options={selectOptions}
      value={selectedOptions}
      isMulti
      onChange={(selectedOptions) =>
        onChange(selectedOptions.map((option) => option.value))
      }
      isSearchable
      placeholder="Select answer(s)"
    />
  );
};

export default SelectAnswerInput;
