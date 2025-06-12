/**
 * Interface for research data fetched from Firestore
 */
export interface ResearchData {
  /** URL to the audio file */
  audioUrl: string;
  /** Array of nodes for the influence graph */
  nodes: GraphNode[];
  /** Array of links between nodes */
  links: GraphLink[];
  /** Regions on the waveform with annotations */
  waveRegions: WaveRegion[];
  /** Timeline events for historical context */
  timelineEvents: TimelineEvent[];
  /** Game statistics data for Helldivers */
  gameStats: GameStat[];
}

/**
 * Interface for graph nodes in the influence visualization
 */
export interface GraphNode {
  /** Unique identifier for the node */
  id: string;
  /** Display label for the node */
  label: string;
  /** Group/category for styling and clustering */
  group: number;
  /** Detailed information about the node for side panel display */
  details?: string;
}

/**
 * Interface for links between graph nodes
 */
export interface GraphLink {
  /** Source node ID */
  source: string;
  /** Target node ID */
  target: string;
  /** Strength/weight of the connection */
  strength: number;
}

/**
 * Interface for waveform regions with annotations
 */
export interface WaveRegion {
  /** Start time in seconds */
  start: number;
  /** End time in seconds */
  end: number;
  /** Annotation label */
  label: string;
  /** Color for the region */
  color: string;
  /** Optional detailed description of the region */
  description?: string;
}

/**
 * Interface for timeline events
 */
export interface TimelineEvent {
  /** Time/date string */
  time: string;
  /** Event title */
  title: string;
  /** Event description */
  description: string;
}

/**
 * Interface for game statistics
 */
export interface GameStat {
  /** Year of the statistic */
  year: number;
  /** Quarter of the year (optional for quarterly data) */
  quarter?: string;
  /** Game name */
  game: string;
  /** Play count for that year/quarter */
  playCount: number;
} 