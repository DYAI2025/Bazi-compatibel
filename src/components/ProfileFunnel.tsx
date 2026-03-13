import React from 'react';

interface ProfileFunnelProps {
  lang: 'de' | 'en';
}

export const ProfileFunnel: React.FC<ProfileFunnelProps> = ({ lang }) => {
  const content = {
    de: {
      headline: 'Mehr als ein Zeichen: dein persönliches Profil',
      text: 'Dein Zeichen ist der Anfang – nicht das ganze Bild. Mit deinem Profil öffnest du die nächste Ebene: mehr Kontext, mehr Persönlichkeit, mehr Tiefe. Hier beginnt der Wechsel von der schnellen Matrix zur echten individuellen Analyse.',
      cta: 'Jetzt Profil erstellen',
      benefits: [
        'präzisere Einordnung deiner Energie',
        'tiefere Deutung deiner Beziehungsmuster',
        'Grundlage für spätere Partnerschaftsanalysen'
      ]
    },
    en: {
      headline: 'More than just a sign: your personal profile',
      text: 'Your sign is just the beginning – not the whole picture. With your profile, you unlock the next level: more context, more personality, more depth. Here begins the shift from the quick matrix to a truly individual analysis.',
      cta: 'Create profile now',
      benefits: [
        'More precise classification of your energy',
        'Deeper interpretation of your relationship patterns',
        'Foundation for future partnership analyses'
      ]
    }
  };

  const t = content[lang];

  return (
    <div className="max-w-2xl mx-auto p-8 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl mt-12">
      <h2 className="text-3xl font-serif italic text-white mb-6">{t.headline}</h2>
      <p className="text-zinc-400 text-lg mb-8 leading-relaxed">{t.text}</p>
      
      <ul className="mb-8 space-y-3">
        {t.benefits.map((benefit, i) => (
          <li key={i} className="flex items-center text-zinc-300">
            <span className="text-amber-500 mr-3">✓</span> {benefit}
          </li>
        ))}
      </ul>

      <button className="w-full py-4 bg-amber-500 text-zinc-950 font-bold rounded-xl hover:bg-amber-400 transition-all">
        {t.cta}
      </button>
    </div>
  );
};
