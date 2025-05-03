import PageHeader from "@/components/PageHeader";
import Stats from "@/components/Perfomance/Stats";
import { useNavigate } from "react-router-dom";

const PerfomancePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-soccer-field via-soccer-green to-soccer-yellow p-6">
      <div className="max-w-6xl mx-auto">
        <PageHeader showBackButton onBackClick={() => navigate("/home")} />
        <Stats />
      </div>
    </div>
  );
};

export default PerfomancePage;
