interface TimelineStep {
  time: string;
  engine: string;
  action: string;
  detail?: string;
}

export default function ProcessingTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="engine-panel">
      <div className="engine-label">Processing Timeline</div>
      <div className="space-y-0" dir="ltr">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-3 relative">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-2 h-2 rounded-full bg-[var(--engine-cyan)] mt-1.5 shrink-0" />
              {i < steps.length - 1 && <div className="w-px flex-1 bg-[var(--engine-border)]" />}
            </div>
            <div className="pb-3 font-mono text-[0.65rem]">
              <div className="flex items-center gap-2">
                <span className="text-[var(--engine-text)] opacity-50">{step.time}</span>
                <span className="text-[var(--engine-cyan)]">[{step.engine}]</span>
              </div>
              <div className="text-[var(--engine-text-bright)]">{step.action}</div>
              {step.detail && <div className="text-[var(--engine-text)] opacity-50 mt-0.5">{step.detail}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
