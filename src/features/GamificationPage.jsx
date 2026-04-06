import { useState } from "react"

import Layout from "../components/ui/layouts/Layout"
import GamificationHero from "./GamificationHero"
import FeatureCard from "./FeatureCard"
import CreateRewardModal from "./CreateRewardModal"

export default function GamificationPage() {

  const [open, setOpen] = useState(false)

  return (

    <Layout>

      <GamificationHero
        onClick={() => setOpen(true)}
      />

      <div className="grid grid-cols-3 gap-6 mt-10">

        <FeatureCard
          alt="R"
          title="Reward your ambassadors"
          desc="Boost campaign performance"
        />

        <FeatureCard
         alt="M"
          title="Set milestones"
          desc="Set custom goals"
        />

        <FeatureCard
         alt="I"
          title="Customise incentives"
          desc="Create incentives"
        />

      </div>

      <CreateRewardModal
        open={open}
        setOpen={setOpen}
      />

    </Layout>

  )
}