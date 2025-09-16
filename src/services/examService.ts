import type { ExamConfig, ExamResult, ExamSession } from '@/types/exam'
import { generateQuestionBank } from '@/data/questionGenerator'

class ExamService {
  private static instance: ExamService
  private cache = new Map<string, ExamConfig>()

  static getInstance(): ExamService {
    if (!ExamService.instance) {
      ExamService.instance = new ExamService()
    }
    return ExamService.instance
  }

  async getExamConfig(examId: string): Promise<ExamConfig> {
    // Check cache first
    if (this.cache.has(examId)) {
      return this.cache.get(examId)!
    }

    // Simulate API call delay
    await this.delay(500)

    // Generate exam configuration
    const examConfig = generateQuestionBank(examId)
    
    // Cache the result
    this.cache.set(examId, examConfig)
    
    return examConfig
  }

  async submitExam(session: ExamSession): Promise<ExamResult> {
    // Simulate API call delay
    await this.delay(1000)

    // Calculate results
    return this.calculateResults(session)
  }

  async saveSession(session: ExamSession): Promise<void> {
    // In a real app, this would save to a backend
    localStorage.setItem(`session_${session.id}`, JSON.stringify(session))
  }

  async loadSession(sessionId: string): Promise<ExamSession | null> {
    const saved = localStorage.getItem(`session_${sessionId}`)
    return saved ? JSON.parse(saved) : null
  }

  private calculateResults(session: ExamSession): ExamResult {
    const examConfig = this.cache.get(session.examId)
    if (!examConfig) {
      throw new Error('Exam configuration not found')
    }

    let totalScore = 0
    let totalCorrect = 0
    let totalIncorrect = 0
    let totalAttempted = 0
    let totalUnattempted = 0

    const sectionalResults = examConfig.sections.map(section => {
      const sectionQuestions = section.questions
      const sectionAnswers = session.answers.filter(answer => 
        sectionQuestions.some(q => q.id === answer.questionId)
      )

      let sectionScore = 0
      let sectionCorrect = 0
      let sectionIncorrect = 0
      let sectionAttempted = 0
      let sectionTimeTaken = 0

      sectionAnswers.forEach(answer => {
        const question = sectionQuestions.find(q => q.id === answer.questionId)
        if (!question) return

        sectionTimeTaken += answer.timeSpent

        if (answer.selectedAnswer !== null) {
          sectionAttempted++
          if (answer.selectedAnswer === question.correctAnswer) {
            sectionCorrect++
            sectionScore += examConfig.marking.correct
          } else {
            sectionIncorrect++
            sectionScore += examConfig.marking.incorrect
          }
        }
      })

      const sectionUnattempted = sectionQuestions.length - sectionAttempted
      const sectionAccuracy = sectionAttempted > 0 ? (sectionCorrect / sectionAttempted) * 100 : 0
      const maxSectionScore = sectionQuestions.length * examConfig.marking.correct
      const cutoffMet = !section.cutoffMarks || sectionScore >= section.cutoffMarks

      totalScore += sectionScore
      totalCorrect += sectionCorrect
      totalIncorrect += sectionIncorrect
      totalAttempted += sectionAttempted
      totalUnattempted += sectionUnattempted

      return {
        sectionId: section.id,
        sectionName: section.name,
        score: sectionScore,
        maxScore: maxSectionScore,
        attempted: sectionAttempted,
        correct: sectionCorrect,
        incorrect: sectionIncorrect,
        unattempted: sectionUnattempted,
        accuracy: sectionAccuracy,
        timeTaken: sectionTimeTaken,
        cutoffMet
      }
    })

    const totalQuestions = examConfig.sections.reduce((sum, section) => sum + section.questions.length, 0)
    const maxScore = totalQuestions * examConfig.marking.correct
    const percentage = (totalScore / maxScore) * 100
    const accuracy = totalAttempted > 0 ? (totalCorrect / totalAttempted) * 100 : 0
    const timeTaken = examConfig.totalDuration - session.timeRemaining

    // Generate performance analysis
    const analysis = this.generatePerformanceAnalysis(session, examConfig, sectionalResults)

    return {
      sessionId: session.id,
      examId: session.examId,
      totalScore,
      maxScore,
      percentage,
      accuracy,
      totalAttempted,
      totalCorrect,
      totalIncorrect,
      totalUnattempted,
      timeTaken,
      sectionalResults,
      analysis
    }
  }

  private generatePerformanceAnalysis(
    session: ExamSession, 
    examConfig: ExamConfig, 
    sectionalResults: any[]
  ) {
    // This is a simplified analysis - in a real app, this would be much more sophisticated
    const strengths: string[] = []
    const weaknesses: string[] = []
    const recommendations: string[] = []

    // Analyze sectional performance
    sectionalResults.forEach(result => {
      if (result.accuracy >= 80) {
        strengths.push(`Strong performance in ${result.sectionName}`)
      } else if (result.accuracy < 50) {
        weaknesses.push(`Needs improvement in ${result.sectionName}`)
        recommendations.push(`Focus more practice on ${result.sectionName} topics`)
      }
    })

    // Time management analysis
    const averageTimePerQuestion = session.answers.reduce((sum, answer) => sum + answer.timeSpent, 0) / session.answers.length
    const expectedTimePerQuestion = examConfig.totalDuration / session.answers.length

    if (averageTimePerQuestion > expectedTimePerQuestion * 1.2) {
      weaknesses.push('Time management needs improvement')
      recommendations.push('Practice solving questions within time limits')
    } else if (averageTimePerQuestion < expectedTimePerQuestion * 0.8) {
      strengths.push('Good time management')
    }

    return {
      strengths,
      weaknesses,
      recommendations,
      topicWiseAnalysis: [], // Would be populated with detailed topic analysis
      difficultyAnalysis: {
        easy: { attempted: 0, correct: 0, accuracy: 0 },
        medium: { attempted: 0, correct: 0, accuracy: 0 },
        hard: { attempted: 0, correct: 0, accuracy: 0 }
      },
      timeManagement: {
        totalTime: examConfig.totalDuration - session.timeRemaining,
        averageTimePerQuestion,
        fastestQuestion: 0,
        slowestQuestion: 0,
        timeDistribution: [],
        efficiency: averageTimePerQuestion <= expectedTimePerQuestion ? 'good' : 'needs-improvement' as const
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const examService = ExamService.getInstance()