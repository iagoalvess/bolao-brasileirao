import PageHeader from "@/components/PageHeader";
import HomePageNavigation from "@/components/Home/HomeNavigation";
import WelcomeCard from "@/components/Home/WelcomeCard";
import HomeDashboard from "@/components/Home/HomeDashboard";


const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-soccer-field via-soccer-green to-soccer-yellow p-6">
      <div className="max-w-6xl mx-auto">
        <PageHeader />
        <HomePageNavigation />
        <WelcomeCard />
        <HomeDashboard />
      </div>
    </div>
  );
};

export default HomePage;
