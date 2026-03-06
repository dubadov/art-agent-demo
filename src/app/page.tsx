import Link from "next/link";
import Image from "next/image";
import museums from "@/data/museums.json";
import galleries from "@/data/galleries.json";
import exhibitions from "@/data/exhibitions.json";
import artists from "@/data/artists.json";
import emails from "@/data/emails.json";

const stats = [
  { label: "מוזיאונים", value: museums.length, icon: "/icon-museums.png", href: "/museums", color: "from-indigo-500 to-purple-600" },
  { label: "גלריות", value: galleries.length, icon: "/icon-galleries.png", href: "/galleries", color: "from-pink-500 to-rose-600" },
  { label: "תערוכות", value: exhibitions.length, icon: "/icon-exhibitions.png", href: "/exhibitions", color: "from-amber-500 to-orange-600" },
  { label: "אמנים", value: artists.length, icon: "/icon-artists.png", href: "/artists", color: "from-emerald-500 to-teal-600" },
  { label: "טיוטות מייל", value: `${emails.length} / ${artists.length}`, icon: "/icon-outreach.png", href: "/outreach", color: "from-sky-500 to-blue-600" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            סוכן AI פעיל – מגלה אמנות ישראלית בזמן אמת
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            גילוי <span className="text-gradient">אמנות ישראלית</span>
            <br />
            באמצעות בינה מלאכותית
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            הסוכן שלנו סורק אוטומטית את האינטרנט, מוצא מוזיאונים, גלריות, תערוכות ואמנים ישראלים,
            ויוצר פנייה מותאמת אישית לכל אמן – הכל בלחיצת כפתור.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/museums"
              className="px-8 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white rounded-xl font-medium transition-colors"
            >
              גלה מוזיאונים
            </Link>
            <Link
              href="/outreach"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors border border-white/20"
            >
              צפה בפנייה לאמנים
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-10 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="bg-white rounded-2xl shadow-lg p-5 text-center card-hover border border-gray-100"
            >
              <div className="text-3xl mb-2">
                {s.icon.startsWith("/") ? (
                  <Image src={s.icon} alt={s.label} width={36} height={36} className="mx-auto" />
                ) : (
                  s.icon
                )}
              </div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <h2 className="text-2xl font-bold text-center mb-12">איך הסוכן עובד?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "סריקה אוטומטית",
              desc: "הסוכן סורק מאות אתרים, מנועי חיפוש ומאגרי מידע כדי למצוא כל מוזיאון, גלריה, תערוכה ואמן בישראל.",
              engines: "Gemini • Tavily • Brave • EXA • Perplexity • Wikipedia • Claude • Groq Compound",
            },
            {
              step: "02",
              title: "ארגון וניתוח",
              desc: "המידע מאורגן אוטומטית לפי קטגוריות, אזורים, תאריכים ומדיום אמנותי. כל פריט מקבל תיאור מפורט.",
              engines: "Claude • Gemini Pro • Jina Reader • Perplexity",
            },
            {
              step: "03",
              title: "פנייה מותאמת אישית",
              desc: "הסוכן יוצר מייל ייחודי לכל אמן, מבוסס על המחקר העמוק שנעשה על היצירות והערכים שלו.",
              engines: "Gemini Pro • Claude • Perplexity • פנייה מותאמת • שליחה אוטומטית",
            },
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="text-4xl font-bold text-gray-100 mb-4">{item.step}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{item.desc}</p>
              <div className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-lg">{item.engines}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-hero text-white py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            ArtAgent Demo – הדגמה של יכולות AI לגילוי אמנות ישראלית
          </p>
          <p className="text-gray-500 text-xs mt-2">
            כל הנתונים נאספו באופן אוטומטי ע״י סוכן AI • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
