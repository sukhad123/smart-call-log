import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Clock, MapPin } from "lucide-react"

const recentBookings = [
  {
    id: "booking-001",
    patientName: "Sarah Johnson",
    doctorName: "Dr. Smith",
    department: "General Medicine",
    appointmentDate: "2024-01-22 14:00:00",
    status: "confirmed",
    type: "routine_checkup",
    location: "Building A, Room 204",
    bookedVia: "AI Agent",
    callId: "call-001"
  },
  {
    id: "booking-002",
    patientName: "Emily Rodriguez", 
    doctorName: "Dr. Patel",
    department: "Cardiology",
    appointmentDate: "2024-01-16 09:00:00",
    status: "urgent",
    type: "consultation",
    location: "Building B, Room 150",
    bookedVia: "AI Agent",
    callId: "call-003"
  },
  {
    id: "booking-003",
    patientName: "Lisa Thompson",
    doctorName: "Dr. Chen",
    department: "Dermatology", 
    appointmentDate: "2024-01-25 11:30:00",
    status: "rescheduled",
    type: "follow_up",
    location: "Building C, Room 302",
    bookedVia: "AI Agent",
    callId: "call-005"
  },
  {
    id: "booking-004",
    patientName: "James Wilson",
    doctorName: "Dr. Lee",
    department: "Orthopedics",
    appointmentDate: "2024-01-18 15:30:00", 
    status: "confirmed",
    type: "examination",
    location: "Building A, Room 105",
    bookedVia: "AI Agent",
    callId: "call-006"
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-success text-success-foreground">Confirmed</Badge>
    case "urgent":
      return <Badge variant="destructive">Urgent</Badge>
    case "rescheduled":
      return <Badge className="bg-warning text-warning-foreground">Rescheduled</Badge>
    case "pending":
      return <Badge variant="outline">Pending</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const formatAppointmentType = (type: string) => {
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

export function RecentBookings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Recent Bookings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentBookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-foreground">{booking.patientName}</h4>
                    {getStatusBadge(booking.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {booking.doctorName}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(booking.appointmentDate).toLocaleDateString()} at{' '}
                      {new Date(booking.appointmentDate).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <div>{booking.department}</div>
                    <div>{formatAppointmentType(booking.type)}</div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3" />
                    {booking.location}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Booked via: {booking.bookedVia}</span>
                    <span>Call ID: {booking.callId}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Reschedule
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline">View All Bookings</Button>
        </div>
      </CardContent>
    </Card>
  )
}