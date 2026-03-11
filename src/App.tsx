/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { fetchBaziData } from './services/baziService';
import { BaziResponse } from './types';

// Simplified Chinese New Year dates for 1950-2031
const chineseNewYearDates = [
  '1950-02-17', '1951-02-06', '1952-01-27', '1953-02-14', '1954-02-03', '1955-01-24', '1956-02-12', '1957-01-31', '1958-02-18', '1959-02-08',
  '1960-01-28', '1961-02-15', '1962-02-05', '1963-01-25', '1964-02-13', '1965-02-02', '1966-01-21', '1967-02-09', '1968-01-30', '1969-02-17',
  '1970-02-06', '1971-01-27', '1972-02-15', '1973-02-03', '1974-01-23', '1975-02-11', '1976-01-31', '1977-02-18', '1978-02-07', '1979-01-28',
  '1980-02-16', '1981-02-05', '1982-01-25', '1983-02-13', '1984-02-02', '1985-02-20', '1986-02-09', '1987-01-29', '1988-02-17', '1989-02-06',
  '1990-01-27', '1991-02-15', '1992-02-04', '1993-01-23', '1994-02-10', '1995-01-31', '1996-02-19', '1997-02-07', '1998-01-28', '1999-02-16',
  '2000-02-05', '2001-01-24', '2002-02-12', '2003-02-01', '2004-01-22', '2005-02-09', '2006-01-29', '2007-02-18', '2008-02-07', '2009-01-26',
  '2010-02-14', '2011-02-03', '2012-01-23', '2013-02-10', '2014-01-31', '2015-02-19', '2016-02-08', '2017-01-28', '2018-02-16', '2019-02-05',
  '2020-01-25', '2021-02-12', '2022-02-01', '2023-01-22', '2024-02-10', '2025-01-29', '2026-02-17', '2027-02-06', '2028-01-26', '2029-02-13',
  '2030-02-03', '2031-01-23'
];

const animals = [
  { de: 'Ratte', en: 'Rat', emoji: '🐀', element: 'Wasser' },
  { de: 'Büffel', en: 'Ox', emoji: '🐂', element: 'Erde' },
  { de: 'Tiger', en: 'Tiger', emoji: '🐅', element: 'Holz' },
  { de: 'Hase', en: 'Rabbit', emoji: '🐇', element: 'Holz' },
  { de: 'Drache', en: 'Dragon', emoji: '🐉', element: 'Erde' },
  { de: 'Schlange', en: 'Snake', emoji: '🐍', element: 'Feuer' },
  { de: 'Pferd', en: 'Horse', emoji: '🐎', element: 'Feuer' },
  { de: 'Ziege', en: 'Goat', emoji: '🐐', element: 'Erde' },
  { de: 'Affe', en: 'Monkey', emoji: '🐒', element: 'Metall' },
  { de: 'Hahn', en: 'Rooster', emoji: '🐓', element: 'Metall' },
  { de: 'Hund', en: 'Dog', emoji: '🐕', element: 'Erde' },
  { de: 'Schwein', en: 'Pig', emoji: '🐖', element: 'Wasser' }
];

// ... (rest of the code)

const compatibility = {
  0: { 0: 'moderate', 1: 'excellent', 2: 'moderate', 3: 'good', 4: 'excellent', 5: 'good', 6: 'good', 7: 'excellent', 8: 'excellent', 9: 'good', 10: 'good', 11: 'excellent' },
  1: { 0: 'excellent', 1: 'moderate', 2: 'good', 3: 'moderate', 4: 'good', 5: 'excellent', 6: 'challenging', 7: 'good', 8: 'good', 9: 'excellent', 10: 'moderate', 11: 'good' },
  2: { 0: 'moderate', 1: 'good', 2: 'moderate', 3: 'excellent', 4: 'good', 5: 'moderate', 6: 'excellent', 7: 'excellent', 8: 'good', 9: 'moderate', 10: 'excellent', 11: 'good' },
  3: { 0: 'good', 1: 'moderate', 2: 'excellent', 3: 'moderate', 4: 'good', 5: 'moderate', 6: 'excellent', 7: 'excellent', 8: 'moderate', 9: 'good', 10: 'excellent', 11: 'excellent' },
  4: { 0: 'excellent', 1: 'good', 2: 'good', 3: 'good', 4: 'moderate', 5: 'good', 6: 'moderate', 7: 'moderate', 8: 'excellent', 9: 'excellent', 10: 'moderate', 11: 'good' },
  5: { 0: 'good', 1: 'excellent', 2: 'moderate', 3: 'moderate', 4: 'good', 5: 'moderate', 6: 'good', 7: 'moderate', 8: 'excellent', 9: 'excellent', 10: 'good', 11: 'moderate' },
  6: { 0: 'good', 1: 'challenging', 2: 'excellent', 3: 'excellent', 4: 'moderate', 5: 'good', 6: 'moderate', 7: 'good', 8: 'moderate', 9: 'good', 10: 'excellent', 11: 'excellent' },
  7: { 0: 'excellent', 1: 'good', 2: 'excellent', 3: 'excellent', 4: 'moderate', 5: 'moderate', 6: 'good', 7: 'moderate', 8: 'moderate', 9: 'moderate', 10: 'good', 11: 'excellent' },
  8: { 0: 'excellent', 1: 'good', 2: 'good', 3: 'moderate', 4: 'excellent', 5: 'excellent', 6: 'moderate', 7: 'moderate', 8: 'moderate', 9: 'good', 10: 'moderate', 11: 'good' },
  9: { 0: 'good', 1: 'excellent', 2: 'moderate', 3: 'good', 4: 'excellent', 5: 'excellent', 6: 'good', 7: 'moderate', 8: 'good', 9: 'moderate', 10: 'moderate', 11: 'moderate' },
  10: { 0: 'good', 1: 'moderate', 2: 'excellent', 3: 'excellent', 4: 'moderate', 5: 'good', 6: 'excellent', 7: 'good', 8: 'moderate', 9: 'moderate', 10: 'moderate', 11: 'excellent' },
  11: { 0: 'excellent', 1: 'good', 2: 'good', 3: 'excellent', 4: 'good', 5: 'moderate', 6: 'excellent', 7: 'excellent', 8: 'good', 9: 'moderate', 10: 'excellent', 11: 'moderate' }
};

const elementInteractions: Record<string, Record<string, 'harmonious' | 'clashing' | 'neutral'>> = {
  'Holz': { 'Holz': 'neutral', 'Feuer': 'harmonious', 'Erde': 'clashing', 'Metall': 'clashing', 'Wasser': 'harmonious' },
  'Feuer': { 'Holz': 'harmonious', 'Feuer': 'neutral', 'Erde': 'harmonious', 'Metall': 'clashing', 'Wasser': 'clashing' },
  'Erde': { 'Holz': 'clashing', 'Feuer': 'harmonious', 'Erde': 'neutral', 'Metall': 'harmonious', 'Wasser': 'clashing' },
  'Metall': { 'Holz': 'clashing', 'Feuer': 'clashing', 'Erde': 'harmonious', 'Metall': 'neutral', 'Wasser': 'harmonious' },
  'Wasser': { 'Holz': 'harmonious', 'Feuer': 'clashing', 'Erde': 'clashing', 'Metall': 'harmonious', 'Wasser': 'neutral' },
};

const compatibilityText = {
  excellent: {
    de: '🎯 Ausgezeichnet! Eine außergewöhnlich harmonische Verbindung. Beide Partner ergänzen sich nicht nur perfekt, sondern teilen auch eine tiefe, intuitive Verbundenheit, die über Worte hinausgeht. Sie unterstützen sich gegenseitig bei der Verwirklichung ihrer individuellen Träume und haben eine gemeinsame Vision für die Zukunft. Konflikte sind selten, da beide Partner eine ähnliche Wertebasis haben und offen sowie empathisch kommunizieren. Diese Beziehung bietet ein hohes Maß an emotionaler Sicherheit und gegenseitigem Vertrauen, was es beiden ermöglicht, ihr volles Potenzial zu entfalten. Stärken: Hohe Resonanz, natürliche Kooperation, gemeinsame Ziele. Herausforderungen: Kaum vorhanden, außer der Gefahr, sich zu sehr in der eigenen Blase zu verlieren.',
    en: '🎯 Excellent! An exceptionally harmonious connection. Both partners not only complement each other perfectly but also share a deep, intuitive bond that goes beyond words. They support each other in realizing their individual dreams and have a shared vision for the future. Conflicts are rare, as both partners share a similar value base and communicate openly and empathetically. This relationship offers a high level of emotional security and mutual trust, allowing both to reach their full potential. Strengths: High resonance, natural cooperation, shared goals. Challenges: Rarely any, other than the danger of becoming too isolated within their own bubble.'
  },
  good: {
    de: '👍 Gut! Eine solide und funktionierende Partnerschaft, die auf gegenseitigem Respekt und geteilten Interessen aufbaut. Die Partner schätzen die Stärken des anderen und arbeiten aktiv an einer stabilen, gemeinsamen Zukunft. Herausforderungen werden durch konstruktive Kommunikation und die Bereitschaft zu Kompromissen gelöst. Es gibt ein gesundes Gleichgewicht zwischen individueller Freiheit und dem Engagement für die Beziehung. Diese Verbindung ist geprägt von Zuverlässigkeit, gegenseitiger Anerkennung und der Freude, gemeinsam durch das Leben zu gehen. Stärken: Stabile Basis, gegenseitige Unterstützung, konstruktive Problemlösung. Herausforderungen: Erfordert bewusste Pflege, um nicht in eine Routine zu verfallen.',
    en: '👍 Good! A solid and functioning partnership built on mutual respect and shared interests. The partners appreciate each other\'s strengths and actively work toward a stable future together. Challenges are resolved through constructive communication and a willingness to compromise. There is a healthy balance between individual freedom and commitment to the relationship. This connection is characterized by reliability, mutual recognition, and the joy of navigating life together. Strengths: Stable foundation, mutual support, constructive problem-solving. Challenges: Requires conscious effort to avoid falling into a routine.'
  },
  moderate: {
    de: '🤔 Moderat. Diese Verbindung erfordert bewusste Arbeit und ein tiefes Verständnis füreinander. Unterschiede in den Persönlichkeiten oder Lebensstilen können gelegentlich zu Missverständnissen führen. Der Schlüssel zum Erfolg liegt in der Geduld, der Offenheit und der Bereitschaft, die Perspektive des anderen wirklich zu verstehen. Beide Partner müssen aktiv an ihrer Kommunikation arbeiten und lernen, Differenzen nicht als Hindernisse, sondern als Lernchancen zu betrachten. Mit kontinuierlicher Anstrengung und gegenseitigem Respekt kann diese Beziehung zu einer stabilen und erfüllenden Partnerschaft heranwachsen. Stärken: Potenzial für persönliches Wachstum, Lernmöglichkeiten. Herausforderungen: Kommunikationsbarrieren, unterschiedliche Lebensstile, erfordert Geduld.',
    en: '🤔 Moderate. This connection requires conscious work and a deep understanding of one another. Differences in personalities or lifestyles can occasionally lead to misunderstandings. The key to success lies in patience, openness, and the willingness to truly understand the other\'s perspective. Both partners must actively work on their communication and learn to view differences not as obstacles, but as opportunities for learning. With continuous effort and mutual respect, this relationship can grow into a stable and fulfilling partnership. Strengths: Potential for personal growth, learning opportunities. Challenges: Communication barriers, different lifestyles, requires patience.'
  },
  challenging: {
    de: '😰 Herausfordernd. Diese Beziehung erfordert ein hohes Maß an Energie, Kompromissbereitschaft und bewusster Anstrengung. Die Partner haben oft sehr unterschiedliche Ansätze zum Leben, was zu Spannungen führen kann. Doch gerade diese Unterschiede bieten ein enormes Potenzial für persönliches Wachstum und eine tiefgreifende Transformation. Es erfordert die Fähigkeit, die eigenen Bedürfnisse zeitweise zurückzustellen und die Welt durch die Augen des anderen zu sehen. Wenn beide bereit sind, an sich zu arbeiten und die Herausforderungen als gemeinsamen Weg zur Entwicklung zu begreifen, kann diese Beziehung eine außergewöhnliche Tiefe und Stärke erreichen. Stärken: Enormes Transformationspotenzial, tiefgreifende Lernerfahrungen. Herausforderungen: Hohes Konfliktpotenzial, erfordert hohe Kompromissbereitschaft und emotionale Reife.',
    en: '😰 Challenging. This relationship requires a high level of energy, willingness to compromise, and conscious effort. The partners often have very different approaches to life, which can lead to tension. Yet, it is precisely these differences that offer enormous potential for personal growth and profound transformation. It requires the ability to temporarily set aside one\'s own needs and see the world through the other\'s eyes. If both are willing to work on themselves and view the challenges as a shared path to development, this relationship can achieve extraordinary depth and strength. Strengths: Enormous potential for transformation, profound learning experiences. Challenges: High conflict potential, requires high willingness to compromise and emotional maturity.'
  }
};

export default function App() {
  const [lang, setLang] = useState<'de' | 'en'>('de');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [foundAnimalIndex, setFoundAnimalIndex] = useState<number | null>(null);
  const [baziData, setBaziData] = useState<BaziResponse | null>(null);
  const [filter, setFilter] = useState<'excellent' | 'challenging' | 'moderate-good' | null>(null);
  const [modalData, setModalData] = useState<{ title: string, score: string, details: string, elementInteraction: string } | null>(null);

  const calculateAnimal = async () => {
    if (!selectedDate) return;
    
    // Perform local calculation first
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    let cnyDate = new Date(chineseNewYearDates.find(d => d.startsWith(year.toString())) || chineseNewYearDates[0]);
    let targetYear = year;
    if (date < cnyDate) {
      targetYear = year - 1;
      cnyDate = new Date(chineseNewYearDates.find(d => d.startsWith(targetYear.toString())) || chineseNewYearDates[0]);
    }
    let index = (targetYear - 4) % 12;
    if (index < 0) index += 12;
    
    setFoundAnimalIndex(index);
    setBaziData(null); // Reset Bazi data
    setFilter(null);

    // Try API in background
    try {
      const data = await fetchBaziData({ date: `${selectedDate}T12:00:00` });
      setBaziData(data);
      
      const animalName = data.chinese.year.animal;
      const apiIndex = animals.findIndex(a => a.en.toLowerCase() === animalName.toLowerCase());
      if (apiIndex !== -1) {
        setFoundAnimalIndex(apiIndex);
      }
    } catch (error) {
      // Silently fail
    }
  };

  const showCompatibility = (row: number, col: number) => {
    const animal1 = animals[row];
    const animal2 = animals[col];
    const comp = compatibility[row][col] as keyof typeof compatibilityText;
    const score = comp === 'excellent' ? '95%' : comp === 'good' ? '75%' : comp === 'moderate' ? '50%' : '30%';
    
    const interaction = elementInteractions[animal1.element as keyof typeof elementInteractions][animal2.element as keyof typeof elementInteractions];
    const elementInteraction = lang === 'de' 
      ? (interaction === 'harmonious' ? '✨ Harmonische Element-Interaktion' : interaction === 'clashing' ? '⚡ Herausfordernde Element-Interaktion' : '⚖️ Neutrale Element-Interaktion')
      : (interaction === 'harmonious' ? '✨ Harmonious element interaction' : interaction === 'clashing' ? '⚡ Challenging element interaction' : '⚖️ Neutral element interaction');

    setModalData({
      title: `${animal1.emoji} ${lang === 'de' ? animal1.de : animal1.en} + ${animal2.emoji} ${lang === 'de' ? animal2.de : animal2.en}`,
      score,
      details: compatibilityText[comp][lang],
      elementInteraction
    });
  };


  const getFilteredAnimals = () => {
    if (foundAnimalIndex === null || filter === null) return [];
    return animals.map((a, i) => ({ ...a, index: i, comp: compatibility[foundAnimalIndex as keyof typeof compatibility][i as keyof typeof compatibility[0]] }))
      .filter(a => {
        if (filter === 'excellent') return a.comp === 'excellent';
        if (filter === 'challenging') return a.comp === 'challenging';
        if (filter === 'moderate-good') return a.comp === 'moderate' || a.comp === 'good';
        return false;
      });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-10 text-white font-sans">
      <h1 className="text-center text-6xl font-serif italic mb-2 text-white">
        🐉 Chinese Zodiac
      </h1>
      <p className="text-center text-white/60 mb-10 uppercase tracking-widest text-xs">
        {lang === 'de' ? 'Entdecke die Kompatibilität der 12 Tiere' : 'Discover the compatibility of the 12 animals'}
      </p>

      <div className="text-center mb-8">
        <button onClick={() => setLang('de')} className={`px-5 py-2 rounded-full border border-yellow-500 mx-2 ${lang === 'de' ? 'bg-yellow-500 text-[#0f172a]' : 'text-yellow-500'}`}>DE</button>
        <button onClick={() => setLang('en')} className={`px-5 py-2 rounded-full border border-yellow-500 mx-2 ${lang === 'en' ? 'bg-yellow-500 text-[#0f172a]' : 'text-yellow-500'}`}>EN</button>
      </div>

      <div className="max-w-md mx-auto bg-[#1e293b] p-8 rounded-xl border border-yellow-500 mb-10 shadow-lg">
        <h2 className="text-yellow-500 mb-5 text-xl font-serif italic">
          {lang === 'de' ? '🎯 Finde dein Tier' : '🎯 Find Your Animal'}
        </h2>
        <input type="date" onChange={(e) => setSelectedDate(e.target.value)} className="w-full p-3 rounded-lg bg-[#0f172a] border border-yellow-500 text-white mb-4" />
        <button onClick={calculateAnimal} className="w-full p-3 rounded-lg bg-red-900 text-white font-bold hover:bg-red-800 transition-colors">
          {lang === 'de' ? 'Berechnen' : 'Calculate'}
        </button>
        
        {foundAnimalIndex !== null && (
          <div className="mt-8 pt-8 border-t border-yellow-500">
            <div className="mb-8 p-6 bg-[#0f172a] rounded-xl border border-yellow-500 text-center">
              <h3 className="text-white text-xl font-serif italic mb-2">
                {lang === 'de' ? 'Dein Tierzeichen:' : 'Your Zodiac Animal:'}
              </h3>
              <div className="text-6xl mb-4">{animals[foundAnimalIndex].emoji}</div>
              <p className="text-2xl font-bold mb-2">
                {lang === 'de' ? animals[foundAnimalIndex].de : animals[foundAnimalIndex].en}
              </p>
              {baziData && (
                <div className="text-white mt-4 text-sm font-mono">
                  <p className="font-bold mb-2 uppercase tracking-tight text-yellow-500">{lang === 'de' ? 'Deine Bazi-Pfeiler:' : 'Your Bazi Pillars:'}</p>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {['year', 'month', 'day', 'hour'].map((p) => (
                      <div key={p} className="bg-[#1e293b] p-2 rounded border border-yellow-500">
                        <div className="text-[10px] text-white/60 uppercase">{lang === 'de' ? p : p}</div>
                        <div className="font-bold text-yellow-500">{baziData.pillars[p as keyof typeof baziData.pillars].stamm} {baziData.pillars[p as keyof typeof baziData.pillars].zweig}</div>
                        <div className="text-[10px]">{baziData.pillars[p as keyof typeof baziData.pillars].tier}</div>
                        <div className="text-[10px] text-white/80">{baziData.pillars[p as keyof typeof baziData.pillars].element}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <h3 className="text-white mb-4 font-serif italic">{lang === 'de' ? 'Wähle eine Kategorie:' : 'Select a category:'}</h3>
            <select onChange={(e) => setFilter(e.target.value as any)} className="w-full p-3 rounded-lg bg-[#0f172a] border border-yellow-500 text-white">
              <option value="">-- {lang === 'de' ? 'Kategorie wählen' : 'Select category'} --</option>
              <option value="excellent">{lang === 'de' ? 'Am kompatibelsten' : 'Most compatible'}</option>
              <option value="moderate-good">{lang === 'de' ? 'Moderat bis Gut' : 'Moderate to Good'}</option>
              <option value="challenging">{lang === 'de' ? 'Konfliktpotenzial' : 'Conflict potential'}</option>
            </select>
            
            {filter && (
              <div className="mt-6">
                <h4 className="text-white font-serif italic mb-2">{lang === 'de' ? 'Ergebnisse:' : 'Results:'}</h4>
                <div className="grid grid-cols-2 gap-4">
                  {getFilteredAnimals().map(a => (
                    <button key={a.en} onClick={() => showCompatibility(foundAnimalIndex, a.index)} className="p-3 bg-[#1e293b] rounded-lg border border-yellow-500 hover:bg-[#0f172a]">
                      {a.emoji} {lang === 'de' ? a.de : a.en}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>


      <div className="overflow-x-auto max-w-4xl mx-auto bg-[#1e293b] p-6 rounded-xl border border-yellow-500 shadow-lg">
        <table className="w-full border-collapse font-mono text-xs">
          <thead>
            <tr>
              <th className="p-3 border border-yellow-500"></th>
              {animals.map(a => <th key={a.en} className="p-3 border border-yellow-500 text-yellow-500">{a.emoji}</th>)}
            </tr>
          </thead>
          <tbody>
            {animals.map((rowAnimal, rowIndex) => (
              <tr key={rowAnimal.en}>
                <th className="p-3 border border-yellow-500 text-yellow-500">{rowAnimal.emoji}</th>
                {animals.map((colAnimal, colIndex) => {
                  const comp = compatibility[rowIndex as keyof typeof compatibility][colIndex as keyof typeof compatibility[0]];
                  const color = comp === 'excellent' ? 'bg-red-900' : comp === 'good' ? 'bg-red-900/60' : comp === 'moderate' ? 'bg-red-900/30' : 'bg-red-900/10';
                  return (
                    <td key={colAnimal.en} className={`p-3 border border-yellow-500 text-center cursor-pointer ${color}`} onClick={() => showCompatibility(rowIndex, colIndex)}>
                      {comp === 'excellent' ? '●' : comp === 'good' ? '●' : comp === 'moderate' ? '●' : '○'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalData && (
        <div className="fixed inset-0 bg-[#0f172a]/90 flex items-center justify-center p-4" onClick={() => setModalData(null)}>
          <div className="bg-[#1e293b] p-8 rounded-xl max-w-md w-full border border-yellow-500" onClick={e => e.stopPropagation()}>
            <h2 className="text-yellow-500 text-2xl font-serif italic mb-4">{modalData.title}</h2>
            <div className="text-5xl text-center text-white my-6 font-mono">{modalData.score}</div>
            <p className="text-white/80 leading-relaxed mb-4 font-sans text-sm">{modalData.details}</p>
            <p className="text-yellow-500 font-semibold font-mono text-xs uppercase tracking-widest">{modalData.elementInteraction}</p>
            <button onClick={() => setModalData(null)} className="mt-6 w-full p-3 rounded-lg bg-red-900 text-white font-bold">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

