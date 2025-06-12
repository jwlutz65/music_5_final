import React from 'react';
import { useResearchData } from '../lib/useResearchData';
import { InfluenceGraph } from '../components/InfluenceGraph';
import { Timeline } from '../components/Timeline';
import { RecordPlayer } from '../components/RecordPlayer';
import { GameStatsChart } from '../components/GameStatsChart';
import { ReflectionPanel } from '../components/ReflectionPanel';

/**
 * Main page component for the Paranoid Visualizer
 * Fetches research data and renders all visualization components with enhanced interactivity
 */
export default function Home() {
  const { data, loading, error } = useResearchData();

  if (loading) {
    return (
      <div className="min-h-screen bg-paranoid-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-paranoid-orange text-xl font-mono mb-4">
            Loading Paranoid research data...
          </div>
          <div className="w-16 h-16 border-4 border-paranoid-orange border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-paranoid-black flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-xl font-mono mb-4">
            Error Loading Data
          </div>
          <div className="text-paranoid-white text-sm">
            {error}
          </div>
          <div className="mt-4 text-paranoid-white text-xs">
            Please ensure Firebase is configured and the research data document exists at researchData/main
          </div>
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
        <h1 className="text-5xl font-bold text-paranoid-orange mb-4 font-mono tracking-wider">
          PARANOID VISUALIZER
        </h1>
        <div className="max-w-2xl mx-auto">
          <p className="text-paranoid-white text-lg mb-2">
            Exploring the cultural impact and musical influences of Black Sabbath's "Paranoid"
          </p>
          <p className="text-paranoid-white text-sm opacity-80">
            An interactive analysis of how four Birmingham factory workers' sons created heavy metal
          </p>
        </div>
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

        {/* Audio and Stats Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecordPlayer 
            audioUrl={data.audioUrl} 
            annotations={data.waveRegions} 
          />
          <GameStatsChart stats={data.gameStats} />
        </section>

        {/* Reflection Section */}
        <section>
          <ReflectionPanel />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center border-t border-paranoid-orange pt-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-paranoid-white text-sm font-mono mb-2">
            Built with Next.js, TypeScript, D3.js, WaveSurfer.js, Recharts, and Firebase
          </p>
          <p className="text-paranoid-white text-xs opacity-70">
            "All my life I've been over-protected, never able to experience the unknown..." — Paranoid, 1970
          </p>
        </div>
      </footer>
    </div>
  );
} 