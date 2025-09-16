import { useExamStore } from "@/stores/examStore";
import { useUIStore } from "@/stores/uiStore";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Users } from "lucide-react";
import React from "react";

// ... (keep your examOptions array) ...

export const ExamSelectionScreen: React.FC = () => {
  const { setSelectedExam, setCurrentScreen } = useExamStore();
  const { setLoading, addToast } = useUIStore();

  const handleExamSelect = async (examId: string) => {
    // ... (keep your handleExamSelect function) ...
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary-100 via-white to-primary-200 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-primary-900">
            Choose Your Challenge
          </h1>
          <p className="mt-4 text-lg text-primary-700 max-w-3xl mx-auto">
            Select an exam to begin your journey to success. Each exam is
            crafted to simulate the real test experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examOptions.map((exam, index) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${exam.color} text-white`}
                  >
                    <exam.icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      exam.difficulty === "Beginner"
                        ? "bg-green-100 text-green-800"
                        : exam.difficulty === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {exam.difficulty}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-primary-900">
                  {exam.title}
                </h3>
                <p className="mt-2 text-primary-700">{exam.description}</p>
              </div>
              <div className="p-6 bg-primary-50">
                <div className="flex justify-around text-center">
                  <div>
                    <Clock className="w-5 h-5 mx-auto text-primary-500" />
                    <p className="mt-1 text-sm font-semibold text-primary-900">
                      {exam.duration}
                    </p>
                  </div>
                  <div>
                    <BookOpen className="w-5 h-5 mx-auto text-primary-500" />
                    <p className="mt-1 text-sm font-semibold text-primary-900">
                      {exam.questions}
                    </p>
                  </div>
                  <div>
                    <Users className="w-5 h-5 mx-auto text-primary-500" />
                    <p className="mt-1 text-sm font-semibold text-primary-900">
                      {exam.sections}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleExamSelect(exam.id)}
                className="w-full bg-primary-600 text-white font-semibold py-4 px-6 text-lg hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center group"
              >
                Start Exam{" "}
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
