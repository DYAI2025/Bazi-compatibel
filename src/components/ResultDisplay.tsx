import React from 'react';

interface ResultDisplayProps {
  sign: string;
  onNextStep: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ sign, onNextStep }) => {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl">
      <h2 className="text-sm font-mono text-amber-500 uppercase tracking-widest mb-4">Ergebnis</h2>
      <h1 className="text-4xl md:text-5xl font-serif italic text-white mb-6">
        Dein Zeichen ist: <span className="text-amber-400">{sign}</span>
      </h1>
      <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
        Dieses Zeichen steht für eine bestimmte Grundenergie, Dynamik und Art, Beziehungen zu erleben. In der Matrix siehst du jetzt, welche Zeichen besonders gut mit dir harmonieren – und welche Verbindungen eher Reibung und Entwicklung auslösen.
      </p>
      <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 mb-8">
        <p className="text-zinc-300 italic">
          Das ist dein erster Einstieg. Die Matrix zeigt dir auf einen Blick deine grundlegenden Matches. Für mehr Tiefe und inklusive persönlichem Profil und später einer detaillierten Partnerschaftsanalyse gehst du den nächsten Schritt.
        </p>
      </div>
      <div className="flex gap-4">
        <button 
          onClick={onNextStep}
          className="flex-1 py-4 bg-amber-500 text-zinc-950 font-bold rounded-xl hover:bg-amber-400 transition-all"
        >
          Nächster Schritt
        </button>
        {typeof navigator !== 'undefined' && navigator.share && (
          <button 
            onClick={() => navigator.share({
              title: 'Mein chinesisches Tierkreiszeichen',
              text: `Ich habe mein chinesisches Tierkreiszeichen entdeckt: ${sign}!`,
              url: window.location.href
            }).catch(console.error)}
            className="px-6 py-4 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-all"
          >
            Teilen
          </button>
        )}
      </div>
    </div>
  );
};
