import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { WaveRegion } from '../lib/types';

interface RecordPlayerProps {
  /** URL to the audio file */
  audioUrl: string;
  /** Array of waveform region annotations */
  annotations: WaveRegion[];
}

/**
 * RecordPlayer component combines WaveSurfer waveform with a stylized vinyl record animation
 * Features clickable regions, play/pause controls, and custom styling
 */
export const RecordPlayer: React.FC<RecordPlayerProps> = ({ audioUrl, annotations }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const regionsRef = useRef<RegionsPlugin | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!waveformRef.current) return;

    // Initialize regions plugin
    const regions = RegionsPlugin.create();
    regionsRef.current = regions;

    // Initialize WaveSurfer
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#ff4500',
      progressColor: '#cc3700',
      backgroundColor: '#0a0a0a',
      height: 100,
      normalize: true,
      plugins: [regions],
    });

    wavesurferRef.current = wavesurfer;

    // Load audio
    wavesurfer.load(audioUrl);

    // Event listeners
    wavesurfer.on('ready', () => {
      setIsLoading(false);
      
      // Add regions after waveform is ready
      annotations.forEach((annotation) => {
        regions.addRegion({
          start: annotation.start,
          end: annotation.end,
          color: annotation.color + '40', // Add transparency
          content: annotation.label,
        });
      });
    });

    wavesurfer.on('play', () => setIsPlaying(true));
    wavesurfer.on('pause', () => setIsPlaying(false));

    // Listen for timeline events
    const handleTimelineEvent = (event: CustomEvent) => {
      // Could seek to specific time based on timeline event
      console.log('Timeline event received:', event.detail);
    };

    window.addEventListener('timeline-event-selected', handleTimelineEvent as EventListener);

    return () => {
      window.removeEventListener('timeline-event-selected', handleTimelineEvent as EventListener);
      wavesurfer.destroy();
    };
  }, [audioUrl, annotations]);

  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  return (
    <Card className="bg-paranoid-gray-dark border-paranoid-orange">
      <CardHeader>
        <CardTitle className="text-paranoid-orange">Paranoid Audio Analysis</CardTitle>
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
              disabled={isLoading}
              className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-paranoid-orange hover:bg-paranoid-orange-light text-paranoid-black flex items-center justify-center font-bold disabled:opacity-50 transition-colors"
            >
              {isLoading ? '...' : isPlaying ? '⏸' : '▶'}
            </button>
          </div>
          
          {/* Waveform */}
          <div className="flex-1">
            <div ref={waveformRef} className="border border-paranoid-orange rounded"></div>
            
            {/* Region tooltips info */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {annotations.map((annotation, index) => (
                <div
                  key={index}
                  className="text-xs p-2 bg-paranoid-black border border-paranoid-orange rounded"
                >
                  <div className="text-paranoid-orange font-semibold">
                    {annotation.label}
                  </div>
                  <div className="text-paranoid-white">
                    {annotation.start.toFixed(1)}s - {annotation.end.toFixed(1)}s
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 