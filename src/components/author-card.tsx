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
    <div className="flex h-full min-h-[18rem] w-full flex-col items-center rounded-2xl border border-white/35 bg-white/14 p-4 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/22 hover:shadow-[0_18px_40px_rgba(15,23,42,0.14)] md:min-h-[20rem] md:p-6 lg:min-h-[22rem]">
      {/* Avatar z inicjałami */}
      <div
        className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full ${colors.avatar} text-lg font-bold text-white shadow-lg md:mb-4 md:h-20 md:w-20 md:text-2xl lg:h-24 lg:w-24 lg:text-3xl`}
      >
        {initials}
      </div>

      {/* Imię i nazwisko */}
      <div className="mb-2 flex min-h-[3.5rem] items-center md:min-h-[4.5rem]">
        <h3 className="text-center text-lg font-semibold leading-tight text-slate-900 md:text-xl lg:text-2xl">
          {author.firstName} {author.lastName}
        </h3>
      </div>

      {/* Organizacja */}
      <span
        className={`mb-3 inline-block rounded-full px-2 py-0.5 text-sm font-medium md:mb-4 md:px-3 md:py-1 md:text-base lg:text-lg ${colors.badge}`}
      >
        {author.organization}
      </span>

      {/* Social Media Links */}
      <div className="mt-auto flex min-h-10 items-center gap-2 md:min-h-12 md:gap-3">
        {author.socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-slate-200 p-1.5 text-slate-700 transition-all duration-200 hover:scale-110 hover:bg-slate-300 md:p-2"
            title={link.platform}
          >
            {getSocialIcon(link.platform)}
          </a>
        ))}
      </div>
    </div>
  );
}
