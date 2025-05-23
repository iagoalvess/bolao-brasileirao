
import { useMatches } from "@/hooks/useMatches";
import MatchesTable from "@/components/Matches/MatchesTable";
import RoundSelector from "@/components/Matches/RoundSelector";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useNavigate } from "react-router-dom";

const MatchesPage = () => {
  const navigate = useNavigate();

  const {
    matches,
    isLoading,
    error,
    selectedRound,
    setSelectedRound,
    predictions,
    handleChange,
    handlePalpite,
    alreadyPredicted,
    getPredictionForMatch,
    mutation,
  } = useMatches();

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-soccer-field via-soccer-green to-soccer-yellow p-6">
        <PageHeader showBackButton onBackClick={() => navigate("/home")} />

        <div className="w-full mx-auto flex-grow flex flex-col">
          <RoundSelector
            selectedRound={selectedRound}
            onChange={setSelectedRound}
          />
          <MatchesTable
            matches={matches}
            isLoading={isLoading}
            error={error}
            predictions={predictions}
            mutation={mutation}
            onChange={handleChange}
            onPalpite={handlePalpite}
            alreadyPredicted={alreadyPredicted}
            getPredictionForMatch={getPredictionForMatch}
          />
        </div>

        <PageFooter />
      </div>
    </ProtectedRoute>
  );
};

export default MatchesPage;
