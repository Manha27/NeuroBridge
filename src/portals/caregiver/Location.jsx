import React from "react";
import { MapPin, Shield, ShieldAlert, Navigation, Clock, ToggleLeft, ToggleRight } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function CaregiverLocation() {
  const { db, updateGeofenceRadius, toggleLocationSharing } = useApp();

  const geofence = db.geofence || {
    safeZoneName: "Home & Garden Safe Zone",
    radius: 300,
    sharingEnabled: true,
    currentAddress: "12A Block-C, Vasant Vihar, New Delhi - 110057",
    status: "Home (Safe Zone ✅)",
    history: []
  };

  const handleRadiusChange = (e) => {
    updateGeofenceRadius(parseInt(e.target.value));
  };

  const handleToggleSharing = () => {
    toggleLocationSharing(!geofence.sharingEnabled);
  };

  // SOS alarms present?
  const hasSOS = db.notifications.some(n => n.message.includes("SOS") && !n.read);

  return (
    <div className="space-y-8 text-left font-sans text-[15px]">
      
      {/* Overview stats header */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary">GPS Geofencing Supervision</h2>
          <p className="text-xs text-text-secondary mt-1">Supervising patient coordinates & safety boundary status in real-time.</p>
        </div>
        
        {/* Toggle widget */}
        <div className="flex items-center gap-3 bg-bg py-2 px-5 rounded-full border border-border">
          <span className="text-xs font-bold text-text-primary">Active GPS Sharing</span>
          <button 
            onClick={handleToggleSharing}
            className={`transition-colors duration-200 focus:outline-none ${
              geofence.sharingEnabled ? "text-secondary" : "text-gray-400"
            }`}
            aria-label="Toggle location tracking"
          >
            {geofence.sharingEnabled ? <ToggleRight className="h-9 w-9 stroke-[1.5px]" /> : <ToggleLeft className="h-9 w-9 stroke-[1.5px]" />}
          </button>
        </div>
      </section>

      {/* Main Map Box & Control panels */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Visual Map Canvas Grid (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-border p-6 rounded-lg shadow-soft space-y-6">
          <div className="flex justify-between items-center border-b border-border pb-4">
            <span className="font-bold text-text-primary flex items-center gap-2">
              <Navigation className="h-5 w-5 text-secondary animate-pulse" /> Live Tracking Map
            </span>
            <span className={`text-xs py-1 px-4 rounded-full font-bold uppercase tracking-wider ${
              hasSOS ? "bg-danger/10 text-danger animate-pulse" : "bg-secondary/10 text-secondary"
            }`}>
              {hasSOS ? "⚠️ EMERGENCY TRIPPED" : geofence.status}
            </span>
          </div>

          {/* Premium HTML Map Sandbox */}
          <div className="h-96 bg-bg border border-border rounded-xl relative overflow-hidden flex items-center justify-center">
            
            {/* Grid Network Lines overlay */}
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:24px_24px]" />
            
            {/* Radial Radar rings */}
            <div className="absolute w-72 h-72 rounded-full border border-dashed border-secondary/25 animate-ping opacity-15" style={{ animationDuration: '4s' }} />
            <div className="absolute w-96 h-96 rounded-full border border-secondary/15 animate-ping opacity-10" style={{ animationDuration: '7s' }} />

            {/* Safe boundaries radius (Scaled based on radius slider) */}
            <div 
              className="absolute rounded-full border-2 border-dashed border-secondary bg-secondary/5 flex items-center justify-center transition-all duration-300 shadow-inner"
              style={{
                width: `${Math.min(320, 100 + (geofence.radius / 3.5))}px`,
                height: `${Math.min(320, 100 + (geofence.radius / 3.5))}px`,
              }}
            >
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1D9E75_2px,transparent_2px)] [background-size:12px_12px]" />
              <span className="text-[10px] text-secondary font-bold absolute bottom-2 tracking-widest uppercase">
                Safe Boundary ({geofence.radius}m)
              </span>
            </div>

            {/* Center Home Anchor node */}
            <div className="absolute flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-secondary text-white font-extrabold flex items-center justify-center shadow-lg border-2 border-white z-10 hover:scale-115 transition-transform duration-300">
                🏡
              </div>
              <span className="text-[10px] font-bold text-text-primary bg-white py-0.5 px-2 border border-border rounded-full shadow-xs mt-1.5 z-10">Home</span>
            </div>

            {/* Patient Pin Node (Slightly offset from center) */}
            <div 
              className="absolute translate-x-[40px] translate-y-[-40px] flex flex-col items-center z-20 group"
            >
              <div className="relative">
                <div className={`absolute -inset-1 bg-primary rounded-full animate-ping opacity-45`} />
                <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 border-white shadow-lg overflow-hidden shrink-0 ${
                  hasSOS ? "bg-danger" : "bg-primary"
                }`}>
                  {hasSOS ? (
                    <ShieldAlert className="h-5 w-5 text-white animate-bounce" />
                  ) : (
                    <img 
                      src={db.patients[0]?.photo} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                      alt="" 
                    />
                  )}
                </div>
              </div>
              <div className="bg-text-primary text-white text-[9.5px] py-0.5 px-2 rounded-full shadow-md font-bold mt-1 tracking-wide uppercase">
                {hasSOS ? "Ramesh (SOS)" : "Ramesh"}
              </div>
            </div>

          </div>

          <div className="flex items-center gap-3 bg-bg p-4 rounded-xl border border-border">
            <MapPin className="text-secondary h-6.5 w-6.5 shrink-0" />
            <div className="text-left">
              <p className="text-[11px] text-text-secondary uppercase font-semibold">Active Coordinates Address</p>
              <p className="text-sm font-bold text-text-primary leading-tight mt-0.5">{geofence.currentAddress}</p>
            </div>
          </div>
        </div>

        {/* Boundary Control Slider & Timeline Log (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Safezone Slider Card */}
          <div className="bg-white border border-border p-6 rounded-lg shadow-soft space-y-4">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Shield className="text-secondary h-5 w-5" /> Safe Zone Thresholds
            </h3>
            
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center text-xs font-bold text-text-secondary">
                <span>Boundary Radius</span>
                <span className="text-secondary">{geofence.radius} meters</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={geofence.radius}
                onChange={handleRadiusChange}
                className="w-full h-2 bg-bg rounded-lg appearance-none cursor-pointer accent-secondary border border-border"
              />
              <div className="flex justify-between items-center text-[10px] text-text-secondary font-semibold">
                <span>100m (Close)</span>
                <span>1000m (Wide)</span>
              </div>
            </div>
            
            <p className="text-xs text-text-secondary leading-relaxed bg-bg p-3.5 border border-border rounded-lg mt-2 font-medium">
              If Ramesh's device records coordinates beyond this boundary radius from Vasant Vihar home, you'll receive a push alert immediately.
            </p>
          </div>

          {/* Location breadcrumbs log */}
          <div className="bg-white border border-border p-6 rounded-lg shadow-soft space-y-4">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Clock className="text-secondary h-5 w-5" /> Today's Coordinate Logs
            </h3>

            <div className="space-y-4 pr-1 relative max-h-56 overflow-y-auto">
              <div className="absolute left-[16px] top-3 bottom-3 w-0.5 bg-border -z-10" />

              {geofence.history.map((log) => (
                <div key={log.id} className="flex gap-4 items-start text-xs">
                  <div className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center text-white font-bold bg-bg border border-border`}>
                    {log.status.includes("Safe") ? "🏡" : "⚠️"}
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="font-bold text-text-primary truncate">{log.address}</p>
                    <p className={`text-[10px] font-semibold mt-0.5 ${
                      log.status.includes("Safe") ? "text-secondary" : "text-danger"
                    }`}>
                      {log.status} • {log.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
