"use client";

import { useEffect, useState } from "react";
import { BrandIcon } from "@/components/shared/BrandIcon";
import { createClient } from "@/lib/supabase/client";
import { Channel } from "@/types/database.types";
import { ExternalLink } from "lucide-react";

// Default channels fallback so it displays immediately even before Supabase tables are seeded
const DEFAULT_CHANNELS: Channel[] = [
  {
    id: "1",
    name: "Telegram",
    url: "https://t.me/fekadumark",
    icon_key: "telegram",
    is_active: true,
    sort_order: 1,
  },
  {
    id: "2",
    name: "Instagram",
    url: "https://www.instagram.com/fekadu_markos/?hl=en",
    icon_key: "instagram",
    is_active: true,
    sort_order: 2,
  },
  {
    id: "3",
    name: "Facebook",
    url: "https://web.facebook.com/fekadu.mark",
    icon_key: "facebook",
    is_active: true,
    sort_order: 3,
  },
  {
    id: "4",
    name: "GitHub",
    url: "https://github.com",
    icon_key: "github",
    is_active: true,
    sort_order: 4,
  },
  {
    id: "5",
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon_key: "linkedin",
    is_active: true,
    sort_order: 5,
  },
];

export function ChannelNavigator() {
  const [channels, setChannels] = useState<Channel[]>(DEFAULT_CHANNELS);

  useEffect(() => {
    async function loadChannels() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("channels")
          .select("*")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (data && data.length > 0 && !error) {
          setChannels(data);
        }
      } catch (err) {
        // Fallback to defaults
      }
    }

    loadChannels();
  }, []);

  return (
    <div className="w-full sm:w-auto">
      {/* Unified Channel Navigator Bar */}
      <div className="inline-flex items-center gap-2 sm:gap-3 rounded-2xl border border-border/80 bg-card/80 p-2 sm:p-2.5 backdrop-blur-xl shadow-lg shadow-black/10 transition hover:border-primary/40">
        <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2 border-r border-border/60">
          Connect
        </span>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {channels.map((channel) => (
            <a
              key={channel.id}
              href={channel.url}
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-border/60 bg-background/90 p-1.5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10 active:scale-95"
              title={`${channel.name} — Click to visit`}
              aria-label={channel.name}
            >
              {/* Brand UI Image / Logo */}
              <BrandIcon
                iconKey={channel.icon_key}
                customImageUrl={channel.custom_image_url}
                className="h-6 w-6 sm:h-7 sm:w-7 transition group-hover:scale-105"
              />

              {/* Floating Tooltip Label */}
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover px-2 py-0.5 text-[10px] font-semibold text-popover-foreground shadow-md opacity-0 transition-opacity duration-150 group-hover:opacity-100 border border-border">
                {channel.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
