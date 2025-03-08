import Button from '../../_shared/Button'
import styles from './styles.module.scss'
import ReactSpeedometer from 'react-d3-speedometer'

type GameEndPropsType = {
  score: number
  correctCount: number
  playAgain: () => void
}

export default function GameEnd({ score, correctCount, playAgain }: GameEndPropsType) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Trip Ended</p>
      <div className={styles.score}>
        <ReactSpeedometer height={200} value={score} maxValue={20} needleColor="#ffffff" textColor="#ffffff" needleHeightRatio={0.8} ringWidth={20} />
      </div>
      <p className={styles.info}>
        You scored {score} out of 20. You answered {correctCount} questions correctly.
      </p>

      <div className={styles.buttons}>
        <Button
          type="primary"
          text="Challenge a Friend"
          width={250}
          fontSize={18}
          padding="14px 0"
          backgroundColor="#eecb4a"
          textColor="#222222"
          onClick={() => {}}
        />
        <Button type="primary" text="Play Again" width={250} fontSize={18} padding="14px 0" backgroundColor="#eecb4a" textColor="#222222" onClick={playAgain} />
      </div>
    </div>
  )
}
