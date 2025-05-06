
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { predictionService } from '@/services/predictionService';
import { useAuth } from '@/contexts/AuthContext';
import { Prediction } from '@/types/prediction';

export const useMyPredictions = () => {
  const { user } = useAuth();
  const [userPredictions, setUserPredictions] = useState<Prediction[]>([]);

  const { data: predictions, isLoading, error, refetch } = useQuery({
    queryKey: ['my-predictions', user?.id],
    queryFn: predictionService.getMyPredictions,
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (predictions) {
      // Add type assertion to ensure predictions is treated as Prediction[]
      setUserPredictions(predictions as Prediction[]);
    }
  }, [predictions]);

  return {
    predictions: userPredictions,
    isLoading,
    error,
    refetch
  };
};
