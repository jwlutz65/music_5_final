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
    <Card className="bg-paranoid-gray-dark border-paranoid-orange">
      <CardHeader>
        <CardTitle className="text-paranoid-orange">Historical Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-paranoid-orange transform -translate-y-1/2 z-0"></div>
          
          {/* Timeline events */}
          <div className="flex justify-between items-center relative z-10 py-8">
            {events.map((event, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => handleEventClick(event)}
              >
                {/* Event dot */}
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  selectedEvent?.time === event.time
                    ? 'bg-paranoid-orange border-paranoid-orange scale-125'
                    : 'bg-paranoid-black border-paranoid-orange group-hover:bg-paranoid-orange-light'
                }`}></div>
                
                {/* Event time */}
                <div className="mt-2 text-xs text-paranoid-white font-mono">
                  {event.time}
                </div>
                
                {/* Event title */}
                <div className="mt-1 text-sm text-paranoid-orange text-center max-w-20 group-hover:text-paranoid-orange-light">
                  {event.title}
                </div>
              </div>
            ))}
          </div>
          
          {/* Selected event details */}
          {selectedEvent && (
            <div className="mt-6 p-4 bg-paranoid-black rounded border border-paranoid-orange">
              <h3 className="text-paranoid-orange font-semibold mb-2">
                {selectedEvent.title}
              </h3>
              <p className="text-paranoid-white text-sm leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}; 