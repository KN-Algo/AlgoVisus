import type { Author } from "@/data/authors";
import { Github, Linkedin, Instagram } from "lucide-react";

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  const initials =
    `${author.firstName.charAt(0)}${author.lastName.charAt(0)}`.toUpperCase();

  // Kolory dla różnych organizacji
  const organizationColors = {
    "KN Algo": {
      avatar: "bg-gradient-to-br from-blue-400 to-blue-600",
      badge: "bg-blue-100 text-blue-800",
    },
    "KN Visus": {
      avatar: "bg-gradient-to-br from-teal-400 to-teal-600",
      badge: "bg-teal-100 text-teal-800",
    },
  };

  const colors = organizationColors[author.organization];

  // Mapowanie ikon social media
  const getSocialIcon = (platform: Author["socialLinks"][0]["platform"]) => {
    switch (platform) {
      case "github":
        return <Github className="w-5 h-5" />;
      case "linkedin":
        return <Linkedin className="w-5 h-5" />;
      case "instagram":
        return <Instagram className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-6 rounded-lg backdrop-blur-sm border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-300 hover:shadow-lg">
      {/* Avatar z inicjałami */}
      <div
        className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full ${colors.avatar} flex items-center justify-center text-white font-bold text-lg md:text-2xl lg:text-3xl mb-3 md:mb-4 shadow-lg`}
      >
        {initials}
      </div>

      {/* Imię i nazwisko */}
      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-slate-900 text-center mb-2">
        {author.firstName} {author.lastName}
      </h3>

      {/* Organizacja */}
      <span
        className={`inline-block px-2 md:px-3 py-0.5 md:py-1 rounded-full text-sm md:text-base lg:text-lg font-medium mb-3 md:mb-4 ${colors.badge}`}
      >
        {author.organization}
      </span>

      {/* Social Media Links */}
      <div className="flex gap-2 md:gap-3">
        {author.socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 md:p-2 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 transition-all duration-200 hover:scale-110"
            title={link.platform}
          >
            {getSocialIcon(link.platform)}
          </a>
        ))}
      </div>
    </div>
  );
}
