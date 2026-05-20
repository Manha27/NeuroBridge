import React, { useState, useEffect } from "react";
import { Gamepad2, Play, Award, RotateCcw, ArrowLeft, Clock, Sparkles } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function PatientGames() {
  const { db, saveGameScore } = useApp();
  const [activeGame, setActiveGame] = useState(null); // null = menu, 'memory' = memory game

  // Game Board States
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]); // Array of indices
  const [matchedCards, setMatchedCards] = useState([]); // Array of indices
  const [moves, setMoves] = useState(0);
  
  // Timing
  const [seconds, setSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // Emojis list
  const emojis = ["🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🍑", "🍍"];

  // Initialize Memory Match Board
  const initMemoryGame = () => {
    // Duplicate and shuffle
    const deck = [...emojis, ...emojis]
      .map((emoji, idx) => ({ id: idx, emoji, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);

    setCards(deck);
    setSelectedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setSeconds(0);
    setIsTimerActive(true);
    setGameComplete(false);
  };

  // Timer effect
  useEffect(() => {
    let timer = null;
    if (isTimerActive && !gameComplete) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, gameComplete]);

  const handleCardClick = (idx) => {
    // Prevent double clicking same card, matched cards, or when 2 are already checking
    if (
      selectedCards.length >= 2 || 
      selectedCards.includes(idx) || 
      matchedCards.includes(idx) || 
      gameComplete
    ) return;

    const newSelected = [...selectedCards, idx];
    setSelectedCards(newSelected);

    // If second card flipped, check match
    if (newSelected.length === 2) {
      setMoves((prev) => prev + 1);
      const firstCard = cards[newSelected[0]];
      const secondCard = cards[newSelected[1]];

      if (firstCard.emoji === secondCard.emoji) {
        // MATCH FOUND
        setTimeout(() => {
          const newMatches = [...matchedCards, newSelected[0], newSelected[1]];
          setMatchedCards(newMatches);
          setSelectedCards([]);

          // Check if all matched
          if (newMatches.length === cards.length) {
            handleGameWin(moves + 1);
          }
        }, 600);
      } else {
        // NO MATCH — FLIP BACK
        setTimeout(() => {
          setSelectedCards([]);
        }, 1200);
      }
    }
  };

  const handleGameWin = (totalMoves) => {
    setIsTimerActive(false);
    setGameComplete(true);

    // Calculate rating stars
    let rating = 1;
    if (totalMoves <= 14) rating = 3;
    else if (totalMoves <= 20) rating = 2;

    const timerStr = formatTime(seconds);
    
    // Save to AppContext localStorage
    saveGameScore("Memory Match", totalMoves, timerStr, rating);
  };

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    if (mins > 0) {
      return `${mins}m ${secs.toString().padStart(2, "0")}s`;
    }
    return `${secs}s`;
  };

  const handleLaunchGame = (gameId) => {
    if (gameId === "memory") {
      setActiveGame("memory");
      initMemoryGame();
    } else {
      alert("This cognitive assessment game is being loaded by your physician. Try playing Memory Match!");
    }
  };

  const getRecentScore = () => {
    const scores = db.gameScores.filter(s => s.game === "Memory Match");
    if (scores.length > 0) {
      return `Last score: ${scores[0].score} Flips (${scores[0].rating} Stars ⭐)`;
    }
    return "No plays logged today yet.";
  };

  return (
    <div className="space-y-8 text-left font-sans select-none text-[18px]">
      
      {/* MENU HUB */}
      {activeGame === null && (
        <>
          <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Cognitive Games</h2>
              <p className="text-sm text-text-secondary mt-1">Keep your brain sharp and active. Play a short memory game once a day.</p>
            </div>
            <div className="py-2.5 px-6 bg-primary-light border border-primary/20 text-primary font-bold rounded-full text-sm flex items-center gap-1.5">
              <Award className="h-4.5 w-4.5" /> {getRecentScore()}
            </div>
          </section>

          {/* Games registry grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            
            {/* Memory Match Game Card */}
            <div className="bg-white border border-border rounded-lg p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-green-100 text-green-700 font-extrabold px-3 py-1 rounded-full uppercase">
                    Easy Mode
                  </span>
                  <Gamepad2 className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-[22px] font-black text-text-primary">Memory Match</h3>
                  <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
                    Flip cards and match matching pairs of fruits. Trains short-term visual memory and spatial recognition.
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleLaunchGame("memory")}
                className="w-full py-3.5 bg-primary text-white font-extrabold text-sm rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm"
              >
                <Play className="h-4.5 w-4.5 fill-white" /> Start Playing
              </button>
            </div>

            {/* Word Scramble Card */}
            <div className="bg-white border border-border rounded-lg p-6 shadow-soft opacity-75 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-amber-100 text-amber-700 font-extrabold px-3 py-1 rounded-full uppercase">
                    Medium Mode
                  </span>
                  <Gamepad2 className="text-text-secondary h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-[22px] font-black text-text-primary">Word Scramble</h3>
                  <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
                    Rearrange letters to spell simple daily nouns. Strengthens vocabulary recall and word association.
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleLaunchGame("scramble")}
                className="w-full py-3.5 bg-bg border border-border text-text-secondary font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2 cursor-not-allowed"
              >
                Unlocked by Doctor
              </button>
            </div>

            {/* Pattern Recall Card */}
            <div className="bg-white border border-border rounded-lg p-6 shadow-soft opacity-75 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-amber-100 text-amber-700 font-extrabold px-3 py-1 rounded-full uppercase">
                    Medium Mode
                  </span>
                  <Gamepad2 className="text-text-secondary h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-[22px] font-black text-text-primary">Pattern Recall</h3>
                  <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
                    Observe a grid flash and recall the correct highlights. Stimulates visual attention and working memory.
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleLaunchGame("pattern")}
                className="w-full py-3.5 bg-bg border border-border text-text-secondary font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2 cursor-not-allowed"
              >
                Unlocked by Doctor
              </button>
            </div>

            {/* Daily Trivia */}
            <div className="bg-white border border-border rounded-lg p-6 shadow-soft opacity-75 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-green-100 text-green-700 font-extrabold px-3 py-1 rounded-full uppercase">
                    Easy Mode
                  </span>
                  <Gamepad2 className="text-text-secondary h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-[22px] font-black text-text-primary">Daily Trivia</h3>
                  <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
                    Simple trivia questions regarding calendar dates, historical facts, and orientation.
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleLaunchGame("trivia")}
                className="w-full py-3.5 bg-bg border border-border text-text-secondary font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2 cursor-not-allowed"
              >
                Unlocked by Doctor
              </button>
            </div>

          </div>
        </>
      )}

      {/* DYNAMIC MEMORY MATCH GAME BOARD */}
      {activeGame === "memory" && (
        <div className="space-y-6 max-w-xl mx-auto text-center">
          
          {/* Header toolbar */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setActiveGame(null)}
              className="py-2.5 px-5 bg-white border border-border hover:border-text-primary rounded-full transition-all text-xs font-bold active:scale-95 flex items-center gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <div className="flex items-center gap-4 text-sm font-extrabold text-text-primary bg-white px-5 py-2 border border-border rounded-full shadow-xs">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-primary" />
                <span>Timer: {formatTime(seconds)}</span>
              </div>
              <div className="w-px h-3.5 bg-border" />
              <div>Flips: {moves}</div>
            </div>

            <button
              onClick={initMemoryGame}
              className="p-2.5 bg-primary-light text-primary hover:bg-primary hover:text-white rounded-full transition-all active:scale-90 shadow-sm"
              aria-label="Restart match"
            >
              <RotateCcw className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Cards Play grid */}
          <div className="grid grid-cols-4 gap-4 aspect-square max-w-[420px] mx-auto perspective-1000 p-2">
            {cards.map((card, idx) => {
              const isOpen = selectedCards.includes(idx) || matchedCards.includes(idx);

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(idx)}
                  className="w-full h-full relative cursor-pointer"
                >
                  <div
                    className={`w-full h-full rounded-xl transition-all duration-300 transform-style-3d border border-border shadow-soft flex items-center justify-center ${
                      isOpen ? "rotate-y-180 bg-white" : "bg-primary-light/50 border-primary/20 hover:bg-primary-light"
                    }`}
                  >
                    
                    {/* Front of card (Empty/Brain Logo) */}
                    <div className="absolute inset-0 backface-hidden flex items-center justify-center">
                      <Brain className="h-7 w-7 text-primary/40 animate-pulse" />
                    </div>

                    {/* Back of card (Emoji) */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center bg-white rounded-xl">
                      <span className="text-3xl sm:text-4xl">{card.emoji}</span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Complete star overlays */}
          {gameComplete && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
              <div className="bg-white border border-border p-8 rounded-lg max-w-md w-full text-center space-y-6 shadow-2xl animate-fade-in">
                <div className="p-3 bg-primary-light text-primary rounded-full w-14 h-14 flex items-center justify-center mx-auto shadow-inner">
                  <Sparkles className="h-7 w-7" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-text-primary">Match Completed!</h3>
                  <p className="text-sm text-text-secondary">Excellent visual focus Ramesh. Your brain score is logged.</p>
                </div>

                {/* Stars metrics */}
                <div className="flex justify-center items-center gap-2 py-2">
                  {[1, 2, 3].map((starIdx) => {
                    const starsEarned = moves <= 14 ? 3 : moves <= 20 ? 2 : 1;
                    return (
                      <span 
                        key={starIdx} 
                        className={`text-4xl transition-all duration-500 transform ${
                          starIdx <= starsEarned ? "scale-110 opacity-100 rotate-0" : "scale-75 opacity-20"
                        }`}
                      >
                        ⭐
                      </span>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/60">
                  <div className="text-center bg-bg p-3 rounded-xl">
                    <p className="text-xs text-text-secondary">Total Moves</p>
                    <p className="text-lg font-black text-text-primary">{moves} Flips</p>
                  </div>
                  <div className="text-center bg-bg p-3 rounded-xl">
                    <p className="text-xs text-text-secondary">Time Spent</p>
                    <p className="text-lg font-black text-text-primary">{formatTime(seconds)}</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    onClick={initMemoryGame}
                    className="flex-1 py-3 bg-primary text-white font-bold rounded-full transition-all active:scale-95 shadow-sm"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={() => setActiveGame(null)}
                    className="flex-1 py-3 bg-bg border border-border hover:border-text-primary text-text-primary font-bold rounded-full transition-all active:scale-95 text-center"
                  >
                    Back to Games
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
