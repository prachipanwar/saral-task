export default function Sidebar() {

    const menu = [
      "Home",
      "Insights",
      "Gamification",
      "Applications",
      "Payments"
    ]
  
    return (
      <div className="w-64 bg-[#f6eff7] h-screen p-6">
  
        <h2 className="font-bold text-lg mb-8">
          Saral
        </h2>
  
        <div className="space-y-4">
  
          {menu.map(item => (
  
            <div
              key={item}
              className={`p-3 rounded-lg cursor-pointer
              ${item === "Gamification" ? 
                "bg-white shadow text-purple-600" :
                "text-gray-600"
              }`}
            >
              {item}
            </div>
  
          ))}
  
        </div>
  
      </div>
    )
  }