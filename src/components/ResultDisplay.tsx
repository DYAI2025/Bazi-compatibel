import React from 'react';

interface ResultDisplayProps {
  sign: string;
  onNextStep: () => void;
  lang: 'de' | 'en';
  compatibilityScore?: string;
  relationshipDescription?: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ sign, onNextStep, lang, compatibilityScore, relationshipDescription }) => {
  const content = {
    de: {
      headline: 'Dein Zeichen ist:',
      subline: 'Dieses Zeichen steht für eine bestimmte Grundenergie, Dynamik und Art, Beziehungen zu erleben. In der Matrix siehst du jetzt, welche Zeichen besonders gut mit dir harmonieren – und welche Verbindungen eher Reibung und Entwicklung auslösen.',
      body: 'Das ist dein erster Einstieg. Die Matrix zeigt dir auf einen Blick deine grundlegenden Matches. Für mehr Tiefe – inklusive persönlichem Profil und später einer detaillierten Partnerschaftsanalyse – gehst du den nächsten Schritt.',
      next: 'Nächster Schritt',
      share: 'Teilen'
    },
    en: {
      headline: 'Your sign is:',
      subline: 'This sign represents a specific fundamental energy, dynamic, and way of experiencing relationships. In the matrix, you can now see which signs harmonize particularly well with you – and which connections tend to trigger friction and development.',
      body: 'This is your first step. The matrix shows you your basic matches at a glance. For more depth – including a personal profile and later a detailed partnership analysis – take the next step.',
      next: 'Next step',
      share: 'Share'
    }
  };

  const t = content[lang];

  const shareData = {
    title: lang === 'de' ? 'Mein chinesisches Tierkreiszeichen' : 'My Chinese zodiac sign',
    text: `${t.headline} ${sign}! ${compatibilityScore ? `\nCompatibility Score: ${compatibilityScore}` : ''}${relationshipDescription ? `\nRelationship: ${relationshipDescription}` : ''}`,
    url: window.location.href
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl">
      <h2 className="text-sm font-mono text-amber-500 uppercase tracking-widest mb-4">
        {lang === 'de' ? 'Ergebnis' : 'Result'}
      </h2>
      <h1 className="text-4xl md:text-5xl font-serif italic text-white mb-6">
        {t.headline} <span className="text-amber-400">{sign}</span>
      </h1>
      <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
        {t.subline}
      </p>
      <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 mb-8">
        <p className="text-zinc-300 italic">
          {t.body}
        </p>
      </div>
      <div className="flex gap-4">
        <button 
          onClick={onNextStep}
          className="flex-1 py-4 bg-amber-500 text-zinc-950 font-bold rounded-xl hover:bg-amber-400 transition-all"
        >
          {t.next}
        </button>
        {typeof navigator !== 'undefined' && navigator.share && (
          <button 
            onClick={() => navigator.share(shareData).catch(console.error)}
            className="px-6 py-4 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-all"
          >
            {t.share}
          </button>
        )}
      </div>
      <div className="mt-8 text-center">
        <a 
          href="https://bazodiac.space" 
          className="text-zinc-500 text-sm hover:text-amber-500 transition-colors underline decoration-zinc-800 underline-offset-4"
        >
          {lang === 'de' ? 'Zurück zur Hauptseite bazodiac.space' : 'Back to main site bazodiac.space'}
        </a>
      </div>
    </div>
  );
};
