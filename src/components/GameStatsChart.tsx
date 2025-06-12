import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { GameStat } from '../lib/types';

interface GameStatsChartProps {
  /** Array of game statistics */
  stats: GameStat[];
}

/**
 * GameStatsChart component renders a bar chart showing Paranoid play counts in Helldivers
 * Demonstrates the connection between the album and gaming culture
 */
export const GameStatsChart: React.FC<GameStatsChartProps> = ({ stats }) => {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-paranoid-black border border-paranoid-orange p-3 rounded shadow-lg">
          <p className="text-paranoid-orange font-semibold">{`Year: ${label}`}</p>
          <p className="text-paranoid-white">
            {`Plays: ${payload[0].value.toLocaleString()}`}
          </p>
          <p className="text-paranoid-white text-xs">
            Game: {payload[0].payload.game}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-paranoid-gray-dark border-paranoid-orange">
      <CardHeader>
        <CardTitle className="text-paranoid-orange">
          Paranoid in Gaming Culture
        </CardTitle>
        <p className="text-paranoid-white text-sm">
          Track popularity through Helldivers soundtrack usage
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stats}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis 
                dataKey="year" 
                stroke="#ffffff"
                fontSize={12}
                fontFamily="monospace"
              />
              <YAxis 
                stroke="#ffffff"
                fontSize={12}
                fontFamily="monospace"
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="playCount" 
                fill="#ff4500"
                stroke="#cc3700"
                strokeWidth={1}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Additional insights */}
        <div className="mt-4 p-3 bg-paranoid-black border border-paranoid-orange rounded">
          <h4 className="text-paranoid-orange font-semibold mb-2">Gaming Impact Analysis</h4>
          <p className="text-paranoid-white text-sm leading-relaxed">
            The data shows how "Paranoid" has maintained cultural relevance through gaming soundtracks, 
            particularly in tactical games like Helldivers where its intense, driving rhythm enhances 
            the cooperative gameplay experience.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}; 