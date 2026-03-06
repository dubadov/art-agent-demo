"use client";

export default function EngineZone({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="engine-zone">
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="flex items-center gap-3 mb-4">
            <div className="status-dot status-dot-online" />
            <span className="font-mono text-xs text-[var(--engine-cyan)] uppercase tracking-widest">{title}</span>
            <div className="flex-1 h-px bg-[var(--engine-border)]" />
            <span className="font-mono text-[0.6rem] text-[var(--engine-text)]">
              LIVE • {new Date().toLocaleTimeString("en-US", { hour12: false })}
            </span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
