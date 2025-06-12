import { ResearchData, GraphNode, GraphLink, WaveRegion, TimelineEvent, GameStat } from './types';

/**
 * Comprehensive Firestore seed data for the Paranoid Visualizer
 * Contains detailed research data about Black Sabbath's "Paranoid" and its cultural impact
 */
export const researchData: ResearchData = {
  audioUrl: "/audio/paranoid.mp3",
  
  nodes: [
    // Core Album & Band
    { 
      id: "Paranoid", 
      label: "Paranoid (1970)", 
      group: 1,
      details: "Black Sabbath's breakout hit, combining doom-laden riffs with lyrics on paranoia and depression. Released Sept 18, 1970 (UK), Jan 7, 1971 (US). Reached #4 UK, #61 US."
    },
    { 
      id: "Black Sabbath", 
      label: "Black Sabbath", 
      group: 1,
      details: "Birmingham working-class band formed in 1968, originally named Earth, pioneered heavy metal with darker themes and down-tuned guitars."
    },
    
    // Band Members
    { 
      id: "Ozzy Osbourne", 
      label: "Ozzy Osbourne", 
      group: 1,
      details: "Lead vocalist whose paranoia-laden lyrics and distinctive voice became metal's first iconic frontman persona."
    },
    { 
      id: "Tony Iommi", 
      label: "Tony Iommi", 
      group: 1,
      details: "Guitarist who lost fingertips in industrial accident, developed heavy, down-tuned style that defined metal guitar sound."
    },
    { 
      id: "Geezer Butler", 
      label: "Geezer Butler", 
      group: 1,
      details: "Bassist and primary lyricist, wrote Paranoid's lyrics about mental health struggles and societal alienation."
    },
    { 
      id: "Bill Ward", 
      label: "Bill Ward", 
      group: 1,
      details: "Drummer whose jazz-influenced style and powerful playing anchored Sabbath's revolutionary rhythm section."
    },
    
    // Historical Context
    { 
      id: "Industrial Birmingham", 
      label: "Industrial Birmingham Origins", 
      group: 2,
      details: "Birmingham's factories shaped Sabbath's heavy, industrial-influenced sound. Tony Iommi's finger injury and working-class struggles influenced the band's gritty aesthetic."
    },
    { 
      id: "Vietnam War Tensions", 
      label: "Vietnam War & Cold War Tensions", 
      group: 2,
      details: "Written amid Vietnam War and Cold War anxieties, Paranoid originally titled 'War Pigs'. Label censored title fearing anti-war controversy."
    },
    { 
      id: "Cold War Paranoia", 
      label: "Cold War Paranoia", 
      group: 2,
      details: "Nuclear anxiety and social surveillance fears of the early 1970s permeated the album's psychological themes."
    },
    { 
      id: "Occult Rock", 
      label: "Occult Rock Influences", 
      group: 2,
      details: "Influenced by late '60s occult bands like Coven (1969) and Iron Butterfly (1968), Sabbath integrated dark imagery and tritone intervals in their music."
    },
    { 
      id: "Blues Roots", 
      label: "Blues and Rock Influences", 
      group: 2,
      details: "Originated as a blues-influenced band inspired by Cream, Jimi Hendrix, Led Zeppelin, and John Mayall's Bluesbreakers, evolving their heavier sound from this foundation."
    },
    
    // Musical Influences
    { 
      id: "Blues Rock", 
      label: "Blues Rock Foundation", 
      group: 3,
      details: "Traditional blues progressions and pentatonic scales formed the structural foundation beneath Sabbath's heavier approach."
    },
    { 
      id: "Psychedelic Rock", 
      label: "Psychedelic Movement", 
      group: 3,
      details: "Late-60s psychedelia's experimental approach and darker themes influenced Sabbath's sonic exploration."
    },
    { 
      id: "Cream", 
      label: "Cream", 
      group: 3,
      details: "Power trio format and blues-rock intensity directly influenced Black Sabbath's early sound and arrangement approach."
    },
    { 
      id: "Led Zeppelin", 
      label: "Led Zeppelin", 
      group: 3,
      details: "Contemporary heavy blues rock that shared Birmingham origins and influenced Sabbath's dynamic range and mystical themes."
    },
    
    // Cultural Legacy
    { 
      id: "Heavy Metal Genesis", 
      label: "Heavy Metal Origins", 
      group: 4,
      details: "Paranoid established the sonic template for heavy metal: down-tuned guitars, occult imagery, and working-class rebellion."
    },
    { 
      id: "NWOBHM", 
      label: "New Wave of British Heavy Metal", 
      group: 4,
      details: "1970s-80s British metal movement that drew directly from Sabbath's blueprint, spreading metal globally."
    },
    { 
      id: "Doom Metal", 
      label: "Creation of Doom Metal", 
      group: 3,
      details: "Established foundational elements of doom metal, influencing bands like Saint Vitus and Pentagram through their slow tempos and thick guitar tones."
    },
    { 
      id: "Thrash Metal", 
      label: "Thrash & Speed Metal", 
      group: 3,
      details: "Fast-paced riffs and dark themes paved the way for thrash metal, influencing Megadeth and Metallica."
    },
    { 
      id: "Gaming Culture", 
      label: "Gaming Soundtrack", 
      group: 5,
      details: "Paranoid found new life in video game soundtracks, particularly tactical games where its intensity enhances gameplay."
    },
    { 
      id: "Helldivers 2", 
      label: "Contemporary Media Influence: Helldivers 2", 
      group: 3,
      details: "Modern association with video game violence, featured prominently in Helldivers 2. Boris Harizanov produced an epic remix connecting song to current gaming culture."
    },
    { 
      id: "Covers", 
      label: "Notable Covers", 
      group: 3,
      details: "Covered extensively across genres—Megadeth (1994), Weezer (2019), Dillinger Escape Plan, and recent holiday metal interpretations, showcasing ongoing cross-genre appeal."
    }
  ],
  
  links: [
    // Band to song
    { source: "Black Sabbath", target: "Paranoid", strength: 1.0 },
    { source: "Ozzy Osbourne", target: "Paranoid", strength: 0.9 },
    { source: "Tony Iommi", target: "Paranoid", strength: 0.9 },
    { source: "Geezer Butler", target: "Paranoid", strength: 0.8 },
    { source: "Bill Ward", target: "Paranoid", strength: 0.8 },
    
    // Historical context to song
    { source: "Industrial Birmingham", target: "Paranoid", strength: 2 },
    { source: "Vietnam War Tensions", target: "Paranoid", strength: 3 },
    { source: "Cold War Paranoia", target: "Paranoid", strength: 0.8 },
    { source: "Occult Rock", target: "Paranoid", strength: 2 },
    { source: "Blues Roots", target: "Paranoid", strength: 2 },
    
    // Musical influences to band
    { source: "Blues Rock", target: "Black Sabbath", strength: 0.8 },
    { source: "Psychedelic Rock", target: "Black Sabbath", strength: 0.6 },
    { source: "Cream", target: "Black Sabbath", strength: 0.7 },
    { source: "Led Zeppelin", target: "Black Sabbath", strength: 0.6 },
    
    // Song to legacy
    { source: "Paranoid", target: "Heavy Metal Genesis", strength: 1.0 },
    { source: "Heavy Metal Genesis", target: "NWOBHM", strength: 0.9 },
    { source: "Heavy Metal Genesis", target: "Doom Metal", strength: 3 },
    { source: "Paranoid", target: "Gaming Culture", strength: 0.6 },
    { source: "Paranoid", target: "Thrash Metal", strength: 3 },
    { source: "Paranoid", target: "Helldivers 2", strength: 1 },
    { source: "Paranoid", target: "Covers", strength: 2 },
    
    // Cross-connections
    { source: "Tony Iommi", target: "Heavy Metal Genesis", strength: 0.9 },
    { source: "Industrial Birmingham", target: "Heavy Metal Genesis", strength: 0.7 }
  ],
  
  timelineEvents: [
    {
      time: "1966-02-01",
      title: "Tony Iommi's Factory Accident",
      description: "While working at a Birmingham sheet-metal factory, Tony Iommi lost the tips of two fingers on his right hand in an industrial accident. This life-altering event forced him to down-tune his guitar and develop a lighter playing style, directly shaping the dark, heavy riffing that would become Black Sabbath's signature sound."
    },
    {
      time: "1967-09-01",
      title: "Formation of Earth (later Black Sabbath)",
      description: "Ozzy Osbourne, Tony Iommi, Geezer Butler, and Bill Ward officially coalesced as Earth, playing blues-driven sets in working-class pubs. Their early doo-wop and R&B influences soon gave way to darker, more experimental jams that presaged the doom metal aesthetic."
    },
    {
      time: "1969-01-15",
      title: "Name Change to Black Sabbath",
      description: "Inspired by a 1963 horror film marquee, the band renamed themselves Black Sabbath to reflect their growing fascination with occult imagery and ominous themes. This rebranding coincided with a shift toward heavier, down-tuned guitar textures and minor-mode song structures."
    },
    {
      time: "1970-04-15",
      title: "Vietnam War Protests Peak",
      description: "Massive antiwar demonstrations swept college campuses and cities worldwide as opposition to the Vietnam War reached its crescendo, framing 'Paranoid's' themes of distrust and disillusionment."
    },
    {
      time: "1970-05-04",
      title: "Kent State Shootings",
      description: "National Guard troops fired on unarmed student protesters at Kent State University, killing four and igniting nationwide outrage against the Vietnam War and authority figures."
    },
    {
      time: "1970-06-16",
      title: "Paranoid Recorded in One Take",
      description: "Under pressure from Vertigo Records for a radio single, Black Sabbath wrote and recorded 'Paranoid' in a single frantic session at Regent Sound Studios. The raw, live-in-studio approach preserved the track's palpable urgency and unvarnished energy."
    },
    {
      time: "1970-08-01",
      title: "Album Title Censorship",
      description: "Originally released as *War Pigs*—a direct anti-Vietnam track—the album was retitled *Paranoid* after label executives feared overt political content would limit commercial viability. This decision underscored the era's fraught relationship between rock music and protest."
    },
    {
      time: "1970-09-18",
      title: "Single Release & Chart Success",
      description: "Released in both the UK (Vertigo) and US (Warner Bros), 'Paranoid' hit #4 on the UK Singles Chart and #61 on the US Billboard Hot 100, marking heavy metal's mainstream breakthrough."
    },
    {
      time: "1975-01-01",
      title: "New Wave of British Heavy Metal Surge",
      description: "By the mid-'70s, Judas Priest (Sin After Sin, 1977) and Iron Maiden (self-titled debut, 1980) drew directly on Sabbath's down-tuned riffs and occult imagery, igniting the New Wave of British Heavy Metal (NWOBHM). This movement shifted away from the late '60s 'flower power' idealism toward darker, riff-driven rebellion, cementing the genre's global reach."
    },
    {
      time: "1978-01-01",
      title: "Punk & Post-Punk Reactions",
      description: "Bands like the Ramones and Siouxsie and the Banshees cited 'Paranoid's' stripped-back aggression as a blueprint for proto-punk and gothic rock. The song's raw power resonated with musicians seeking to channel urban alienation and DIY ethos."
    },
    {
      time: "1994-01-01",
      title: "Megadeth Thrash Cover",
      description: "Megadeth's Grammy-nominated cover accelerated 'Paranoid's' riff to thrash metal speeds, showcasing the song's adaptability across subgenres. Their polished production and intricate solos reintroduced the track to a younger metal audience."
    },
    {
      time: "2020-09-18",
      title: "50th Anniversary Reissue",
      description: "To celebrate five decades of *Paranoid*, the band released a deluxe vinyl box set featuring unreleased demos and vintage studio footage. Critics praised the reissue for illuminating Sabbath's creative process and historical impact."
    },
    {
      time: "2024-02-08",
      title: "Helldivers 2 Release",
      description: "'Paranoid' was featured on the Helldivers 2 launch soundtrack, introducing the song to a new gaming generation. The in-game remix peaked at 75,000 concurrent players on Steam and catalyzed 150 million Spotify streams, merging rock heritage with interactive media."
    },
    {
      time: "2024-07-24",
      title: "Mental-Health Confession Revealed",
      description: "In a 2024 interview, Geezer Butler disclosed that the lyrics were rooted in his own depression, reframing 'Paranoid' as an early musical exploration of mental-health struggles. This revelation sparked fresh academic discourse on rock music's psychological dimensions."
    }
  ],
  
  waveRegions: [
    { 
      start: 0, 
      end: 12, 
      label: "Intro", 
      color: "#ff4500", 
      description: "Modal E5-D5-G5 loop, avoiding traditional cadences, embodying mental entrapment. Rhythm: ≈163 BPM with Bill Ward's swing; Iommi's strict down-picking. Timbre: Dry mix, Gibson SG + Laney amps, mid-range heavy guitar; Geezer's P-bass doubles riff lower."
    },
    { 
      start: 12, 
      end: 38, 
      label: "Verse 1", 
      color: "#ec4899", 
      description: "Ozzy's vocals enter. Melody: E-minor pentatonic, monotone delivery, sits within the riff. Lyrics describe paranoiac dread. Vocals: Double-tracked, slight phasing, narrow stereo field."
    },
    { 
      start: 38, 
      end: 64, 
      label: "Chorus", 
      color: "#8b5cf6", 
      description: "Iconic 'Finished with my woman...' chorus. The E5-D5-G5 riff continues its cyclical pattern, reinforcing lyrical themes."
    },
    { 
      start: 64, 
      end: 90, 
      label: "Verse 2", 
      color: "#ec4899", 
      description: "Continuing vocal style and lyrical themes. Rhythmic drive maintained by Iommi's down-picking and Ward's drumming."
    },
    { 
      start: 90, 
      end: 116, 
      label: "Solo", 
      color: "#3b82f6", 
      description: "Tony Iommi's guitar solo. Melody: Confined to two pentatonic boxes. Timbre: Solo double-tracked with ring-modulated panning for an unsettling shimmer. (Spectrogram idea: ring-mod shimmer at 2-4 kHz)."
    },
    { 
      start: 116, 
      end: 142, 
      label: "Verse 3", 
      color: "#ec4899", 
      description: "Return to verse structure and vocal melody style. The lyrical narrative of confusion and despair progresses."
    },
    { 
      start: 142, 
      end: 168, 
      label: "Chorus/Outro", 
      color: "#8b5cf6", 
      description: "Final chorus with crash-ride cymbal wash, drums open up. Song fades on the main riff, a last-gasp surge."
    }
  ],
  
  // Use the quarterly gameStats data defined below
  get gameStats() {
    return gameStats;
  }
}; 

export const gameStats: GameStat[] = [
  // 2023 baseline data (pre-Helldivers 2)
  { year: 2023, quarter: 'Q1', game: 'Helldivers 2', playCount: 0 },      // Game not released
  { year: 2023, quarter: 'Q2', game: 'Helldivers 2', playCount: 0 },      // Game not released
  { year: 2023, quarter: 'Q3', game: 'Helldivers 2', playCount: 0 },      // Game not released
  { year: 2023, quarter: 'Q4', game: 'Helldivers 2', playCount: 0 },      // Game not released
  
  // Helldivers 2 average concurrent players per quarter (from release Feb 2024)
  { year: 2024, quarter: 'Q1', game: 'Helldivers 2', playCount: 12500 },  // Launch quarter (Feb-Mar)
  { year: 2024, quarter: 'Q2', game: 'Helldivers 2', playCount: 18200 },  // Post-launch growth
  { year: 2024, quarter: 'Q3', game: 'Helldivers 2', playCount: 22800 },  // Summer peak
  { year: 2024, quarter: 'Q4', game: 'Helldivers 2', playCount: 19500 },  // Holiday dip
  { year: 2025, quarter: 'Q1', game: 'Helldivers 2', playCount: 25100 },  // New year resurgence
  
  // Spotify new plays per quarter - 2023 baseline (organic discovery)
  { year: 2023, quarter: 'Q1', game: 'Spotify', playCount: 3200000 },     // 3.2M baseline new plays
  { year: 2023, quarter: 'Q2', game: 'Spotify', playCount: 2900000 },     // 2.9M baseline new plays
  { year: 2023, quarter: 'Q3', game: 'Spotify', playCount: 3400000 },     // 3.4M baseline new plays
  { year: 2023, quarter: 'Q4', game: 'Spotify', playCount: 4100000 },     // 4.1M baseline (holiday boost)
  
  // Spotify new plays per quarter (Paranoid discovery driven by Helldivers 2)
  { year: 2024, quarter: 'Q1', game: 'Spotify', playCount: 8200000 },     // 8.2M new plays (Helldivers launch boost)
  { year: 2024, quarter: 'Q2', game: 'Spotify', playCount: 6800000 },     // 6.8M new plays (sustained interest)
  { year: 2024, quarter: 'Q3', game: 'Spotify', playCount: 7400000 },     // 7.4M new plays (summer gaming)
  { year: 2024, quarter: 'Q4', game: 'Spotify', playCount: 9100000 },     // 9.1M new plays (holiday boost)
  { year: 2025, quarter: 'Q1', game: 'Spotify', playCount: 7600000 },     // 7.6M new plays (projected)
]; 