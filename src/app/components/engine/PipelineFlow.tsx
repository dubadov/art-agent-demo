"use client";

interface PipelineStep {
  label: string;
  sublabel?: string;
  active?: boolean;
  done?: boolean;
}

export default function PipelineFlow({ steps }: { steps: PipelineStep[] }) {
  return (
    <div className="engine-panel">
      <div className="engine-label">Processing Pipeline</div>
      <div className="flex items-center gap-1 overflow-x-auto py-2" dir="ltr">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-1 shrink-0">
            <div className={`pipeline-node ${step.active ? "active" : ""}`}>
              <div className="flex items-center gap-1.5">
                {step.done && <span className="text-[var(--engine-green)]">&#10003;</span>}
                {step.active && !step.done && <span className="status-dot status-dot-online" />}
                <span className={step.active || step.done ? "text-[var(--engine-text-bright)]" : ""}>
                  {step.label}
                </span>
              </div>
              {step.sublabel && (
                <div className="text-[0.6rem] text-[var(--engine-text)] mt-0.5 opacity-60">{step.sublabel}</div>
              )}
            </div>
            {i < steps.length - 1 && (
              <span className={`pipeline-arrow text-lg ${step.done ? "active" : ""}`}>&#8594;</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
