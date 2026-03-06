export default function OutputPreview({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <>
      <div className="output-divider" dir="rtl">
        <span>{label || "רנדור פלט » תצוגה מקדימה — מה שהמבקרים באתר שלך יראו"}</span>
      </div>
      <div>{children}</div>
    </>
  );
}
