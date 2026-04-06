import { Button } from "@/components/ui/button"

export default function GamificationHero({ onClick }) {

  return (
    <div className="text-center space-y-6 bg-white p-10 rounded-xl shadow">

      <h2 className="text-2xl font-semibold text-purple-700">
        Gamify your Campaign
      </h2>

      <p className="text-gray-500">
        Enable gamification to start crafting
        your custom reward system.
      </p>

      <Button
        className="bg-purple-600 cursor-pointer p-6"
        onClick={onClick}
      >
        Enable Gamification
      </Button>

    </div>
  )
}