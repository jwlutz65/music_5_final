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
 * Features clickable regions, play/pause controls, and detailed region descriptions
 */
export const RecordPlayer: React.FC<RecordPlayerProps> = ({ audioUrl, annotations }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const regionsRef = useRef<RegionsPlugin | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<WaveRegion | null>(null);

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
        const region = regions.addRegion({
          start: annotation.start,
          end: annotation.end,
          color: annotation.color + '40', // Add transparency
          content: annotation.label,
        });

        // Add click listener to regions
        region.on('click', () => {
          setSelectedRegion(annotation);
          wavesurfer.seekTo(annotation.start / wavesurfer.getDuration());
        });
      });
    });

    wavesurfer.on('play', () => setIsPlaying(true));
    wavesurfer.on('pause', () => setIsPlaying(false));

    // Listen for timeline events to seek audio
    const handleTimelineEvent = (event: CustomEvent) => {
      const timelineEvent = event.detail.event;
      // Map timeline events to approximate audio regions
      if (timelineEvent.title.includes('Single Released')) {
        wavesurfer.seekTo(0); // Go to beginning for release events
      } else if (timelineEvent.title.includes('Solo')) {
        const soloRegion = annotations.find(r => r.label.includes('Solo'));
        if (soloRegion) {
          wavesurfer.seekTo(soloRegion.start / wavesurfer.getDuration());
        }
      }
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
        <p className="text-paranoid-white text-sm">
          Click regions on the waveform to explore song structure
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
              disabled={isLoading}
              className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-paranoid-orange hover:bg-paranoid-orange-light text-paranoid-black flex items-center justify-center font-bold disabled:opacity-50 transition-colors"
            >
              {isLoading ? '...' : isPlaying ? '⏸' : '▶'}
            </button>
          </div>
          
          {/* Waveform */}
          <div className="flex-1">
            <div ref={waveformRef} className="border border-paranoid-orange rounded"></div>
            
            {/* Selected region details */}
            {selectedRegion && (
              <div className="mt-4 p-4 bg-paranoid-black border border-paranoid-orange rounded">
                <h4 className="text-paranoid-orange font-semibold mb-2">
                  {selectedRegion.label}
                </h4>
                <p className="text-paranoid-white text-sm mb-2">
                  {selectedRegion.start.toFixed(1)}s - {selectedRegion.end.toFixed(1)}s
                </p>
                {selectedRegion.description && (
                  <p className="text-paranoid-white text-sm leading-relaxed">
                    {selectedRegion.description}
                  </p>
                )}
              </div>
            )}
            
            {/* Region overview */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {annotations.map((annotation, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedRegion(annotation);
                    if (wavesurferRef.current) {
                      wavesurferRef.current.seekTo(annotation.start / wavesurferRef.current.getDuration());
                    }
                  }}
                  className={`text-xs p-2 border border-paranoid-orange rounded transition-colors ${
                    selectedRegion?.label === annotation.label 
                      ? 'bg-paranoid-orange text-paranoid-black' 
                      : 'bg-paranoid-black hover:bg-paranoid-gray-light'
                  }`}
                >
                  <div className="font-semibold">
                    {annotation.label}
                  </div>
                  <div className="text-xs opacity-70">
                    {annotation.start.toFixed(1)}s - {annotation.end.toFixed(1)}s
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 