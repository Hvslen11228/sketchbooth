"use client";
import { useRef, useState, useCallback, useEffect } from "react";

export type CameraState = "idle" | "requesting" | "active" | "error" | "stopped";

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [state, setState] = useState<CameraState>("idle");
  const [error, setError] = useState<string>("");

  /** Start webcam stream */
  const startCamera = useCallback(async () => {
    setState("requesting");
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setState("active");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Camera error";
      setError(
        msg.includes("Permission") || msg.includes("NotAllowed")
          ? "Камерын зөвшөөрөл өгнө үү 🙏"
          : msg.includes("NotFound")
          ? "Камер олдсонгүй 😢"
          : "Камер ажиллахгүй байна: " + msg
      );
      setState("error");
    }
  }, []);

  /** Stop and cleanup stream - prevents memory leaks */
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setState("stopped");
  }, []);

  /** Capture single frame from video → data URL with filter applied */
  const captureFrame = useCallback((filter: string): string => {
    const video = videoRef.current;
    if (!video) return "";
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d")!;
    // Mirror horizontally for natural selfie feel
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.filter = filter || "none";
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL("image/jpeg", 0.92);
  }, []);

  // Cleanup on unmount to avoid memory leaks
  useEffect(() => () => { stopCamera(); }, [stopCamera]);

  return { videoRef, state, error, startCamera, stopCamera, captureFrame };
}
