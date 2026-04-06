import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

export default function TimeBoundSelector({
  value,
  date,
  onToggle,
  onDateChange,
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <p className="text-sm">
          Make the reward time bound <br />
          <span className="text-xs text-gray-500">
            Choose an end date to stop this reward automatically.
          </span>
        </p>

        <Switch checked={value} onCheckedChange={onToggle} />
      </div>

      {value && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              {date ? date.toDateString() : "Select date"}
            </Button>
          </PopoverTrigger>

          <PopoverContent>
            <Calendar mode="single" selected={date} onSelect={onDateChange} 
              className="rounded-xs border [--cell-size:--spacing(9)]"
              />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
