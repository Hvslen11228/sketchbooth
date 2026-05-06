"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCamera } from "@/hooks/useCamera";
import { useCountdown } from "@/hooks/useCountdown";
import Countdown from "./Countdown";
import Filters from "./Filters";
import { FilterName, getFilterById } from "@/utils/applyFilter";

const TOTAL_PHOTOS = 4;

interface CameraProps {
  lang: "mn" | "en";
  onComplete: (photos: string[], filter: string) => void;
}

export default function Camera({ lang, onComplete }: CameraProps) {
  const { videoRef, state, error, startCamera, stopCamera, captureFrame } = useCamera();
  const { count, startCountdown } = useCountdown();
  const [filter, setFilter] = useState<FilterName>("none");
  const [photos, setPhotos] = useState<string[]>([]);
  const [shooting, setShooting] = useState(false);
  const [flash, setFlash] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Start camera on mount
  useEffect(() => { startCamera(); }, [startCamera]);

  /** Play a synthetic shutter click via Web Audio API */
  const playShutter = useCallback(() => {
    try {
      const ctx = audioCtxRef.current ?? new AudioContext();
      audioCtxRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch { /* Audio not supported */ }
  }, []);

  /** Capture one photo, flash, play sound */
  const captureOne = useCallback((currentPhotos: string[], idx: number): string[] => {
    const filterCSS = getFilterById(filter).css;
    const dataUrl = captureFrame(filterCSS);
    playShutter();
    setFlash(true);
    setTimeout(() => setFlash(false), 350);
    return [...currentPhotos, dataUrl];
  }, [filter, captureFrame, playShutter]);

  /** Kick off the full 4-photo sequence */
  const startShooting = useCallback(() => {
    if (shooting || state !== "active") return;
    setShooting(true);
    setPhotos([]);
    setPhotoIndex(0);

    let accumulated: string[] = [];
    let idx = 0;

    const shootNext = () => {
      setPhotoIndex(idx);
      startCountdown(3, () => {
        accumulated = captureOne(accumulated, idx);
        setPhotos([...accumulated]);
        idx += 1;
        if (idx < TOTAL_PHOTOS) {
          setTimeout(shootNext, 600); // small pause between shots
        } else {
          // Done — stop camera and hand off
          setTimeout(() => {
            stopCamera();
            setShooting(false);
            onComplete(accumulated, getFilterById(filter).css);
          }, 500);
        }
      });
    };

    shootNext();
  }, [shooting, state, startCountdown, captureOne, stopCamera, onComplete, filter]);

  const t = (mn: string, en: string) => (lang === "mn" ? mn : en);

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-2xl mx-auto">
      {/* ── Video preview ───────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden bg-black rounded-xl"
        style={{ height: "min(70vw, 420px)", minHeight: 280 }}
      >
        {/* Live video — mirrored for natural selfie */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          style={{
            transform: "scaleX(-1)",
            filter: getFilterById(filter).css === "none" ? undefined : getFilterById(filter).css,
          }}
        />

        {/* Loading / error states */}
        {state === "requesting" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white text-base">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-8 h-8 border-2 border-white border-t-transparent rounded-full mr-3"
            />
            Камер нээж байна...
          </div>
        )}
        {state === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-center p-6 gap-4">
            <span className="text-4xl">😢</span>
            <p className="text-red-400 text-sm">{error}</p>
            <motion.button whileTap={{ scale: 0.95 }} onClick={startCamera}
              className="px-5 py-2.5 bg-white text-black rounded-xl text-sm font-medium"
            >
              Дахин оролдох
            </motion.button>
          </div>
        )}

        {/* Countdown overlay */}
        <Countdown count={count} photoIndex={photoIndex} total={TOTAL_PHOTOS} lang={lang} />

        {/* Shutter flash */}
        <AnimatePresence>
          {flash && (
            <motion.div
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 bg-white pointer-events-none z-40"
            />
          )}
        </AnimatePresence>

        {/* Progress bar while shooting */}
        {shooting && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <motion.div
              className="h-full bg-white"
              animate={{ width: `${(photos.length / TOTAL_PHOTOS) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        )}

        {/* Photo count badges */}
        {shooting && (
          <div className="absolute top-3 right-3 flex gap-1.5">
            {Array.from({ length: TOTAL_PHOTOS }).map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i < photos.length ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Captured thumbnails ─────────────────────────────── */}
      {photos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 w-full justify-center"
        >
          {photos.map((p, i) => (
            <motion.img
              key={i}
              src={p}
              alt={`photo ${i + 1}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05, type: "spring" }}
              className="w-16 h-12 object-cover rounded-lg border border-gray-200"
              style={{ transform: "scaleX(-1)" }}
            />
          ))}
        </motion.div>
      )}

      {/* ── Filters ─────────────────────────────────────────── */}
      {!shooting && state === "active" && (
        <Filters selected={filter} onChange={setFilter} lang={lang} />
      )}

      {/* ── Start button ────────────────────────────────────── */}
      {!shooting && state === "active" && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          onClick={startShooting}
          className="w-full py-4 rounded-xl font-semibold text-white text-base"
          style={{ background: "#1a1a1a", fontSize: 14, letterSpacing: "0.06em" }}
        >
          📸 Зураг авах
        </motion.button>
      )}

      {!shooting && state === "active" && (
        <p style={{ fontSize: 11, color: "#bbb", textAlign: "center", letterSpacing: "0.04em" }}>
          {TOTAL_PHOTOS} зураг автоматаар авна
        </p>
      )}
    </div>
  );
}
