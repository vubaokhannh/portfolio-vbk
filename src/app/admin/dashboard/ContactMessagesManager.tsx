"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Inbox,
  Mail,
  User,
  Clock,
  Search,
  Trash2,
  CheckCircle,
  Circle,
  ExternalLink,
  RefreshCw,
  MessageSquare,
  ShieldAlert,
} from "lucide-react";
import ConfirmModal from "./ConfirmModal";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  ip_address?: string;
  is_read: boolean;
  created_at: string;
}

interface ContactMessagesManagerProps {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

export default function ContactMessagesManager({ showToast }: ContactMessagesManagerProps) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "unread" | "read">("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Confirm modal state
  const [confirmMsg, setConfirmMsg] = useState<ContactMessage | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
      if (data && data.length > 0 && !selectedMessage) {
        setSelectedMessage(data[0]);
      }
    } catch {
      showToast("Could not load contact messages from Supabase.", "error");
    } finally {
      setLoading(false);
    }
  }

  async function toggleReadStatus(msg: ContactMessage) {
    const newStatus = !msg.is_read;
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ is_read: newStatus })
        .eq("id", msg.id);

      if (error) throw error;

      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, is_read: newStatus } : m))
      );
      if (selectedMessage?.id === msg.id) {
        setSelectedMessage((prev) => (prev ? { ...prev, is_read: newStatus } : null));
      }
      showToast(newStatus ? "Marked as read." : "Marked as unread.", "success");
    } catch {
      showToast("Failed to update status.", "error");
    }
  }

  async function deleteMessage(id: string) {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
      showToast("Message deleted successfully.", "success");
    } catch {
      showToast("Failed to delete message.", "error");
    }
  }

  const unreadCount = messages.filter((m) => !m.is_read).length;

  const filteredMessages = messages.filter((m) => {
    const matchStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "unread"
        ? !m.is_read
        : m.is_read;

    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q);

    return matchStatus && matchSearch;
  });

  return (
    <>
    <div className="space-y-6 font-mono text-xs select-text">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl border border-white/[0.08] bg-[#0B0D14]/80 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Inbox className="w-5 h-5 text-[#00D9FF]" />
              CONTACT INBOX
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#00D9FF]/15 border border-[#00D9FF]/30 text-[#00D9FF] font-bold text-[10px]">
                {unreadCount} NEW UNREAD
              </span>
            )}
          </div>
          <p className="text-white/40 font-sans text-xs">
            Manage inquiries, project requests, and messages sent from vubaokhanh.tech contact form.
          </p>
        </div>

        <button
          onClick={loadMessages}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] text-white font-bold text-xs transition-all cursor-pointer shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#00D9FF]" : ""}`} />
          REFRESH INBOX
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Status Pills */}
        <div className="flex items-center gap-1 border border-white/[0.06] bg-[#0F1117] p-1 rounded-xl w-full sm:w-auto">
          {(["all", "unread", "read"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex-1 sm:flex-none text-center ${
                filterStatus === status
                  ? "bg-[#00D9FF] text-black font-extrabold shadow-md"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {status} {status === "unread" && unreadCount > 0 ? `(${unreadCount})` : ""}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or message..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-white/[0.08] bg-[#0F1117] text-white text-xs placeholder:text-white/20 focus:border-[#00D9FF]/50 focus:outline-none"
          />
        </div>
      </div>

      {/* Main Grid: Message List (Left) + Detail Reader (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Messages List (Col Span 5) */}
        <div className="lg:col-span-5 rounded-2xl border border-white/[0.08] bg-[#0B0D14]/80 backdrop-blur-xl p-3 space-y-2 max-h-[600px] overflow-y-auto shadow-xl">
          {loading ? (
            <div className="py-12 text-center text-white/40 font-mono">Loading inbox messages...</div>
          ) : filteredMessages.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Inbox className="w-8 h-8 text-white/20 mx-auto" />
              <p className="text-white/40 font-mono text-xs">No messages found in inbox.</p>
            </div>
          ) : (
            filteredMessages.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id;
              return (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (!msg.is_read) toggleReadStatus(msg);
                  }}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer space-y-2 ${
                    isSelected
                      ? "bg-[#00D9FF]/10 border-[#00D9FF]/40 shadow-[0_0_15px_rgba(0,217,255,0.1)]"
                      : msg.is_read
                      ? "bg-white/[0.015] border-white/[0.05] hover:bg-white/[0.03] opacity-70"
                      : "bg-[#0F1117] border-white/[0.12] hover:border-[#00D9FF]/30 font-bold"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      {!msg.is_read ? (
                        <span className="w-2 h-2 rounded-full bg-[#00D9FF] shrink-0 animate-pulse" />
                      ) : (
                        <Circle className="w-2 h-2 text-white/20 shrink-0" />
                      )}
                      <span className="text-xs font-bold text-white truncate">{msg.name}</span>
                    </div>
                    <span className="text-[10px] text-white/30 shrink-0 font-mono">
                      {new Date(msg.created_at).toLocaleDateString("vi-VN")}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#00D9FF] truncate font-mono">{msg.email}</p>
                  <p className="text-xs text-white/50 line-clamp-2 font-sans leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Message Detail Reader (Col Span 7) */}
        <div className="lg:col-span-7 rounded-2xl border border-white/[0.08] bg-[#0B0D14]/80 backdrop-blur-xl p-6 space-y-6 shadow-xl min-h-[400px] flex flex-col justify-between">
          {selectedMessage ? (
            <div className="space-y-6">
              {/* Detail Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.06] pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00D9FF]/20 to-[#7C3AED]/20 border border-[#00D9FF]/30 flex items-center justify-center text-white font-bold text-base">
                      {selectedMessage.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">{selectedMessage.name}</h2>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-xs text-[#00D9FF] hover:underline flex items-center gap-1 font-mono"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleReadStatus(selectedMessage)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedMessage.is_read
                        ? "border-white/10 bg-white/[0.03] text-white/50 hover:text-white"
                        : "border-[#00D9FF]/30 bg-[#00D9FF]/10 text-[#00D9FF] font-bold"
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    {selectedMessage.is_read ? "Mark Unread" : "Mark Read"}
                  </button>

                  <button
                    onClick={() => setConfirmMsg(selectedMessage)}
                    className="p-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Metadata */}
              <div className="flex flex-wrap gap-4 text-[11px] font-mono text-white/40 bg-white/[0.015] p-3 rounded-xl border border-white/[0.04]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#00D9FF]" />
                  {new Date(selectedMessage.created_at).toLocaleString("vi-VN")}
                </span>
                {selectedMessage.ip_address && (
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#7C3AED]" />
                    IP: {selectedMessage.ip_address}
                  </span>
                )}
              </div>

              {/* Message Body */}
              <div className="p-5 rounded-2xl border border-white/[0.06] bg-black/40 text-white/90 text-sm leading-relaxed whitespace-pre-wrap font-sans min-h-[160px]">
                {selectedMessage.message}
              </div>

              {/* Quick Action Bar */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Your message to Vu Bao Khanh`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00D9FF] hover:bg-[#00c0e0] text-black font-bold text-xs tracking-wider uppercase transition-all cursor-pointer shadow-lg shadow-[#00D9FF]/10"
                >
                  <Mail className="w-4 h-4" />
                  REPLY VIA EMAIL
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="py-24 text-center space-y-3">
              <MessageSquare className="w-10 h-10 text-white/15 mx-auto" />
              <p className="text-white/40 font-mono text-xs">
                Select a message from the left list to read details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={!!confirmMsg}
        title="Delete Message?"
        itemName={confirmMsg ? `From: ${confirmMsg.name} <${confirmMsg.email}>` : undefined}
        onConfirm={() => {
          if (confirmMsg) deleteMessage(confirmMsg.id);
          setConfirmMsg(null);
        }}
        onCancel={() => setConfirmMsg(null)}
      />
    </>
  );
}
