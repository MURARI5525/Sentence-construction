// src/components/QuizApp.jsx
import React, { useEffect, useState } from 'react'

const MOCK_API_DATA = {
  status: "SUCCESS",
  data: {
    testId: "sample-quiz-2025",
    questions: [
        {
        "questionId": "b28af948-db8b-465e-92e6-3d42534c4533",
        "question": "The company's _____________ approach to product development _____________ customer feedback at every stage, _____________ user satisfaction and _____________ a loyal consumer base.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Incorporated", "User-centric", "Enhancing", "Cultivating"],
        "correctAnswer": ["User-centric", "Incorporated", "Enhancing", "Cultivating"]
      },
      {
        "questionId": "6e6534ea-260a-4c26-96fd-f830b27601fb",
        "question": "The _____________ musical performance _____________ elements from various genres, _____________ the audience with its unique sound and _____________ critical acclaim from industry experts.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Captivating", "Eclectic", "Garnering", "Blended"],
        "correctAnswer": ["Eclectic", "Blended", "Captivating", "Garnering"]
      },
      {
        "questionId": "7186e3da-0384-460a-af19-5a3984758e78",
        "question": "The scientist's _____________ research on quantum computing _____________ new possibilities for data processing, _____________ traditional limitations and _____________ the way for groundbreaking technological advancements.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Pioneering", "Paving", "Overcoming", "Opened up"],
        "correctAnswer": ["Pioneering", "Opened up", "Overcoming", "Paving"]
      },
      {
        "questionId": "10cbe3c2-13bb-4973-a794-18bf309b0791",
        "question": "The _____________ implementation of machine learning algorithms in medical diagnostics _____________ early detection of diseases, _____________ treatment outcomes and _____________ the workload of healthcare professionals.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Improving", "Reducing", "Enabled", "Revolutionary"],
        "correctAnswer": ["Revolutionary", "Enabled", "Improving", "Reducing"]
      },
      {
        "questionId": "71ffe41e-8732-48e6-87f2-f84ea07eb060",
        "question": "The _____________ security breach at the tech giant _____________ millions of users' data, _____________ concerns about online privacy and _____________ calls for stricter regulations.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Raising", "Massive", "Prompting", "Compromised"],
        "correctAnswer": ["Massive", "Compromised", "Raising", "Prompting"]
      },
      {
        "questionId": "48b9b4bd-5c2c-4c25-92c0-ce453b14e8d7",
        "question": "The _____________ educational reform _____________ a more inclusive curriculum, _____________ equal opportunities for all students and _____________ the overall quality of public schooling.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Comprehensive", "Enhancing", "Implemented", "Promoting"],
        "correctAnswer": ["Comprehensive", "Implemented", "Promoting", "Enhancing"]
      },
      {
        "questionId": "ed5e6e2d-8408-406e-be32-777ac26460e2",
        "question": "The company's _____________ commitment to sustainability _____________ eco-friendly practices across all departments, _____________ its carbon footprint and _____________ a model for corporate responsibility.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Implemented", "Setting", "Unwavering", "Reducing"],
        "correctAnswer": ["Unwavering", "Implemented", "Reducing", "Setting"]
      },
      {
        "questionId": "936eccaa-2f3b-4322-a3d3-ceabf2219dc5",
        "question": "The _____________ implementation of artificial intelligence in healthcare _____________ patient outcomes, _____________ the workload of medical professionals and _____________ new avenues for personalized treatment.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Opening", "Improved", "Gradual", "Reducing"],
        "correctAnswer": ["Gradual", "Improved", "Reducing", "Opening"]
      },
      {
        "questionId": "d78effdf-88ab-4667-8115-3bfb2baa0a24",
        "question": "The _____________ festival _____________ artists from diverse backgrounds, _____________ cultural exchange and _____________ a platform for emerging talents to showcase their work.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Providing", "Brought together", "Promoting", "International"],
        "correctAnswer": ["International", "Brought together", "Promoting", "Providing"]
      },
      {
        "questionId": "2d08ec76-a253-4f34-bc45-e12ef21b78fb",
        "question": "The _____________ implementation of smart city technologies _____________ urban efficiency and sustainability, _____________ quality of life for residents and _____________ a model for future urban development.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Enhancing", "Improved", "Providing", "Widespread"],
        "correctAnswer": ["Widespread", "Improved", "Enhancing", "Providing"]
      }
    ]
  }
}

export default function QuizApp() {
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timer, setTimer] = useState(30)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [showStartScreen, setShowStartScreen] = useState(true)


  const currentQuestion = questions[currentIndex]

  useEffect(() => {
    setQuestions(MOCK_API_DATA.data.questions)
  }, [])

  useEffect(() => {
    if (timer === 0) handleNext()
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(countdown)
  }, [timer, currentIndex])

  const handleWordSelect = (word, blankIndex) => {
    const current = selectedAnswers[currentIndex] || {}
    const updated = {
      ...selectedAnswers,
      [currentIndex]: {
        ...current,
        [blankIndex]: word,
      },
    }
    setSelectedAnswers(updated)
  }

  const handleNext = () => {
    const selected = selectedAnswers[currentIndex] || {}
    const answerArr = Object.values(selected)
    const isCorrect =
      answerArr.length === currentQuestion.correctAnswer.length &&
      currentQuestion.correctAnswer.every((a, i) => a === answerArr[i])

    if (isCorrect) setScore((prev) => prev + 1)

    if (currentIndex + 1 >= questions.length) {
      setShowResults(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
      setTimer(30)
    }
  }

  if (questions.length === 0) return <p className="text-center mt-10">Loading...</p>
  if (showStartScreen) {
    return (
      <div className="p-4 min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-xl text-center">
          <h1 className="text-3xl font-bold text-purple-700 mb-6">🚀 Sentence Construction</h1>
  
          <p className="text-gray-700 mb-4 text-lg">
            Get ready to test your knowledge. Click below to begin.
          </p>
  
          <p className="text-sm text-gray-600 italic mb-6">
            Select the correct  words to complete the sentence by arranging the provided options in the right order.
          </p>
  
          {/* Info boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-purple-100 p-4 rounded-lg shadow-sm">
              <p className="text-purple-800 font-semibold">⏱️ Time / Question</p>
              <p className="text-xl font-bold text-purple-700">30s</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow-sm">
              <p className="text-green-800 font-semibold">🔢 Total Questions</p>
              <p className="text-xl font-bold text-green-700">10</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow-sm">
              <p className="text-yellow-800 font-semibold">🪙 Total Coins</p>
              <p className="text-xl font-bold text-yellow-700">10</p>
            </div>
          </div>
  
          {/* Start button */}
          <button
            onClick={() => setShowStartScreen(false)}
            className="px-8 py-3 text-lg font-semibold rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-all"
          >
            Start Quiz
          </button>
        </div>
      </div>
    )
  }
  
  

  if (showResults) {
    if (showStartScreen) {
  return (
    <div className="p-4 min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">🚀 You can start the quiz now!</h1>
        <p className="text-gray-700 mb-8 text-lg">Get ready to test your knowledge. Click below to begin.</p>
        <button
          onClick={() => setShowStartScreen(false)}
          className="px-8 py-3 text-lg font-semibold rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-all"
        >
          Start Quiz
        </button>
      </div>
    </div>
  )
}

    return (
      <div className="p-4 min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-4xl border border-black-500">
          <h1 className="text-4xl font-bold text-center mb-8 text-purple-700">🎉 Quiz Results</h1>
          <p className="text-xl font-medium text-center mb-6 text-gray-800">
            Your Score: <span className="font-bold text-green-600">{score} / {questions.length}</span>
          </p>
          {questions.map((q, i) => {
            const userAns = Object.values(selectedAnswers[i] || {})
            const isCorrect = JSON.stringify(userAns) === JSON.stringify(q.correctAnswer)
            return (
              <div key={q.questionId} className="mb-6 p-5 rounded-lg border-l-8 shadow bg-white border-purple-400">
                <p className="font-semibold mb-1">Q{i + 1}: {q.question}</p>
                <p><strong className="text-gray-700">Your Answer:</strong> {userAns.join(', ')}</p>
                {!isCorrect && (
                  <p className="text-red-600"><strong>Correct Answer:</strong> {q.correctAnswer.join(', ')}</p>
                )}
                <p className={`mt-1 font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? '✅ Correct' : '❌ Incorrect'}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const blankCount = (currentQuestion.question.match(/___________/g) || []).length

  const displayQuestion = currentQuestion.question.replace(/___________/g, () => {
    const current = selectedAnswers[currentIndex] || {}
    const currentBlankIndex = Object.keys(current).length
    return `<span class='inline-block px-2 text-center text-sm font-bold text-purple-700 bg-purple-100 rounded-sm'>${current[currentBlankIndex] || '___'}</span>`
  })

  const allFilled =
    selectedAnswers[currentIndex] &&
    Object.keys(selectedAnswers[currentIndex]).length === blankCount

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-3xl border border-blue-200">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-700">📘 Quiz</h1>
        <div className="p-6 bg-white rounded-lg shadow-inner">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-700">Question {currentIndex + 1} of {questions.length}</h2>
            <span className="text-red-600 font-semibold text-lg">⏱️ {timer}s</span>
          </div>
          <div
            className="prose prose-base sm:prose-lg mb-6 leading-relaxed text-gray-800"
            dangerouslySetInnerHTML={{ __html: displayQuestion }}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {currentQuestion.options.map((opt, i) => {
              const isSelected = Object.values(selectedAnswers[currentIndex] || {}).includes(opt)
              return (
                <button
                  key={i}
                  className={`rounded-full px-4 py-2 transition-all duration-200 text-sm font-semibold shadow-md border hover:scale-105 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none'
                      : 'bg-white text-purple-800 border-purple-300 hover:bg-purple-100'
                  }`}
                  onClick={() =>
                    handleWordSelect(opt, Object.keys(selectedAnswers[currentIndex] || {}).length)
                  }
                  disabled={isSelected}
                >
                  {opt}
                </button>
              )
            })}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={handleNext}
              disabled={!allFilled}
              className={`px-8 py-3 text-lg font-semibold rounded-full shadow transition-all duration-300 ${
                allFilled
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Next ➡️
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
