export default function DataSourceBadge({
  sources,
}: {
  sources: { engine: string; role: string }[];
}) {
  return (
    <div className="engine-panel">
      <div className="engine-label">Data Source Attribution</div>
      <div className="flex flex-wrap gap-2" dir="ltr">
        {sources.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.03)] border border-[var(--engine-border)] rounded px-2 py-1">
              <span className="status-dot status-dot-online" />
              <span className="font-mono text-[0.6rem] text-[var(--engine-text-bright)]">{s.engine}</span>
            </div>
            {i < sources.length - 1 && <span className="font-mono text-[0.55rem] text-[var(--engine-text)] opacity-30">→</span>}
          </div>
        ))}
      </div>
      <div className="font-mono text-[0.55rem] text-[var(--engine-text)] opacity-40 mt-2">
        {sources.map((s) => `${s.engine}: ${s.role}`).join(" • ")}
      </div>
    </div>
  );
}
