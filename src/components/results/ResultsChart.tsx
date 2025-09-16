import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import type { ExamResult } from '@/types/exam'

interface ResultsChartProps {
  result: ExamResult
}

export const ResultsChart: React.FC<ResultsChartProps> = ({ result }) => {
  const data = [
    { name: 'Correct', value: result.totalCorrect, color: '#22c55e' },
    { name: 'Incorrect', value: result.totalIncorrect, color: '#ef4444' },
    { name: 'Unattempted', value: result.totalUnattempted, color: '#64748b' }
  ]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-semibold text-slate-900">{data.name}</p>
          <p className="text-slate-600">{data.value} questions</p>
          <p className="text-sm text-slate-500">
            {((data.value / (result.totalCorrect + result.totalIncorrect + result.totalUnattempted)) * 100).toFixed(1)}%
          </p>
        </div>
      )
    }
    return null
  }

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex justify-center space-x-6 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-slate-600">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Score */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-3xl font-bold text-slate-900">
            {result.totalScore.toFixed(1)}
          </div>
          <div className="text-sm text-slate-600">
            out of {result.maxScore}
          </div>
        </div>
      </div>
    </div>
  )
}