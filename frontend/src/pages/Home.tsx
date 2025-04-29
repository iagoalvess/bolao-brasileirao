import PageHeader from "@/components/PageHeader";
import HomePageNavigation from "@/components/HomeNavigation";
import WelcomeCard from "@/components/WelcomeCard";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-soccer-field via-soccer-green to-soccer-yellow p-6">
      <div className="max-w-6xl mx-auto">
        <PageHeader />
        <HomePageNavigation />
        <WelcomeCard />
      </div>
    </div>
  );
};

export default HomePage;
