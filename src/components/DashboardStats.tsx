import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Calendar, Users, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"

const stats = [
  {
    title: "Total Calls Today",
    value: "127",
    change: "+12%",
    icon: Phone,
    changeType: "positive" as const
  },
  {
    title: "Successful Bookings",
    value: "89",
    change: "+8%",
    icon: Calendar,
    changeType: "positive" as const
  },
  {
    title: "Active Patients",
    value: "1,234",
    change: "+5%",
    icon: Users,
    changeType: "positive" as const
  },
  {
    title: "Success Rate",
    value: "94.2%",
    change: "+2.1%",
    icon: TrendingUp,
    changeType: "positive" as const
  },
  {
    title: "Avg Call Duration",
    value: "4:32",
    change: "-0:23",
    icon: Clock,
    changeType: "positive" as const
  },
  {
    title: "AI Resolution Rate",
    value: "87%",
    change: "+3%",
    icon: CheckCircle,
    changeType: "positive" as const
  }
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="flex items-center text-xs mt-1">
              <span className={`font-medium ${
                stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
              }`}>
                {stat.change}
              </span>
              <span className="text-muted-foreground ml-1">from yesterday</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}