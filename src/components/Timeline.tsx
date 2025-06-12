import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TimelineEvent } from '../lib/types';

interface TimelineProps {
  /** Array of timeline events */
  events: TimelineEvent[];
}

/**
 * Timeline component renders an interactive horizontal timeline
 * Clicking events can inform other components about selected time periods
 */
export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
    // Could emit event to parent or global state to sync with other components
    window.dispatchEvent(new CustomEvent('timeline-event-selected', { 
      detail: { event } 
    }));
  };

  return (
    <Card className="bg-paranoid-gray-dark border-paranoid-purple">
      <CardHeader>
        <CardTitle className="text-paranoid-purple text-2xl">
          Paranoid Historical Timeline
        </CardTitle>
        <p className="text-paranoid-white text-base">
          Click events to explore the song's cultural journey from 1966 to 2024
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="relative">
          {/* Horizontal timeline line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-paranoid-blue via-paranoid-purple to-paranoid-pink"></div>
          
          {/* Timeline events arranged horizontally */}
          <div className="flex justify-between items-start relative">
            {events.map((event, index) => (
              <div key={index} className="flex flex-col items-center relative" style={{ width: `${100 / events.length}%` }}>
                {/* Event dot */}
                <div 
                  className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-200 mb-4 ${
                    selectedEvent?.time === event.time
                      ? 'bg-paranoid-blue border-paranoid-blue scale-110'
                      : 'bg-paranoid-black border-paranoid-purple hover:border-paranoid-blue hover:scale-105'
                  }`}
                  onClick={() => handleEventClick(event)}
                >
                  <div className={`w-3 h-3 rounded-full ${
                    selectedEvent?.time === event.time ? 'bg-paranoid-white' : 'bg-paranoid-purple'
                  }`}></div>
                </div>
                
                {/* Event content */}
                <div className="text-center max-w-xs">
                  <button
                    onClick={() => handleEventClick(event)}
                    className="text-center group"
                  >
                    <time className="text-paranoid-blue text-base font-mono font-semibold block mb-2">
                      {event.time}
                    </time>
                    <h3 className="text-paranoid-white font-semibold group-hover:text-paranoid-purple transition-colors text-base leading-tight">
                      {event.title}
                    </h3>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Selected event details - shown below the timeline */}
          {selectedEvent && (
            <div className="mt-12 p-6 bg-paranoid-black border border-paranoid-purple rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <time className="text-paranoid-blue text-lg font-mono font-semibold">
                  {selectedEvent.time}
                </time>
                <h3 className="text-paranoid-white font-semibold text-xl">
                  {selectedEvent.title}
                </h3>
              </div>
              <p className="text-paranoid-white text-base leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>
          )}
        </div>
        
        {selectedEvent && (
          <div className="mt-6 text-center">
            <p className="text-paranoid-white text-sm opacity-70">
              Click other events to explore different moments in Paranoid's history
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 