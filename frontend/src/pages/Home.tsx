import PageHeader from "@/components/PageHeader";
import HomePageNavigation from "@/components/Home/HomeNavigation";
import WelcomeCard from "@/components/Home/WelcomeCard";
import NewsDashboard from "@/components/Home/News";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-soccer-field via-soccer-green to-soccer-yellow p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <PageHeader />

        <WelcomeCard />

        <div className="grid lg:grid-cols-3 gap-6">
          <HomePageNavigation />

          <div className="lg:col-span-2">
            <NewsDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
