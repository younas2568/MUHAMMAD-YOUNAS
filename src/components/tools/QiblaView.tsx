import React, { useState, useEffect } from 'react';
import { calculateQibla, POPULAR_CITIES, Coordinates } from '../../utils/prayerTimes';
import { Compass, MapPin, ArrowLeft, RotateCw, CheckCircle2 } from 'lucide-react';

interface QiblaViewProps {
  onBack: () => void;
}

export const QiblaView: React.FC<QiblaViewProps> = ({ onBack }) => {
  const [coords, setCoords] = useState<Coordinates>(POPULAR_CITIES[3]); // Karachi default
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [hasCompassSensor, setHasCompassSensor] = useState<boolean>(false);
  const [manualHeading, setManualHeading] = useState<number>(0);

  const { bearing: qiblaBearing, distanceKm } = calculateQibla(coords.latitude, coords.longitude);

  // Request GPS coordinates
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            city: 'My Location',
            country: 'GPS Detected',
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
        },
        () => {}
      );
    }
  }, []);

  // Device Orientation Listener
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading = 0;
      if ('webkitCompassHeading' in e && typeof (e as any).webkitCompassHeading === 'number') {
        heading = (e as any).webkitCompassHeading;
        setHasCompassSensor(true);
      } else if (e.alpha !== null) {
        heading = 360 - e.alpha;
        setHasCompassSensor(true);
      }
      setDeviceHeading(Math.round(heading));
    };

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, []);

  const effectiveHeading = hasCompassSensor ? deviceHeading : manualHeading;
  // Needle angle relative to the phone top: (qiblaBearing - effectiveHeading)
  const needleAngle = (qiblaBearing - effectiveHeading + 360) % 360;
  const isAligned = Math.abs(needleAngle) < 6 || Math.abs(needleAngle - 360) < 6;

  // Trigger vibration when aligned
  useEffect(() => {
    if (isAligned && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }, [isAligned]);

  return (
    <div className="space-y-4 pb-20">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tools</span>
        </button>

        <span className="text-xs text-slate-400 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>{coords.city}</span>
        </span>
      </div>

      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 border border-emerald-600/40 p-5 shadow-xl text-center text-white">
        <h2 className="text-lg sm:text-xl font-bold font-arabic text-amber-300">
          قِبْلَةُ الصَّلَاةِ (الْكَعْبَةُ الْمُشَرَّفَةُ)
        </h2>
        <p className="text-xs text-emerald-200/90 mt-0.5">
          Exact Qibla direction to the Holy Kaaba in Makkah al-Mukarramah.
        </p>

        <div className="mt-3 flex items-center justify-center gap-6 text-xs border-t border-emerald-800/60 pt-2.5">
          <div>
            <span className="text-slate-400 block text-[10px]">Qibla Bearing</span>
            <span className="text-lg font-bold font-mono text-amber-300">{qiblaBearing}°</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Distance to Kaaba</span>
            <span className="text-lg font-bold font-mono text-white">{distanceKm.toLocaleString()} km</span>
          </div>
        </div>
      </div>

      {/* Compass Interactive Dial */}
      <div className="flex flex-col items-center justify-center py-4">
        <div className={`relative w-72 h-72 rounded-full border-4 transition-all duration-300 flex items-center justify-center shadow-2xl ${
          isAligned 
            ? 'border-amber-400 bg-emerald-950/80 shadow-emerald-500/30 ring-4 ring-amber-400/30' 
            : 'border-emerald-800/80 bg-slate-900/90'
        }`}>
          {/* Compass Dial Cardinal Marks */}
          <span className="absolute top-2 font-bold text-xs text-amber-400">N (0°)</span>
          <span className="absolute bottom-2 font-bold text-xs text-slate-400">S (180°)</span>
          <span className="absolute left-3 font-bold text-xs text-slate-400">W (270°)</span>
          <span className="absolute right-3 font-bold text-xs text-slate-400">E (90°)</span>

          {/* Compass Rings */}
          <div className="w-56 h-56 rounded-full border border-dashed border-emerald-700/50 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border border-emerald-600/30 flex items-center justify-center">
              {/* Center Kaaba Cube Symbol */}
              <div className="w-12 h-12 rounded-lg bg-black border-2 border-amber-400 flex flex-col items-center justify-center text-[10px] text-amber-300 font-bold shadow-lg">
                <span className="text-[11px]">🕋</span>
                <span>Kaaba</span>
              </div>
            </div>
          </div>

          {/* The Needle pointing toward Kaaba */}
          <div 
            style={{ transform: `rotate(${needleAngle}deg)` }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-200"
          >
            <div className="h-64 w-1 flex flex-col justify-between items-center">
              {/* North / Kaaba pointer arrow */}
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[26px] border-b-amber-400 filter drop-shadow(0 0 6px rgba(245, 158, 11, 0.8))" />
              {/* South pointer */}
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[18px] border-t-slate-600" />
            </div>
          </div>

          {/* Center Pivot */}
          <div className="absolute w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-900 shadow" />
        </div>

        {/* Alignment Status Banner */}
        <div className="mt-4 text-center">
          {isAligned ? (
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-950 text-amber-300 border border-emerald-500 font-bold text-xs shadow-lg animate-pulse">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>You are facing the Holy Kaaba!</span>
            </div>
          ) : (
            <p className="text-xs text-slate-400">
              Rotate your phone until the golden arrow points directly toward the top mark.
            </p>
          )}
        </div>
      </div>

      {/* Manual Compass Calibrator (if device has no physical orientation sensor or testing in browser) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-300">
          <span className="font-semibold">Heading Angle Adjustment:</span>
          <span className="font-mono text-amber-400 font-bold">{effectiveHeading}°</span>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          value={effectiveHeading}
          onChange={(e) => setManualHeading(parseInt(e.target.value, 10))}
          className="w-full accent-amber-500"
        />
        <p className="text-[11px] text-slate-500">
          {hasCompassSensor 
            ? "Sensor active: Compass heading auto-updates via phone magnetometer." 
            : "Drag the slider to calibrate heading if gyro sensor is not available in browser."}
        </p>
      </div>
    </div>
  );
};
