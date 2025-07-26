import { DashboardStats } from "@/components/DashboardStats"
import { RecentCalls } from "@/components/RecentCalls"
import { RecentBookings } from "@/components/RecentBookings"

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-foreground">Hospital AI Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Monitor AI agent calls, bookings, and patient interactions
        </p>
      </div>

      {/* Stats Overview */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RecentCalls />
        <RecentBookings />
      </div>
    </div>
  );
};

export default Index;
