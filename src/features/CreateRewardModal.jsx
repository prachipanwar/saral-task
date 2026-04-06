import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";

import EventSelector from "./RewardModel/EventSelector";
import RewardSelector from "./RewardModel/RewardSelector";
import TimeBoundSelector from "./RewardModel/TimeBoundSelector";

const INITIAL_EVENT = {
  type: "",
  config: {},
};

const INITIAL_REWARD = {
  type: "",
  config: {
    amount: "",
    tierId: "",
  },
};

export default function CreateRewardModal({ open, setOpen }) {
  const [event, setEvent] = useState(INITIAL_EVENT);

  const [reward, setReward] = useState(INITIAL_REWARD);

  const [timeBound, setTimeBound] = useState(false);

  const [date, setDate] = useState(null);
  const isTierDisabled = event.type === "posts" || event.type === "onboard";

  const [eventOpen, setEventOpen] = useState(false);
  const [rewardOpen, setRewardOpen] = useState(false);

  function buildSummary() {
    const eventMap = {
      sales: `Cross $${event.config.amount} in sales`,
      posts: `Post ${event.config.count} times every ${event.config.duration}`,
      onboard: "User is onboarded",
    };

    const rewardMap = {
      bonus: `Flat $${reward.config.amount} bonus`,
      tier: `Upgrade to ${reward.config.tierId} tier`,
    };

    return `
      ${eventMap[event.type]}
      →
      ${rewardMap[reward.type]}
      ${timeBound ? `• valid till ${date?.toLocaleDateString()}` : ""}
    `;
  }
  function resetForm() {
    setEvent(INITIAL_EVENT);

    setReward(INITIAL_REWARD);

    setTimeBound(false);

    setDate(null);

    setEventOpen(false);

    setRewardOpen(false);
  }

  function isValid() {
    console.log("isValid →", event.type, reward.type, reward.config);

    if (!event.type) return false;

    if (!reward.type) return false;

    // bonus validation
    if (reward.type === "bonus" && !reward.config.amount) return false;

    // tier validation
    if (reward.type === "tier" && !reward.config.tierId) return false;

    return true;
  }
  function handleCreateReward() {
    toast.success("Your reward has been successfully created", {
      position: "top-center",
      description: buildSummary(),
      duration: 4000,
    });

    resetForm();

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create reward system</DialogTitle>
        </DialogHeader>

        <EventSelector
          value={event.type}
          config={event.config}
          onChange={setEvent}
          open={eventOpen}
          setOpen={setEventOpen}
          resetForm = {resetForm}
        />

        <RewardSelector
          reward={reward}
          setReward={setReward}
          open={rewardOpen}
          setOpen={setRewardOpen}
          isTierDisabled={isTierDisabled}
        />

        <TimeBoundSelector
          value={timeBound}
          date={date}
          onToggle={setTimeBound}
          onDateChange={setDate}
        />

        <div className="flex gap-3 pt-4">
          {/* cancel */}

          <Button
            variant="outline"
            className="
    flex-1 h-10
    border-gray-200
    text-gray-700
    hover:bg-gray-50
  "
            onClick={() => {
              resetForm();

              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex-1">
                  <Button
                    disabled={!isValid()}
                    className="
            w-full h-10
            text-white
            bg-gradient-to-r from-pink-500 to-purple-600

            hover:from-pink-600 hover:to-purple-700

            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:hover:from-pink-500
            disabled:hover:to-purple-600
          "
                    onClick={handleCreateReward}
                  >
                    Create reward
                  </Button>
                </span>
              </TooltipTrigger>

              {!isValid() && (
                <TooltipContent>
                  Choose a reward trigger and reward to continue
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
