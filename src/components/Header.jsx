import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, Facebook, Instagram, Linkedin } from 'lucide-react'
import { XLogo } from "./icons/XLogo";
import { TikTokLogo } from "./icons/TikTokLogo";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDashboardOpen, setIsDashboardOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDashboardOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Empêcher le défilement du body quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      setIsDashboardOpen(false)
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#102A43] shadow-lg">
      <div className="container mx-auto px-4 h-16 relative flex items-center">
        {/* Logo et Menu burger mobile */}
        <div className="flex items-center">
          <button 
            className="md:hidden text-white p-2 hover:bg-[#1A365D] rounded-lg transition-colors mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="text-xl font-bold text-white hover:text-gray-200">
            CLUBCENTER
          </Link>
          <div className="hidden md:flex items-center gap-4 ml-6">
            <a 
              href="https://www.facebook.com/r.php?locale=fr_FR" 
              className="text-white hover:text-gray-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://www.instagram.com/clubcenter.marseille/" 
              className="text-white hover:text-gray-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://x.com/" 
              className="text-white hover:text-gray-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <XLogo size={20} />
            </a>
            <a 
              href="https://www.tiktok.com/signup/phone-or-email/phone" 
              className="text-white hover:text-gray-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TikTokLogo size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/company/clubcenter/" 
              className="text-white hover:text-gray-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Navigation desktop - absolument centrée */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center">
            <Link to="/activities" className="text-white hover:text-gray-200 font-medium text-lg px-4 py-2 hover:bg-[#1A365D] rounded-lg transition-colors">
              Choisis ton activité
            </Link>
          </div>
        </nav>

        {/* Boutons desktop */}
        <div className="hidden md:flex items-center ml-auto">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDashboardOpen(!isDashboardOpen)}
              className="text-white hover:text-gray-200 font-medium text-lg flex items-center gap-2"
            >
              Espace personnel
              <ChevronDown size={20} className={`transform transition-transform ${isDashboardOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDashboardOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Membre</h4>
                  <Link 
                    to="/login" 
                    className="block text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 text-sm"
                    onClick={() => setIsDashboardOpen(false)}
                  >
                    Se connecter
                  </Link>
                  <Link 
                    to="/register" 
                    className="block text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 text-sm"
                    onClick={() => setIsDashboardOpen(false)}
                  >
                    S'inscrire
                  </Link>
                </div>
                <div className="border-t border-gray-200 mt-2 pt-2 px-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Club</h4>
                  <Link 
                    to="/club/login" 
                    className="block text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 text-sm"
                    onClick={() => setIsDashboardOpen(false)}
                  >
                    Se connecter
                  </Link>
                  <Link 
                    to="/club/register" 
                    className="block text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 text-sm"
                    onClick={() => setIsDashboardOpen(false)}
                  >
                    S'inscrire
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu mobile avec animation */}
      <div 
        className={`fixed inset-0 bg-[#102A43] transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
        style={{ top: '64px' }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            {/* Navigation principale mobile */}
            <div className="border-b border-[#1A365D] pb-4">
              <div className="flex flex-col gap-3">
                <Link 
                  to="/activities" 
                  className="text-white hover:text-gray-200 text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Choisis ton activité
                </Link>
              </div>
            </div>

            {/* Dashboard avec sous-menu */}
            <div className="border-b border-[#1A365D] pb-4">
              <button
                onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                className="text-white hover:text-gray-200 text-lg w-full flex items-center justify-between"
              >
                Dashboard
                <ChevronDown size={20} className={`transform transition-transform ${isDashboardOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDashboardOpen && (
                <div className="mt-3 ml-4 flex flex-col gap-3">
                  <div>
                    <h4 className="text-white text-sm font-semibold mb-2">Membre</h4>
                    <Link 
                      to="/login" 
                      className="block text-white hover:text-gray-200 ml-2 mb-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Se connecter
                    </Link>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-white text-sm font-semibold mb-2">Club</h4>
                    <Link 
                      to="/club/login" 
                      className="block text-white hover:text-gray-200 ml-2 mb-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Se connecter
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Boutons d'action principaux */}
            <div className="flex flex-col gap-4">
              <Link 
                to="/register" 
                className="bg-[#4299E1] text-white hover:bg-[#3182CE] font-semibold py-2 px-4 rounded-lg text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                S'inscrire
              </Link>
              <Link 
                to="/club/register" 
                className="bg-white text-[#102A43] hover:bg-gray-200 font-semibold py-2 px-4 rounded-lg text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Inscription Club
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}