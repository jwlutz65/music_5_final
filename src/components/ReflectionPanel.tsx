import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ReflectionPrompt {
  question: string;
  context: string;
}

/**
 * ReflectionPanel component displays philosophical reflection prompts
 * Inspired by Marcus Aurelius style contemplation on Paranoid's cultural impact
 */
export const ReflectionPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const reflectionPrompts: ReflectionPrompt[] = [
    {
      question: "What does it mean for art to emerge from industrial decay?",
      context: "Consider how Black Sabbath transformed Birmingham's post-war industrial decline into heavy metal's foundation. What does this teach us about creativity arising from adversity?"
    },
    {
      question: "How does music reflect the collective unconscious of its time?",
      context: "Paranoid captured 1970's Cold War paranoia, Vietnam anxiety, and social unrest. How do we recognize when art becomes a mirror of societal fears?"
    },
    {
      question: "What is the relationship between authenticity and influence?",
      context: "Written hastily in 20 minutes to fill album space, Paranoid became more influential than carefully crafted compositions. What does this reveal about artistic authenticity?"
    },
    {
      question: "How do working-class voices shape cultural narratives?",
      context: "Four Birmingham factory workers' sons created a genre that spoke to millions. What responsibility do artists have when their personal expression becomes universal language?"
    },
    {
      question: "What endures when technology transforms how we experience art?",
      context: "From vinyl to streaming to gaming soundtracks, Paranoid has found new contexts for 50+ years. What qualities make art resilient across technological change?"
    }
  ];

  return (
    <Card className="bg-paranoid-gray-dark border-paranoid-orange">
      <CardHeader>
        <CardTitle className="text-paranoid-orange flex items-center justify-between">
          Philosophical Reflections
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-paranoid-white hover:text-paranoid-orange text-sm font-normal"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </CardTitle>
        <p className="text-paranoid-white text-sm">
          Contemplations on art, authenticity, and cultural impact
        </p>
      </CardHeader>
      
      {isExpanded && (
        <CardContent>
          <div className="space-y-6">
            <div className="text-paranoid-white text-sm italic border-l-2 border-paranoid-orange pl-4">
              "The universe is change; our life is what our thoughts make it." — Marcus Aurelius
            </div>
            
            {reflectionPrompts.map((prompt, index) => (
              <div key={index} className="border border-paranoid-orange rounded p-4 bg-paranoid-black">
                <h4 className="text-paranoid-orange font-semibold mb-3 text-sm">
                  Reflection {index + 1}
                </h4>
                <p className="text-paranoid-white font-medium mb-3 text-sm">
                  {prompt.question}
                </p>
                <p className="text-paranoid-white text-xs leading-relaxed opacity-90">
                  {prompt.context}
                </p>
              </div>
            ))}
            
            <div className="mt-6 p-4 bg-paranoid-black rounded border border-paranoid-orange">
              <h4 className="text-paranoid-orange font-semibold mb-2 text-sm">
                Your Reflection
              </h4>
              <p className="text-paranoid-white text-xs leading-relaxed">
                Take time to consider these questions as you explore the visualizations above. 
                How do the connections between nodes, timeline events, and musical structure 
                inform your understanding of cultural influence? What patterns do you observe 
                in how art moves through time and technology?
              </p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}; 