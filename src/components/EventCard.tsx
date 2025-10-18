import React from "react";
import Image from "next/image";

export interface EventData {
  _id: string;
  title: string;
  description: string;
  date: string;
  venue?: string;
  speaker?: string;
}

export interface CardConfig {
  color: {
    bg: string;
    border: string;
  };
  text: {
    heading: string;
    meta: string;
    body: string;
    icon: string;
  };
  pin: {
    image: string;
    size: number;
  };
}

interface EventCardProps {
  event: EventData;
  config: CardConfig;
  variant: "desktop" | "mobile";
}

const EventCard: React.FC<EventCardProps> = ({ event, config, variant }) => {
  const shadowClass = variant === "desktop" ? "shadow-2xl" : "shadow-xl";
  const contentSpacing =
    variant === "desktop" ? "mt-12 min-h-[350px]" : "mt-16 min-h-[300px]";
  const pinOffset = variant === "desktop" ? 0.55 : 0.5;

  return (
    <div
      className={`relative bg-white dark:bg-neutral-900 rounded-3xl ${shadowClass} ${config.color.border} border-2 overflow-visible`}
    >
      <div
        className="absolute z-40 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          top: `-${config.pin.size * pinOffset}px`,
          width: `${config.pin.size}px`,
          height: `${config.pin.size}px`,
        }}
      >
        <Image
          src={config.pin.image}
          alt="Pin"
          width={config.pin.size}
          height={config.pin.size}
          className="w-full h-full object-contain drop-shadow-2xl"
          priority
        />
      </div>

      <div
        className={`${config.color.bg} p-6 ${contentSpacing} rounded-2xl m-3 relative z-10`}
      >
        <h3 className={`text-xl font-bold ${config.text.heading} mb-3`}>
          {event.title}
        </h3>

        <div className={`space-y-2 text-sm ${config.text.meta} mb-3`}>
          <p className="flex items-start gap-2">
            <span className={`text-base ${config.text.icon}`}>📅</span>
            <span className="font-medium">{event.date}</span>
          </p>
          {event.venue && (
            <p className="flex items-start gap-2">
              <span className={`text-base ${config.text.icon}`}>📍</span>
              <span className="font-medium">{event.venue}</span>
            </p>
          )}
          {event.speaker && (
            <p className="flex items-start gap-2">
              <span className={`text-base ${config.text.icon}`}>🎙️</span>
              <span className="font-medium">Speaker: {event.speaker}</span>
            </p>
          )}
        </div>

        <p className={`${config.text.body} text-sm leading-relaxed font-normal`}>
          {event.description}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
