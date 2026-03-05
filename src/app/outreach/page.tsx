"use client";
import { useState } from "react";
import emails from "@/data/emails.json";
import artists from "@/data/artists.json";

export default function OutreachPage() {
  const [showAutoSendModal, setShowAutoSendModal] = useState(false);
  const [sentEmails, setSentEmails] = useState<Record<number, boolean>>({});
  const [regenerating, setRegenerating] = useState<Record<number, boolean>>({});

  const remainingArtists = artists.length - emails.length;

  function handleSend(emailId: number) {
    setSentEmails((prev) => ({ ...prev, [emailId]: true }));
    setTimeout(() => {
      setSentEmails((prev) => ({ ...prev, [emailId]: false }));
    }, 3000);
  }

  function handleRegenerate(emailId: number) {
    setRegenerating((prev) => ({ ...prev, [emailId]: true }));
    setTimeout(() => {
      setRegenerating((prev) => ({ ...prev, [emailId]: false }));
    }, 2000);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📧 פנייה אוטומטית לאמנים</h1>
        <p className="text-gray-500">
          הסוכן יוצר מייל מותאם אישית לכל אמן, מבוסס על מחקר מעמיק של היצירות והערכים שלו.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{emails.length}</div>
              <div className="text-sm text-gray-500">טיוטות מוכנות</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">{remainingArtists}</div>
              <div className="text-sm text-gray-500">ממתינים ליצירת טיוטה</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">{artists.length}</div>
              <div className="text-sm text-gray-500">אמנים בסה״כ</div>
            </div>
          </div>

          <button
            onClick={() => setShowAutoSendModal(true)}
            className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white rounded-xl font-medium transition-colors flex items-center gap-2"
          >
            🚀 שליחה אוטומטית לכל האמנים
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-sm text-blue-800">
        <strong>💡 איך זה עובד:</strong> הסוכן חוקר כל אמן לעומק – יצירות, תערוכות, ערכים אמנותיים – 
        ויוצר מייל ייחודי שמדבר בשפה של האמן. כל מייל שונה לחלוטין ומותאם אישית.
      </div>

      {/* Email Cards */}
      <div className="space-y-6">
        {emails.map((email) => (
          <div
            key={email.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Email Header */}
            <div className="bg-gray-50 border-b border-gray-100 px-6 py-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{email.artistName}</h3>
                  <p className="text-sm text-gray-500">{email.artistNameEn}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    📧 {email.artistEmail}
                  </span>
                  <span className="badge bg-amber-100 text-amber-800">טיוטה</span>
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="px-6 py-3 border-b border-gray-50">
              <div className="text-sm text-gray-500 mb-1">נושא:</div>
              <div className="font-medium text-gray-900">{email.subject}</div>
            </div>

            {/* Body */}
            <div className="px-6 py-4">
              <div className="text-sm text-gray-500 mb-2">תוכן:</div>
              <div className="whitespace-pre-line text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-100">
                {regenerating[email.id] ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                      <span className="text-gray-500">AI מייצר גרסה חדשה...</span>
                    </div>
                  </div>
                ) : (
                  email.body
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3">
              <button
                onClick={() => handleSend(email.id)}
                disabled={sentEmails[email.id]}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                  sentEmails[email.id]
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white"
                }`}
              >
                {sentEmails[email.id] ? (
                  <>✅ נשלח בהצלחה!</>
                ) : (
                  <>📤 שלח מייל</>
                )}
              </button>

              <button
                onClick={() => handleRegenerate(email.id)}
                disabled={regenerating[email.id]}
                className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                🔄 צור מחדש
              </button>

              <button className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                ✏️ ערוך
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Remaining Banner */}
      <div className="mt-8 bg-linear-to-r from-[var(--color-surface)] to-[var(--color-surface-light)] rounded-2xl p-8 text-white text-center">
        <div className="text-4xl mb-3">🎯</div>
        <h3 className="text-xl font-bold mb-2">
          עוד {remainingArtists} אמנים מחכים לפנייה מותאמת אישית
        </h3>
        <p className="text-gray-300 text-sm mb-4">
          הסוכן יכול לייצר מייל ייחודי לכל אחד מ-{artists.length} האמנים ברשימה – כולם מותאמים אישית
          על בסיס מחקר מעמיק.
        </p>
        <button className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white rounded-xl font-medium transition-colors">
          צור טיוטות לכל {remainingArtists} האמנים
        </button>
      </div>

      {/* Auto-Send Modal */}
      {showAutoSendModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">שליחה אוטומטית</h3>
            <p className="text-gray-600 text-sm mb-6">
              פעולה זו תשלח {emails.length} מיילים מותאמים אישית לאמנים שנבחרו.
              <br />
              <span className="text-amber-600 font-medium">
                בגרסת ההדגמה, המיילים לא נשלחים בפועל.
              </span>
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-right">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">מיילים לשליחה:</span>
                  <span className="font-bold">{emails.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">אמנים ברשימת המתנה:</span>
                  <span className="font-bold">{remainingArtists}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">קצב שליחה:</span>
                  <span className="font-bold">50 מיילים/שעה</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAutoSendModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                ביטול
              </button>
              <button
                onClick={() => {
                  setShowAutoSendModal(false);
                  emails.forEach((e) => handleSend(e.id));
                }}
                className="flex-1 px-4 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white rounded-xl text-sm font-medium"
              >
                שלח הכל
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
