import { memo, useRef, useState, useEffect } from 'react';
import { Episode } from '../../../@types/interfaces/podcast';
import { formatDate, formatDuration, formatTime } from '../../../utils/common';
import './PodcastPlayer.css';

interface EpisodePlayerProps {
  episode: Episode;
}

export const PodcastPlayer = memo(({ episode }: EpisodePlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className="podcast-player">
      <h2 className="podcast-player__title">{episode.title}</h2>

      <div
        className="podcast-player__description"
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />

      <audio ref={audioRef} src={episode.audioUrl} preload="metadata" />

      <div className="podcast-player__controls">
        <div className="podcast-player__progress">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
          />
          <div className="podcast-player__progress-info">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="podcast-player__buttons">
          <button className="podcast-player__play-button" onClick={handlePlayPause}>
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>
        </div>

        <div className="podcast-player__additional-info">
          <span>Duration: {formatDuration(episode.duration)}</span>
          <span>Released: {formatDate(episode.releaseDate)}</span>
        </div>
      </div>
    </div>
  );
});
