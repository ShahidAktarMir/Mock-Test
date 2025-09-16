import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Users, Award, ArrowRight, Sparkles } from 'lucide-react'
import { useExamStore } from '@/stores/examStore'
import { useUIStore } from '@/stores/uiStore'
import { examService } from '@/services/examService'

const examOptions = [
  {
    id: 'ssc_cgl_tier1',
    title: 'SSC CGL Tier 1',
    description: 'Combined Graduate Level Tier 1 Examination',
    duration: '60 minutes',
    questions: '100 questions',
    sections: '4 sections',
    difficulty: 'Intermediate',
    color: 'from-blue-600 to-indigo-600',
    icon: BookOpen,
    features: ['Sectional Timing', 'Negative Marking', 'Previous Year Pattern']
  },
  {
    id: 'ssc_chsl_tier1',
    title: 'SSC CHSL Tier 1',
    description: 'Combined Higher Secondary Level Tier 1 Examination',
    duration: '60 minutes',
    questions: '100 questions',
    sections: '4 sections',
    difficulty: 'Beginner',
    color: 'from-emerald-600 to-teal-600',
    icon: Users,
    features: ['Sectional Timing', 'Negative Marking', 'Updated Syllabus']
  },
  {
    id: 'ibps_po_prelims',
    title: 'IBPS PO Prelims',
    description: 'Probationary Officer Preliminary Examination',
    duration: '60 minutes',
    questions: '100 questions',
    sections: '3 sections',
    difficulty: 'Advanced',
    color: 'from-purple-600 to-pink-600',
    icon: Award,
    features: ['Sectional Timing', 'High Competition', 'Banking Focus']
  }
]

export const ExamSelectionScreen: React.FC = () => {
  const { setSelectedExam, setCurrentScreen } = useExamStore()
  const { setLoading, addToast } = useUIStore()

  const handleExamSelect = async (examId: string) => {
    try {
      setLoading('exam-selection', { isLoading: true, message: 'Loading exam configuration...' })
      
      const examConfig = await examService.getExamConfig(examId)
      setSelectedExam(examConfig)
      setCurrentScreen('instructions')
      
      addToast({
        type: 'success',
        title: 'Exam loaded successfully',
        message: `${examConfig.title} is ready to start`
      })
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Failed to load exam',
        message: 'Please try again later'
      })
    } finally {
      setLoading('exam-selection', { isLoading: false })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-primary-600 mr-3" />
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
              Elite Examiner
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Your ultimate training ground for competitive exams. Experience AI-powered analytics, 
            real-time performance tracking, and exam patterns that mirror the actual tests.
          </p>
        </motion.div>

        {/* Exam Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {examOptions.map((exam, index) => {
            const IconComponent = exam.icon
            return (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="card-hover p-8 h-full relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${exam.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${exam.color} text-white`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        exam.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                        exam.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {exam.difficulty}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{exam.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{exam.description}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <Clock className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                        <p className="text-sm font-semibold text-slate-900">{exam.duration}</p>
                      </div>
                      <div className="text-center">
                        <BookOpen className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                        <p className="text-sm font-semibold text-slate-900">{exam.questions}</p>
                      </div>
                      <div className="text-center">
                        <Users className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                        <p className="text-sm font-semibold text-slate-900">{exam.sections}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-slate-700 mb-3">Key Features:</h4>
                      <div className="space-y-2">
                        {exam.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleExamSelect(exam.id)}
                      className={`w-full btn bg-gradient-to-r ${exam.color} text-white hover:shadow-2xl group-hover:scale-105 transition-all duration-300`}
                    >
                      <span>Start Mock Test</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-slate-500 text-sm">
            Built with advanced AI analytics and real-time performance tracking
          </p>
          <p className="text-slate-400 text-xs mt-2">
            © 2025 Elite Examiner Platform. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  )
}