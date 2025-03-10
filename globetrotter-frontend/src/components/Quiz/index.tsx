import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Icon } from '@iconify/react'
import AnswerAnimation from './AnswerAnimation'
import FunFact from './FunFact'
import clsx from 'clsx'
import Button from '../_shared/Button'
import { getRequest } from '../../utils/requests'
import { QuestionType } from '../../utils/types'
import GameEnd from './GameEnd'
import HintModal from './HintModal'
import Spinner from '../_shared/Spinner'
import { Howl } from 'howler'

export default function Quiz() {
  // State for light bulb hover effect
  const [bulbOn, setBulbOn] = useState(false)
  // Track current question number
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  // Track player's score
  const [score, setScore] = useState(0)
  // Track number of correct answers
  const [correctCount, setCorrectCount] = useState(0)

  // States for answer feedback
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answerState, setAnswerState] = useState<'correct' | 'incorrect' | null>(null)
  const [showFact, setShowFact] = useState(false)

  // State for hint modal visibility
  const [showHint, setShowHint] = useState(false)

  // State for game completion
  const [isGameEnd, setIsGameEnd] = useState(false)

  // Loading state for API calls
  const [isLoading, setIsLoading] = useState({
    questions: false,
  })
  // Store quiz questions from API
  const [questions, setQuestions] = useState<QuestionType[]>([])

  // Function to handle answer selection and validation
  function checkAnswer(answer: string) {
    // Store the selected answer
    setSelectedAnswer(answer)

    // Check if the selected answer matches the correct city
    if (questions[currentQuestionIndex].city == answer) {
      // Increase score by 2 points for correct answer
      setScore((prev) => prev + 2)
      // Increment correct answers counter
      setCorrectCount((prev) => prev + 1)
      // Set answer state to correct
      setAnswerState('correct')
      // Play correct answer sound effect
      new Howl({ src: ['/correct.mp3'], volume: 0.7, autoplay: true })
    } else {
      // Set answer state to incorrect
      setAnswerState('incorrect')
      // Show the correct answer
      setShowCorrectAnswer(true)
      // Play wrong answer sound effect
      new Howl({ src: ['/wrong.mp3'], volume: 0.7, autoplay: true })
    }
    // Show fun fact after answering
    setShowFact(true)
  }

  // Reset the state for the next question
  function nextQuestion() {
    setShowCorrectAnswer(false)
    setSelectedAnswer(null)
    setAnswerState(null)
    setShowFact(false)
    setCurrentQuestionIndex((prev) => prev + 1)
  }

  async function getCities() {
    setIsLoading((prev) => ({ ...prev, questions: true }))
    const response = await getRequest('/destinations')
    if (response.success) {
      setQuestions(response.data)
    }
    setIsLoading((prev) => ({ ...prev, questions: false }))
  }

  function endTrip() {
    setIsGameEnd(true)
  }

  // Reset the state for new game
  function playAgain() {
    getCities()
    setCurrentQuestionIndex(0)
    setShowCorrectAnswer(false)
    setSelectedAnswer(null)
    setAnswerState(null)
    setShowFact(false)
    setScore(0)
    setCorrectCount(0)
    setIsGameEnd(false)
  }

  useEffect(() => {
    getCities()
  }, [])

  // background music for the quiz
  useEffect(() => {
    const sound = new Howl({
      src: ['/background.mp3'],
      loop: true,
      volume: 0.2,
      autoplay: true,
    })

    return () => sound.stop() // Stop when component unmounts
  }, [])

  return (
    <>
      <div className={styles.container}>
        {isLoading.questions || !questions.length ? (
          <div className={styles.spinner}>
            <Spinner invertColor />
          </div>
        ) : isGameEnd ? (
          <GameEnd score={score} correctCount={correctCount} playAgain={playAgain} />
        ) : (
          <div className={styles.quiz}>
            <div className={styles.lottie}>{answerState && <AnswerAnimation isCorrect={answerState == 'correct' ? true : false} />}</div>
            <p className={styles.counter}>
              Destination {currentQuestionIndex + 1} / {questions.length}
            </p>
            <p className={styles.clue}>
              {questions[currentQuestionIndex].clue[0]}
              <span onMouseEnter={() => setBulbOn(true)} onMouseLeave={() => setBulbOn(false)} onClick={() => setShowHint(true)}>
                <Icon icon={bulbOn ? 'emojione:light-bulb' : 'emojione-monotone:light-bulb'} width={32} />
              </span>
            </p>
            <hr />
            <div className={styles.options} style={{ pointerEvents: answerState ? 'none' : 'all' }}>
              <div className={styles.row}>
                {questions[currentQuestionIndex].options.slice(0, 2).map((option) => (
                  <button
                    className={clsx(
                      answerState == 'correct' && selectedAnswer == option
                        ? styles.correct
                        : answerState == 'incorrect' && selectedAnswer == option
                        ? styles.incorrect
                        : undefined,
                      showCorrectAnswer && option == questions[currentQuestionIndex].city ? styles.correct : undefined
                    )}
                    onClick={() => checkAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className={styles.row}>
                {questions[currentQuestionIndex].options.slice(2, 4).map((option) => (
                  <button
                    className={clsx(
                      answerState == 'correct' && selectedAnswer == option
                        ? styles.correct
                        : answerState == 'incorrect' && selectedAnswer == option
                        ? styles.incorrect
                        : undefined,
                      showCorrectAnswer && option == questions[currentQuestionIndex].city ? styles.correct : undefined
                    )}
                    onClick={() => checkAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            {showFact && <FunFact fact={questions[currentQuestionIndex].fun_fact} />}

            {answerState ? (
              <Button
                type="primary"
                text={currentQuestionIndex < questions.length - 1 ? 'Next Destination' : 'End Trip'}
                backgroundColor="#C3E2FF"
                textColor="#6813DE"
                width={200}
                fontSize={18}
                padding="14px 0"
                margin="32px auto 0 auto"
                onClick={() => {
                  if (currentQuestionIndex < questions.length - 1) {
                    nextQuestion()
                  } else {
                    endTrip()
                  }
                }}
              />
            ) : null}
          </div>
        )}
      </div>

      {showHint ? <HintModal hint={questions[currentQuestionIndex].clue[1]} onClose={() => setShowHint(false)} /> : null}
    </>
  )
}
