import React, { useEffect, useState, useRef } from 'react';

const TRACKS = [
  '/media/track2.mp3', // Armandinho (18 Outra Vida)
  '/media/track1.mp3'  // Legião Urbana (05 Vento No Litoral)
];

export default function AudioPlayer({ isUnlocked }: { isUnlocked: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.60);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Restaurar do localStorage
    const savedVol = localStorage.getItem('siteVolume');
    if (savedVol !== null) {
      setVolume(parseFloat(savedVol));
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isUnlocked) return;

    audio.volume = volume;

    const startAudio = async (ev?: Event) => {
      try {
        await audio.play();
        setIsPlaying(true);
        localStorage.setItem('audioAllowed', 'true');

        window.removeEventListener('pointerdown', startAudio);
        window.removeEventListener('keydown', startAudio);
      } catch (e) {
        console.log("Autoplay bloqueado pelo navegador. Interaja com a página para tocar:", e);
      }
    };

    const allowed = localStorage.getItem('audioAllowed');
    if (allowed === 'true') {
      startAudio();
    }

    // Ouvintes para o primeiro clique/toque ou tecla em qualquer lugar da tela
    window.addEventListener('pointerdown', startAudio, { once: false });
    window.addEventListener('keydown', startAudio, { once: false });

    return () => {
      window.removeEventListener('pointerdown', startAudio);
      window.removeEventListener('keydown', startAudio);
    };
  }, [isUnlocked]);

  // Play a nova música quando a track mudar (playlist)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isUnlocked) return;

    if (isPlaying) {
      audio.play().catch(e => console.error("Falha ao tocar a próxima música:", e));
    }
  }, [currentTrackIndex]);

  const toggleMusic = async (ev: React.MouseEvent) => {
    ev.stopPropagation(); // evita “duplo gatilho” do clique da página
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
        localStorage.setItem('audioAllowed', 'true'); // Salva permissão também aqui
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (e) {
      console.log("Não foi possível tocar:", e);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    localStorage.setItem('siteVolume', val.toString());
  };

  const handleTrackEnded = () => {
    // Avançar para a próxima track
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  return (
    <>
      <audio
        ref={audioRef}
        id="bgm"
        src={TRACKS[currentTrackIndex]}
        preload="auto"
        onEnded={handleTrackEnded}
      />

      {isUnlocked && (
        <div id="mini-audio-ui" style={{
          position: 'fixed',
          right: '12px',
          bottom: '12px',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          padding: '6px 8px',
          borderRadius: '10px',
          background: 'rgba(0,0,0,0.25)',
          backdropFilter: 'blur(6px)',
          font: '12px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial',
          zIndex: 9999
        }}>
          <button
            id="toggle"
            type="button"
            aria-label="Play/Pause"
            onClick={toggleMusic}
            style={{
              width: '34px',
              height: '28px',
              borderRadius: '8px',
              border: 0,
              cursor: 'pointer',
              background: 'rgba(255,255,255,0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: '#000'
            }}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          <input
            id="vol"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
            style={{
              width: '90px',
              accentColor: '#ffffff',
              cursor: 'pointer'
            }}
          />
        </div>
      )}
    </>
  );
}
