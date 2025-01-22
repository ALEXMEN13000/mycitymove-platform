import { LoginForm } from '@/components/auth/LoginForm'
import { Header } from '@/components/Header'

export default function ClubLogin() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-16 md:py-24">
        <div className="w-full max-w-md">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <LoginForm type="club" />
          </div>
        </div>
      </div>
    </div>
  )
} 