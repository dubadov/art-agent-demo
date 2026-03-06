interface Metric {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}

export default function MetricPanel({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {metrics.map((m, i) => (
        <div key={i} className="engine-panel text-center py-3">
          <div
            className="font-mono text-xl font-bold"
            style={{ color: m.color || "var(--engine-text-bright)" }}
          >
            {m.value}
          </div>
          <div className="font-mono text-[0.6rem] text-[var(--engine-text)] mt-1 uppercase tracking-wider">
            {m.label}
          </div>
          {m.sub && <div className="text-[0.55rem] text-[var(--engine-text)] opacity-40 mt-0.5">{m.sub}</div>}
        </div>
      ))}
    </div>
  );
}
