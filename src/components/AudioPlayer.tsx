import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, RotateCcw, FastForward } from "lucide-react"

interface AudioPlayerProps {
  callId: string
  patientName: string
  duration: string
}

// Sample audio URLs - in a real app, these would come from your backend
const audioFiles = [
  "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  "https://file-examples.com/storage/fef1b5db2027b0df77b2407/2017/11/file_example_MP3_700KB.mp3",
  // Fallback to a simple beep sound for demo
  "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBiaH1O3SeSsyBCF+zezWfTIGJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsyBCF+zezWfTIGJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFgxGn+DyvmwhBiaH1O3SeSsJFF+y8eGWRgoUS6zW6LhYFg=="
]

export function AudioPlayer({ callId, patientName, duration }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  
  // Get a random audio file for demo purposes
  const audioUrl = audioFiles[Math.floor(Math.random() * audioFiles.length)]

  const togglePlayPause = async () => {
    if (!audioRef.current) return
    
    setIsLoading(true)
    
    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        // Create a mock audio element for demo since we don't have real call recordings
        if (!audioRef.current.src) {
          // Create a simple beep sound using Web Audio API for demo
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          
          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)
          
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime) // A4 note
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
          
          oscillator.start()
          oscillator.stop(audioContext.currentTime + 2) // Play for 2 seconds
          
          setIsPlaying(true)
          setTimeout(() => {
            setIsPlaying(false)
            setIsLoading(false)
          }, 2000)
          return
        }
        
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.log("Audio playback simulated for demo")
      // Simulate audio playback for demo
      setIsPlaying(true)
      setTimeout(() => {
        setIsPlaying(false)
      }, 3000)
    }
    
    setIsLoading(false)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const handleSeek = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const restart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
    }
  }

  const skip15 = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 15,
        audioRef.current.duration
      )
    }
  }

  // Convert duration string to seconds for the slider
  const [durationMinutes, durationSeconds] = duration.split(':').map(Number)
  const totalDuration = durationMinutes * 60 + durationSeconds

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg">Call Recording</CardTitle>
        <p className="text-sm text-muted-foreground">
          {patientName} - {duration}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Hidden audio element for actual playback */}
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onLoadStart={() => setIsLoading(true)}
          onCanPlay={() => setIsLoading(false)}
        />
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={totalDuration}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{duration}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button size="sm" variant="outline" onClick={restart}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <Button
            size="lg"
            onClick={togglePlayPause}
            disabled={isLoading}
            className="h-12 w-12 rounded-full"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </Button>
          
          <Button size="sm" variant="outline" onClick={skip15}>
            <FastForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-8">
            {volume}%
          </span>
        </div>

        {/* Demo Notice */}
        <div className="text-xs text-center text-muted-foreground bg-muted/50 p-2 rounded">
          🎵 Demo Mode: Playing sample audio
        </div>
      </CardContent>
    </Card>
  )
}