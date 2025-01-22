import { DashboardHeader } from './DashboardHeader'
import { DashboardSidebar } from './DashboardSidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardSidebar />
      
      {/* Main content */}
      <main className="lg:pl-64 pt-16">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  )
} 