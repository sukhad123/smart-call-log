import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AudioPlayer } from "@/components/AudioPlayer"
import { Phone, Play, FileText, Clock, Search, Filter, Download, Calendar, User, MapPin, Volume2 } from "lucide-react"

const allCalls = [
  {
    id: "call-001",
    patientName: "Sarah Johnson",
    phoneNumber: "+1 (555) 123-4567",
    timestamp: "2024-01-15 14:30:22",
    duration: "5:42",
    status: "completed",
    outcome: "booking_confirmed",
    aiAgent: "Agent-01",
    transcript: `AI: Hello, thank you for calling MedCall Hospital. How can I assist you today?

Patient: Hi, I'd like to schedule a routine checkup with Dr. Smith.

AI: I'd be happy to help you schedule an appointment with Dr. Smith. May I have your name and date of birth for verification?

Patient: Sarah Johnson, born March 15th, 1985.

AI: Thank you, Sarah. I can see your records here. Dr. Smith has availability this week. Would you prefer a morning or afternoon appointment?

Patient: Afternoon would be better for me.

AI: Perfect. I have an opening on January 22nd at 2:00 PM. Does that work for you?

Patient: Yes, that's perfect.

AI: Excellent! I've scheduled your routine checkup with Dr. Smith for January 22nd at 2:00 PM in Building A, Room 204. You'll receive a confirmation text shortly. Is there anything else I can help you with today?

Patient: No, that's all. Thank you!

AI: You're welcome, Sarah. Have a great day and we'll see you on the 22nd!`,
    appointmentDate: "2024-01-22 14:00:00",
    department: "General Medicine",
    recordingUrl: "#",
    summary: "Patient successfully scheduled routine checkup appointment",
    tags: ["booking", "routine", "successful"]
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
    transcript: `AI: Hello, you've reached MedCall Hospital. How may I help you?

Patient: I need to know about COVID-19 testing. Do you offer walk-in testing?

AI: Yes, we do offer COVID-19 testing including walk-in services. We have PCR and rapid antigen tests available. Our testing center is open Monday through Friday, 8 AM to 5 PM, and Saturday 9 AM to 2 PM.

Patient: What's the difference between the tests?

AI: Great question. PCR tests are more accurate and take 24-48 hours for results. Rapid antigen tests give results in 15-30 minutes but are slightly less sensitive. For travel or work requirements, PCR is usually preferred.

Patient: How much do they cost?

AI: PCR tests are $150 and rapid tests are $75. Most insurance plans cover testing if you have symptoms or known exposure. Would you like me to check if your insurance covers testing?

Patient: No, I'll call my insurance first. Where is the testing center located?

AI: Our testing center is in Building C, Ground Floor. You can enter through the main hospital entrance and follow the blue signs. No appointment needed for walk-ins, but having one reduces wait time.

Patient: Perfect, thank you for the information.

AI: You're welcome! Stay safe and feel free to call if you have any other questions.`,
    appointmentDate: null,
    department: "Testing Center",
    recordingUrl: "#",
    summary: "Provided comprehensive COVID-19 testing information",
    tags: ["information", "covid", "testing"]
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
    transcript: `AI: MedCall Hospital, how can I assist you today?

Patient: I'm having chest pains and shortness of breath. I need to see a cardiologist urgently.

AI: I understand your concern, and I want to help you get the care you need right away. Can you tell me more about your symptoms? Are you experiencing severe chest pain right now?

Patient: It's not severe right now, but it's been happening on and off for the past two days, especially when I walk up stairs.

AI: I see. Given your symptoms, I'd like to get you scheduled with our cardiology team as soon as possible. May I have your name and date of birth?

Patient: Emily Rodriguez, July 8th, 1978.

AI: Thank you, Emily. I can see you're in our system. Let me check Dr. Patel's emergency slots... I have an opening tomorrow morning at 9:00 AM. This would be treated as an urgent consultation.

Patient: Yes, please book that for me.

AI: Perfect. I've scheduled you for an urgent cardiology consultation with Dr. Patel tomorrow, January 16th at 9:00 AM in Building B, Room 150. Please arrive 15 minutes early for check-in.

Patient: Should I bring anything specific?

AI: Please bring a list of any medications you're taking, your insurance card, and a photo ID. If your symptoms worsen tonight, please don't hesitate to go to our emergency room.

Patient: Thank you so much for getting me in quickly.

AI: Of course, Emily. Your health is our priority. You'll receive a confirmation text shortly. Take care and we'll see you tomorrow morning.`,
    appointmentDate: "2024-01-16 09:00:00",
    department: "Cardiology",
    recordingUrl: "#",
    summary: "Urgent cardiology appointment scheduled for chest pain symptoms",
    tags: ["urgent", "cardiology", "symptoms"]
  },
  {
    id: "call-004",
    patientName: "David Wilson", 
    phoneNumber: "+1 (555) 321-0987",
    timestamp: "2024-01-15 13:22:18",
    duration: "0:45",
    status: "missed_call",
    outcome: "no_answer",
    aiAgent: "Agent-03",
    transcript: `AI: Hello, you've reached MedCall Hospital. Unfortunately, no one is available to take your call right now. Please leave a message with your name, phone number, and the reason for your call, and we'll get back to you as soon as possible. For medical emergencies, please hang up and call 911 or go to your nearest emergency room. Thank you.

[BEEP]

[No message left - caller hung up]

System: Automated callback attempt scheduled for 2 hours.`,
    appointmentDate: null,
    department: "N/A",
    recordingUrl: "#",
    summary: "Missed call - no voicemail left, callback scheduled",
    tags: ["missed", "no-response"]
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
    transcript: `AI: Good afternoon, MedCall Hospital. How can I help you?

Patient: Hi, I have an appointment with Dr. Chen on January 18th, but I need to reschedule it.

AI: I'd be happy to help you reschedule. May I have your name and the time of your current appointment?

Patient: Lisa Thompson, and it's at 2:30 PM on the 18th.

AI: Found it, Lisa. You have a dermatology follow-up appointment with Dr. Chen. What day would work better for you?

Patient: I have a work conflict that came up. Could we do sometime the following week?

AI: Of course. Dr. Chen has availability the week of January 22nd. I see openings on January 24th at 10:00 AM, January 25th at 11:30 AM, or January 26th at 3:00 PM.

Patient: The 25th at 11:30 would be perfect.

AI: Excellent. I've moved your appointment from January 18th to January 25th at 11:30 AM. The location remains the same - Building C, Room 302. You'll receive a confirmation text with the updated details.

Patient: Will this affect my follow-up schedule?

AI: Not at all. Dr. Chen will still see you as planned, just a week later. Is there anything else I can help you with?

Patient: No, that covers it. Thank you for being so accommodating.

AI: You're very welcome, Lisa. We'll see you on January 25th. Have a great day!`,
    appointmentDate: "2024-01-25 11:30:00",
    department: "Dermatology",
    recordingUrl: "#",
    summary: "Appointment successfully rescheduled to patient's preferred time",
    tags: ["rescheduling", "follow-up", "accommodation"]
  }
]

const Calls = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [outcomeFilter, setOutcomeFilter] = useState("all")
  const [selectedCall, setSelectedCall] = useState<typeof allCalls[0] | null>(null)
  const [audioPlayerCall, setAudioPlayerCall] = useState<typeof allCalls[0] | null>(null)

  const filteredCalls = allCalls.filter(call => {
    const matchesSearch = call.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.phoneNumber.includes(searchTerm) ||
                         call.aiAgent.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || call.status === statusFilter
    const matchesOutcome = outcomeFilter === "all" || call.outcome === outcomeFilter
    
    return matchesSearch && matchesStatus && matchesOutcome
  })

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-foreground">AI Call Management</h1>
        <p className="text-muted-foreground mt-1">
          Complete call logs, transcripts, and recordings from AI agents
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by patient name, phone number, or agent..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Call Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="missed_call">Missed Call</SelectItem>
              </SelectContent>
            </Select>
            <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Outcomes</SelectItem>
                <SelectItem value="booking_confirmed">Booking Confirmed</SelectItem>
                <SelectItem value="information_provided">Info Provided</SelectItem>
                <SelectItem value="rescheduled">Rescheduled</SelectItem>
                <SelectItem value="no_answer">No Answer</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Calls List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              All AI Calls ({filteredCalls.length})
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCalls.map((call) => (
              <div key={call.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="font-semibold text-lg text-foreground">{call.patientName}</h4>
                      {getStatusBadge(call.status, call.outcome)}
                      <div className="flex gap-1">
                        {call.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {call.phoneNumber}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {call.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {call.aiAgent}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {call.department}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 bg-muted/30 p-3 rounded">
                      <strong>Summary:</strong> {call.summary}
                    </p>

                    {call.appointmentDate && (
                      <div className="flex items-center gap-2 text-sm text-primary font-medium mb-4 bg-primary/5 p-3 rounded">
                        <Calendar className="w-4 h-4" />
                        <strong>Appointment:</strong> {new Date(call.appointmentDate).toLocaleString()}
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground border-t pt-3">
                      <strong>Call Time:</strong> {new Date(call.timestamp).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="gap-2" onClick={() => setAudioPlayerCall(call)}>
                          <Volume2 className="w-4 h-4" />
                          Play Recording
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Call Recording</DialogTitle>
                        </DialogHeader>
                        {audioPlayerCall && (
                          <AudioPlayer
                            callId={audioPlayerCall.id}
                            patientName={audioPlayerCall.patientName}
                            duration={audioPlayerCall.duration}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="gap-2" onClick={() => setSelectedCall(call)}>
                          <FileText className="w-4 h-4" />
                          Full Transcript
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh]">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Call Transcript - {selectedCall?.patientName}
                          </DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-[60vh] w-full">
                          <div className="space-y-4 p-4">
                            {selectedCall && (
                              <>
                                <div className="grid grid-cols-2 gap-4 text-sm bg-muted p-4 rounded">
                                  <div><strong>Call ID:</strong> {selectedCall.id}</div>
                                  <div><strong>Duration:</strong> {selectedCall.duration}</div>
                                  <div><strong>Agent:</strong> {selectedCall.aiAgent}</div>
                                  <div><strong>Department:</strong> {selectedCall.department}</div>
                                  <div><strong>Outcome:</strong> {selectedCall.outcome.replace('_', ' ')}</div>
                                  <div><strong>Phone:</strong> {selectedCall.phoneNumber}</div>
                                </div>
                                
                                <div className="bg-background border rounded p-6">
                                  <h4 className="font-semibold mb-4 text-primary">Full Conversation Transcript</h4>
                                  <div className="space-y-3">
                                    {selectedCall.transcript.split('\n\n').map((segment, index) => {
                                      if (segment.startsWith('AI:')) {
                                        return (
                                          <div key={index} className="flex gap-3">
                                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                                              AI
                                            </div>
                                            <div className="flex-1 bg-primary/5 p-3 rounded-lg">
                                              <p className="text-sm">{segment.replace('AI: ', '')}</p>
                                            </div>
                                          </div>
                                        )
                                      } else if (segment.startsWith('Patient:')) {
                                        return (
                                          <div key={index} className="flex gap-3 justify-end">
                                            <div className="flex-1 bg-muted p-3 rounded-lg text-right">
                                              <p className="text-sm">{segment.replace('Patient: ', '')}</p>
                                            </div>
                                            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-xs font-bold">
                                              PT
                                            </div>
                                          </div>
                                        )
                                      } else if (segment.startsWith('[') || segment.startsWith('System:')) {
                                        return (
                                          <div key={index} className="text-center">
                                            <div className="inline-block bg-muted/50 px-3 py-1 rounded text-xs text-muted-foreground">
                                              {segment}
                                            </div>
                                          </div>
                                        )
                                      }
                                      return null
                                    })}
                                  </div>
                                </div>
                                
                                <div className="flex gap-4 pt-4 border-t">
                                  <Button variant="outline" size="sm">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Transcript
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Email Transcript
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                    
                    <Button size="sm" variant="outline" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download All
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCalls.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Phone className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No calls found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Calls