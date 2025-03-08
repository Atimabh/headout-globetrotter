import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './styles.module.scss'
import Button from '../../_shared/Button'
import { getRequest } from '../../../utils/requests'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../../_shared/Spinner'

export default function Challenge() {
  const [searchParams, setSearchParams] = useSearchParams()
  const username = searchParams.get('ref')
  const [score, setScore] = useState(0)
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  async function getScoreByUsername(username: string) {
    setIsLoading(true)
    const response = await getRequest(`/get-score?username=${username}`)
    console.log(response)
    if (response.success) {
      setScore(response.data.high_score)
    } else {
      toast.error(response.message)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (username) {
      getScoreByUsername(username)
    }
  }, [username])

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          <p className={styles.title}>The Globetrotter's Quiz</p>
          <p className={styles.challenge}>You have been challenged by {username}!</p>
          <p className={styles.score}>They scored {score} out of 20 on the Globetrotter's Quiz</p>
          <p className={styles.question}>Think you can do better?</p>

          <Button
            type="primary"
            text="Start Trip"
            width={200}
            padding="16px 0"
            fontSize={20}
            backgroundColor="#d93658"
            borderColor="#d93658"
            onClick={() => navigate('/quiz')}
          />
        </>
      )}
    </div>
  )
}
