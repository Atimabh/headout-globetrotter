import { useEffect, useState } from 'react'
import { getRequest } from '../../utils/requests'
import styles from './styles.module.scss'
import { LeaderboardPlayerType } from '../../utils/types'
import Spinner from '../_shared/Spinner'
import Button from '../_shared/Button'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayerType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  async function getLeaderboard() {
    setIsLoading(true)
    const response = await getRequest('/leaderboard')
    if (response.success) {
      setLeaderboard(response.data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getLeaderboard()
  }, [])
  return (
    <div className={styles.container}>
      <p className={styles.title}>The Globetrotter's Quiz</p>

      <div className={styles.leaderboard}>
        <p className={styles.heading}>Leaderboard</p>
        {isLoading ? (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        ) : (
          leaderboard.map((player, index) => (
            <p className={styles.player} key={index}>
              {index + 1}. {player.username} <span>#{player.high_score}</span>
            </p>
          ))
        )}
      </div>

      <Button
        type="primary"
        text="Start Trip"
        backgroundColor="#f9c900"
        borderColor="#f9c900"
        textColor="#222222"
        width={300}
        padding="16px 0"
        fontSize={20}
        onClick={() => {
          navigate('/quiz')
        }}
      />
    </div>
  )
}
