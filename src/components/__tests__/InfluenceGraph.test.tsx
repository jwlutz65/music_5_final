import React from 'react';
import { render, screen } from '@testing-library/react';
import { InfluenceGraph } from '../InfluenceGraph';
import { GraphNode, GraphLink } from '../../lib/types';

// Mock D3 to avoid DOM manipulation issues in tests
jest.mock('d3', () => ({
  select: jest.fn(() => ({
    selectAll: jest.fn(() => ({
      remove: jest.fn(),
    })),
    call: jest.fn(),
    append: jest.fn(() => ({
      selectAll: jest.fn(() => ({
        data: jest.fn(() => ({
          enter: jest.fn(() => ({
            append: jest.fn(() => ({
              attr: jest.fn(() => ({})),
              style: jest.fn(() => ({})),
              call: jest.fn(() => ({})),
              on: jest.fn(() => ({})),
            })),
          })),
        })),
      })),
    })),
  })),
  forceSimulation: jest.fn(() => ({
    force: jest.fn(() => ({})),
    on: jest.fn(),
    stop: jest.fn(),
  })),
  forceLink: jest.fn(() => ({
    id: jest.fn(() => ({})),
    strength: jest.fn(() => ({})),
  })),
  forceManyBody: jest.fn(() => ({
    strength: jest.fn(() => ({})),
  })),
  forceCenter: jest.fn(),
  zoom: jest.fn(() => ({
    scaleExtent: jest.fn(() => ({
      on: jest.fn(() => ({})),
    })),
    transform: jest.fn(),
  })),
  zoomTransform: jest.fn(),
  drag: jest.fn(() => ({
    on: jest.fn(() => ({})),
  })),
  schemeCategory10: ['#1f77b4', '#ff7f0e', '#2ca02c'],
}));

const mockNodes: GraphNode[] = [
  { id: '1', label: 'Black Sabbath', group: 1 },
  { id: '2', label: 'Heavy Metal', group: 2 },
  { id: '3', label: 'Paranoid', group: 1 },
];

const mockLinks: GraphLink[] = [
  { source: '1', target: '2', strength: 0.8 },
  { source: '1', target: '3', strength: 0.9 },
];

describe('InfluenceGraph', () => {
  it('renders the component with title', () => {
    render(<InfluenceGraph nodes={mockNodes} links={mockLinks} />);
    
    expect(screen.getByText('Influence Network')).toBeInTheDocument();
  });

  it('renders SVG element with correct attributes', () => {
    render(<InfluenceGraph nodes={mockNodes} links={mockLinks} />);
    
    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-label', 'Interactive force-directed graph showing influence networks');
  });

  it('handles empty nodes gracefully', () => {
    render(<InfluenceGraph nodes={[]} links={[]} />);
    
    expect(screen.getByText('Influence Network')).toBeInTheDocument();
  });
}); 