import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, FileText, Clock, Phone } from "lucide-react"

const recentCalls = [
  {
    id: "call-001",
    patientName: "Sarah Johnson",
    phoneNumber: "+1 (555) 123-4567",
    timestamp: "2024-01-15 14:30:22",
    duration: "5:42",
    status: "completed",
    outcome: "booking_confirmed",
    aiAgent: "Agent-01",
    transcript: "Patient called to schedule a routine checkup. Successfully booked appointment for Jan 22nd at 2:00 PM with Dr. Smith...",
    appointmentDate: "2024-01-22 14:00:00",
    department: "General Medicine"
  },
  {
    id: "call-002", 
    patientName: "Michael Chen",
    phoneNumber: "+1 (555) 987-6543",
    timestamp: "2024-01-15 14:15:10",
    duration: "3:28",
    status: "completed",
    outcome: "information_provided",
    aiAgent: "Agent-02",
    transcript: "Patient inquired about COVID-19 testing availability. Provided information about walk-in hours and locations...",
    appointmentDate: null,
    department: "Testing Center"
  },
  {
    id: "call-003",
    patientName: "Emily Rodriguez",
    phoneNumber: "+1 (555) 456-7890",
    timestamp: "2024-01-15 13:45:33",
    duration: "7:15",
    status: "completed",
    outcome: "booking_confirmed",
    aiAgent: "Agent-01",
    transcript: "Patient needed urgent cardiology consultation. Scheduled emergency appointment for tomorrow morning...",
    appointmentDate: "2024-01-16 09:00:00",
    department: "Cardiology"
  },
  {
    id: "call-004",
    patientName: "David Wilson", 
    phoneNumber: "+1 (555) 321-0987",
    timestamp: "2024-01-15 13:22:18",
    duration: "2:45",
    status: "missed_call",
    outcome: "no_answer",
    aiAgent: "Agent-03",
    transcript: "Call went to voicemail. Automated message left with callback instructions.",
    appointmentDate: null,
    department: "N/A"
  },
  {
    id: "call-005",
    patientName: "Lisa Thompson",
    phoneNumber: "+1 (555) 654-3210", 
    timestamp: "2024-01-15 12:58:45",
    duration: "4:32",
    status: "completed",
    outcome: "rescheduled",
    aiAgent: "Agent-02",
    transcript: "Patient needed to reschedule existing appointment. Moved from Jan 18th to Jan 25th due to conflict...",
    appointmentDate: "2024-01-25 11:30:00",
    department: "Dermatology"
  }
]

const getStatusBadge = (status: string, outcome: string) => {
  if (status === "completed" && outcome === "booking_confirmed") {
    return <Badge className="bg-success text-success-foreground">Booking Confirmed</Badge>
  }
  if (status === "completed" && outcome === "information_provided") {
    return <Badge variant="secondary">Info Provided</Badge>
  }
  if (status === "completed" && outcome === "rescheduled") {
    return <Badge className="bg-warning text-warning-foreground">Rescheduled</Badge>
  }
  if (status === "missed_call") {
    return <Badge variant="destructive">Missed Call</Badge>
  }
  return <Badge variant="outline">{outcome.replace('_', ' ')}</Badge>
}

export function RecentCalls() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-primary" />
          Recent AI Calls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentCalls.map((call) => (
            <div key={call.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-foreground">{call.patientName}</h4>
                    {getStatusBadge(call.status, call.outcome)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {call.phoneNumber}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {call.duration}
                    </div>
                    <div>Agent: {call.aiAgent}</div>
                    <div>Dept: {call.department}</div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {call.transcript}
                  </p>

                  {call.appointmentDate && (
                    <div className="text-sm text-primary font-medium">
                      📅 Appointment: {new Date(call.appointmentDate).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Play className="w-3 h-3" />
                    Play
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <FileText className="w-3 h-3" />
                    Transcript
                  </Button>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mt-2 pt-2 border-t">
                {new Date(call.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline">View All Calls</Button>
        </div>
      </CardContent>
    </Card>
  )
}