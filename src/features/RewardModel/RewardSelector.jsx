import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TIERS = ["Starter", "Growth", "Pro", "Enterprise"];

export default function RewardSelector({
  reward,
  setReward,
  open,
  setOpen,
  isTierDisabled,
}) {
  function selectType(type) {
    setReward({
      type,
      config: {},
    });
  }

  function updateConfig(key, value) {
    setReward((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        [key]: value,
      },
    }));
  }

  function getLabel() {
    if (reward.type === "bonus" && reward.config.amount)
      return `Flat $${reward.config.amount} bonus`;

    if (reward.type === "tier" && reward.config.tierId)
      return `Upgrade to ${reward.config.tierId}`;

    return "Select a reward";
  }

  function isValid() {
    if (reward.type === "bonus") return reward.config.amount;

    if (reward.type === "tier") return reward.config.tierId;

    return false;
  }

  return (
    <div className="space-y-2">
      <p className="text-sm">
        Reward with
        <span className="text-red-400">*</span>
      </p>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="w-full border rounded-md px-3 py-2 text-left">
            {getLabel()}
          </button>
        </PopoverTrigger>

        <PopoverContent className="space-y-2 w-72">
          {/* BONUS */}

          <div className="cursor-pointer" onClick={() => selectType("bonus")}>
            Flat $X bonus
          </div>

          {reward.type === "bonus" && (
            <Input
              placeholder="$ eg 100"
              value={reward.config.amount || ""}
              onChange={(e) => updateConfig("amount", e.target.value)}
            />
          )}

          {/* TIER */}

          <div
            className={`
                cursor-pointer
                ${isTierDisabled ? "opacity-40 cursor-not-allowed" : ""}
              `}
            onClick={() => {
              if (isTierDisabled) return;

              selectType("tier");
            }}
          >
            Upgrade commission tier
          </div>

          {reward.type === "tier" && !isTierDisabled && (
            <Select
              onValueChange={(value) => updateConfig("tierId", value)}
              value={reward.config.tierId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select tier" />
              </SelectTrigger>

              <SelectContent>
                {TIERS.map((tier) => (
                  <SelectItem key={tier} value={tier}>
                    {tier}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* FOOTER */}

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              disabled={!isValid()}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600"
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
