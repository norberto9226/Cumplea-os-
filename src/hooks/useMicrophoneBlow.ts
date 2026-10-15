import { useState, useEffect, useRef, useCallback } from 'react';

interface UseMicrophoneBlowProps {
  onBlowDetected: () => void;
  threshold?: number; // default sensitivity
  enabled?: boolean;
}

export function useMicrophoneBlow({
  onBlowDetected,
  threshold = 38,
  enabled = false,
}: UseMicrophoneBlowProps) {
  const [isListening, setIsListening] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastBlowTimeRef = useRef<number>(0);

  const stopListening = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
      microphoneRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsListening(false);
    setVolumeLevel(0);
  }, []);

  const startListening = useCallback(async () => {
    setPermissionError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setPermissionError('El micrófono no es compatible con este navegador.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      streamRef.current = stream;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioCtx();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.3;
      analyserRef.current = analyser;

      const microphone = audioContext.createMediaStreamSource(stream);
      microphoneRef.current = microphone;
      microphone.connect(analyser);

      setIsListening(true);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkAudio = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average volume focused especially on low/mid frequencies of blowing air
        let sum = 0;
        const checkRange = Math.min(bufferLength, 32);
        for (let i = 0; i < checkRange; i++) {
          sum += dataArray[i];
        }
        const average = sum / checkRange;
        setVolumeLevel(Math.round(average));

        const now = Date.now();
        if (average > threshold && now - lastBlowTimeRef.current > 600) {
          lastBlowTimeRef.current = now;
          onBlowDetected();
        }

        animationFrameRef.current = requestAnimationFrame(checkAudio);
      };

      checkAudio();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Error al acceder al micrófono';
      console.warn('Microphone error:', errorMsg);
      setPermissionError('Permiso de micrófono denegado o no disponible.');
      stopListening();
    }
  }, [onBlowDetected, stopListening, threshold]);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    isListening,
    volumeLevel,
    permissionError,
    startListening,
    stopListening,
  };
}
