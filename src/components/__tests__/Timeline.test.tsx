import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Timeline } from '../Timeline';
import { TimelineEvent } from '../../lib/types';

const mockEvents: TimelineEvent[] = [
  {
    time: '1970',
    title: 'Paranoid Released',
    description: 'Black Sabbath releases their second album Paranoid',
  },
  {
    time: '1980',
    title: 'Heavy Metal Peak',
    description: 'Heavy metal reaches mainstream popularity',
  },
  {
    time: '1990',
    title: 'Grunge Influence',
    description: 'Grunge movement influenced by early metal',
  },
];

describe('Timeline', () => {
  it('renders the component with title', () => {
    render(<Timeline events={mockEvents} />);
    
    expect(screen.getByText('Historical Timeline')).toBeInTheDocument();
  });

  it('renders all timeline events', () => {
    render(<Timeline events={mockEvents} />);
    
    expect(screen.getByText('Paranoid Released')).toBeInTheDocument();
    expect(screen.getByText('Heavy Metal Peak')).toBeInTheDocument();
    expect(screen.getByText('Grunge Influence')).toBeInTheDocument();
  });

  it('shows event details when clicked', () => {
    render(<Timeline events={mockEvents} />);
    
    const eventElement = screen.getByText('Paranoid Released');
    fireEvent.click(eventElement);
    
    expect(screen.getByText('Black Sabbath releases their second album Paranoid')).toBeInTheDocument();
  });

  it('handles empty events array', () => {
    render(<Timeline events={[]} />);
    
    expect(screen.getByText('Historical Timeline')).toBeInTheDocument();
  });
}); 