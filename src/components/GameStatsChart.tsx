import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { GameStat } from '../lib/types';

interface GameStatsChartProps {
  /** Array of game statistics */
  stats: GameStat[];
}

/**
 * GameStatsChart component renders quarterly line charts showing Paranoid's reach across gaming and streaming
 * Shows concurrent players vs new plays per quarter
 */
export const GameStatsChart: React.FC<GameStatsChartProps> = ({ stats }) => {
  // Process quarterly data for line chart
  const processedData = React.useMemo(() => {
    const quarterMap = new Map();
    
    // Collect quarterly data
    stats.forEach(stat => {
      const key = `${stat.year}-${stat.quarter}`;
      if (!quarterMap.has(key)) {
        quarterMap.set(key, { 
          period: key,
          year: stat.year,
          quarter: stat.quarter,
          gaming: 0, 
          spotify: 0 
        });
      }
      
      const entry = quarterMap.get(key);
      if (stat.game === 'Spotify') {
        entry.spotify = stat.playCount;
      } else {
        entry.gaming = stat.playCount;
      }
    });
    
    return Array.from(quarterMap.values()).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      const quarterOrder: { [key: string]: number } = { 'Q1': 1, 'Q2': 2, 'Q3': 3, 'Q4': 4 };
      return quarterOrder[a.quarter] - quarterOrder[b.quarter];
    });
  }, [stats]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-paranoid-black border border-paranoid-orange p-3 rounded shadow-lg">
          <p className="text-paranoid-orange font-semibold">{`Period: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === 'gaming' && (
                `Avg Concurrent: ${entry.value.toLocaleString()} players`
              )}
              {entry.dataKey === 'spotify' && (
                `New Plays: ${(entry.value / 1000000).toFixed(1)}M streams`
              )}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-paranoid-gray-dark border-paranoid-blue">
      <CardHeader>
        <CardTitle className="text-paranoid-blue">
          Paranoid in Digital Culture
        </CardTitle>
        <p className="text-paranoid-white text-sm">
          Quarterly trends: Gaming engagement vs. New streaming activity
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis 
                dataKey="period" 
                stroke="#ffffff"
                fontSize={12}
                fontFamily="monospace"
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                yAxisId="left"
                stroke="#ec4899"
                fontSize={12}
                fontFamily="monospace"
                tickFormatter={(value) => value.toLocaleString()}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="#8b5cf6"
                fontSize={12}
                fontFamily="monospace"
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              <Line 
                yAxisId="left"
                type="monotone"
                dataKey="gaming" 
                stroke="#ec4899"
                strokeWidth={3}
                dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ec4899', strokeWidth: 2 }}
                name="Concurrent Players (Helldivers 2)"
              />
              
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="spotify"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
                strokeDasharray="5 5"
                name="New Plays per Quarter (Spotify)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Data insights */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-paranoid-black border border-paranoid-pink rounded">
            <h4 className="text-paranoid-pink font-semibold mb-2 flex items-center">
              <div className="w-3 h-3 bg-paranoid-pink rounded mr-2"></div>
              Gaming Emergence (Solid Line)
            </h4>
            <p className="text-paranoid-white text-sm leading-relaxed">
              Helldivers 2 launched in Q1 2024 with 12.5K concurrent players, peaking at 22.8K 
              in Q3, projected to reach 25.1K by Q1 2025. Zero baseline shows gaming's cultural emergence.
            </p>
          </div>
          
          <div className="p-3 bg-paranoid-black border border-paranoid-purple rounded">
            <h4 className="text-paranoid-purple font-semibold mb-2 flex items-center">
              <div className="w-3 h-3 bg-paranoid-purple rounded mr-2"></div>
              Streaming Amplification (Dashed Line)
            </h4>
            <p className="text-paranoid-white text-sm leading-relaxed">
              Paranoid's baseline 2.9M-4.1M quarterly plays doubled to 8.2M with Helldivers 2 launch, 
              maintaining 6.8M-9.1M range—demonstrating gaming's 2x amplification effect on music discovery.
            </p>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-paranoid-white opacity-60 text-center">
          * 2023 baseline vs. Helldivers 2 impact (2024-2025). Gaming amplifies music discovery by ~2x.
        </div>
      </CardContent>
    </Card>
  );
}; 