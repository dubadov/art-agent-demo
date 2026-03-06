interface EngineCardProps {
  name: string;
  status: "online" | "idle" | "offline";
  calls: number;
  avgLatency: string;
  role: string;
}

export default function EngineCard({ name, status, calls, avgLatency, role }: EngineCardProps) {
  const dotClass =
    status === "online" ? "status-dot-online" : status === "idle" ? "status-dot-idle" : "status-dot-offline";
  const statusLabel = status === "online" ? "Online" : status === "idle" ? "Idle" : "Offline";

  return (
    <div className="engine-panel flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-[var(--engine-text-bright)] font-semibold">{name}</span>
        <span className={`status-dot ${dotClass}`} />
      </div>
      <div className="text-[0.6rem] text-[var(--engine-text)] opacity-70">{role}</div>
      <div className="flex gap-4 mt-1 font-mono text-[0.6rem]">
        <div>
          <div className="text-[var(--engine-text)] opacity-50">Status</div>
          <div className="text-[var(--engine-text-bright)]">{statusLabel}</div>
        </div>
        <div>
          <div className="text-[var(--engine-text)] opacity-50">Calls</div>
          <div className="text-[var(--engine-amber)]">{calls.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-[var(--engine-text)] opacity-50">Avg Latency</div>
          <div className="text-[var(--engine-cyan)]">{avgLatency}</div>
        </div>
      </div>
    </div>
  );
}
