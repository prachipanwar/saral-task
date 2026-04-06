import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { EVENT_TYPES, DURATION_OPTIONS } from "./constants";

export default function EventSelector({
  value,
  config,
  onChange,
  open,
  setOpen,
  resetForm
}) {
  const updateConfig = (key, val) => {
    onChange({
      type: value,
      config: {
        ...config,
        [key]: val,
      },
    });
  };

  function getLabel() {
    switch (value) {
      case EVENT_TYPES.SALES:
        return config.amount
          ? `Cross $${config.amount} in sales`
          : "Cross $X in sales";

      case EVENT_TYPES.POSTS:
        return config.count && config.duration
          ? `Posts ${config.count} times every ${config.duration}`
          : "Posts X times every Y period";

      case EVENT_TYPES.ONBOARD:
        return "Is onboarded";

      default:
        return "Select an event";
    }
  }

  function isValid() {
    if (value === EVENT_TYPES.SALES) return config.amount;

    if (value === EVENT_TYPES.POSTS) return config.count && config.duration;

    if (value === EVENT_TYPES.ONBOARD) return true;

    return false;
  }

  return (
    <div className="space-y-2">
      <p className="text-sm">Reward event <span className="text-red-400">*</span></p>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="w-full border rounded-md px-3 py-2 text-left">
            {getLabel()}
          </button>
        </PopoverTrigger>

        <PopoverContent className="space-y-2 w-72">
          <div
            className="cursor-pointer"
            onClick={() =>
              onChange({
                type: EVENT_TYPES.SALES,
                config: {},
              })
            }
          >
            Cross $X in sales
          </div>

          {value === EVENT_TYPES.SALES && (
            <Input
              placeholder="enter amount"
              value={config.amount || ""}
              onChange={(e) => updateConfig("amount", e.target.value)}
            />
          )}

          <div
            className="cursor-pointer"
            onClick={() =>
              onChange({
                type: EVENT_TYPES.POSTS,
                config: {},
              })
            }
          >
            Posts X times every Y period
          </div>

          {value === EVENT_TYPES.POSTS && (
            <div className="flex gap-2">
              <Input
                placeholder="eg.4"
                value={config.count || ""}
                onChange={(e) => updateConfig("count", e.target.value)}
              />

              <Select onValueChange={(val) => updateConfig("duration", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="duration" />
                </SelectTrigger>

                <SelectContent>
                  {DURATION_OPTIONS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div
            className="cursor-pointer"
            onClick={() =>
              onChange({
                type: EVENT_TYPES.ONBOARD,
                config: {},
              })
            }
          >
            Is onboarded
          </div>

          <div className="flex gap-3 pt-3">
            <Button
              variant="outline"
              className="flex-1 h-10 border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => {resetForm(); setOpen(false)}}
            >
              Cancel
            </Button>

            <Button
              disabled={!isValid()}
              className="flex-1 h-10 text-white 
             bg-gradient-to-r from-pink-500 to-purple-600
             hover:from-pink-600 hover:to-purple-700
             disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => setOpen(false)}
            >
              Save
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
