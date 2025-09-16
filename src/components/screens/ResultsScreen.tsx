import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Target, Clock, TrendingUp, ArrowRight, RotateCcw } from 'lucide-react'
import { useExamStore } from '@/stores/examStore'
import { ResultsChart } from '@/components/results/ResultsChart'
import { SectionalResults } from '@/components/results/SectionalResults'
import { PerformanceAnalysis } from '@/components/results/PerformanceAnalysis'

export const ResultsScreen: React.FC = () => {
  const { examResult, setCurrentScreen, resetExam } = useExamStore()

  if (!examResult) {
    return null
  }

  const handleReviewAnswers = () => {
    setCurrentScreen('review')
  }

  const handleTakeAnotherTest = () => {
    resetExam()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-slate-900">Test Analysis</h1>
          </div>
          <p className="text-slate-600 text-lg">Comprehensive performance breakdown and insights</p>
        </motion.div>

        {/* Score Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Chart */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Score Distribution</h2>
            <ResultsChart result={examResult} />
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm text-slate-600 mb-1">Total Score</p>
              <p className="text-3xl font-bold text-green-600">
                {examResult.totalScore.toFixed(1)}
              </p>
              <p className="text-xs text-slate-500">out of {examResult.maxScore}</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm text-slate-600 mb-1">Accuracy</p>
              <p className="text-3xl font-bold text-blue-600">
                {examResult.accuracy.toFixed(1)}%
              </p>
              <p className="text-xs text-slate-500">
                {examResult.totalCorrect}/{examResult.totalAttempted} correct
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm text-slate-600 mb-1">Attempted</p>
              <p className="text-3xl font-bold text-purple-600">
                {examResult.totalAttempted}
              </p>
              <p className="text-xs text-slate-500">
                {examResult.totalUnattempted} unattempted
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-sm text-slate-600 mb-1">Time Taken</p>
              <p className="text-3xl font-bold text-orange-600">
                {Math.floor(examResult.timeTaken / 60)}m
              </p>
              <p className="text-xs text-slate-500">
                {examResult.timeTaken % 60}s remaining
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sectional Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <SectionalResults results={examResult.sectionalResults} />
        </motion.div>

        {/* Performance Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <PerformanceAnalysis analysis={examResult.analysis} />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center space-x-4"
        >
          <button
            onClick={handleReviewAnswers}
            className="btn-primary flex items-center"
          >
            Review Answers
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          
          <button
            onClick={handleTakeAnotherTest}
            className="btn-secondary flex items-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Take Another Test
          </button>
        </motion.div>
      </div>
    </div>
  )
}