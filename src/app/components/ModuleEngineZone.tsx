"use client";
import EngineZone from "./engine/EngineZone";
import SchemaViewer from "./engine/SchemaViewer";
import MetricPanel from "./engine/MetricPanel";
import DataSourceBadge from "./engine/DataSourceBadge";

interface SchemaField {
  name: string;
  type: string;
  example?: string;
}

interface ModuleEngineZoneProps {
  moduleName: string;
  recordCount: number;
  schemaTitle: string;
  schemaFields: SchemaField[];
  completenessItems: { label: string; pct: number }[];
  sources: { engine: string; role: string }[];
  extraMetrics?: { label: string; value: string | number; color?: string; sub?: string }[];
}

export default function ModuleEngineZone({
  moduleName,
  recordCount,
  schemaTitle,
  schemaFields,
  completenessItems,
  sources,
  extraMetrics,
}: ModuleEngineZoneProps) {
  const avgCompleteness = Math.round(completenessItems.reduce((s, c) => s + c.pct, 0) / completenessItems.length);

  return (
    <EngineZone title={`${moduleName} — Data Module`}>
      <div className="space-y-4">
        <MetricPanel
          metrics={[
            { label: "Records", value: recordCount, color: "var(--engine-cyan)" },
            { label: "Data Quality", value: `${avgCompleteness}%`, color: avgCompleteness >= 85 ? "var(--engine-green)" : "var(--engine-amber)" },
            { label: "Fields/Record", value: schemaFields.length, color: "var(--engine-text-bright)" },
            { label: "Last Updated", value: "2m ago", sub: "Auto-refresh" },
            ...(extraMetrics || []),
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <SchemaViewer title={schemaTitle} fields={schemaFields} recordCount={recordCount} />

          <div className="space-y-4">
            <DataSourceBadge sources={sources} />

            <div className="engine-panel">
              <div className="engine-label">Field Completeness</div>
              <div className="space-y-1.5">
                {completenessItems.map((item, i) => {
                  const color =
                    item.pct >= 90 ? "var(--engine-green)" : item.pct >= 70 ? "var(--engine-amber)" : "var(--engine-red)";
                  return (
                    <div key={i} className="flex items-center gap-2 font-mono text-[0.6rem]">
                      <span className="text-[var(--engine-text)] w-32 shrink-0 truncate">{item.label}</span>
                      <div className="confidence-bar-bg flex-1">
                        <div className="confidence-bar-fill" style={{ width: `${item.pct}%`, background: color }} />
                      </div>
                      <span className="text-[var(--engine-text-bright)] w-8 text-left">{item.pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </EngineZone>
  );
}
