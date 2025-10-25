"use client";
import { Github, Instagram, LinkedinIcon, LucideIcon } from "lucide-react";

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  color: string;
  link: string;
}

const ContactUsHome = () => {
  const ContactCard = ({
    icon: Icon,
    title,
    description,
    buttonText,
    color,
    link,
  }: ContactCardProps) => {
    return (
      <div
        className={`rounded-2xl shadow-xl p-8 flex flex-col justify-between text-white transition-transform transform hover:scale-105 ${color}`}
      >
        <div className="flex items-center gap-3 mb-5">
          <Icon size={36} />
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <p className="text-base opacity-90 mb-7">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-5 rounded-md text-center transition"
        >
          {buttonText}
        </a>
      </div>
    );
  };

  const cards: ContactCardProps[] = [
    {
      icon: Github,
      title: "GitHub",
      description:
        "Explore our open-source repositories, contribute, or check out our latest projects on GitHub.",
      buttonText: "View Repos",
      color: "bg-gradient-to-r from-gray-800 to-gray-900",
      link: "https://github.com/gdgnmit",
    },
    {
      icon: Instagram,
      title: "Instagram",
      description:
        "Follow us for behind-the-scenes updates, event highlights, and stories from our community.",
      buttonText: "Follow Us",
      color: "bg-gradient-to-r from-pink-500 to-purple-500",
      link: "https://www.instagram.com/gdgnmit/",
    },
    {
      icon: LinkedinIcon,
      title: "LinkedIn",
      description:
        "Connect with us professionally to stay updated on our latest announcements and achievements.",
      buttonText: "Connect",
      color: "bg-gradient-to-r from-blue-500 to-blue-700",
      link: "https://www.linkedin.com/company/google-developer-groups-nmit/posts/?feedView=all",
    },
  ];

  return (
    <section className="bg-white dark:bg-g-almost-black ">
      <div className="pt-8 px-8 sm:pt-12 sm:px-12 lg:pt-16 lg:px-16 xl:px-20 mb-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          Join Our Community
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-g-blue via-g-red to-g-yellow rounded-full mt-2"></div>
      </div>

      <div className="pt-6 pb-12 px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <ContactCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactUsHome;
