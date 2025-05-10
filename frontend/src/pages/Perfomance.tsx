
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import Stats from "@/components/Perfomance/Stats";
import { useNavigate } from "react-router-dom";

const PerfomancePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-soccer-field via-soccer-green to-soccer-yellow p-4 sm:p-6">
      <div className="w-full mx-auto px-2 sm:px-4 lg:px-6 py-6">
        <PageHeader showBackButton onBackClick={() => navigate("/home")} />
        <Stats />
        <PageFooter />
      </div>
    </div>
  );
};

export default PerfomancePage;
