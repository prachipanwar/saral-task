import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import { Toaster } from "@/components/ui/sonner"

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-[#faf7fb]">
      
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-10">
          {children}
        </main>
        <Toaster />

      </div>

    </div>
  )
}