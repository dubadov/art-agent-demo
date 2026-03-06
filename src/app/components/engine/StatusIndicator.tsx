export default function StatusIndicator({
  label,
  status = "online",
}: {
  label: string;
  status?: "online" | "idle" | "offline";
}) {
  const dotClass =
    status === "online" ? "status-dot-online" : status === "idle" ? "status-dot-idle" : "status-dot-offline";

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem]">
      <span className={`status-dot ${dotClass}`} />
      <span className="text-[var(--engine-text-bright)]">{label}</span>
    </span>
  );
}
