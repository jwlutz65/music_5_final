import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecordPlayer } from '../RecordPlayer';
import { WaveRegion } from '../../lib/types';

// Mock WaveSurfer
jest.mock('wavesurfer.js', () => ({
  create: jest.fn(() => ({
    load: jest.fn(),
    on: jest.fn(),
    playPause: jest.fn(),
    destroy: jest.fn(),
  })),
}));

jest.mock('wavesurfer.js/dist/plugins/regions.js', () => ({
  create: jest.fn(() => ({
    addRegion: jest.fn(),
  })),
}));

const mockAnnotations: WaveRegion[] = [
  {
    start: 0,
    end: 30,
    label: 'Intro',
    color: '#ff4500',
  },
  {
    start: 30,
    end: 120,
    label: 'Main Riff',
    color: '#cc3700',
  },
];

describe('RecordPlayer', () => {
  const mockAudioUrl = 'https://example.com/paranoid.mp3';

  it('renders the component with title', () => {
    render(<RecordPlayer audioUrl={mockAudioUrl} annotations={mockAnnotations} />);
    
    expect(screen.getByText('Paranoid Audio Analysis')).toBeInTheDocument();
  });

  it('renders vinyl record animation elements', () => {
    render(<RecordPlayer audioUrl={mockAudioUrl} annotations={mockAnnotations} />);
    
    // Check for play button
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays annotation information', () => {
    render(<RecordPlayer audioUrl={mockAudioUrl} annotations={mockAnnotations} />);
    
    expect(screen.getByText('Intro')).toBeInTheDocument();
    expect(screen.getByText('Main Riff')).toBeInTheDocument();
    expect(screen.getByText('0.0s - 30.0s')).toBeInTheDocument();
    expect(screen.getByText('30.0s - 120.0s')).toBeInTheDocument();
  });

  it('handles empty annotations', () => {
    render(<RecordPlayer audioUrl={mockAudioUrl} annotations={[]} />);
    
    expect(screen.getByText('Paranoid Audio Analysis')).toBeInTheDocument();
  });
}); 