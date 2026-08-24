import React from "react";
import { PERSONAL_INFO } from "@/lib/data";
import { PhoneCall, MessageCircle, CalendarPlus } from "lucide-react";

const TEL_HREF = `tel:${PERSONAL_INFO.phone.replace(/[^+\d]/g, "")}`;

/** Fixed thumb-reach action bar — mobile only (<lg). */
export function MobileActionBar({ bookHref = "#contact" }: { bookHref?: string }) {
  return (
    <nav
      aria-label="Quick actions"
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-white/92 backdrop-blur-md border-t border-hairline shadow-[0_-8px_24px_-12px_rgba(24,24,27,0.15)]"
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-3 divide-x divide-hairline safe-bottom">
        <a
          href={TEL_HREF}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold text-zinc-600 hover:text-signal transition-colors min-h-[56px] focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none -outline-offset-4"
        >
          <PhoneCall className="w-5 h-5 shrink-0" aria-hidden="true" />
          Call
        </a>
        <a
          href={PERSONAL_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold text-zinc-600 hover:text-signal transition-colors min-h-[56px] focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none -outline-offset-4"
        >
          <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href={bookHref}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold bg-signal text-white hover:bg-signal-deep transition-colors min-h-[56px] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none -outline-offset-4"
        >
          <CalendarPlus className="w-5 h-5 shrink-0" aria-hidden="true" />
          Book now
        </a>
      </div>
    </nav>
  );
}
