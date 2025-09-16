import type { ExamConfig, Question, Section } from '@/types/exam'

const examConfigs: Record<string, Omit<ExamConfig, 'sections'> & { 
  sectionConfigs: Array<{
    name: string
    duration: number
    questionCount: number
    topics: string[]
  }>
}> = {
  ssc_cgl_tier1: {
    id: 'ssc_cgl_tier1',
    title: 'SSC CGL Tier 1',
    description: 'Staff Selection Commission Combined Graduate Level Tier 1 Examination',
    totalDuration: 3600, // 60 minutes
    marking: { correct: 2, incorrect: -0.5, unattempted: 0 },
    isSectionalTimed: true,
    allowSectionSwitch: false,
    showCalculator: false,
    instructions: [
      'This test consists of 4 sections with 25 questions each',
      'Each section has a time limit of 15 minutes',
      'You cannot switch between sections',
      'There is negative marking for wrong answers',
      'Use of calculator is not allowed'
    ],
    sectionConfigs: [
      { name: 'General Intelligence & Reasoning', duration: 900, questionCount: 25, topics: ['Analogies', 'Classification', 'Series', 'Coding-Decoding', 'Blood Relations'] },
      { name: 'General Awareness', duration: 900, questionCount: 25, topics: ['History', 'Geography', 'Polity', 'Economics', 'Science'] },
      { name: 'Quantitative Aptitude', duration: 900, questionCount: 25, topics: ['Arithmetic', 'Algebra', 'Geometry', 'Trigonometry', 'Statistics'] },
      { name: 'English Comprehension', duration: 900, questionCount: 25, topics: ['Reading Comprehension', 'Grammar', 'Vocabulary', 'Sentence Correction'] }
    ]
  },
  ssc_chsl_tier1: {
    id: 'ssc_chsl_tier1',
    title: 'SSC CHSL Tier 1',
    description: 'Staff Selection Commission Combined Higher Secondary Level Tier 1 Examination',
    totalDuration: 3600,
    marking: { correct: 2, incorrect: -0.5, unattempted: 0 },
    isSectionalTimed: true,
    allowSectionSwitch: false,
    showCalculator: false,
    instructions: [
      'This test consists of 4 sections with 25 questions each',
      'Each section has a time limit of 15 minutes',
      'You cannot switch between sections',
      'There is negative marking for wrong answers'
    ],
    sectionConfigs: [
      { name: 'General Intelligence', duration: 900, questionCount: 25, topics: ['Reasoning', 'Logical Thinking', 'Problem Solving'] },
      { name: 'General Awareness', duration: 900, questionCount: 25, topics: ['Current Affairs', 'History', 'Geography', 'Science'] },
      { name: 'Quantitative Aptitude', duration: 900, questionCount: 25, topics: ['Mathematics', 'Data Interpretation'] },
      { name: 'English Language', duration: 900, questionCount: 25, topics: ['Grammar', 'Vocabulary', 'Comprehension'] }
    ]
  },
  ibps_po_prelims: {
    id: 'ibps_po_prelims',
    title: 'IBPS PO Prelims',
    description: 'Institute of Banking Personnel Selection Probationary Officer Preliminary Examination',
    totalDuration: 3600,
    marking: { correct: 1, incorrect: -0.25, unattempted: 0 },
    isSectionalTimed: true,
    allowSectionSwitch: false,
    showCalculator: false,
    instructions: [
      'This test consists of 3 sections',
      'Each section has a separate time limit',
      'You cannot switch between sections',
      'There is negative marking for wrong answers'
    ],
    sectionConfigs: [
      { name: 'English Language', duration: 1200, questionCount: 30, topics: ['Reading Comprehension', 'Cloze Test', 'Error Spotting'] },
      { name: 'Quantitative Aptitude', duration: 1200, questionCount: 35, topics: ['Data Interpretation', 'Number Series', 'Simplification'] },
      { name: 'Reasoning Ability', duration: 1200, questionCount: 35, topics: ['Puzzles', 'Seating Arrangement', 'Syllogism'] }
    ]
  }
}

const questionTemplates: Record<string, Array<{
  template: string
  options: string[]
  correctIndex: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}>> = {
  'Analogies': [
    {
      template: 'Book : Author :: Painting : ?',
      options: ['Canvas', 'Artist', 'Color', 'Frame'],
      correctIndex: 1,
      explanation: 'Just as a book is created by an author, a painting is created by an artist.',
      difficulty: 'easy'
    },
    {
      template: 'Thermometer : Temperature :: Barometer : ?',
      options: ['Pressure', 'Weather', 'Rain', 'Wind'],
      correctIndex: 0,
      explanation: 'A thermometer measures temperature, similarly a barometer measures atmospheric pressure.',
      difficulty: 'medium'
    }
  ],
  'Mathematics': [
    {
      template: 'What is 15% of 240?',
      options: ['36', '32', '38', '34'],
      correctIndex: 0,
      explanation: '15% of 240 = (15/100) × 240 = 36',
      difficulty: 'easy'
    },
    {
      template: 'If the ratio of two numbers is 3:4 and their sum is 84, what is the larger number?',
      options: ['36', '48', '42', '52'],
      correctIndex: 1,
      explanation: 'Let the numbers be 3x and 4x. Then 3x + 4x = 84, so 7x = 84, x = 12. Larger number = 4x = 48',
      difficulty: 'medium'
    }
  ],
  'Grammar': [
    {
      template: 'Choose the correct sentence:',
      options: [
        'Neither of the boys were present',
        'Neither of the boys was present',
        'Neither of the boy were present',
        'Neither of the boy was present'
      ],
      correctIndex: 1,
      explanation: '"Neither" is singular and takes a singular verb "was".',
      difficulty: 'medium'
    }
  ]
}

function generateQuestion(topic: string, index: number): Question {
  const templates = questionTemplates[topic] || questionTemplates['Mathematics']
  const template = templates[index % templates.length]
  
  return {
    id: `q_${topic.toLowerCase().replace(/\s+/g, '_')}_${index}`,
    text: template.template,
    options: template.options,
    correctAnswer: template.options[template.correctIndex],
    explanation: template.explanation,
    difficulty: template.difficulty,
    topic,
    timeToSolve: template.difficulty === 'easy' ? 60 : template.difficulty === 'medium' ? 90 : 120,
    previousYearFrequency: Math.floor(Math.random() * 10) + 1
  }
}

export function generateQuestionBank(examId: string): ExamConfig {
  const config = examConfigs[examId]
  if (!config) {
    throw new Error(`Exam configuration not found for ${examId}`)
  }

  const sections: Section[] = config.sectionConfigs.map((sectionConfig, sectionIndex) => {
    const questions: Question[] = []
    const questionsPerTopic = Math.ceil(sectionConfig.questionCount / sectionConfig.topics.length)
    
    sectionConfig.topics.forEach((topic, topicIndex) => {
      const topicQuestionCount = Math.min(
        questionsPerTopic,
        sectionConfig.questionCount - questions.length
      )
      
      for (let i = 0; i < topicQuestionCount; i++) {
        questions.push(generateQuestion(topic, topicIndex * 10 + i))
      }
    })

    // Fill remaining questions if needed
    while (questions.length < sectionConfig.questionCount) {
      const randomTopic = sectionConfig.topics[Math.floor(Math.random() * sectionConfig.topics.length)]
      questions.push(generateQuestion(randomTopic, questions.length))
    }

    return {
      id: `section_${sectionIndex}`,
      name: sectionConfig.name,
      questions: questions.slice(0, sectionConfig.questionCount),
      duration: sectionConfig.duration
    }
  })

  return {
    ...config,
    sections
  }
}