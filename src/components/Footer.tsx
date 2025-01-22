import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { XLogo } from "./icons/XLogo";
import { TikTokLogo } from "./icons/TikTokLogo";

export function Footer() {
  return (
    <footer className="bg-[#102A43] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span>📧</span>
                <a 
                  href="mailto:contact@club-center.com" 
                  className="hover:text-gray-300 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  contact@club-center.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <a 
                  href="tel:+33624258373" 
                  className="hover:text-gray-300 hover:underline"
                >
                  06 24 25 83 73
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <a 
                  href="https://www.google.com/maps/place/19+Rue+Henri+Barbusse,+13001+Marseille" 
                  className="hover:text-gray-300 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  19 rue Henri Barbusse, 13001 Marseille
                </a>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Horaires</h3>
            <div className="space-y-2">
              <p>Lundi - Vendredi : 9h - 20h</p>
              <p>Samedi : 10h - 18h</p>
              <p>Dimanche : 10h - 18h</p>
            </div>
          </div>

          {/* Suivez-nous */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/r.php?locale=fr_FR" 
                className="hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://www.instagram.com/clubcenter.marseille/" 
                className="hover:text-gray-300" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://x.com/" 
                className="hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <XLogo size={24} />
              </a>
              <a 
                href="https://www.tiktok.com/signup/phone-or-email/phone" 
                className="hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TikTokLogo size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/company/clubcenter/" 
                className="hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[#1A365D] text-center text-gray-400">
          © 2024 CLUBCENTER. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
} 