"use client";

import { createContext, useContext, useRef, useState } from "react";

interface AnnouncerContextType {
  announce: (message: string, priority?: "polite" | "assertive") => void;
  alert: (message: string) => void;
}

const AnnouncerContext = createContext<AnnouncerContextType | null>(null);

export function AnnouncerProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Array<{ id: string; message: string; priority: "polite" | "assertive" }>>([]);
  const lastMessageTime = useRef(0);

  const announce = (message: string, priority: "polite" | "assertive" = "polite") => {
    const now = Date.now();
    // Throttle to 1 message per 750ms
    if (now - lastMessageTime.current < 750) {
      return;
    }
    lastMessageTime.current = now;

    const id = Math.random().toString(36).substr(2, 9);
    setMessages(prev => [...prev, { id, message, priority }]);

    // Remove message after it's been announced
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== id));
    }, 1000);
  };

  const alert = (message: string) => {
    announce(message, "assertive");
  };

  return (
    <AnnouncerContext.Provider value={{ announce, alert }}>
      {children}
      {/* Live regions for screen readers */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="announcer-polite"
      >
        {messages
          .filter(msg => msg.priority === "polite")
          .map(msg => (
            <div key={msg.id}>{msg.message}</div>
          ))}
      </div>
      <div
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
        id="announcer-assertive"
      >
        {messages
          .filter(msg => msg.priority === "assertive")
          .map(msg => (
            <div key={msg.id}>{msg.message}</div>
          ))}
      </div>
    </AnnouncerContext.Provider>
  );
}

export function useAnnouncer() {
  const context = useContext(AnnouncerContext);
  if (!context) {
    throw new Error("useAnnouncer must be used within AnnouncerProvider");
  }
  return context;
}
