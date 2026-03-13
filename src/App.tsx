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
import { ResultDisplay } from './components/ResultDisplay';
import { ProfileFunnel } from './components/ProfileFunnel';
import { FAQ } from './components/FAQ';
import { Heart } from './components/Heart';

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

const compatibilityRomance = {
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

const compatibilityBusiness = { ...compatibilityRomance }; // Placeholder: Customize as needed
const compatibilityFriendship = {
  0: { 0: 'excellent', 1: 'good', 2: 'moderate', 3: 'good', 4: 'excellent', 5: 'good', 6: 'moderate', 7: 'excellent', 8: 'excellent', 9: 'good', 10: 'good', 11: 'excellent' },
  1: { 0: 'good', 1: 'excellent', 2: 'good', 3: 'moderate', 4: 'good', 5: 'excellent', 6: 'moderate', 7: 'good', 8: 'good', 9: 'excellent', 10: 'moderate', 11: 'good' },
  2: { 0: 'moderate', 1: 'good', 2: 'excellent', 3: 'excellent', 4: 'good', 5: 'moderate', 6: 'excellent', 7: 'excellent', 8: 'good', 9: 'moderate', 10: 'excellent', 11: 'good' },
  3: { 0: 'good', 1: 'moderate', 2: 'excellent', 3: 'excellent', 4: 'good', 5: 'moderate', 6: 'excellent', 7: 'excellent', 8: 'moderate', 9: 'good', 10: 'excellent', 11: 'excellent' },
  4: { 0: 'excellent', 1: 'good', 2: 'good', 3: 'good', 4: 'excellent', 5: 'good', 6: 'moderate', 7: 'moderate', 8: 'excellent', 9: 'excellent', 10: 'moderate', 11: 'good' },
  5: { 0: 'good', 1: 'excellent', 2: 'moderate', 3: 'moderate', 4: 'good', 5: 'excellent', 6: 'good', 7: 'moderate', 8: 'excellent', 9: 'excellent', 10: 'good', 11: 'moderate' },
  6: { 0: 'moderate', 1: 'moderate', 2: 'excellent', 3: 'excellent', 4: 'moderate', 5: 'good', 6: 'excellent', 7: 'good', 8: 'moderate', 9: 'good', 10: 'excellent', 11: 'excellent' },
  7: { 0: 'excellent', 1: 'good', 2: 'excellent', 3: 'excellent', 4: 'moderate', 5: 'moderate', 6: 'good', 7: 'excellent', 8: 'moderate', 9: 'moderate', 10: 'good', 11: 'excellent' },
  8: { 0: 'excellent', 1: 'good', 2: 'good', 3: 'moderate', 4: 'excellent', 5: 'excellent', 6: 'moderate', 7: 'moderate', 8: 'excellent', 9: 'good', 10: 'moderate', 11: 'good' },
  9: { 0: 'good', 1: 'excellent', 2: 'moderate', 3: 'good', 4: 'excellent', 5: 'excellent', 6: 'good', 7: 'moderate', 8: 'good', 9: 'excellent', 10: 'moderate', 11: 'moderate' },
  10: { 0: 'good', 1: 'moderate', 2: 'excellent', 3: 'excellent', 4: 'moderate', 5: 'good', 6: 'excellent', 7: 'good', 8: 'moderate', 9: 'moderate', 10: 'excellent', 11: 'excellent' },
  11: { 0: 'excellent', 1: 'good', 2: 'good', 3: 'excellent', 4: 'good', 5: 'moderate', 6: 'excellent', 7: 'excellent', 8: 'good', 9: 'moderate', 10: 'excellent', 11: 'excellent' }
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
    de: '🎯 Ausgezeichnet! Eine außergewöhnlich harmonische Verbindung. Beide Partner ergänzen sich nicht nur perfekt, sondern teilen auch eine tiefe, intuitive Verbundenheit, die über Worte hinausgeht. Sie unterstützen sich gegenseitig bei der Verwirklichung ihrer individuellen Träume und haben eine gemeinsame Vision für die Zukunft. Konflikte sind selten, da beide Partner eine ähnliche Wertebasis haben und offen sowie empathisch kommunizieren. Diese Beziehung bietet ein hohes Maß an emotionaler Sicherheit und gegenseitigem Vertrauen, was es beiden ermöglicht, ihr volles Potenzial zu entfalten. Dynamik: Ihr findet natürlich in einen gemeinsamen Rhythmus, was den Alltag mühelos und freudvoll macht. Element-Beispiel: Wenn ein Partner Holz und der andere Feuer ist, nährt das Holz die Leidenschaft des Feuers, was zu einer inspirierenden und dynamischen Synergie führt. Stärken: Hohe Resonanz, natürliche Kooperation, gemeinsame Ziele und mühelose Synergie. Schwächen: Die größte Herausforderung ist die Gefahr, sich zu sehr in der eigenen \'perfekten\' Blase zu isolieren und dabei soziale Kontakte oder individuelles Wachstum außerhalb der Beziehung zu vernachlässigen. Möchtest du noch tiefer blicken? Die Hinzunahme der westlichen Sonnenzeichen, Mondzeichen und Aszendenten kann diese Harmonie noch weiter präzisieren. Entdecke mehr bei Bazodiac (https://bazodiac.com).',
    en: '🎯 Excellent! An exceptionally harmonious connection. Both partners not only complement each other perfectly but also share a deep, intuitive bond that goes beyond words. They support each other in realizing their individual dreams and have a shared vision for the future. Conflicts are rare, as both partners share a similar value base and communicate openly and empathetically. This relationship offers a high level of emotional security and mutual trust, allowing both to reach their full potential. Dynamics: You naturally sync your rhythms, making daily life feel effortless and joyful. Elemental Example: If one partner is Wood and the other is Fire, the Wood partner naturally fuels the Fire partner\'s passions, creating a dynamic of mutual inspiration. Strengths: High resonance, natural cooperation, shared goals, and effortless synergy. Weaknesses: The primary challenge is the danger of becoming too isolated within your own \'perfect\' bubble, potentially neglecting external social connections or individual growth outside the relationship. Want to look deeper? The addition of Western sun signs, moon signs, and ascendants can further refine this harmony. Discover more at Bazodiac (https://bazodiac.com).'
  },
  good: {
    de: '👍 Gut! Eine solide und funktionierende Partnerschaft, die auf gegenseitigem Respekt und geteilten Interessen aufbaut. Die Partner schätzen die Stärken des anderen und arbeiten aktiv an einer stabilen, gemeinsamen Zukunft. Herausforderungen werden durch konstruktive Kommunikation und die Bereitschaft zu Kompromissen gelöst. Es gibt ein gesundes Gleichgewicht zwischen individueller Freiheit und dem Engagement für die Beziehung. Diese Verbindung ist geprägt von Zuverlässigkeit, gegenseitiger Anerkennung und der Freude, gemeinsam durch das Leben zu gehen. Dynamik: Ihr bildet ein starkes Team, in dem sich beide Partner wertgeschätzt und gehört fühlen. Element-Beispiel: Bei neutralen Element-Kombinationen, wie Erde und Erde, baut ihr ein stabiles Fundament auf, das sich auf gemeinsame, praktische Ziele konzentriert. Stärken: Stabile Basis, gegenseitige Unterstützung, konstruktive Problemlösung und verlässliche Partnerschaft. Schwächen: Die Beziehung erfordert bewusste Pflege, um nicht in eine vorhersehbare Routine zu verfallen; ihr müsst aktiv für Abwechslung und neue Impulse sorgen, um das Feuer am Brennen zu halten. Willst du wissen, wie eure westlichen Zeichen das beeinflussen? Die Hinzunahme der westlichen Sonnenzeichen, Mondzeichen und Aszendenten kann eine völlig neue Bewertung erzeugen. Probiere es sofort aus: Bazodiac (https://bazodiac.com).',
    en: '👍 Good! A solid and functioning partnership built on mutual respect and shared interests. The partners appreciate each other\'s strengths and actively work toward a stable future together. Challenges are resolved through constructive communication and a willingness to compromise. There is a healthy balance between individual freedom and commitment to the relationship. This connection is characterized by reliability, mutual recognition, and the joy of navigating life together. Dynamics: You build a strong team, where both partners feel valued and heard. Elemental Example: With neutral element combinations, like Earth and Earth, you build a stable foundation together, focusing on shared practical goals. Strengths: Stable foundation, mutual support, constructive problem-solving, and reliable partnership. Weaknesses: The relationship requires conscious effort to avoid falling into a predictable routine; you must actively cultivate excitement and novelty to keep the spark alive. Want to know how your Western signs influence this? The addition of Western sun signs, moon signs, and ascendants can create a completely new assessment. Try it out now: Bazodiac (https://bazodiac.com).'
  },
  moderate: {
    de: '🤔 Moderat. Diese Verbindung erfordert bewusste Arbeit und ein tiefes Verständnis füreinander. Unterschiede in den Persönlichkeiten oder Lebensstilen können gelegentlich zu Missverständnissen führen. Der Schlüssel zum Erfolg liegt in der Geduld, der Offenheit und der Bereitschaft, die Perspektive des anderen wirklich zu verstehen. Beide Partner müssen aktiv an ihrer Kommunikation arbeiten und lernen, Differenzen nicht als Hindernisse, sondern als Lernchancen zu betrachten. Mit kontinuierlicher Anstrengung und gegenseitigem Respekt kann diese Beziehung zu einer stabilen und erfüllenden Partnerschaft heranwachsen. Dynamik: Ihr werdet auf einige Hindernisse stoßen, aber diese sind essenziell, um eine tiefere Verbindung aufzubauen. Element-Beispiel: Wenn ein Partner Wasser und der andere Feuer ist, kann es zu Reibungen kommen, aber dieser \'Clash\' kann bei richtiger Handhabung in eine produktive, energiegeladene Dynamik umgewandelt werden. Stärken: Potenzial für signifikantes persönliches Wachstum, Lernmöglichkeiten und die Entwicklung emotionaler Resilienz. Schwächen: Häufige Kommunikationsbarrieren und unterschiedliche Lebensbedürfnisse können zu Frustration führen; es erfordert enorme Geduld und eine wertfreie Herangehensweise, um diese Lücken zu schließen. Eure Verbindung bedarf etwas mehr Arbeit, aber mit dem Verständnis der westlichen Sonnenzeichen, Mondzeichen und Aszendenten kann sich eine völlig neue Perspektive eröffnen. Finde heraus, wie es bei euch wirklich aussieht: Bazodiac (https://bazodiac.com).',
    en: '🤔 Moderate. This connection requires conscious work and a deep understanding of one another. Differences in personalities or lifestyles can occasionally lead to misunderstandings. The key to success lies in patience, openness, and the willingness to truly understand the other\'s perspective. Both partners must actively work on their communication and learn to view differences not as obstacles, but as opportunities for learning. With continuous effort and mutual respect, this relationship can grow into a stable and fulfilling partnership. Dynamics: You will encounter bumps in the road, but these are essential for building a deeper connection. Elemental Example: If one partner is Water and the other is Fire, you may experience friction, but this clash can be channeled into a productive, high-energy dynamic if managed with patience. Strengths: Potential for significant personal growth, learning opportunities, and developing emotional resilience. Weaknesses: Frequent communication barriers and differing lifestyle needs can lead to frustration; it requires immense patience and a non-judgmental approach to bridge these gaps. Your connection requires a bit more work, but with the understanding of Western sun signs, moon signs, and ascendants, a completely new perspective can open up. Find out how it really looks for you: Bazodiac (https://bazodiac.com).'
  },
  challenging: {
    de: '😰 Herausfordernd. Diese Beziehung erfordert ein hohes Maß an Energie, Kompromissbereitschaft und bewusster Anstrengung. Die Partner haben oft sehr unterschiedliche Ansätze zum Leben, was zu Spannungen führen kann. Doch gerade diese Unterschiede bieten ein enormes Potenzial für persönliches Wachstum und eine tiefgreifende Transformation. Es erfordert die Fähigkeit, die eigenen Bedürfnisse zeitweise zurückzustellen und die Welt durch die Augen des anderen zu sehen. Wenn beide bereit sind, an sich zu arbeiten und die Herausforderungen als gemeinsamen Weg zur Entwicklung zu begreifen, kann diese Beziehung eine außergewöhnliche Tiefe und Stärke erreichen. Dynamik: Ihr seid Spiegelbilder füreinander und reflektiert Teile eurer selbst, die Heilung oder Aufmerksamkeit benötigen. Element-Beispiel: Bei stark gegensätzlichen Elementen, wie Metall und Holz, kann es sich wie ein ständiger Kampf um die Kontrolle anfühlen, was immense Anstrengung erfordert, um eine gemeinsame Basis zu finden. Stärken: Enormes Transformationspotenzial, tiefgreifende Lernerfahrungen und der Aufbau tiefer emotionaler Reife. Schwächen: Hohes Konfliktpotenzial und grundlegend unterschiedliche Weltanschauungen können den Alltag anstrengend machen; es erfordert eine außergewöhnlich hohe Kompromissbereitschaft, enorme emotionale Reife und die Fähigkeit, auch bei intensiven Meinungsverschiedenheiten den Respekt zu wahren. Eure Verbindung bedarf etwas mehr Arbeit, aber mit dem Verständnis der westlichen Sonnenzeichen, Mondzeichen und Aszendenten kann sich eine völlig neue Bewertung erzeugen. Probier es sofort aus: Bazodiac (https://bazodiac.com).',
    en: '😰 Challenging. This relationship requires a high level of energy, willingness to compromise, and conscious effort. The partners often have very different approaches to life, which can lead to tension. Yet, it is precisely these differences that offer enormous potential for personal growth and profound transformation. It requires the ability to temporarily set aside one\'s own needs and see the world through the other\'s eyes. If both are willing to work on themselves and view the challenges as a shared path to development, this relationship can achieve extraordinary depth and strength. Dynamics: You are mirrors for each other, reflecting back parts of yourselves that need healing or attention. Elemental Example: When elements clash, such as Metal and Wood, it can feel like a constant struggle for control, requiring immense effort to find common ground. Strengths: Enormous potential for transformation, profound learning experiences, and building deep emotional maturity. Weaknesses: High conflict potential and fundamentally different worldviews can make daily life exhausting; it requires an exceptionally high willingness to compromise, immense emotional maturity, and the ability to maintain respect even during intense disagreements. Your connection requires a bit more work, but with the understanding of Western sun signs, moon signs, and ascendants, a completely new assessment can be generated. Try it out now: Bazodiac (https://bazodiac.com).'
  }
};

export default function App() {
  const [lang, setLang] = useState<'de' | 'en'>('de');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [crushDate, setCrushDate] = useState<string>('');
  const [isPartnerMatching, setIsPartnerMatching] = useState<boolean>(false);
  const [foundAnimalIndex, setFoundAnimalIndex] = useState<number | null>(null);
  const [crushAnimalIndex, setCrushAnimalIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(true);
  const [baziData, setBaziData] = useState<BaziResponse | null>(null);
  const [filter, setFilter] = useState<'excellent' | 'challenging' | 'moderate-good' | null>(null);
  const [baziError, setBaziError] = useState<string | null>(null);
  const [modalData, setModalData] = useState<{ 
    title: string, 
    romance: { type: string, score: string, comp: string },
    business: { type: string, score: string, comp: string },
    friendship: { type: string, score: string, comp: string },
    elementInteraction: string,
    yinYangAnalysis: string
  } | null>(null);

  const getAnimalIndex = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let cnyDate = new Date(chineseNewYearDates.find(d => d.startsWith(year.toString())) || chineseNewYearDates[0]);
    let targetYear = year;
    if (date < cnyDate) {
      targetYear = year - 1;
      cnyDate = new Date(chineseNewYearDates.find(d => d.startsWith(targetYear.toString())) || chineseNewYearDates[0]);
    }
    let index = (targetYear - 4) % 12;
    if (index < 0) index += 12;
    return index;
  };

  const calculateAnimal = async () => {
    if (!selectedDate) return;
    
    const index = getAnimalIndex(selectedDate);
    setFoundAnimalIndex(index);
    
    if (isPartnerMatching && crushDate) {
      setCrushAnimalIndex(getAnimalIndex(crushDate));
    } else {
      setCrushAnimalIndex(null);
    }

    setShowResult(true);
    setBaziData(null); // Reset Bazi data
    setBaziError(null); // Reset error
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
      console.error('Error fetching Bazi data:', error);
      setBaziError(lang === 'de' ? 'Bazi-Daten derzeit nicht verfügbar.' : 'Bazi data currently unavailable.');
    }
  };

  const showCompatibility = (row: number, col: number) => {
    const animal1 = animals[row];
    const animal2 = animals[col];
    
    const getCompData = (compMatrix: any, type: string) => {
        const comp = compMatrix[row][col] as keyof typeof compatibilityText;
        const score = comp === 'excellent' ? '95%' : comp === 'good' ? '75%' : comp === 'moderate' ? '50%' : '30%';
        return { type, score, comp };
    };

    const romance = getCompData(compatibilityRomance, lang === 'de' ? 'Romantik' : 'Romance');
    const business = getCompData(compatibilityBusiness, lang === 'de' ? 'Geschäft' : 'Business');
    const friendship = getCompData(compatibilityFriendship, lang === 'de' ? 'Freundschaft' : 'Friendship');
    
    const interaction = elementInteractions[animal1.element as keyof typeof elementInteractions][animal2.element as keyof typeof elementInteractions];
    
    // Descriptive mapping
    const getInteractionDescription = (e1: string, e2: string, type: 'harmonious' | 'clashing' | 'neutral') => {
      if (type === 'neutral') return lang === 'de' ? '⚖️ Neutral: Gleiche Elemente' : '⚖️ Neutral: Same elements';
      
      if (type === 'harmonious') {
        if ((e1 === 'Holz' && e2 === 'Feuer') || (e1 === 'Feuer' && e2 === 'Holz')) return lang === 'de' ? '✨ Harmonisch: Holz nährt Feuer' : '✨ Harmonious: Wood fuels Fire';
        if ((e1 === 'Feuer' && e2 === 'Erde') || (e1 === 'Erde' && e2 === 'Feuer')) return lang === 'de' ? '✨ Harmonisch: Feuer erschafft Erde' : '✨ Harmonious: Fire creates Earth';
        if ((e1 === 'Erde' && e2 === 'Metall') || (e1 === 'Metall' && e2 === 'Erde')) return lang === 'de' ? '✨ Harmonisch: Erde erschafft Metall' : '✨ Harmonious: Earth creates Metal';
        if ((e1 === 'Metall' && e2 === 'Wasser') || (e1 === 'Wasser' && e2 === 'Metall')) return lang === 'de' ? '✨ Harmonisch: Metall erschafft Wasser' : '✨ Harmonious: Metal creates Water';
        if ((e1 === 'Wasser' && e2 === 'Holz') || (e1 === 'Holz' && e2 === 'Wasser')) return lang === 'de' ? '✨ Harmonisch: Wasser nährt Holz' : '✨ Harmonious: Water nourishes Wood';
        return lang === 'de' ? '✨ Harmonisch: Unterstützende Energie' : '✨ Harmonious: Supportive energy';
      }
      
      if (type === 'clashing') {
        if ((e1 === 'Holz' && e2 === 'Erde') || (e1 === 'Erde' && e2 === 'Holz')) return lang === 'de' ? '⚡ Herausfordernd: Holz kontrolliert Erde' : '⚡ Challenging: Wood controls Earth';
        if ((e1 === 'Erde' && e2 === 'Wasser') || (e1 === 'Wasser' && e2 === 'Erde')) return lang === 'de' ? '⚡ Herausfordernd: Erde kontrolliert Wasser' : '⚡ Challenging: Earth dams Water';
        if ((e1 === 'Wasser' && e2 === 'Feuer') || (e1 === 'Feuer' && e2 === 'Wasser')) return lang === 'de' ? '⚡ Herausfordernd: Wasser löscht Feuer' : '⚡ Challenging: Water extinguishes Fire';
        if ((e1 === 'Feuer' && e2 === 'Metall') || (e1 === 'Metall' && e2 === 'Feuer')) return lang === 'de' ? '⚡ Herausfordernd: Feuer schmilzt Metall' : '⚡ Challenging: Fire melts Metal';
        if ((e1 === 'Metall' && e2 === 'Holz') || (e1 === 'Holz' && e2 === 'Metall')) return lang === 'de' ? '⚡ Herausfordernd: Metall schneidet Holz' : '⚡ Challenging: Metal chops Wood';
        return lang === 'de' ? '⚡ Herausfordernd: Konflikt der Energien' : '⚡ Challenging: Conflict of energies';
      }
      return '';
    };

    const elementInteraction = getInteractionDescription(animal1.element, animal2.element, interaction);
    const yinYangAnalysis = getYinYangAnalysis(row, col);
    
    setModalData({
      title: `${animal1.emoji} ${lang === 'de' ? animal1.de : animal1.en} + ${animal2.emoji} ${lang === 'de' ? animal2.de : animal2.en}`,
      romance,
      business,
      friendship,
      elementInteraction,
      yinYangAnalysis
    });
  };


  const getFilteredAnimals = () => {
    if (foundAnimalIndex === null || filter === null) return [];
    return animals.map((a, i) => ({ ...a, index: i, comp: compatibilityRomance[foundAnimalIndex as keyof typeof compatibilityRomance][i as keyof typeof compatibilityRomance[0]] }))
      .filter(a => {
        if (filter === 'excellent') return a.comp === 'excellent';
        if (filter === 'challenging') return a.comp === 'challenging';
        if (filter === 'moderate-good') return a.comp === 'moderate' || a.comp === 'good';
        return false;
      });
  };

  const getLuckyCharm = (year: number) => {
    const index = (year - 4) % 12;
    const animalIndex = index < 0 ? index + 12 : index;
    const animalsList = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return animalsList[animalIndex];
  };

  const getDailyFortune = (animal: string) => {
    const fortunes = {
      Rat: "Your quick wit will open doors today. Trust your instincts!",
      Ox: "Persistence is your superpower today. Keep going!",
      Tiger: "A bold move will bring unexpected rewards. Be brave!",
      Rabbit: "Harmony surrounds you. Take time to appreciate the small things.",
      Dragon: "Your natural charisma is at an all-time high. Lead with confidence.",
      Snake: "Wisdom and patience will solve a lingering problem.",
      Horse: "Adventure calls! Embrace a new opportunity with open arms.",
      Goat: "Creativity flows through you. Express yourself freely.",
      Monkey: "A playful approach will turn a difficult task into fun.",
      Rooster: "Your attention to detail will be noticed and appreciated.",
      Dog: "Loyalty and kindness will strengthen a key relationship.",
      Pig: "Abundance is coming your way. Share your joy with others."
    };
    return fortunes[animal as keyof typeof fortunes] || "A wonderful day awaits!";
  };

  const getYinYangAnalysis = (animal1Index: number, animal2Index: number) => {
    // Simplified Yin/Yang: Even index = Yang, Odd index = Yin
    const getYinYang = (index: number) => (index % 2 === 0 ? 'Yang' : 'Yin');
    const yy1 = getYinYang(animal1Index);
    const yy2 = getYinYang(animal2Index);
    
    if (yy1 === yy2) {
      return lang === 'de' 
        ? `Beide sind ${yy1}. Eine starke, gleichgesinnte Energie, aber es fehlt an komplementärer Balance. Dies kann zu einer sehr fokussierten, aber potenziell einseitigen Dynamik führen.` 
        : `Both are ${yy1}. A strong, like-minded energy, but lacks complementary balance. This can lead to a very focused, but potentially one-sided dynamic.`;
    } else {
      return lang === 'de' 
        ? `Ein perfektes Yin-Yang-Gleichgewicht (${yy1} & ${yy2}). Ihr ergänzt euch wunderbar. Diese Kombination schafft eine natürliche Harmonie, in der sich Aktivität und Ruhe gegenseitig stützen.` 
        : `A perfect Yin-Yang balance (${yy1} & ${yy2}). You complement each other beautifully. This combination creates a natural harmony where activity and rest support each other.`;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-10 text-zinc-100 font-sans">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-3 text-white">
          BaZi Matrix
        </h1>
        <p className="text-zinc-400 uppercase tracking-[0.2em] text-[10px] font-bold">
          {lang === 'de' ? 'Sternzeichen & Kompatibilität' : 'Zodiac & Compatibility'}
        </p>
      </header>

      <div className="flex justify-center mb-10">
        <div className="bg-zinc-900 p-1 rounded-full border border-zinc-800">
          <button onClick={() => setLang('de')} className={`px-6 py-2 rounded-full transition-all ${lang === 'de' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'}`}>DE</button>
          <button onClick={() => setLang('en')} className={`px-6 py-2 rounded-full transition-all ${lang === 'en' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'}`}>EN</button>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-zinc-900 p-8 rounded-2xl border border-zinc-800 mb-10 shadow-2xl">
        <div className="mb-8 text-center">
          <p className="text-zinc-300 text-sm mb-2 font-serif italic">
            {lang === 'de' ? 'Die Matrix zeigt dir deinen Einstieg.' : 'The Matrix shows you your entry point.'}
          </p>
          <p className="text-zinc-300 text-sm mb-2 font-serif italic">
            {lang === 'de' ? 'Dein Profil zeigt dir dein Muster.' : 'Your profile shows you your pattern.'}
          </p>
          <p className="text-zinc-300 text-sm mb-6 font-serif italic">
            {lang === 'de' ? 'Die Partnerschaftsanalyse zeigt dir die Verbindung.' : 'The partnership analysis shows you the connection.'}
          </p>
          <p className="text-zinc-400 text-sm">
            {lang === 'de' 
              ? 'Du kannst in wenigen Sekunden entdecken, welches Zeichen du bist und welche Zeichen grundsätzlich gut zu dir passen. Doch echte Tiefe beginnt erst dort, wo deine persönliche Dynamik sichtbar wird. Genau dafür legst du dein Profil an – als nächsten Schritt zu einer genaueren Beziehungsanalyse.' 
              : 'You can discover in a few seconds which sign you are and which signs are fundamentally a good match for you. But true depth only begins where your personal dynamic becomes visible. That is exactly why you create your profile – as the next step toward a more precise relationship analysis.'}
          </p>
        </div>
        <h3 className="text-zinc-400 mb-2 text-sm font-serif italic">
          {lang === 'de' ? 'Chinesisches Bazi Horoskop Matching - Welches Tierzeichen passt zu meinem?' : 'Chinese Bazi Horoscope Matching - Which animal sign matches mine?'}
        </h3>
        <h2 className="text-amber-400 mb-6 text-xl font-serif italic">
          {lang === 'de' ? 'Finde in Sekunden heraus, welches Zeichen du bist – und wer zu dir passt.' : 'Find out in seconds which sign you are – and who is a good match for you.'}
        </h2>
        <input type="date" onChange={(e) => setSelectedDate(e.target.value)} className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:border-amber-500 outline-none transition-all mb-4" placeholder={lang === 'de' ? 'Dein Geburtstag' : 'Your Birthday'} />
        
        <label className="flex items-center gap-2 text-zinc-300 mb-4 cursor-pointer">
          <input type="checkbox" checked={isPartnerMatching} onChange={(e) => setIsPartnerMatching(e.target.checked)} className="accent-amber-500" />
          {lang === 'de' ? 'Partner-Matching' : 'Partner Matching'}
        </label>

        {isPartnerMatching && (
          <div className="mb-4">
            <p className="text-zinc-400 text-sm mb-2">{lang === 'de' ? 'Gib hier das Geburtsdatum deines Crushes ein' : 'Enter your crush\'s birthday here'}</p>
            <input type="date" onChange={(e) => setCrushDate(e.target.value)} className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:border-amber-500 outline-none transition-all" />
          </div>
        )}

        <button onClick={calculateAnimal} className="w-full p-4 rounded-xl bg-amber-500 text-zinc-950 font-bold hover:bg-amber-400 transition-colors mb-8">
          {lang === 'de' ? 'Berechnen' : 'Calculate'}
        </button>
        
        {foundAnimalIndex !== null && isPartnerMatching && crushAnimalIndex !== null && (
          <div className="mt-8 pt-8 border-t border-zinc-800">
            <h3 className="text-zinc-300 text-lg font-serif italic mb-6 text-center">
              {lang === 'de' ? 'Eure Verbindung' : 'Your Connection'}
            </h3>
            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-6xl mb-2">{animals[foundAnimalIndex].emoji}</div>
                <p className="text-white font-bold">{lang === 'de' ? animals[foundAnimalIndex].de : animals[foundAnimalIndex].en}</p>
              </div>
              <Heart percentage={parseInt(compatibilityRomance[foundAnimalIndex as keyof typeof compatibilityRomance][crushAnimalIndex as keyof typeof compatibilityRomance[0]] === 'excellent' ? '95' : compatibilityRomance[foundAnimalIndex as keyof typeof compatibilityRomance][crushAnimalIndex as keyof typeof compatibilityRomance[0]] === 'good' ? '75' : compatibilityRomance[foundAnimalIndex as keyof typeof compatibilityRomance][crushAnimalIndex as keyof typeof compatibilityRomance[0]] === 'moderate' ? '50' : '30')} />
              <div className="text-center">
                <div className="text-6xl mb-2">{animals[crushAnimalIndex].emoji}</div>
                <p className="text-white font-bold">{lang === 'de' ? animals[crushAnimalIndex].de : animals[crushAnimalIndex].en}</p>
              </div>
            </div>
            <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800">
              <p className="text-zinc-100 text-sm italic">
                {compatibilityText[compatibilityRomance[foundAnimalIndex as keyof typeof compatibilityRomance][crushAnimalIndex as keyof typeof compatibilityRomance[0]] as keyof typeof compatibilityText][lang]}
              </p>
            </div>
          </div>
        )}
        
        {baziError && (
          <div className="mt-4 p-4 bg-red-950/30 border border-red-900/50 rounded-xl text-red-200 text-sm italic text-center">
            {baziError}
          </div>
        )}
        
        {foundAnimalIndex !== null && (!isPartnerMatching || crushAnimalIndex === null) && (
          <div className="mt-8 pt-8 border-t border-zinc-800">
            {showResult ? (
              <ResultDisplay 
                sign={lang === 'de' ? animals[foundAnimalIndex].de : animals[foundAnimalIndex].en} 
                onNextStep={() => setShowResult(false)} 
                lang={lang}
              />
            ) : (
              <>
                <div className="mb-8 p-6 bg-zinc-950 rounded-2xl border border-zinc-800 text-center">
                  <h3 className="text-zinc-300 text-sm font-serif italic mb-2">
                    {lang === 'de' ? 'Dein Tierzeichen:' : 'Your Zodiac Animal:'}
                  </h3>
                  <div className="text-7xl mb-4">{animals[foundAnimalIndex].emoji}</div>
                  <p className="text-3xl font-bold mb-2 text-white">
                    {lang === 'de' ? animals[foundAnimalIndex].de : animals[foundAnimalIndex].en}
                  </p>
                  
                  <div className="mt-6 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-amber-500 font-semibold font-mono text-[10px] uppercase tracking-widest">
                        {lang === 'de' ? 'Dein Glücksbringer heute' : 'Your lucky charm today'}
                      </p>
                      {typeof navigator !== 'undefined' && navigator.share && (
                        <button 
                          onClick={() => {
                            const currentYear = new Date().getFullYear();
                            const luckyCharmEn = getLuckyCharm(currentYear);
                            const luckyCharmAnimal = animals.find(a => a.en === luckyCharmEn);
                            const luckyCharmName = lang === 'de' ? luckyCharmAnimal?.de : luckyCharmAnimal?.en;
                            const fortune = getDailyFortune(animals[foundAnimalIndex].en);
                            navigator.share({
                              title: lang === 'de' ? 'Mein tägliches Glück' : 'My daily fortune',
                              text: lang === 'de' 
                                ? `Mein Glücksbringer heute: ${luckyCharmName}. Mein Glück: ${fortune}`
                                : `My lucky charm today: ${luckyCharmName}. My fortune: ${fortune}`,
                              url: window.location.href
                            }).catch(console.error);
                          }}
                          className="px-4 py-2 bg-amber-500 text-zinc-950 font-bold rounded-lg hover:bg-amber-400 transition-all text-xs"
                        >
                          {lang === 'de' ? 'Teilen' : 'Share'}
                        </button>
                      )}
                    </div>
                    <p className="text-zinc-100 text-sm italic">
                      {getDailyFortune(animals[foundAnimalIndex].en)}
                    </p>
                  </div>

                  {baziData && (
                    <div className="text-zinc-300 mt-6 text-xs font-sans">
                      <p className="font-serif italic text-base mb-4 text-amber-400">{lang === 'de' ? 'Deine Bazi-Pfeiler:' : 'Your Bazi Pillars:'}</p>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        {['year', 'month', 'day', 'hour'].map((p) => (
                          <div key={p} className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col items-center gap-1">
                            <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">{lang === 'de' ? p : p}</div>
                            <div className="text-sm font-bold text-white font-mono">{baziData.pillars[p as keyof typeof baziData.pillars].stamm} {baziData.pillars[p as keyof typeof baziData.pillars].zweig}</div>
                            <div className="text-[10px] text-zinc-400">{baziData.pillars[p as keyof typeof baziData.pillars].tier}</div>
                            <div className="text-[9px] bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-300">{baziData.pillars[p as keyof typeof baziData.pillars].element}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-12 p-8 bg-zinc-950 rounded-2xl border border-amber-500/20 text-center">
                  <p className="text-zinc-300 text-sm mb-6 font-serif italic">
                    {lang === 'de' 
                      ? 'Vollständiges Bazodiac-profil hier anlegen und die wahre Vielfältigkeit deiner Persönlichkeit ergründen aus deinen westlichen Zeichen, dem Chinesischen Bazi und der Lehre der WuXing elemente..' 
                      : 'Create your full Bazodiac profile here and explore the true diversity of your personality from your Western signs, Chinese Bazi, and the teachings of the WuXing elements..'}
                  </p>
                  <button className="px-8 py-3 bg-amber-500 text-zinc-950 font-bold rounded-full hover:bg-amber-400 transition-all">
                    {lang === 'de' ? 'Bazodiac Profil erstellen' : 'Create Bazodiac Profile'}
                  </button>
                </div>

                <div className="mt-8 p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-center">
                  <h3 className="text-zinc-400 text-sm font-serif italic mb-2">
                    {lang === 'de' ? 'Echte Verbindung liest man nicht an einem Zeichen allein' : 'True connection is not read from one sign alone'}
                  </h3>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest">
                    {lang === 'de' ? 'Partnerschaftsanalyse vormerken' : 'Sign up for partnership analysis'}
                  </p>
                </div>


                <select onChange={(e) => setFilter(e.target.value as any)} className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:border-amber-500 outline-none mb-6">
                  <option value="">-- {lang === 'de' ? 'Kategorie wählen' : 'Select category'} --</option>
                  <option value="excellent">{lang === 'de' ? 'Besonders harmonisch' : 'Especially harmonious'}</option>
                  <option value="moderate-good">{lang === 'de' ? 'Spannend & entwicklungsstark' : 'Exciting & growth-oriented'}</option>
                  <option value="challenging">{lang === 'de' ? 'Eher herausfordernd' : 'Rather challenging'}</option>
                </select>
                
                {filter && (
                  <div className="mt-6">
                    <h4 className="text-zinc-400 font-serif italic mb-3 text-sm">
                      {filter === 'excellent' 
                        ? (lang === 'de' ? 'Besonders harmonisch: Diese Zeichen ergänzen deine Grundenergie oft auf natürliche Weise.' : 'Especially harmonious: These signs often complement your basic energy in a natural way.')
                        : filter === 'moderate-good'
                        ? (lang === 'de' ? 'Spannend & entwicklungsstark: Hier entsteht oft Anziehung, aber auch Reibung und Dynamik.' : 'Exciting & growth-oriented: Attraction often arises here, but also friction and dynamics.')
                        : (lang === 'de' ? 'Eher herausfordernd: Diese Verbindungen brauchen mehr Bewusstsein, Kommunikation und Tiefe.' : 'Rather challenging: These connections require more awareness, communication, and depth.')
                      }
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {getFilteredAnimals().map(a => (
                        <button key={a.en} onClick={() => showCompatibility(foundAnimalIndex, a.index)} className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-900 transition-all text-sm">
                          {a.emoji} {lang === 'de' ? a.de : a.en}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>


      <div className="overflow-x-auto w-full max-w-4xl mx-auto bg-zinc-900 p-4 sm:p-6 rounded-2xl border border-zinc-800 shadow-2xl scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
        <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-4 text-center sm:hidden">
          {lang === 'de' ? 'Horizontal wischen, um mehr zu sehen' : 'Swipe horizontally to see more'}
        </p>
        <table className="w-full border-collapse font-mono text-[9px] sm:text-[10px]">
          <thead>
            <tr>
              <th className="p-3 border border-zinc-800"></th>
              {animals.map(a => (
                <th key={a.en} className="p-3 border border-zinc-800 text-amber-500">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">{a.emoji}</span>
                    <span className="text-[8px] uppercase">{lang === 'de' ? a.de : a.en}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {animals.map((rowAnimal, rowIndex) => (
              <tr key={rowAnimal.en}>
                <th className="p-3 border border-zinc-800 text-amber-500 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{rowAnimal.emoji}</span>
                    <span className="text-[9px] uppercase">{lang === 'de' ? rowAnimal.de : rowAnimal.en}</span>
                  </div>
                </th>
                {animals.map((colAnimal, colIndex) => {
                  const comp = compatibilityRomance[rowIndex as keyof typeof compatibilityRomance][colIndex as keyof typeof compatibilityRomance[0]];
                  
                  const getCellClasses = (comp: string) => {
                    switch (comp) {
                      case 'excellent': return 'bg-gradient-to-br from-amber-500/30 to-amber-900/20';
                      case 'good': return 'bg-gradient-to-br from-amber-700/20 to-zinc-900/10';
                      case 'moderate': return 'bg-gradient-to-br from-zinc-700/20 to-zinc-900/10';
                      case 'challenging': return 'bg-gradient-to-br from-red-900/20 to-zinc-950';
                      default: return 'bg-zinc-950';
                    }
                  };
                  
                  return (
                    <td key={colAnimal.en} className={`p-3 border border-zinc-800 text-center cursor-pointer ${getCellClasses(comp)} hover:scale-105 transition-all duration-300`} onClick={() => showCompatibility(rowIndex, colIndex)}>
                      {comp === 'excellent' ? '✨' : comp === 'good' ? '👍' : comp === 'moderate' ? '⚖️' : '😰'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 p-4 bg-zinc-950 rounded-xl border border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <span className="text-lg">✨</span> {lang === 'de' ? 'Ausgezeichnet' : 'Excellent'}
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <span className="text-lg">👍</span> {lang === 'de' ? 'Gut' : 'Good'}
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <span className="text-lg">⚖️</span> {lang === 'de' ? 'Moderat' : 'Moderate'}
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <span className="text-lg">😰</span> {lang === 'de' ? 'Herausfordernd' : 'Challenging'}
          </div>
        </div>
      </div>

      <ProfileFunnel lang={lang} />
      
      <FAQ />

      {modalData && (
        <div className="fixed inset-0 bg-zinc-950/90 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setModalData(null)}>
          <div className="bg-zinc-900 p-8 rounded-2xl max-w-lg w-full border border-zinc-800 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-amber-400 text-2xl font-serif italic mb-6 text-center">{modalData.title}</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[modalData.romance, modalData.business, modalData.friendship].map(item => (
                <div key={item.type} className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-center">
                  <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mb-1">{item.type}</div>
                  <div className="text-lg font-bold text-white">{item.score}</div>
                </div>
              ))}
            </div>

            <p className="text-zinc-300 leading-relaxed mb-4 font-sans text-sm">{compatibilityText[modalData.romance.comp as keyof typeof compatibilityText][lang]}</p>
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 mb-4">
              <p className="text-amber-500 font-semibold font-mono text-[10px] uppercase tracking-widest mb-1">Yin/Yang Balance</p>
              <p className="text-zinc-300 text-sm">{modalData.yinYangAnalysis}</p>
            </div>
            <p className="text-amber-500 font-semibold font-mono text-[10px] uppercase tracking-widest">{modalData.elementInteraction}</p>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setModalData(null)} className="flex-1 p-3 rounded-xl bg-zinc-800 text-white font-bold hover:bg-zinc-700 transition-all">Close</button>
              {typeof navigator !== 'undefined' && navigator.share && (
                <button 
                  onClick={() => navigator.share({
                    title: 'Bazi Compatibility',
                    text: `Check out our compatibility: ${modalData.title}. Romance Score: ${modalData.romance.score}. ${modalData.elementInteraction}`,
                    url: window.location.href
                  }).catch(console.error)}
                  className="flex-1 p-3 rounded-xl bg-amber-500 text-zinc-950 font-bold hover:bg-amber-400 transition-all"
                >
                  {lang === 'de' ? 'Teilen' : 'Share'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

