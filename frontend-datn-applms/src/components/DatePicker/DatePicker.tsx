import React, { useEffect, useState } from "react";
import {
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

interface DatePickerProps {
  label: string;
  value?: Date;
  onChange?: (date?: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange }) => {
  const [date, setDate] = useState<Date | undefined>(value);

  useEffect(() => {
    setDate(value);
  }, [value]);

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);

    if (onChange) {
      onChange(newDate);
    }
  };
  return (
    <div className="w-full">
      <Popover placement="bottom">
        <PopoverHandler>
          <Input
            label={label}
            onChange={() => null}
            value={date ? format(date, "PPP") : ""}
            crossOrigin={undefined}
          />
        </PopoverHandler>
        <PopoverContent placeholder="">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={(day: Date | undefined) => handleDateChange(day as Date)}
            showOutsideDays
            className="border-0 w-full"
            classNames={{
              // ... (rest of the classNames)
              day: "h-12 w-12 p-0 font-normal", // Tăng kích thước của ngày
            }}
            components={{
              IconLeft: ({ ...props }) => (
                <ChevronLeftIcon {...props} className="h-6 w-6 stroke-2" />
              ),
              IconRight: ({ ...props }) => (
                <ChevronRightIcon {...props} className="h-6 w-6 stroke-2" />
              ),
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
