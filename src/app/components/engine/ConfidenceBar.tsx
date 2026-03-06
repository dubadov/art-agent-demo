interface ConfidenceItem {
  label: string;
  value: number;
}

export default function ConfidenceBar({ items }: { items: ConfidenceItem[] }) {
  return (
    <div className="engine-panel">
      <div className="engine-label">AI Confidence Scores</div>
      <div className="space-y-2">
        {items.map((item, i) => {
          const color =
            item.value >= 90 ? "var(--engine-green)" : item.value >= 70 ? "var(--engine-amber)" : "var(--engine-red)";
          return (
            <div key={i} className="flex items-center gap-3 font-mono text-[0.65rem]">
              <span className="text-[var(--engine-text)] w-28 shrink-0 truncate">{item.label}</span>
              <div className="confidence-bar-bg flex-1">
                <div className="confidence-bar-fill" style={{ width: `${item.value}%`, background: color }} />
              </div>
              <span className="text-[var(--engine-text-bright)] w-10 text-left">{item.value}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
