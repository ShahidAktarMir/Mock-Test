import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { 
  ExamConfig, 
  ExamSession, 
  UserAnswer, 
  ExamResult, 
  ScreenType 
} from '@/types/exam'

interface ExamState {
  // Screen management
  currentScreen: ScreenType
  setCurrentScreen: (screen: ScreenType) => void
  
  // Exam configuration
  selectedExam: ExamConfig | null
  setSelectedExam: (exam: ExamConfig) => void
  
  // Session management
  currentSession: ExamSession | null
  createSession: (examId: string) => void
  updateSession: (updates: Partial<ExamSession>) => void
  
  // Navigation
  currentQuestionIndex: number
  currentSectionIndex: number
  setCurrentQuestion: (index: number) => void
  setCurrentSection: (index: number) => void
  
  // Answers management
  answers: UserAnswer[]
  updateAnswer: (questionId: string, answer: string | null) => void
  markQuestion: (questionId: string, marked: boolean) => void
  
  // Timer management
  timeRemaining: number
  sectionTimeRemaining: number | null
  setTimeRemaining: (time: number) => void
  setSectionTimeRemaining: (time: number | null) => void
  
  // Results
  examResult: ExamResult | null
  setExamResult: (result: ExamResult) => void
  
  // UI state
  isSubmitting: boolean
  setIsSubmitting: (submitting: boolean) => void
  
  // Actions
  startExam: () => void
  submitExam: () => void
  resetExam: () => void
  pauseExam: () => void
  resumeExam: () => void
}

export const useExamStore = create<ExamState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        currentScreen: 'selection',
        selectedExam: null,
        currentSession: null,
        currentQuestionIndex: 0,
        currentSectionIndex: 0,
        answers: [],
        timeRemaining: 0,
        sectionTimeRemaining: null,
        examResult: null,
        isSubmitting: false,

        // Screen management
        setCurrentScreen: (screen) => set({ currentScreen: screen }),

        // Exam configuration
        setSelectedExam: (exam) => set({ selectedExam: exam }),

        // Session management
        createSession: (examId) => {
          const exam = get().selectedExam
          if (!exam) return

          const session: ExamSession = {
            id: `session_${Date.now()}`,
            examId,
            startTime: Date.now(),
            currentQuestionIndex: 0,
            currentSectionIndex: 0,
            answers: exam.sections.flatMap(section => 
              section.questions.map(q => ({
                questionId: q.id,
                selectedAnswer: null,
                status: 'not-visited' as const,
                timeSpent: 0,
                visitCount: 0,
                lastVisited: 0
              }))
            ),
            timeRemaining: exam.totalDuration,
            sectionTimeRemaining: exam.isSectionalTimed ? exam.sections[0].duration : undefined,
            isSubmitted: false,
            isPaused: false
          }

          set({ 
            currentSession: session,
            answers: session.answers,
            timeRemaining: session.timeRemaining,
            sectionTimeRemaining: session.sectionTimeRemaining
          })
        },

        updateSession: (updates) => {
          const currentSession = get().currentSession
          if (!currentSession) return

          const updatedSession = { ...currentSession, ...updates }
          set({ currentSession: updatedSession })
        },

        // Navigation
        setCurrentQuestion: (index) => {
          const { answers, currentSession } = get()
          
          // Update visit count and last visited time
          const updatedAnswers = answers.map((answer, i) => {
            if (i === index) {
              return {
                ...answer,
                visitCount: answer.visitCount + 1,
                lastVisited: Date.now(),
                status: answer.status === 'not-visited' ? 'not-answered' : answer.status
              }
            }
            return answer
          })

          set({ 
            currentQuestionIndex: index,
            answers: updatedAnswers
          })

          // Update session
          if (currentSession) {
            get().updateSession({ 
              currentQuestionIndex: index,
              answers: updatedAnswers
            })
          }
        },

        setCurrentSection: (index) => {
          const { selectedExam } = get()
          if (!selectedExam) return

          // Calculate first question index of the section
          let questionIndex = 0
          for (let i = 0; i < index; i++) {
            questionIndex += selectedExam.sections[i].questions.length
          }

          set({ 
            currentSectionIndex: index,
            currentQuestionIndex: questionIndex
          })

          // Update section timer if sectional timing is enabled
          if (selectedExam.isSectionalTimed) {
            const sectionDuration = selectedExam.sections[index].duration
            set({ sectionTimeRemaining: sectionDuration })
          }
        },

        // Answers management
        updateAnswer: (questionId, answer) => {
          const { answers } = get()
          const updatedAnswers = answers.map(a => {
            if (a.questionId === questionId) {
              const newStatus = answer 
                ? (a.status === 'marked' ? 'marked-answered' : 'answered')
                : (a.status === 'marked-answered' ? 'marked' : 'not-answered')
              
              return {
                ...a,
                selectedAnswer: answer,
                status: newStatus
              }
            }
            return a
          })

          set({ answers: updatedAnswers })
          get().updateSession({ answers: updatedAnswers })
        },

        markQuestion: (questionId, marked) => {
          const { answers } = get()
          const updatedAnswers = answers.map(a => {
            if (a.questionId === questionId) {
              let newStatus = a.status
              if (marked) {
                newStatus = a.selectedAnswer ? 'marked-answered' : 'marked'
              } else {
                newStatus = a.selectedAnswer ? 'answered' : 'not-answered'
              }
              
              return { ...a, status: newStatus }
            }
            return a
          })

          set({ answers: updatedAnswers })
          get().updateSession({ answers: updatedAnswers })
        },

        // Timer management
        setTimeRemaining: (time) => {
          set({ timeRemaining: time })
          get().updateSession({ timeRemaining: time })
        },

        setSectionTimeRemaining: (time) => {
          set({ sectionTimeRemaining: time })
          get().updateSession({ sectionTimeRemaining: time })
        },

        // Results
        setExamResult: (result) => set({ examResult: result }),

        // UI state
        setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),

        // Actions
        startExam: () => {
          const { selectedExam } = get()
          if (!selectedExam) return

          get().createSession(selectedExam.id)
          set({ currentScreen: 'exam' })
        },

        submitExam: () => {
          const { currentSession } = get()
          if (!currentSession) return

          set({ isSubmitting: true })
          
          // Mark session as submitted
          get().updateSession({ 
            isSubmitted: true,
            endTime: Date.now()
          })

          // Calculate results (this would typically be done on the server)
          // For now, we'll do it client-side
          setTimeout(() => {
            // This is where result calculation would happen
            set({ 
              isSubmitting: false,
              currentScreen: 'results'
            })
          }, 1000)
        },

        resetExam: () => {
          set({
            currentScreen: 'selection',
            selectedExam: null,
            currentSession: null,
            currentQuestionIndex: 0,
            currentSectionIndex: 0,
            answers: [],
            timeRemaining: 0,
            sectionTimeRemaining: null,
            examResult: null,
            isSubmitting: false
          })
        },

        pauseExam: () => {
          get().updateSession({ isPaused: true })
        },

        resumeExam: () => {
          get().updateSession({ isPaused: false })
        }
      }),
      {
        name: 'exam-store',
        partialize: (state) => ({
          currentSession: state.currentSession,
          answers: state.answers,
          examResult: state.examResult
        })
      }
    ),
    { name: 'ExamStore' }
  )
)