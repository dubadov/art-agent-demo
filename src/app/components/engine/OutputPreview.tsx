export default function OutputPreview({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <>
      <div className="output-divider">
        <span>{label || "OUTPUT PREVIEW — What your site visitors will see"}</span>
      </div>
      <div>{children}</div>
    </>
  );
}
