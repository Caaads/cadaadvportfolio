"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpotify, FaDiscord } from "react-icons/fa";
import Image from "next/image";

interface LanyardData {
  success: boolean;
  data?: {
    discord_status: string;
    activities: any[];
    listening_to_spotify: boolean;
    spotify: {
      track_id: string;
      song: string;
      artist: string;
      album_art_url: string;
    } | null;
    discord_user: {
      username: string;
      global_name?: string;
      discriminator: string;
      avatar: string;
      id: string;
    };
  };
}

export default function LiveActivity() {
  const [data, setData] = useState<LanyardData | null>(null);
  const [error, setError] = useState(false);
  const DISCORD_ID = "678885209248235530"; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const json = await res.json();
        if (json.success) {
          setData(json);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching Lanyard data:", err);
        setError(true);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [DISCORD_ID]);

  if (error) return null;
  if (!data || !data.data) return null;

  const { discord_status, listening_to_spotify, spotify, discord_user } = data.data;

  const statusColors: Record<string, string> = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  };

  const avatarUrl = discord_user.avatar 
    ? `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png`
    : `https://cdn.discordapp.com/embed/avatars/${parseInt(discord_user.discriminator) % 5}.png`;

  return (
    <div className="flex flex-wrap gap-4 items-center mt-8">
      {/* Discord Presence */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-muted/30 backdrop-blur-md border border-border shadow-sm hover:bg-muted/50 transition-all group"
      >
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border group-hover:border-primary/50 transition-colors">
            <Image 
              src={avatarUrl} 
              alt={discord_user.username} 
              width={40} 
              height={40} 
              className="object-cover"
            />
          </div>
          <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-background ${statusColors[discord_status] || "bg-gray-500"} shadow-sm`} />
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold leading-none">{discord_user.global_name || discord_user.username}</span>
            <FaDiscord className="text-[10px] text-[#5865F2] opacity-70" />
          </div>
          <span className="text-[10px] text-muted-foreground font-medium mt-1 uppercase tracking-tight">
            {discord_status === 'offline' ? 'Currently Offline' : `Status: ${discord_status}`}
          </span>
        </div>
      </motion.div>

      {/* Spotify Presence */}
      <AnimatePresence mode="wait">
        {listening_to_spotify && spotify ? (
          <motion.div
            key="spotify-active"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#1DB954]/5 backdrop-blur-md border border-[#1DB954]/20 shadow-sm hover:bg-[#1DB954]/10 transition-all group"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-md">
              <Image src={spotify.album_art_url} alt="Spotify Album Art" fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                <FaSpotify className="text-[#1DB954] text-xl animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col overflow-hidden max-w-[180px]">
              <span className="text-xs font-bold leading-none truncate group-hover:text-[#1DB954] transition-colors">{spotify.song}</span>
              <span className="text-[10px] text-muted-foreground truncate mt-1">by {spotify.artist}</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="spotify-inactive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-muted/20 border border-border/50 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-help"
            title="Not currently listening to anything on Spotify"
          >
            <FaSpotify className="text-lg" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Offline</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
