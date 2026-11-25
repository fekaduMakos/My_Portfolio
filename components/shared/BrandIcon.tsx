import React from "react";

interface BrandIconProps {
  iconKey: string;
  customImageUrl?: string | null;
  className?: string;
}

export function BrandIcon({ iconKey, customImageUrl, className = "h-5 w-5" }: BrandIconProps) {
  if (customImageUrl) {
    return (
      <img 
        src={customImageUrl} 
        alt={iconKey} 
        className={`${className} object-contain rounded-md`} 
      />
    );
  }

  const key = iconKey.toLowerCase().trim();

  switch (key) {
    case "telegram":
    case "tg":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#24A1DE" />
          <path
            d="M5.4 11.9L17.7 7.2C18.3 7 18.8 7.3 18.6 8L16.5 17.8C16.3 18.5 15.9 18.7 15.3 18.3L12 15.9L10.4 17.4C10.2 17.6 10.1 17.8 9.7 17.8L9.9 14.7L15.6 9.5C15.8 9.3 15.6 9.2 15.3 9.4L8.3 13.8L5.3 12.9C4.6 12.7 4.6 12.2 5.4 11.9Z"
            fill="white"
          />
        </svg>
      );

    case "instagram":
    case "ig":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ig-grad" cx="20%" cy="110%" r="130%">
              <stop offset="0%" stopColor="#ffdb55" />
              <stop offset="25%" stopColor="#f35532" />
              <stop offset="50%" stopColor="#d82d7e" />
              <stop offset="75%" stopColor="#b4299b" />
              <stop offset="100%" stopColor="#6c3ce9" />
            </radialGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
          <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="white" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="3.2" stroke="white" strokeWidth="1.6" />
          <circle cx="15.8" cy="8.2" r="0.9" fill="white" />
        </svg>
      );

    case "facebook":
    case "fb":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#1877F2" />
          <path
            d="M13.5 20V12.8H15.9L16.3 10H13.5V8.2C13.5 7.4 13.8 6.8 14.9 6.8H16.4V4.3C15.8 4.2 15 4.1 14.1 4.1C11.9 4.1 10.4 5.4 10.4 8V10H8V12.8H10.4V20H13.5Z"
            fill="white"
          />
        </svg>
      );

    case "github":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#24292E" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 4.5C7.9 4.5 4.5 7.9 4.5 12C4.5 15.3 6.6 18.1 9.6 19.1C10 19.2 10.1 18.9 10.1 18.7V17.3C8 17.8 7.6 16.3 7.6 16.3C7.3 15.4 6.8 15.2 6.8 15.2C6.1 14.7 6.9 14.8 6.9 14.8C7.6 14.9 8.1 15.6 8.1 15.6C8.8 16.7 9.8 16.4 10.2 16.2C10.3 15.7 10.5 15.3 10.7 15.1C9 14.9 7.2 14.3 7.2 11.4C7.2 10.6 7.5 9.9 8 9.4C7.9 9.2 7.6 8.4 8.1 7.4C8.1 7.4 8.7 7.2 10.2 8.2C10.8 8 11.4 7.9 12 7.9C12.6 7.9 13.2 8 13.8 8.2C15.3 7.2 15.9 7.4 15.9 7.4C16.4 8.4 16.1 9.2 16 9.4C16.5 9.9 16.8 10.6 16.8 11.4C16.8 14.3 15 14.9 13.3 15.1C13.6 15.3 13.9 15.8 13.9 16.6V18.7C13.9 18.9 14 19.2 14.4 19.1C17.4 18.1 19.5 15.3 19.5 12C19.5 7.9 16.1 4.5 12 4.5Z"
            fill="white"
          />
        </svg>
      );

    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#0A66C2" />
          <path
            d="M6.5 9H9V18H6.5V9ZM7.8 7.6C7 7.6 6.3 6.9 6.3 6.1C6.3 5.3 7 4.6 7.8 4.6C8.6 4.6 9.2 5.3 9.2 6.1C9.2 6.9 8.6 7.6 7.8 7.6ZM10.5 9H13V10.2H13C13.4 9.5 14.4 8.8 15.7 8.8C18.4 8.8 19 10.6 19 13V18H16.5V13.5C16.5 12.3 16.5 10.8 14.8 10.8C13.1 10.8 12.8 12.1 12.8 13.4V18H10.5V9Z"
            fill="white"
          />
        </svg>
      );

    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#25D366" />
          <path
            d="M16.9 14.8C16.7 14.7 15.3 14 15.1 13.9C14.8 13.8 14.6 13.8 14.5 14C14.3 14.3 13.8 14.8 13.7 15C13.5 15.1 13.4 15.2 13.1 15C12.9 14.9 12 14.6 10.9 13.6C10.1 12.8 9.5 11.9 9.3 11.6C9.2 11.4 9.3 11.2 9.4 11.1C9.6 11 9.7 10.8 9.8 10.7C10 10.5 10 10.4 10.1 10.2C10.2 10.1 10.1 9.9 10.1 9.8C10 9.7 9.5 8.5 9.3 8C9.1 7.5 8.9 7.6 8.7 7.6C8.6 7.6 8.4 7.6 8.2 7.6C8 7.6 7.8 7.7 7.6 7.9C7.4 8.1 6.8 8.7 6.8 9.9C6.8 11.1 7.7 12.2 7.8 12.4C7.9 12.5 9.5 15 12 16.1C14.5 17.2 14.5 16.8 15 16.8C15.5 16.7 16.6 16.1 16.8 15.5C17 14.9 17 14.4 16.9 14.8Z"
            fill="white"
          />
        </svg>
      );

    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#FF0000" />
          <path d="M10 8.5L15.5 12L10 15.5V8.5Z" fill="white" />
        </svg>
      );

    case "twitter":
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#000000" />
          <path
            d="M17.4 5.5H19.6L14.7 11.1L20.5 18.5H16L12.5 13.9L8.4 18.5H6.2L11.4 12.5L5.8 5.5H10.4L13.6 9.8L17.4 5.5ZM16.6 17.2H17.8L9.7 6.7H8.4L16.6 17.2Z"
            fill="white"
          />
        </svg>
      );

    default:
      return (
        <div className={`${className} rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary uppercase`}>
          {key.slice(0, 2)}
        </div>
      );
  }
}
