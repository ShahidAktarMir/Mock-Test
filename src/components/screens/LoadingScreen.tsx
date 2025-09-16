import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Zap, Target, TrendingUp } from 'lucide-react'

const loadingMessages = [
  { icon: Brain, message: "Analyzing difficulty matrix..." },
  { icon: Zap, message: "Cross-referencing previous year patterns..." },
  { icon: Target, message: "Generating unique question set..." },
  { icon: TrendingUp, message: "Finalizing test structure..." },
  { icon: Brain, message: "Optimizing for your skill level..." },
]

export const LoadingScreen: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 800)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + Math.random() * 15
      })
    }, 200)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [])

  const currentMessage = loadingMessages[currentMessageIndex]
  const IconComponent = currentMessage.icon

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="text-center text-white max-w-md mx-auto px-6">
        {/* Animated Icon */}
        <motion.div
          key={currentMessageIndex}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
              <IconComponent className="w-10 h-10 text-blue-300" />
            </div>
            
            {/* Pulse rings */}
            <div className="absolute inset-0 w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping" />
              <div className="absolute inset-2 rounded-full border border-blue-300/20 animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Loading Message */}
        <motion.div
          key={currentMessage.message}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-2">Generating Your Test</h2>
          <p className="text-blue-200 text-lg">{currentMessage.message}</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-sm">
            <motion.div
              className="bg-gradient-to-r from-blue-400 to-indigo-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-sm text-blue-200 mt-2">{Math.round(Math.min(progress, 100))}% Complete</p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Subtitle */}
        <p className="text-blue-300/70 text-sm mt-8">
          Powered by advanced AI algorithms for personalized learning
        </p>
      </div>
    </div>
  )
}