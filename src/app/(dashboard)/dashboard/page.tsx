import { DashboardConainer } from "./dashboard-container";
import { WelcomeSection } from "./welcome-sections";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 lg:gap-6 ">
          {/* Welcome Section */}
          <WelcomeSection />

          {/* Dashboard Container */}
          <DashboardConainer />
        </main>
      </div>
    </>
  );
}
