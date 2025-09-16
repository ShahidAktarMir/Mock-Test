import { useEffect, useRef } from 'react'

interface UseTimerProps {
  initialTime: number
  onTick: (time: number) => void
  onComplete: () => void
  isActive: boolean
}

export const useTimer = ({ initialTime, onTick, onComplete, isActive }: UseTimerProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeRef = useRef(initialTime)

  useEffect(() => {
    timeRef.current = initialTime
  }, [initialTime])

  useEffect(() => {
    if (isActive && timeRef.current > 0) {
      intervalRef.current = setInterval(() => {
        timeRef.current -= 1
        onTick(timeRef.current)
        
        if (timeRef.current <= 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          onComplete()
        }
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, onTick, onComplete])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])
}