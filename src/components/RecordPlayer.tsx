import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { WaveRegion } from '../lib/types';

interface RecordPlayerProps {
  /** URL to the audio file */
  audioUrl: string;
  /** Array of waveform region annotations */
  annotations: WaveRegion[];
}

/**
 * RecordPlayer component with fallback audio support
 * Features clickable regions, play/pause controls, and detailed region descriptions
 */
export const RecordPlayer: React.FC<RecordPlayerProps> = ({ audioUrl, annotations }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<WaveRegion | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [useWaveSurfer, setUseWaveSurfer] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const initializeAudio = async () => {
      setIsLoading(true);
      setAudioError(null);

      // First try to load with basic HTML5 audio to test file accessibility
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        
        const handleLoadedData = () => {
          console.log('HTML5 audio loaded successfully');
          setDuration(audioRef.current?.duration || 0);
          setIsLoading(false);
        };

        const handleError = (e: Event) => {
          console.error('HTML5 audio error:', e);
          setAudioError('Audio file could not be loaded. Please check the file path.');
          setIsLoading(false);
        };

        const handleTimeUpdate = () => {
          setCurrentTime(audioRef.current?.currentTime || 0);
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audioRef.current.addEventListener('loadeddata', handleLoadedData);
        audioRef.current.addEventListener('error', handleError);
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.addEventListener('play', handlePlay);
        audioRef.current.addEventListener('pause', handlePause);

        // Try to load the audio
        try {
          await audioRef.current.load();
        } catch (error) {
          console.error('Failed to load audio:', error);
          setAudioError('Failed to load audio file');
          setIsLoading(false);
        }

        return () => {
          if (audioRef.current) {
            audioRef.current.removeEventListener('loadeddata', handleLoadedData);
            audioRef.current.removeEventListener('error', handleError);
            audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            audioRef.current.removeEventListener('play', handlePlay);
            audioRef.current.removeEventListener('pause', handlePause);
          }
        };
      }
    };

    initializeAudio();
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (audioRef.current && !audioError) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Play failed:', error);
          setAudioError('Failed to play audio');
        });
      }
    }
  };

  const seekToTime = (time: number) => {
    if (audioRef.current && !audioError) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-paranoid-gray-dark border-paranoid-orange">
      <CardHeader>
        <CardTitle className="text-paranoid-orange">Paranoid Audio Analysis</CardTitle>
        <p className="text-paranoid-white text-sm">
          {audioError ? 'Audio player unavailable' : 'Click regions below to explore song structure'}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          {/* Vinyl Record Animation */}
          <div className="relative flex-shrink-0">
            <div className={`w-32 h-32 rounded-full bg-gradient-to-r from-paranoid-black to-paranoid-gray-light border-4 border-paranoid-orange relative ${
              isPlaying ? 'animate-spin-record' : ''
            }`}>
              {/* Record grooves */}
              <div className="absolute inset-2 rounded-full border border-paranoid-orange opacity-30"></div>
              <div className="absolute inset-4 rounded-full border border-paranoid-orange opacity-20"></div>
              <div className="absolute inset-6 rounded-full border border-paranoid-orange opacity-10"></div>
              
              {/* Center label */}
              <div className="absolute inset-1/2 w-8 h-8 -ml-4 -mt-4 rounded-full bg-paranoid-orange flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-paranoid-black"></div>
              </div>
            </div>
            
            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              disabled={isLoading || !!audioError}
              className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-paranoid-orange hover:bg-paranoid-orange-light text-paranoid-black flex items-center justify-center font-bold disabled:opacity-50 transition-colors"
            >
              {isLoading ? '...' : audioError ? '!' : isPlaying ? '⏸' : '▶'}
            </button>
          </div>
          
          {/* Audio Controls or Error Display */}
          <div className="flex-1">
            {audioError ? (
              <div className="border border-red-500 rounded p-4 bg-red-900 bg-opacity-20">
                <h4 className="text-red-400 font-semibold mb-2">Audio Unavailable</h4>
                <p className="text-paranoid-white text-sm mb-2">{audioError}</p>
                <p className="text-paranoid-white text-xs opacity-70">
                  Audio file path: <code>{audioUrl}</code>
                </p>
                <p className="text-paranoid-white text-xs opacity-70 mt-1">
                  Expected location: <code>public/audio/paranoid.mp3</code>
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-paranoid-white text-sm font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <div className="w-full bg-paranoid-black rounded-full h-2 border border-paranoid-orange">
                    <div 
                      className="bg-paranoid-orange h-2 rounded-full transition-all duration-100"
                      style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>

                {/* Hidden HTML5 Audio Element */}
                <audio
                  ref={audioRef}
                  preload="metadata"
                  className="hidden"
                />
              </div>
            )}
            
            {/* Selected region details */}
            {selectedRegion && !audioError && (
              <div className="mt-4 p-4 bg-paranoid-black border border-paranoid-orange rounded">
                <h4 className="text-paranoid-orange font-semibold mb-2 text-lg">
                  {selectedRegion.label}
                </h4>
                <p className="text-paranoid-white text-sm mb-3 font-mono">
                  {selectedRegion.start.toFixed(1)}s - {selectedRegion.end.toFixed(1)}s
                </p>
                {selectedRegion.description && (
                  <div className="text-paranoid-white text-sm leading-relaxed">
                    <p className="mb-2 text-paranoid-orange-light font-semibold">Technical Analysis:</p>
                    <p className="pl-2 border-l-2 border-paranoid-orange-light">
                      {selectedRegion.description}
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Region overview */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {annotations.map((annotation, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedRegion(annotation);
                    if (!audioError) {
                      seekToTime(annotation.start);
                    }
                  }}
                  disabled={!!audioError}
                  className={`text-xs p-3 border border-paranoid-orange rounded transition-colors disabled:opacity-50 text-left ${
                    selectedRegion?.label === annotation.label 
                      ? 'bg-paranoid-orange text-paranoid-black' 
                      : 'bg-paranoid-black hover:bg-paranoid-gray-light'
                  }`}
                >
                  <div className="font-semibold mb-1">
                    {annotation.label}
                  </div>
                  <div className="text-xs opacity-70 font-mono">
                    {annotation.start.toFixed(1)}s - {annotation.end.toFixed(1)}s
                  </div>
                  <div 
                    className="w-full h-1 mt-2 rounded"
                    style={{ backgroundColor: annotation.color }}
                  ></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 