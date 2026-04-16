import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Sparkles,
  RotateCcw,
  Trophy,
  User,
  Volume2,
  Trash2
} from 'lucide-react';

// --- Types ---
interface PhraseChallenge {
  id: number;
  correctSentence: string;
  words: string[]; // Scrambled version
  translation: string;
  category: string;
}

// --- Data ---
const CHALLENGES: PhraseChallenge[] = [
  {
    id: 1,
    correctSentence: "¿Cómo estás?",
    words: ["¿Cómo", "estás?"],
    translation: "Ինչպե՞ս ես (ինչպե՞ս են գործերդ):",
    category: "Greetings"
  },
  {
    id: 2,
    correctSentence: "Yo soy de Ereván.",
    words: ["soy", "Ereván.", "Yo", "de"],
    translation: "Ես Երևանից եմ:",
    category: "Personal"
  },
  {
    id: 3,
    correctSentence: "¿Qué hora es ahora?",
    words: ["es", "ahora?", "¿Qué", "hora"],
    translation: "Ժամը քանի՞սն է հիմա:",
    category: "Daily"
  },
  {
    id: 4,
    correctSentence: "Me gusta mucho el café.",
    words: ["mucho", "el", "Me", "café.", "gusta"],
    translation: "Ինձ շատ է դուր գալիս սուրճը:",
    category: "Preferences"
  },
  {
    id: 5,
    correctSentence: "¿Dónde está el baño?",
    words: ["el", "está", "¿Dónde", "baño?"],
    translation: "Որտե՞ղ է լոգարանը:",
    category: "Travel"
  },
  {
    id: 6,
    correctSentence: "Tengo mucha hambre.",
    words: ["hambre.", "mucha", "Tengo"],
    translation: "Շատ սոված եմ:",
    category: "Physical"
  },
  {
    id: 7,
    correctSentence: "¿Cómo te llamas?",
    words: ["llamas?", "¿Cómo", "te"],
    translation: "Ի՞նչ է քո անունը:",
    category: "Personal"
  },
  {
    id: 8,
    correctSentence: "Yo voy a la tienda.",
    words: ["la", "Yo", "a", "tienda.", "voy"],
    translation: "Ես գնում եմ խանութ:",
    category: "Daily"
  },
  {
    id: 9,
    correctSentence: "Hace mucho calor hoy.",
    words: ["hoy.", "mucho", "Hace", "calor"],
    translation: "Այսօր շատ շոգ է:",
    category: "Weather"
  },
  {
    id: 10,
    correctSentence: "¿Puedes hablar más despacio, por favor?",
    words: ["hablar", "¿Puedes", "más", "despacio,", "favor?", "por"],
    translation: "Կարո՞ղ ես ավելի դանդաղ խոսել, խնդրում եմ:",
    category: "Communication"
  }
];

export default function SpanishPhraseBuilder() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'won'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const currentChallenge = CHALLENGES[currentIndex];

  useEffect(() => {
    if (gameState === 'playing') {
      setAvailableWords([...currentChallenge.words]);
      setSelectedWords([]);
      setFeedback(null);
    }
  }, [currentIndex, gameState]);

  const handleWordClick = (word: string, fromSelected: boolean) => {
    if (feedback) return;

    if (fromSelected) {
      // Remove from selected, add back to available
      setSelectedWords(prev => prev.filter((_, i) => i !== prev.lastIndexOf(word)));
      setAvailableWords(prev => [...prev, word]);
    } else {
      // Add to selected, remove from available
      setSelectedWords(prev => [...prev, word]);
      setAvailableWords(prev => prev.filter((_, i) => i !== prev.lastIndexOf(word)));
    }
  };

  const checkSentence = () => {
    const userSentence = selectedWords.join(' ');
    const isCorrect = userSentence === currentChallenge.correctSentence;

    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setScore(s => s + 1);
      setTimeout(() => {
        if (currentIndex === CHALLENGES.length - 1) {
          setGameState('won');
        } else {
          setCurrentIndex(prev => prev + 1);
        }
      }, 1500);
    } else {
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  const clearSelection = () => {
    setSelectedWords([]);
    setAvailableWords([...currentChallenge.words]);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-900 font-sans flex flex-col items-center justify-center p-4">
      {/* Background Bubbles */}
      <div className="fixed inset-0 pointer-events-none opacity-5 overflow-hidden">
        <MessageSquare className="absolute top-10 left-10 w-64 h-64 rotate-12" />
        <MessageSquare className="absolute bottom-10 right-10 w-80 h-80 -rotate-12" />
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center z-10 space-y-8 max-w-xl bg-white p-12 rounded-[3rem] shadow-2xl border-b-8 border-indigo-500"
          >
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-200">
                <MessageSquare className="w-12 h-12 text-white" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-5xl font-black tracking-tighter uppercase italic text-slate-900">
                Phrase <span className="text-indigo-600">Builder</span>
              </h1>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                Master Daily Conversational Spanish
              </p>
            </div>

            <p className="text-slate-600 font-medium leading-relaxed text-lg">
              Կազմիր ճիշտ նախադասություններ խոսակցական իսպաներենից: 
              Դասավորիր բառերը ճիշտ հերթականությամբ:
            </p>

            <button
              onClick={() => setGameState('playing')}
              className="w-full py-5 bg-indigo-600 text-white rounded-full font-black text-xl uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-100"
            >
              Սկսել Մարզումը
            </button>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl grid grid-cols-1 gap-8 z-10"
          >
            {/* Header / Progress */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-[2rem] shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
                  <User className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Challenge</div>
                  <div className="font-black text-xl">{currentIndex + 1} / {CHALLENGES.length}</div>
                </div>
              </div>
              
              <div className="flex-1 w-full max-w-xs md:mx-12">
                <div className="text-center mb-1 text-[10px] font-black uppercase text-indigo-400">{currentChallenge.category}</div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: `${((currentIndex + 1) / CHALLENGES.length) * 100}%` }}
                    className="h-full bg-indigo-500"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="px-4 py-2 bg-indigo-50 rounded-xl text-indigo-600 font-black text-sm">
                  Score: {score}
                </div>
              </div>
            </div>

            {/* Main Area */}
            <div className="bg-white rounded-[4rem] p-8 md:p-16 shadow-2xl relative border-4 border-white overflow-hidden min-h-[500px] flex flex-col justify-between">
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <Sparkles className="w-4 h-4" />
                    Translation
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                    "{currentChallenge.translation}"
                  </h2>
                </div>

                {/* Selected Words Area (Drop Area) */}
                <div className="min-h-[100px] bg-slate-50 rounded-[2.5rem] p-6 border-2 border-dashed border-slate-200 flex flex-wrap justify-center items-center gap-3 relative">
                  <AnimatePresence>
                    {selectedWords.length > 0 ? (
                      selectedWords.map((word, i) => (
                        <motion.button
                          key={`${word}-${i}`}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          onClick={() => handleWordClick(word, true)}
                          className={`px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-md cursor-pointer hover:bg-indigo-700 active:scale-95 ${feedback === 'wrong' ? 'bg-red-500 ring-4 ring-red-200' : feedback === 'correct' ? 'bg-emerald-500 ring-4 ring-emerald-200' : ''}`}
                        >
                          {word}
                        </motion.button>
                      ))
                    ) : (
                      <div className="text-slate-300 font-black uppercase tracking-widest text-sm italic">
                        Click words below to build the sentence
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Available Words Area */}
                <div className="flex flex-wrap justify-center gap-3 py-6">
                  {availableWords.map((word, i) => (
                    <motion.button
                      key={`${word}-${i}`}
                      layout
                      onClick={() => handleWordClick(word, false)}
                      className="px-6 py-4 bg-slate-100 text-slate-700 rounded-2xl font-black text-xl shadow-sm border border-slate-200 hover:border-indigo-300 hover:bg-white active:scale-95 transition-all"
                    >
                      {word}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4 mt-8">
                <button
                  onClick={clearSelection}
                  disabled={selectedWords.length === 0 || !!feedback}
                  className="flex-1 py-4 px-8 bg-slate-100 text-slate-400 rounded-2xl font-black uppercase tracking-widest hover:text-slate-600 hover:bg-slate-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Trash2 className="w-5 h-5" />
                  Clear
                </button>
                <button
                  onClick={checkSentence}
                  disabled={selectedWords.length === 0 || !!feedback}
                  className="flex-[2] py-4 px-8 bg-indigo-600 text-white rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-6 h-6" />
                  Check Sentence
                </button>
              </div>

              {/* Feedback Overlay */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`absolute inset-0 flex flex-col items-center justify-center z-20 backdrop-blur-sm ${feedback === 'correct' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}
                  >
                    <div className={`p-8 rounded-full shadow-2xl ${feedback === 'correct' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                      {feedback === 'correct' ? <Sparkles className="w-16 h-16 text-white" /> : <RotateCcw className="w-16 h-16 text-white" />}
                    </div>
                    <div className={`mt-4 px-8 py-3 rounded-full text-white font-black text-2xl uppercase tracking-widest ${feedback === 'correct' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                      {feedback === 'correct' ? '¡Muy Bien!' : '¡Inténtalo de nuevo!'}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {gameState === 'won' && (
          <motion.div
            key="won"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 z-10 bg-white p-16 rounded-[4rem] shadow-2xl border-b-8 border-indigo-500 max-w-xl"
          >
            <div className="relative inline-block">
              <Trophy className="w-32 h-32 text-indigo-600 mx-auto drop-shadow-xl" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-4 -right-4"
              >
                <Sparkles className="w-12 h-12 text-yellow-400" />
              </motion.div>
            </div>

            <div className="space-y-4">
              <h2 className="text-6xl font-black italic uppercase tracking-tighter text-slate-900">
                Phrase <span className="text-indigo-600">Master!</span>
              </h2>
              <div className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-full font-black text-2xl">
                Score: {score} / {CHALLENGES.length}
              </div>
              <p className="text-slate-500 font-medium mt-6">
                Դուք հաջողությամբ կազմեցիք բոլոր իսպաներեն խոսակցական նախադասությունները: 
                Այժմ պատրաստ եք իրական շփման:
              </p>
            </div>

            <button
              onClick={() => {
                setCurrentIndex(0);
                setScore(0);
                setGameState('intro');
              }}
              className="w-full py-5 bg-slate-900 text-white rounded-full font-black text-xl uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95"
            >
              Նորից Սկսել
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Info */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 text-slate-300 text-[10px] font-black uppercase tracking-[0.5em]">
        <span>Drag</span>
        <ChevronRight className="w-3 h-3" />
        <span>Build</span>
        <ChevronRight className="w-3 h-3" />
        <span>Speak</span>
      </div>
    </div>
  );
}
