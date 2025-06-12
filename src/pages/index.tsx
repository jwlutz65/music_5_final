import React from 'react';
import { useResearchData } from '../lib/useResearchData';
import { InfluenceGraph } from '../components/InfluenceGraph';
import { Timeline } from '../components/Timeline';
import { RecordPlayer } from '../components/RecordPlayer';
import { GameStatsChart } from '../components/GameStatsChart';

/**
 * Main page component for the Paranoid Visualizer
 * Fetches research data and renders all visualization components
 */
export default function Home() {
  const { data, loading, error } = useResearchData();

  if (loading) {
    return (
      <div className="min-h-screen bg-paranoid-black flex items-center justify-center">
        <div className="text-paranoid-orange text-xl font-mono">
          Loading Paranoid research data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-paranoid-black flex items-center justify-center">
        <div className="text-red-500 text-xl font-mono">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-paranoid-black flex items-center justify-center">
        <div className="text-paranoid-white text-xl font-mono">
          No research data available
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paranoid-black p-6">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-paranoid-orange mb-2 font-mono">
          PARANOID VISUALIZER
        </h1>
        <p className="text-paranoid-white text-lg">
          Exploring the cultural impact and musical influences of Black Sabbath's "Paranoid"
        </p>
      </header>

      {/* Main Content Grid */}
      <main className="space-y-8">
        {/* Top Section: Influence Graph */}
        <section>
          <InfluenceGraph 
            nodes={data.nodes} 
            links={data.links} 
          />
        </section>

        {/* Middle Section: Timeline */}
        <section>
          <Timeline events={data.timelineEvents} />
        </section>

        {/* Bottom Section: Audio and Stats Side by Side */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecordPlayer 
            audioUrl={data.audioUrl} 
            annotations={data.waveRegions} 
          />
          <GameStatsChart stats={data.gameStats} />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="text-paranoid-white text-sm font-mono">
          Built with Next.js, D3.js, WaveSurfer.js, and Firebase
        </p>
      </footer>
    </div>
  );
} 