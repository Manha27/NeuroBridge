import React, { useState } from "react";
import { 
  BookOpen, Search, Plus, Trash2, Edit2, Image, 
  Mic, Sparkles, Smile, Volume2, Calendar, Check 
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function PatientJournal() {
  const { db, addJournalEntry, deleteJournalEntry } = useApp();
  
  // States
  const [text, setText] = useState("");
  const [mood, setMood] = useState("Great");
  const [photo, setPhoto] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // UI States
  const [success, setSuccess] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaSelected, setMediaSelected] = useState("");

  const handleCompose = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addJournalEntry(text, mood, photo || audioUrl);
    
    // Clear inputs
    setText("");
    setMood("Great");
    setPhoto(null);
    setAudioUrl(null);
    setMediaSelected("");
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  // Simulate attaching photo
  const simulatePhoto = () => {
    const randomPhotos = [
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=400", // Garden
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400", // Family
      "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&q=80&w=400"  // Sitar music
    ];
    const picked = randomPhotos[Math.floor(Math.random() * randomPhotos.length)];
    setPhoto(picked);
    setMediaSelected("📷 Simulated photo attached!");
  };

  // Simulate audio recording
  const simulateAudio = () => {
    setIsRecording(true);
    setMediaSelected("🎙️ Recording simulated voice note (3s)...");
    setTimeout(() => {
      setIsRecording(false);
      setAudioUrl("simulated_audio.mp3");
      setMediaSelected("🎙️ Voice note successfully attached!");
    }, 2500);
  };

  // Filter entries
  const filteredEntries = db.journalEntries.filter((entry) => {
    return entry.text.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-8 text-left font-sans text-[18px]">
      
      {/* Overview stats header */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">My Memory Journal</h2>
          <p className="text-sm text-text-secondary mt-1">Write down notes, upload lovely garden photos, or capture voice notes to capture your day.</p>
        </div>
        <div className="py-2.5 px-6 bg-secondary/10 border border-secondary/20 text-secondary font-bold rounded-full text-base">
          Total Entries: {db.journalEntries.length}
        </div>
      </section>

      {/* Compose Form */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft space-y-4">
        <h3 className="text-[20px] font-bold text-text-primary flex items-center gap-2">
          <BookOpen className="text-primary h-5.5 w-5.5" /> Write a New Memory
        </h3>
        
        {success && (
          <div className="p-3.5 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold rounded-lg flex items-center gap-1.5 animate-fade-in">
            <Check className="h-4.5 w-4.5" /> Journal logged! Priya can see your thoughts on her feed.
          </div>
        )}

        <form onSubmit={handleCompose} className="space-y-4">
          <textarea
            rows="3"
            placeholder="What did you do today? (e.g., drank some tea with Priya, did a crossword, walked in the garden...)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 bg-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-md outline-none text-[18px] leading-relaxed transition-all font-medium min-h-[100px]"
          />

          <div className="flex flex-wrap justify-between items-center gap-4 border-t border-border/60 pt-4">
            
            {/* Mood picker & attachment builders */}
            <div className="flex flex-wrap items-center gap-4">
              
              {/* Emojis selection */}
              <div className="flex items-center gap-1 bg-bg p-1 border border-border rounded-lg">
                {[
                  { value: "Sad", label: "Sad", color: "text-red-700 hover:bg-red-50" },
                  { value: "Confused", label: "Confused", color: "text-amber-700 hover:bg-amber-50" },
                  { value: "Okay", label: "Okay", color: "text-blue-700 hover:bg-blue-50" },
                  { value: "Good", label: "Good", color: "text-green-700 hover:bg-green-50" },
                  { value: "Great", label: "Great", color: "text-emerald-800 hover:bg-emerald-50" }
                ].map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setMood(m.value)}
                    className={`text-xs px-2.5 py-1.5 font-bold rounded-md transition-all cursor-pointer ${
                      mood === m.value
                        ? "bg-white text-text-primary shadow-xs border border-border"
                        : `text-text-secondary hover:text-text-primary ${m.color}`
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Photo Simulator */}
              <button
                type="button"
                onClick={simulatePhoto}
                className="py-2.5 px-4 bg-bg border border-border hover:border-primary rounded-full transition-all text-xs font-semibold active:scale-95 flex items-center gap-1.5 text-text-primary"
              >
                <Image className="h-4 w-4 text-primary" /> Attach Photo
              </button>

              {/* Audio Simulator */}
              <button
                type="button"
                disabled={isRecording}
                onClick={simulateAudio}
                className={`py-2.5 px-4 border rounded-full transition-all text-xs font-semibold active:scale-95 flex items-center gap-1.5 text-text-primary ${
                  isRecording ? "bg-red-50 border-red-200 text-red-500 animate-pulse" : "bg-bg border-border hover:border-primary"
                }`}
              >
                <Mic className={`h-4 w-4 ${isRecording ? "text-danger" : "text-primary"}`} /> 
                {isRecording ? "Recording..." : "Record Voice"}
              </button>

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!text.trim()}
              className="py-3 px-8 bg-primary hover:bg-primary/95 text-white font-extrabold text-sm rounded-full shadow-md transition-all active:scale-95 hover:-translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none"
            >
              Add Memory
            </button>

          </div>

          {mediaSelected && (
            <p className="text-xs font-bold text-secondary animate-fade-in">{mediaSelected}</p>
          )}

        </form>
      </section>

      {/* Search and Entries Grid */}
      <section className="space-y-4">
        
        {/* Search tool */}
        <div className="flex justify-between items-center gap-4">
          <h3 className="text-[22px] font-bold text-text-primary">Past Journal Entries</h3>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-text-secondary" />
            <input
              type="text"
              placeholder="Search past memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-border focus:border-primary rounded-full outline-none text-[14px]"
            />
          </div>
        </div>

        {/* Entries List */}
        <div className="space-y-6">
          {filteredEntries.length === 0 ? (
            <div className="p-12 bg-white border border-border border-dashed rounded-lg text-center text-text-secondary text-sm">
              No matching journal entries found. Try another search parameter!
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div 
                key={entry.id} 
                className="bg-white border border-border p-6 rounded-lg shadow-soft hover:shadow-md transition-all space-y-4 relative"
              >
                {/* Header */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <span className={`inline-block px-3 py-1 text-xs font-black rounded-full border shadow-sm ${
                      entry.mood === "Great"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : entry.mood === "Good"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : entry.mood === "Okay"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : entry.mood === "Confused"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}>
                      Mood: {entry.mood}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-text-primary flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-primary" />
                        {new Date(entry.date).toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-secondary">
                        Circle synced
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <button 
                    onClick={() => deleteJournalEntry(entry.id)}
                    className="p-2 text-text-secondary hover:text-danger rounded-full hover:bg-danger/10 transition-colors active:scale-90"
                    aria-label="Delete entry"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Core description text */}
                <p className="text-[18px] font-medium text-text-primary leading-relaxed text-left whitespace-pre-line">
                  {entry.text}
                </p>

                {/* If photo attachment present */}
                {entry.photo && entry.photo.startsWith("http") && (
                  <div className="rounded-xl overflow-hidden max-w-md border border-border shadow-sm">
                    <img 
                      src={entry.photo} 
                      alt="Journal Attachment" 
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                )}

                {/* If simulated audio note exists */}
                {entry.voiceRecorded && (
                  <div className="bg-bg border border-border p-3.5 rounded-xl flex items-center gap-3 max-w-sm">
                    <div className="p-2 bg-primary/10 text-primary rounded-full shrink-0 animate-pulse">
                      <Volume2 className="h-5 w-5" />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-text-primary">Recorded Voice Log</p>
                      <p className="text-[11px] text-text-secondary">Simulated audio message attached (3.0s)</p>
                    </div>
                    <audio controls className="hidden" />
                    <button className="text-xs bg-primary text-white py-1 px-3.5 rounded-full font-bold shadow-sm hover:scale-105 active:scale-95">
                      Play
                    </button>
                  </div>
                )}

              </div>
            ))
          )}
        </div>

      </section>

    </div>
  );
}
