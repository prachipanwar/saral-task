import { Card } from "@/components/ui/card"

export default function FeatureCard({alt, title, desc }) {

  return (
    <Card className="p-6 text-center space-y-3">

      <div className="w-12 h-12 bg-purple-400 text-white text-xl flex items-center justify-center m-auto rounded-full">
  {alt}
</div>

      <h3 className="font-medium">
        {title}
      </h3>

      <p className="text-sm text-gray-500">
        {desc}
      </p>

    </Card>
  )
}