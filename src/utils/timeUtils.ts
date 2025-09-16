export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const parseTime = (timeString: string): number => {
  const parts = timeString.split(':').map(Number)
  
  if (parts.length === 3) {
    // HH:MM:SS format
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  } else if (parts.length === 2) {
    // MM:SS format
    return parts[0] * 60 + parts[1]
  }
  
  return 0
}

export const getTimeRemaining = (endTime: number): number => {
  const now = Date.now()
  const remaining = Math.max(0, Math.floor((endTime - now) / 1000))
  return remaining
}

export const addTime = (currentTime: number, additionalSeconds: number): number => {
  return Math.max(0, currentTime + additionalSeconds)
}

export const getTimeElapsed = (startTime: number): number => {
  const now = Date.now()
  return Math.floor((now - startTime) / 1000)
}