"use client";
import { useState } from "react";

interface SchemaField {
  name: string;
  type: string;
  example?: string;
}

export default function SchemaViewer({
  title,
  fields,
  recordCount,
}: {
  title: string;
  fields: SchemaField[];
  recordCount: number;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="engine-panel">
      <div className="flex items-center justify-between mb-2">
        <div className="engine-label mb-0">{title}</div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="font-mono text-[0.6rem] text-[var(--engine-cyan)] hover:text-[var(--engine-text-bright)] transition-colors"
        >
          {expanded ? "▼ Collapse" : "▶ Expand"} Schema
        </button>
      </div>
      <div className="font-mono text-[0.6rem] text-[var(--engine-text)] mb-2">
        {recordCount} records • {fields.length} fields per record
      </div>
      {expanded && (
        <div className="schema-block" dir="ltr">
          <div>{"{"}</div>
          {fields.map((f, i) => (
            <div key={i} className="ps-4">
              <span className="schema-key">&quot;{f.name}&quot;</span>
              <span className="text-[var(--engine-text)]">: </span>
              <span className="schema-type">{f.type}</span>
              {f.example && (
                <>
                  <span className="text-[var(--engine-text)] opacity-30"> // </span>
                  <span className="schema-string">{f.example}</span>
                </>
              )}
              {i < fields.length - 1 && <span className="text-[var(--engine-text)]">,</span>}
            </div>
          ))}
          <div>{"}"}</div>
        </div>
      )}
    </div>
  );
}
