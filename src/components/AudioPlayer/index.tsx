import { useState, useRef, useEffect } from 'react';
import { IoPlaySkipBack, IoPlaySkipForward, IoPlay, IoPause } from 'react-icons/io5';
import { VscMute, VscUnmute } from 'react-icons/vsc';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  url: string;
  cover: string;
}

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const songs: Song[] = [
    {
      id: '1',
      title: 'The Last of Us',
      artist: 'Zat',
      duration: '2:30',
      url: '/audio/the-last-of-us.mp3',
      cover: '/audio/covers/the-last-of-us.svg'
    },
    {
      id: '2',
      title: 'Feel Good Inc',
      artist: 'Zat',
      duration: '3:45',
      url: '/audio/feel-good-inc.mp3',
      cover: '/audio/covers/feel-good.jpg'
    },
    {
      id: '3',
      title: 'Just the Two of Us',
      artist: 'Zat',
      duration: '4:15',
      url: '/audio/just-the-two-of-us.mp3',
      cover: '/audio/covers/just-the-two-of-us.jpg'
    },
    {
      id: '4',
      title: 'Song of Storms',
      artist: 'Zat',
      duration: '1:45',
      url: '/audio/song-of-storms.mp3',
      cover: '/audio/covers/song-of-storms.jpg'
    },
    {
      id: '5',
      title: 'Outer Wilds',
      artist: 'Zat',
      duration: '2:15',
      url: '/audio/outer-wilds.mp3',
      cover: '/audio/covers/outer-wilds.jpg'
    }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentSongIndex]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleEnded = () => {
    handleNext();
  };

  return (
    <div className="h-[70px] bg-[#282828] border-t border-[#3c3c3c] flex items-center px-2 sm:px-4">
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        autoPlay
      />

      {/* Informations de la chanson */}
      <div className="flex items-center gap-2 sm:gap-4 w-[30%] sm:w-[25%]">
        <img 
          src={songs[currentSongIndex].cover} 
          alt={songs[currentSongIndex].title}
          className="w-12 h-12 rounded object-cover"
        />
        <div className="flex flex-col min-w-0">
          <div className="text-white text-xs sm:text-sm font-medium truncate">
            {songs[currentSongIndex].title}
          </div>
          <div className="text-white/60 text-xs truncate">
            {songs[currentSongIndex].artist}
          </div>
        </div>
      </div>

      {/* Contrôles de lecture */}
      <div className="flex-1 flex flex-col items-center gap-1 sm:gap-2">
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={handlePrevious}
            className="text-white/60 hover:text-white"
          >
            <IoPlaySkipBack className="text-xl sm:text-2xl" />
          </button>
          
          <button 
            onClick={handlePlayPause}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform"
          >
            {isPlaying ? (
              <IoPause className="text-black text-lg sm:text-xl" />
            ) : (
              <IoPlay className="text-black text-lg sm:text-xl ml-1" />
            )}
          </button>
          
          <button 
            onClick={handleNext}
            className="text-white/60 hover:text-white"
          >
            <IoPlaySkipForward className="text-xl sm:text-2xl" />
          </button>
        </div>

        <div className="flex items-center gap-2 w-full max-w-[600px]">
          <span className="text-xs text-white/60 min-w-[35px] sm:min-w-[40px] text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-[#4d4d4d] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:bg-[#1db954]"
          />
          <span className="text-xs text-white/60 min-w-[35px] sm:min-w-[40px]">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Contrôle du volume - caché sur mobile */}
      <div className="hidden sm:flex items-center gap-2 w-[25%] justify-end">
        <button 
          onClick={toggleMute}
          className="text-white/60 hover:text-white"
        >
          {isMuted ? (
            <VscMute className="text-lg" />
          ) : (
            <VscUnmute className="text-lg" />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-[#4d4d4d] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:bg-[#1db954]"
        />
      </div>
    </div>
  );
};

export default AudioPlayer; 