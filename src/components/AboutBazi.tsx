import React from 'react';

interface AboutBaziProps {
  lang: 'de' | 'en';
}

export const AboutBazi: React.FC<AboutBaziProps> = ({ lang }) => {
  const content = {
    de: {
      headline: 'Die Weisheit des Bazi: Uralte Geheimnisse deines Schicksals',
      originsTitle: 'Ursprung & Geschichte',
      originsText: 'Vor über 2.000 Jahren in der Han-Dynastie entstanden, ist Bazi (Die vier Säulen des Schicksals) eine der präzisesten Formen der chinesischen Astrologie. Im Gegensatz zum westlichen Horoskop analysiert Bazi die energetische Signatur deiner Geburt – Jahr, Monat, Tag und Stunde – um ein tiefes Verständnis deines Lebenswegs und deiner Liebes-Kompatibilität zu ermöglichen.',
      raceTitle: 'Die Legende der 13 Tiere',
      raceText: 'Man sagt, der Jade-Kaiser lud alle Tiere zu einem großen Rennen über einen reißenden Fluss ein. 13 Tiere traten an, doch nur 12 schafften es in den ewigen Kalender. Die Ratte gewann durch List, während die Katze durch Verrat leer ausging. Jedes Tier steht heute für eine bestimmte Grundenergie, die bestimmt, wie wir lieben, fühlen und mit anderen harmonieren.',
      ctaTitle: 'Finde deine Bestimmung',
      ctaText: 'Bazi ist mehr als nur ein Tierzeichen. Es ist das Zusammenspiel der Fünf Elemente (Holz, Feuer, Erde, Metall, Wasser). Wenn deine Elemente mit denen deines Partners harmonieren, entsteht wahre Magie. Entdecke jetzt in unserer Matrix, ob deine Sterne für eine ewige Verbindung stehen.'
    },
    en: {
      headline: 'The Wisdom of Bazi: Ancient Secrets of Your Destiny',
      originsTitle: 'Origins & History',
      originsText: 'Originating over 2,000 years ago during the Han Dynasty, Bazi (Four Pillars of Destiny) is one of the most sophisticated forms of Chinese astrology. Unlike Western horoscopes, Bazi maps your unique energetic signature based on the precise year, month, day, and hour of your birth to reveal your life path and romantic compatibility.',
      raceTitle: 'The Legend of the 13 Animals',
      raceText: 'Legend tells of the Jade Emperor who invited all animals to a celestial race across a mighty river. 13 animals set out, but only 12 earned their place in the zodiac. The Rat won through wit, while the Cat was left behind through betrayal. Today, each animal represents a fundamental energy that dictates how we love, feel, and harmonize with others.',
      ctaTitle: 'Discover Your Destiny',
      ctaText: 'Bazi is more than just an animal sign; it is the interaction of the Five Elements (Wood, Fire, Earth, Metal, Water). When your elements align with your partner\'s, true harmony is born. Use our matrix now to discover if your stars are aligned for a lifelong connection.'
    }
  };

  const t = content[lang];

  return (
    <section className="max-w-4xl mx-auto mt-20 p-8 md:p-12 bg-zinc-900/50 rounded-3xl border border-zinc-800 backdrop-blur-sm shadow-2xl">
      <h2 className="text-3xl md:text-4xl font-serif italic text-white mb-10 text-center">
        {t.headline}
      </h2>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="group">
            <h3 className="text-amber-500 font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-8 h-px bg-amber-500/30 group-hover:w-12 transition-all"></span>
              {t.originsTitle}
            </h3>
            <p className="text-zinc-400 leading-relaxed text-sm italic font-serif">
              {t.originsText}
            </p>
          </div>

          <div className="group">
            <h3 className="text-amber-500 font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-8 h-px bg-amber-500/30 group-hover:w-12 transition-all"></span>
              {t.raceTitle}
            </h3>
            <p className="text-zinc-400 leading-relaxed text-sm italic font-serif">
              {t.raceText}
            </p>
          </div>
        </div>

        <div className="bg-zinc-950/50 p-8 rounded-2xl border border-zinc-800 flex flex-col justify-center items-center text-center group hover:border-amber-500/30 transition-colors">
          <div className="w-16 h-16 mb-6 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-3xl group-hover:scale-110 transition-transform">
            ✨
          </div>
          <h3 className="text-xl font-serif italic text-amber-400 mb-4">
            {t.ctaTitle}
          </h3>
          <p className="text-zinc-300 text-sm leading-relaxed mb-8">
            {t.ctaText}
          </p>
          <a 
            href="#top" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-mono text-amber-500 uppercase tracking-widest border-b border-amber-500/30 pb-1 hover:text-amber-400 hover:border-amber-400 transition-all"
          >
            {lang === 'de' ? 'Jetzt berechnen' : 'Calculate now'}
          </a>
        </div>
      </div>
    </section>
  );
};
