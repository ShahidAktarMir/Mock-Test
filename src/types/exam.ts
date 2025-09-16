export interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: string
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  timeToSolve: number // in seconds
  previousYearFrequency: number
}

export interface Section {
  id: string
  name: string
  questions: Question[]
  duration: number // in seconds
  maxQuestions?: number
  isOptional?: boolean
  cutoffMarks?: number
}

export interface ExamConfig {
  id: string
  title: string
  description: string
  sections: Section[]
  totalDuration: number
  marking: {
    correct: number
    incorrect: number
    unattempted: number
  }
  isSectionalTimed: boolean
  allowSectionSwitch: boolean
  showCalculator: boolean
  instructions: string[]
  passingCriteria?: {
    overall?: number
    sectional?: Record<string, number>
  }
}

export interface UserAnswer {
  questionId: string
  selectedAnswer: string | null
  status: 'not-visited' | 'not-answered' | 'answered' | 'marked' | 'marked-answered'
  timeSpent: number
  visitCount: number
  lastVisited: number
}

export interface ExamSession {
  id: string
  examId: string
  startTime: number
  endTime?: number
  currentQuestionIndex: number
  currentSectionIndex: number
  answers: UserAnswer[]
  timeRemaining: number
  sectionTimeRemaining?: number
  isSubmitted: boolean
  isPaused: boolean
}

export interface ExamResult {
  sessionId: string
  examId: string
  totalScore: number
  maxScore: number
  percentage: number
  accuracy: number
  totalAttempted: number
  totalCorrect: number
  totalIncorrect: number
  totalUnattempted: number
  timeTaken: number
  sectionalResults: SectionalResult[]
  rank?: number
  percentile?: number
  analysis: PerformanceAnalysis
}

export interface SectionalResult {
  sectionId: string
  sectionName: string
  score: number
  maxScore: number
  attempted: number
  correct: number
  incorrect: number
  unattempted: number
  accuracy: number
  timeTaken: number
  cutoffMet: boolean
}

export interface PerformanceAnalysis {
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  topicWiseAnalysis: TopicAnalysis[]
  difficultyAnalysis: DifficultyAnalysis
  timeManagement: TimeAnalysis
}

export interface TopicAnalysis {
  topic: string
  attempted: number
  correct: number
  accuracy: number
  averageTime: number
  recommendation: string
}

export interface DifficultyAnalysis {
  easy: { attempted: number; correct: number; accuracy: number }
  medium: { attempted: number; correct: number; accuracy: number }
  hard: { attempted: number; correct: number; accuracy: number }
}

export interface TimeAnalysis {
  totalTime: number
  averageTimePerQuestion: number
  fastestQuestion: number
  slowestQuestion: number
  timeDistribution: number[]
  efficiency: 'excellent' | 'good' | 'average' | 'needs-improvement'
}

export type ScreenType = 'selection' | 'loading' | 'instructions' | 'exam' | 'results' | 'review'