import React, { useState } from "react";
import { Users, Phone, Volume2, Plus, X, Check, Activity, Heart } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function PatientPeople() {
  const { db, addPerson } = useApp();
  
  // Flip states key-value dictionary (card id -> boolean)
  const [flippedCards, setFlippedCards] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);

  // Calling simulation states
  const [callingPerson, setCallingPerson] = useState(null);

  // Form Fields
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("Friend");
  const [phone, setPhone] = useState("");
  const [audioText, setAudioText] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleCardClick = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCallSimulate = (person, e) => {
    e.stopPropagation(); // Avoid flipping the card
    setCallingPerson(person);
    setTimeout(() => {
      setCallingPerson(null);
    }, 4000);
  };

  const handlePlayVoice = (person, e) => {
    e.stopPropagation(); // Avoid flipping
    // Play voice simulation (we will alert or use standard text speech synthesis)
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(person.audioText);
      utterance.pitch = 1.0;
      utterance.rate = 0.9; // speak slowly for dementia patients
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      alert(`Playing voice memo: "${person.audioText}"`);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Use a default avatar if none provided
    const randomAvatars = [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150"
    ];
    const pickedAvatar = avatar || randomAvatars[Math.floor(Math.random() * randomAvatars.length)];

    addPerson(name, relationship, phone, pickedAvatar, audioText);

    // Reset
    setName("");
    setRelationship("Friend");
    setPhone("");
    setAudioText("");
    setAvatar("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 text-left font-sans select-none text-[18px]">
      
      {/* Header */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">My People</h2>
          <p className="text-sm text-text-secondary mt-1">Tap a card to look at details. You can call them or play a voice message reminder.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="py-3 px-6 bg-primary hover:bg-primary/95 text-white font-extrabold text-sm rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
        >
          <Plus className="h-4.5 w-4.5" /> Add Person
        </button>
      </section>

      {/* Grid of flipping cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {db.people.map((person) => {
          const isFlipped = !!flippedCards[person.id];

          return (
            <div 
              key={person.id}
              onClick={() => handleCardClick(person.id)}
              className="h-[320px] w-full perspective-1000 cursor-pointer"
            >
              <div 
                className={`w-full h-full relative transform-style-3d transition-transform duration-500 rounded-lg shadow-soft border border-border/80 ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                
                {/* CARD FRONT PANEL */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-lg p-6 flex flex-col items-center justify-between text-center">
                  <div className="space-y-4 w-full flex flex-col items-center">
                    <img 
                      src={person.avatar} 
                      alt={person.name} 
                      className="h-24 w-24 rounded-full object-cover border-4 border-primary-light shadow-sm"
                    />
                    <div className="space-y-1">
                      <h3 className="text-[22px] font-black text-text-primary">{person.name}</h3>
                      <span className="inline-block px-4 py-1.5 bg-primary-light text-primary font-extrabold text-xs tracking-wider uppercase rounded-full">
                        {person.relationship}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary font-bold uppercase tracking-widest mt-4">
                    Tap card to flip over
                  </p>
                </div>

                {/* CARD BACK PANEL (FLIPPED DETAILS) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-primary-light/40 border border-primary/20 rounded-lg p-6 flex flex-col justify-between text-center">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">
                      {person.relationship} Contact Details
                    </span>
                    <h4 className="text-[20px] font-extrabold text-text-primary">{person.name}</h4>
                    <p className="text-sm font-bold text-text-secondary mt-1">{person.phone}</p>
                  </div>

                  <div className="space-y-3.5 my-2.5">
                    {/* Simulated Voice message button */}
                    <button
                      onClick={(e) => handlePlayVoice(person, e)}
                      className="w-full py-3 bg-white border border-primary/30 hover:border-primary text-primary font-extrabold text-sm rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Volume2 className="h-4.5 w-4.5 animate-bounce" /> Play Voice Message
                    </button>

                    {/* Calling button */}
                    <button
                      onClick={(e) => handleCallSimulate(person, e)}
                      className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-extrabold text-sm rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Phone className="h-4.5 w-4.5" /> Call Now
                    </button>
                  </div>

                  <p className="text-xs text-text-secondary font-bold uppercase tracking-widest">
                    Tap to return
                  </p>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Calling Simulation Modal Drawer */}
      {callingPerson && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-text-primary text-white p-8 rounded-lg max-w-sm w-full text-center space-y-6 shadow-xl border border-white/10">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary animate-pulse">
                Outgoing Secure Connection...
              </span>
              <h3 className="text-2xl font-bold">{callingPerson.name}</h3>
              <p className="text-xs text-gray-400">{callingPerson.phone}</p>
            </div>
            
            <div className="flex justify-center items-center py-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25" />
                <div className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Phone className="h-9 w-9 text-white animate-bounce" />
                </div>
              </div>
            </div>

            <p className="text-sm font-semibold text-gray-400 animate-pulse">
              Simulating patient call. Connections green...
            </p>
          </div>
        </div>
      )}

      {/* Add Contact Modal Panel */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-6">
          <div className="bg-white border border-border p-6 rounded-lg max-w-md w-full shadow-2xl space-y-5 animate-fade-in text-left">
            <div className="flex justify-between items-center border-b border-border pb-3.5">
              <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                <Users className="text-primary h-5 w-5" /> Add Circle Member
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full bg-bg hover:bg-border transition-colors"
              >
                <X className="h-5 w-5 text-text-secondary" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-primary">Contact Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajiv Malhotra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-md outline-none text-[15px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-primary">Relationship</label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-3 py-2.5 bg-bg border border-border focus:border-primary rounded-md outline-none text-[14px]"
                  >
                    <option>Daughter</option>
                    <option>Son</option>
                    <option>Wife</option>
                    <option>Friend</option>
                    <option>Doctor</option>
                    <option>Caregiver</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-primary">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98721 00987"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-bg border border-border focus:border-primary rounded-md outline-none text-[15px]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-primary">Voice Message Text</label>
                <textarea
                  rows="2"
                  placeholder="The text that the speech synthesizer will read aloud to Ramesh when clicked."
                  value={audioText}
                  onChange={(e) => setAudioText(e.target.value)}
                  className="w-full p-3.5 bg-bg border border-border focus:border-primary rounded-md outline-none text-[14px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-primary">Photo URL (Optional)</label>
                <input
                  type="text"
                  placeholder="Unsplash absolute link or leave blank"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-4 py-2.5 bg-bg border border-border focus:border-primary rounded-md outline-none text-[15px]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-md transition-all active:scale-95"
              >
                Save Contact
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
