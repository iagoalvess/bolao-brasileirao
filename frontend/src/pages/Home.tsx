
import PageHeader from "@/components/PageHeader";
import HomePageNavigation from "@/components/Home/HomeNavigation";
import WelcomeCard from "@/components/Home/WelcomeCard";
import NewsDashboard from "@/components/Home/News";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-soccer-field via-soccer-green to-soccer-yellow p-4 sm:p-6">
      <div className="w-full mx-auto px-2 sm:px-4 lg:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <PageHeader />

        <WelcomeCard />

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
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
