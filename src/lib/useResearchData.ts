import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { ResearchData } from './types';

/**
 * Custom hook to fetch research data from Firestore
 * @returns Object containing data, loading state, and error state
 */
export const useResearchData = () => {
  const [data, setData] = useState<ResearchData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const docRef = doc(db, 'researchData', 'main');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const researchData = docSnap.data() as ResearchData;
          setData(researchData);
        } else {
          setError('Research data not found');
        }
      } catch (err) {
        console.error('Error fetching research data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}; 