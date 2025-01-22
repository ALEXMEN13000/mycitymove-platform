import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'
import {
  Home,
  Calendar,
  BarChart,
  MessageSquare,
  HelpCircle,
  Settings,
  Users,
  Activity,
  Menu,
  X,
  Heart,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SidebarItemProps {
  icon: any
  label: string
  href: string
  isActive?: boolean
}

function SidebarItem({ icon: Icon, label, href, isActive }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
        isActive && "bg-gray-100 text-gray-900"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  )
}

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { userType } = useAuth()
  const location = useLocation()

  const memberItems = [
    { icon: Home, label: 'Accueil', href: '/dashboard' },
    { icon: Search, label: 'Explorer', href: '/explore' },
    { icon: Heart, label: 'Favoris', href: '/favorites' },
    { icon: Calendar, label: 'Calendrier', href: '/calendar' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: Settings, label: 'Paramètres', href: '/settings' },
    { icon: HelpCircle, label: 'Aide', href: '/help' },
  ]

  const clubItems = [
    { icon: Home, label: 'Accueil', href: '/club/dashboard' },
    { icon: Activity, label: 'Mes activités', href: '/club/activities' },
    { icon: Users, label: 'Membres', href: '/club/members' },
    { icon: BarChart, label: 'Statistiques', href: '/club/stats' },
    { icon: MessageSquare, label: 'Messages', href: '/club/messages' },
    { icon: Settings, label: 'Paramètres', href: '/club/settings' },
    { icon: HelpCircle, label: 'Support', href: '/club/support' },
  ]

  const items = userType === 'club' ? clubItems : memberItems

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-40 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/dashboard" className="font-bold text-xl">
            CLUBCENTER
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 px-3 py-4">
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={location.pathname === item.href}
            />
          ))}
        </nav>

        {/* Version */}
        <div className="absolute bottom-4 left-0 right-0 px-6">
          <p className="text-xs text-gray-400">Version 1.0.0</p>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
} 