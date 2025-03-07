import { useState } from 'react'
import styles from './styles.module.scss'
import { Icon } from '@iconify/react'
import AnswerAnimation from './AnswerAnimation'
import FunFact from './FunFact'
import clsx from 'clsx'
import Button from '../_shared/Button'

const questions = [
  {
    city: 'Paris',
    country: 'France',
    clues: ['This city is home to a famous tower that sparkles every night.', "Known as the 'City of Love' and a hub for fashion and art."],
    fun_fact: [
      'The Eiffel Tower was supposed to be dismantled after 20 years but was saved because it was useful for radio transmissions!',
      'Paris has only one stop sign in the entire city—most intersections rely on priority-to-the-right rules.',
    ],
    trivia: ['This city is famous for its croissants and macarons. Bon appétit!', 'Paris was originally a Roman city called Lutetia.'],
    options: ['Paris', 'Rome', 'Barcelona', 'Vienna'],
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    clues: ['This city has the busiest pedestrian crossing in the world.', 'You can visit an entire district dedicated to anime, manga, and gaming.'],
    fun_fact: [
      'Tokyo was originally a small fishing village called Edo before becoming the bustling capital it is today!',
      'More than 14 million people live in Tokyo, making it one of the most populous cities in the world.',
    ],
    trivia: [
      'The city has over 160,000 restaurants, more than any other city in the world.',
      "Tokyo's subway system is so efficient that train delays of just a few minutes come with formal apologies.",
    ],
    options: ['Tokyo', 'Seoul', 'Shanghai', 'Taipei'],
  },
  {
    city: 'New York',
    country: 'USA',
    clues: ['Home to a green statue gifted by France in the 1800s.', "Nicknamed 'The Big Apple' and known for its Broadway theaters."],
    fun_fact: [
      'The Statue of Liberty was originally a copper color before oxidizing to its iconic green patina.',
      'Times Square was once called Longacre Square before being renamed in 1904.',
    ],
    trivia: [
      'New York City has 468 subway stations, making it one of the most complex transit systems in the world.',
      'The Empire State Building has its own zip code: 10118.',
    ],
    options: ['New York', 'Chicago', 'Boston', 'Los Angeles'],
  },
  {
    city: 'London',
    country: 'United Kingdom',
    clues: ["This city's famous clock tower is often incorrectly called by the name of its bell.", 'Home to a royal family and guards with tall, furry hats.'],
    fun_fact: [
      "The London Underground, aka 'the Tube', is the oldest underground railway network in the world!",
      'Despite its reputation for rain, London actually gets less annual rainfall than Rome, Barcelona, and even Miami.',
    ],
    trivia: [
      'There are more than 170 museums in London, including many that are free to visit.',
      'The city has over 170 different nationalities speaking around 300 languages.',
    ],
    options: ['London', 'Manchester', 'Edinburgh', 'Dublin'],
  },
  {
    city: 'Rome',
    country: 'Italy',
    clues: [
      'This city features an ancient amphitheater where gladiators once fought.',
      'Visitors often throw coins into a famous fountain to ensure they return someday.',
    ],
    fun_fact: [
      'About €3,000 is tossed into the Trevi Fountain each day, which is collected and donated to charity!',
      'This city contains a separate sovereign state within its borders that is the smallest country in the world.',
    ],
    trivia: [
      'There are more than 2,000 fountains throughout this ancient city.',
      'The ancient Romans were the first to use concrete on a major scale for construction.',
    ],
    options: ['Rome', 'Milan', 'Florence', 'Naples'],
  },
  {
    city: 'Sydney',
    country: 'Australia',
    clues: ['This city is known for its iconic opera house with sail-shaped roofs.', "Located on one of the world's largest natural harbors."],
    fun_fact: [
      'The Sydney Opera House has over one million roof tiles covering approximately 1.62 hectares!',
      "This city's Harbour Bridge is nicknamed 'The Coathanger' due to its distinctive shape.",
    ],
    trivia: [
      "Sydney's beaches stretch for more than 100 kilometers along the coastline.",
      'The Sydney Opera House took 14 years to build, 10 years longer than planned.',
    ],
    options: ['Sydney', 'Melbourne', 'Perth', 'Brisbane'],
  },
  {
    city: 'Cairo',
    country: 'Egypt',
    clues: ["This city sits near some of the world's most famous ancient pyramids.", 'The mighty Nile River runs through this ancient capital.'],
    fun_fact: [
      'The Great Pyramid near this city is the only surviving structure of the Seven Wonders of the Ancient World!',
      "This city's name means 'The Victorious' in Arabic.",
    ],
    trivia: [
      'Cairo is home to Al-Azhar University, one of the oldest continuously operating universities in the world.',
      'The Egyptian Museum contains more than 120,000 ancient Egyptian artifacts.',
    ],
    options: ['Cairo', 'Alexandria', 'Luxor', 'Marrakech'],
  },
  {
    city: 'Rio de Janeiro',
    country: 'Brazil',
    clues: [
      'This city is watched over by a massive statue of Christ with outstretched arms.',
      'Famous for its vibrant carnival and beautiful beaches like Copacabana.',
    ],
    fun_fact: [
      'The Christ the Redeemer statue is struck by lightning several times a year but has special lightning rods!',
      "This city's name literally means 'January River', though it's not actually on a river.",
    ],
    trivia: [
      "Rio hosted the world's largest soccer match attendance - around 200,000 people at Maracanã Stadium in 1950.",
      'The city was briefly the capital of the Portuguese Empire from 1808 to 1821.',
    ],
    options: ['Rio de Janeiro', 'São Paulo', 'Buenos Aires', 'Lima'],
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    clues: ["Home to the world's tallest building that reaches over 828 meters into the sky.", 'This desert city has an indoor ski resort with real snow.'],
    fun_fact: [
      "This city has the world's only 7-star hotel, although the rating isn't officially recognized!",
      'The police force here uses luxury cars like Lamborghinis and Bugattis for patrol.',
    ],
    trivia: [
      "Dubai has the world's largest choreographed fountain system at Dubai Mall.",
      'The city created artificial islands in the shape of a palm tree and a map of the world.',
    ],
    options: ['Dubai', 'Abu Dhabi', 'Doha', 'Riyadh'],
  },
]

export default function Quiz() {
  const [bulbOn, setBulbOn] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)

  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answerState, setAnswerState] = useState<'correct' | 'incorrect' | null>(null)
  const [showFact, setShowFact] = useState(false)

  function checkAnswer(answer: string) {
    setSelectedAnswer(answer)
    if (questions[currentQuestionIndex].city == answer) {
      setScore((prev) => prev + 2)
      setAnswerState('correct')
    } else {
      setAnswerState('incorrect')
      setShowCorrectAnswer(true)
    }
    setShowFact(true)
  }

  function nextQuestion() {
    setShowCorrectAnswer(false)
    setSelectedAnswer(null)
    setAnswerState(null)
    setShowFact(false)
    setCurrentQuestionIndex((prev) => prev + 1)
  }

  return (
    <div className={styles.container}>
      <div className={styles.quiz}>
        <div className={styles.lottie}>{answerState && <AnswerAnimation isCorrect={answerState == 'correct' ? true : false} />}</div>
        <p className={styles.counter}>
          Destination {currentQuestionIndex + 1} / {questions.length}
        </p>
        <p className={styles.clue}>
          {questions[currentQuestionIndex].clues[0]}
          <span onMouseEnter={() => setBulbOn(true)} onMouseLeave={() => setBulbOn(false)}>
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
            text="Next Destination"
            backgroundColor="#C3E2FF"
            textColor="#6813DE"
            width={200}
            fontSize={18}
            padding="14px 0"
            margin="32px auto 0 auto"
            onClick={nextQuestion}
          />
        ) : null}
      </div>
    </div>
  )
}
