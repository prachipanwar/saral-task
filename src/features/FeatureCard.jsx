import { Card } from "@/components/ui/card";

export default function FeatureCard({ alt, title, desc }) {
  return (
    <Card
      className="
        p-4 sm:p-6
        text-center
        space-y-3

        transition
        hover:shadow-md

        min-h-[160px]
        flex flex-col
        justify-center
      "
    >
      <div
        className="
          w-10 h-10
          sm:w-12 sm:h-12

          bg-purple-500
          text-white

          text-base
          sm:text-lg

          flex items-center
          justify-center

          m-auto

          rounded-full
        "
      >
        {alt}
      </div>

      <h3
        className="
          font-medium
          text-sm
          sm:text-base
        "
      >
        {title}
      </h3>

      <p
        className="
          text-xs
          sm:text-sm

          text-gray-500

          max-w-[220px]
          mx-auto
        "
      >
        {desc}
      </p>
    </Card>
  );
}
