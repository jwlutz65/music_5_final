import React from 'react';
import { useResearchData } from '../lib/useResearchData';
import { InfluenceGraph } from '../components/InfluenceGraph';
import { Timeline } from '../components/Timeline';
import { RecordPlayer } from '../components/RecordPlayer';
import { GameStatsChart } from '../components/GameStatsChart';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

/**
 * Main page component for the Paranoid Visualizer
 * Fetches research data and renders all visualization components with personal reflection
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
    <div className="min-h-screen bg-paranoid-black">
      {/* Header */}
      <header className="py-12 px-6 text-center">
        <h1 className="text-6xl font-bold text-paranoid-orange mb-6 font-mono tracking-wider">
          PARANOID VISUALIZER
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-paranoid-white text-xl mb-3">
            Exploring the cultural impact and musical influences of Black Sabbath's "Paranoid"
          </p>
          <p className="text-paranoid-pink text-base opacity-80">
            An interactive analysis of how four Birmingham factory workers' sons created heavy metal
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-16">
        {/* Full-Width Influence Graph Section */}
        <section className="px-6">
          <InfluenceGraph 
            nodes={data.nodes} 
            links={data.links} 
          />
        </section>

        {/* Horizontal Timeline Section */}
        <section className="px-6">
          <Timeline events={data.timelineEvents} />
        </section>

        {/* Audio and Stats Section - Full Width */}
        <section className="px-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 w-full">
            <RecordPlayer 
              audioUrl={data.audioUrl} 
              annotations={data.waveRegions} 
            />
            <GameStatsChart stats={data.gameStats} />
          </div>
        </section>

        {/* Personal Reflection and Works Cited Section */}
        <section className="px-6 pb-16">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 w-full">
              {/* Personal Reflection */}
              <Card className="bg-paranoid-gray-dark border-paranoid-purple">
                <CardHeader>
                  <CardTitle className="text-paranoid-purple text-3xl">
                    Personal Reflection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-paranoid-white leading-relaxed text-xl">
                      Deconstructing Paranoid through the lens of Greil Marcus's thematic, nonlinear approach completely transformed how I understood the song. Rather than tracing the song as a straight line from past to present, I began to see it as a tangled, resonant web of cultural echoes. Black Sabbath's raw, emotional urgency—recorded spontaneously in a single imperfect, energetic take—embodies rock music's authentic spirit, reminding us that the genre thrives not on polished perfection but powerful immediacy.
                    </p>
                    
                    <p className="text-paranoid-white leading-relaxed text-xl">
                      I was surprised by just how timeless the song became. Written against the gritty backdrop of Birmingham's post-war industrial decline, "Paranoid" distilled mental anguish and alienation into something both personal and universal. Geezer Butler's candid, desperate lyrics about anxiety and depression resonated not only with a generation exhausted by the Vietnam War but continued to reverberate decades later, finding new relevance in thrash-metal adaptations and even today's video games like Helldivers 2. Its simplicity—a repetitive three-chord riff and direct, unvarnished production—allowed the emotional core to transcend shifts in musical fashion and technology.
                    </p>
                    
                    <p className="text-paranoid-white leading-relaxed text-xl">
                      Marcus's lens showed me that "Paranoid" endures precisely because it speaks directly to ongoing inner turmoil rather than relying on virtuosity. It's not a technical masterpiece, yet its roughness and authenticity captured something essential about rock itself—imperfect, immediate, emotionally raw. Rather than becoming outdated, "Paranoid" continually resurfaces, finding new meaning in each cultural moment precisely because it reflects the timelessness of human vulnerability and rebellion.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Works Cited */}
              <Card className="bg-paranoid-gray-dark border-paranoid-orange">
                <CardHeader>
                  <CardTitle className="text-paranoid-orange text-3xl">
                    Works Cited
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-paranoid-white leading-relaxed">
                      Cope, Andrew L. <em className="text-paranoid-pink">Black Sabbath and the Rise of Heavy Metal Music</em>. Routledge, 2010.
                    </div>
                    
                    <div className="text-paranoid-white leading-relaxed">
                      "Geezer Butler Talks About Dealing with Depression." <em className="text-paranoid-pink">95.9 The RAT</em>, 24 July 2024.
                    </div>
                    
                    <div className="text-paranoid-white leading-relaxed">
                      Harrison, Leigh Michael. "Factory Music: How the Industrial Geography and Working-Class Environment of Post-War Birmingham Fostered the Birth of Heavy Metal." <em className="text-paranoid-pink">Journal of Social History</em>, vol. 44, no. 1, 2010, pp. 145-158.
                    </div>
                    
                    <div className="text-paranoid-white leading-relaxed">
                      Jenkins, Claire. "From Industry to Anthem: The Birth of Earth Day." <em className="text-paranoid-pink">Environmental History</em>, vol. 5, no. 3, 2000, pp. 461–479.
                    </div>
                    
                    <div className="text-paranoid-white leading-relaxed">
                      Miller, James E. "Apollo 13 and U.S.–Soviet Relations." <em className="text-paranoid-pink">Cold War History</em>, vol. 3, no. 1, 2003, pp. 25–46.
                    </div>
                    
                    <div className="text-paranoid-white leading-relaxed">
                      "Paranoid – Black Sabbath." <em className="text-paranoid-pink">Official Charts Company</em>, www.officialcharts.com/songs/black-sabbath-paranoid/.
                    </div>
                    
                    <div className="text-paranoid-white leading-relaxed">
                      Rosen, Steven. "Black Sabbath: Paranoid (1970 [UK], 1971 [U.S.])." <em className="text-paranoid-pink">The Album: A Guide to Pop Music's Most Provocative, Influential, and Important Creations</em>, vol. 2, 2012.
                    </div>
                    
                    <div className="text-paranoid-white leading-relaxed">
                      Smith, Joe. "Kent State in National Memory." <em className="text-paranoid-pink">Journal of American History</em>, vol. 88, no. 2, 2001, pp. 457–475.
                    </div>
                    
                    <div className="text-paranoid-white leading-relaxed">
                      Walser, Robert. <em className="text-paranoid-pink">Running with the Devil: Power, Gender, and Madness in Heavy Metal Music</em>. Wesleyan University Press, 1993.
                    </div>
                    
                    <div className="text-paranoid-white leading-relaxed">
                      Weinstein, Deena. <em className="text-paranoid-pink">Heavy Metal: A Cultural Sociology</em>. Lexington Books, 2000.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-12 text-center border-t border-paranoid-blue">
        <div className="max-w-4xl mx-auto">
          <p className="text-paranoid-white text-base font-mono mb-3">
            Built with Next.js, TypeScript, D3.js, HTML5 Audio, Recharts, and Tailwind CSS
          </p>
          <p className="text-paranoid-blue text-sm opacity-70">
            "All my life I've been over-protected, never able to experience the unknown..." — Paranoid, 1970
          </p>
        </div>
      </footer>
    </div>
  );
} 