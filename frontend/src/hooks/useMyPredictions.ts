import { useQuery } from "@tanstack/react-query";
import { predictionService, Prediction } from "@/services/predictionService";
import { useMemo } from "react";

export function useMyPredictions() {
 const { data, isLoading, error } = useQuery({
  queryKey: ["my-predictions"],
  queryFn: predictionService.getMyPredictions,
  retry: false,
 });

 const predictionsMap = useMemo(() => {
  const map: Record<number, Prediction> = {};
  if (data) {
   data.forEach((p) => {
    map[p.match_id] = p;
   });
  }
  return map;
 }, [data]);

 return {
  predictions: data,
  predictionsMap,
  isLoading,
  error,
 };
}
