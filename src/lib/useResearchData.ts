import { useState, useEffect } from 'react';
import { ResearchData } from './types';
import { researchData as dataSeed } from './dataSeed';

/**
 * Custom hook to fetch research data from local data seed
 * @returns Object containing data, loading state, and error state
 */
export const useResearchData = () => {
  const [data, setData] = useState<ResearchData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate async loading for consistency
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Small delay to simulate loading
        await new Promise(resolve => setTimeout(resolve, 100));
        
        setData(dataSeed);
      } catch (err) {
        console.error('Error loading research data:', err);
        setError('Failed to load research data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
}; 