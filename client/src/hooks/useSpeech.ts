import { useRef, useEffect } from "react";
import { SPEECH_LANGUAGE } from "../constant/app.constants";

export function useSpeech(onSentence:(s:string) =>void){
  const recognitionRef = useRef<any>(null);
  const onSentenceRef = useRef(onSentence);
  const isRecordingRef = useRef(false);
  const interimTranscriptRef = useRef('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    onSentenceRef.current = onSentence;
  }, [onSentence]);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const rec = new SpeechRecognition();
    
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = SPEECH_LANGUAGE;

    rec.onstart = () => {
      console.log('Speech recognition started');
    };

    rec.onresult = (e:any) => {
      if (!e || !e.results || e.results.length === 0) {
        console.warn('Speech recognition result is empty');
        return;
      }

      console.log('Speech recognition result:', e);
      let finalTranscript = '';
      let currentInterim = '';

      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (!e.results[i] || !e.results[i][0]) {
          continue;
        }
        
        const transcript = e.results[i][0].transcript;
        const isFinal = e.results[i].isFinal;
        console.log(`Result ${i}: "${transcript}" (final: ${isFinal})`);
        
        if (isFinal) {
          finalTranscript += transcript + ' ';
          interimTranscriptRef.current = '';
        } else {
          currentInterim += transcript + ' ';
        }
      }

      if (finalTranscript.trim()) {
        console.log('Sending final transcript:', finalTranscript.trim());
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        interimTranscriptRef.current = '';
        onSentenceRef.current(finalTranscript.trim());
      } else if (currentInterim.trim()) {
        interimTranscriptRef.current = currentInterim.trim();
        console.log('Interim result (accumulating):', interimTranscriptRef.current);
        
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          if (interimTranscriptRef.current.trim() && isRecordingRef.current) {
            console.log('Sending interim transcript after timeout:', interimTranscriptRef.current);
            onSentenceRef.current(interimTranscriptRef.current.trim());
            interimTranscriptRef.current = '';
          }
        }, 2000);
      }
    };

    rec.onerror = (e:any) => {
      console.error('Speech recognition error:', e.error);
      if (e.error === 'no-speech' || e.error === 'audio-capture') {
        if (isRecordingRef.current) {
          setTimeout(() => {
            try {
              rec.start();
            } catch (err) {
              console.error('Error restarting speech recognition:', err);
            }
          }, 100);
        }
      }
    };

    rec.onend = () => {
      console.log('Speech recognition ended');
      if (isRecordingRef.current) {
        try {
          rec.start();
        } catch (e) {
          console.error('Error restarting speech recognition:', e);
        }
      }
    };

    recognitionRef.current = rec;

    return () => {
      isRecordingRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors when stopping
        }
      }
    };
  }, []);

  return {
    start: () => {
      console.log('Attempting to start speech recognition...');
      if (!recognitionRef.current) {
        console.error('Speech recognition not initialized');
        return;
      }
      
      isRecordingRef.current = true;
      try {
        recognitionRef.current.start();
        console.log('Speech recognition start() called successfully');
      } catch (e: any) {
        console.error('Error starting speech recognition:', e);
        if (e.name === 'InvalidStateError') {
          console.log('Recognition already started, attempting to restart...');
          try {
            recognitionRef.current.stop();
            setTimeout(() => {
              recognitionRef.current?.start();
            }, 100);
          } catch (err) {
            console.error('Error restarting:', err);
          }
        }
      }
    },
    stop: () => {
      console.log('Stopping speech recognition...');
      if (recognitionRef.current) {
        isRecordingRef.current = false;
        try {
          recognitionRef.current.stop();
          console.log('Speech recognition stopped');
        } catch (e) {
          console.error('Error stopping speech recognition:', e);
        }
      }
    }
  };
}