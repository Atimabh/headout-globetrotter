import styles from './styles.module.scss'
import Lottie from 'react-lottie-player'
import smiley from '../../../assets/quiz/smiley-lottie.json'
import sad from '../../../assets/quiz/sad-lottie.json'
import ReactConfetti from 'react-confetti'

type AnswerAnimationPropsType = {
  isCorrect: boolean
}

export default function AnswerAnimation({ isCorrect }: AnswerAnimationPropsType) {
  return (
    <div className={styles.container}>
      <Lottie loop animationData={isCorrect ? smiley : sad} play style={{ width: 150, height: 150 }} />
      {isCorrect && <ReactConfetti width={window.innerWidth} height={window.innerHeight} gravity={0.4} />}
    </div>
  )
}
