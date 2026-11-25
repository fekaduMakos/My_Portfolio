"use client";

import { useState, useEffect } from "react";
import { BrandIcon } from "@/components/shared/BrandIcon";
import { createClient } from "@/lib/supabase/client";
import { Channel } from "@/types/database.types";
import { 
  Plus, 
  Trash2, 
  Save, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Edit3, 
  Globe,
  Image as ImageIcon
} from "lucide-react";

const INITIAL_CHANNELS: Channel[] = [
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

const PRESET_ICONS = [
  { label: "Telegram", key: "telegram" },
  { label: "Instagram", key: "instagram" },
  { label: "Facebook", key: "facebook" },
  { label: "GitHub", key: "github" },
  { label: "LinkedIn", key: "linkedin" },
  { label: "WhatsApp", key: "whatsapp" },
  { label: "YouTube", key: "youtube" },
  { label: "X / Twitter", key: "x" },
];

export default function AdminChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>(INITIAL_CHANNELS);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // New Channel Form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newIconKey, setNewIconKey] = useState("telegram");
  const [newCustomImageUrl, setNewCustomImageUrl] = useState("");

  // Fetch channels on mount
  useEffect(() => {
    async function fetchChannels() {
      try {
        const supabase = createClient();
        const { data, error: fetchErr } = await supabase
          .from("channels")
          .select("*")
          .order("sort_order", { ascending: true });

        if (data && data.length > 0 && !fetchErr) {
          setChannels(data);
        }
      } catch (e) {
        console.error("Could not fetch channels:", e);
      }
    }
    fetchChannels();
  }, []);

  // Save all channels to Supabase
  async function handleSaveAll() {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const supabase = createClient();
      
      // Upsert channels into Supabase
      const { error: upsertErr } = await supabase
        .from("channels")
        .upsert(channels, { onConflict: "id" });

      if (upsertErr) throw upsertErr;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save channels. Make sure the 'channels' table exists in Supabase.");
    } finally {
      setLoading(false);
    }
  }

  // Add new channel
  function handleAddChannel(e: React.FormEvent) {
    e.preventDefault();
    if (!newName || !newUrl) return;

    const newChannel: Channel = {
      id: crypto.randomUUID(),
      name: newName,
      url: newUrl,
      icon_key: newIconKey,
      custom_image_url: newCustomImageUrl || null,
      is_active: true,
      sort_order: channels.length + 1,
    };

    setChannels([...channels, newChannel]);
    setNewName("");
    setNewUrl("");
    setNewCustomImageUrl("");
    setShowAddForm(false);
  }

  // Update existing channel property
  function updateChannel(id: string, updates: Partial<Channel>) {
    setChannels(
      channels.map((ch) => (ch.id === id ? { ...ch, ...updates } : ch))
    );
  }

  // Delete channel
  function deleteChannel(id: string) {
    setChannels(channels.filter((ch) => ch.id !== id));
  }

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Social Channels Navigator</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Control the channels, branding UI images, and destination links displayed in your public navigator bar.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-card px-3 text-xs font-semibold text-foreground hover:bg-muted transition"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            {showAddForm ? "Cancel" : "Add Channel"}
          </button>
          <button
            onClick={handleSaveAll}
            disabled={loading}
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow transition hover:bg-primary/90 disabled:opacity-50"
          >
            <Save className="mr-1.5 h-3.5 w-3.5" />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-medium text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Channels successfully updated and synced with your public portfolio!</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-xs font-medium text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Add New Channel Card */}
      {showAddForm && (
        <form onSubmit={handleAddChannel} className="rounded-xl border border-primary/40 bg-card p-5 space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-foreground">Add New Direct Channel</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Channel Name
              </label>
              <input
                type="text"
                placeholder="e.g. YouTube, Discord, WhatsApp"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Destination Link (URL)
              </label>
              <input
                type="url"
                placeholder="https://t.me/..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                UI Brand Icon
              </label>
              <select
                value={newIconKey}
                onChange={(e) => setNewIconKey(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {PRESET_ICONS.map((icon) => (
                  <option key={icon.key} value={icon.key}>
                    {icon.label}
                  </option>
                ))}
                <option value="custom">Custom Image URL</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Custom Image URL (Optional — overrides preset icon)
            </label>
            <input
              type="url"
              placeholder="https://example.com/logo.png"
              value={newCustomImageUrl}
              onChange={(e) => setNewCustomImageUrl(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow hover:bg-primary/90"
            >
              Add to Navigator
            </button>
          </div>
        </form>
      )}

      {/* Channels List */}
      <div className="space-y-3">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 shadow-sm"
          >
            {/* Left: Brand Icon & Name */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background p-2">
                <BrandIcon
                  iconKey={channel.icon_key}
                  customImageUrl={channel.custom_image_url}
                  className="h-6 w-6"
                />
              </div>
              <div className="min-w-0">
                <input
                  type="text"
                  value={channel.name}
                  onChange={(e) => updateChannel(channel.id, { name: e.target.value })}
                  className="font-bold text-sm bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none text-foreground"
                />
                <p className="text-[11px] text-muted-foreground">Icon: {channel.icon_key}</p>
              </div>
            </div>

            {/* Middle: Destination URL Input */}
            <div className="flex-1 max-w-md">
              <input
                type="url"
                value={channel.url}
                onChange={(e) => updateChannel(channel.id, { url: e.target.value })}
                placeholder="https://..."
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer mr-2">
                <input
                  type="checkbox"
                  checked={channel.is_active}
                  onChange={(e) => updateChannel(channel.id, { is_active: e.target.checked })}
                  className="rounded border-input text-primary focus:ring-primary"
                />
                <span>Active</span>
              </label>

              <a
                href={channel.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition"
                title="Test Link"
              >
                <ExternalLink className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => deleteChannel(channel.id)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition"
                title="Delete Channel"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
