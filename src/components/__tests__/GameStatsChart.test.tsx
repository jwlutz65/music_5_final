import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameStatsChart } from '../GameStatsChart';
import { GameStat } from '../../lib/types';

// Mock recharts
jest.mock('recharts', () => ({
  BarChart: ({ children }: { children: React.ReactNode }) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
}));

const mockStats: GameStat[] = [
  {
    year: 2015,
    game: 'Helldivers',
    playCount: 1200,
  },
  {
    year: 2016,
    game: 'Helldivers',
    playCount: 1800,
  },
  {
    year: 2017,
    game: 'Helldivers',
    playCount: 2400,
  },
];

describe('GameStatsChart', () => {
  it('renders the component with title', () => {
    render(<GameStatsChart stats={mockStats} />);
    
    expect(screen.getByText('Paranoid in Gaming Culture')).toBeInTheDocument();
  });

  it('renders the chart components', () => {
    render(<GameStatsChart stats={mockStats} />);
    
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('bar')).toBeInTheDocument();
  });

  it('displays gaming impact analysis', () => {
    render(<GameStatsChart stats={mockStats} />);
    
    expect(screen.getByText('Gaming Impact Analysis')).toBeInTheDocument();
    expect(screen.getByText(/The data shows how "Paranoid" has maintained cultural relevance/)).toBeInTheDocument();
  });

  it('handles empty stats array', () => {
    render(<GameStatsChart stats={[]} />);
    
    expect(screen.getByText('Paranoid in Gaming Culture')).toBeInTheDocument();
  });
}); 