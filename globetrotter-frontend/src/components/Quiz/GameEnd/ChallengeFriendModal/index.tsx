import { useRef, useState } from 'react'
import Button from '../../../_shared/Button'
import Input from '../../../_shared/Input'
import Modal from '../../../_shared/Modal'
import styles from './styles.module.scss'
import ReactSpeedometer from 'react-d3-speedometer'
import html2canvas from 'html2canvas'

type ChallengeFriendModalPropsType = {
  onClose: () => void
  score: number
}

export default function ChallengeFriendModal({ onClose, score }: ChallengeFriendModalPropsType) {
  const captureRef = useRef(null)
  const [formStep, setFormStep] = useState(1)
  const [scoreImage, setScoreImage] = useState(null)

  const [username, setUsername] = useState('asdasd')

  async function saveSession() {
    setFormStep(2)
  }

  async function downloadScore() {
    if (!captureRef.current) return

    const canvas = await html2canvas(captureRef.current, { useCORS: true })
    const imageURL = canvas.toDataURL('image/png') // Convert to base64

    setScoreImage(imageURL)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'score.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  async function shareChallenge() {
    const gameLink = `https://your-game.com/challenge?ref=${username}`
    const message = `🔥 ${username} scored ${score} points! Can you beat them? Play now: ${gameLink}`

    // if (navigator.share && navigator.canShare({ files: [new File([scoreImage], 'challenge.png', { type: 'image/png' })] })) {
    //   // Mobile: Use Web Share API (image + text)
    //   try {
    //     await navigator.share({
    //       text: message,
    //       files: [new File([scoreImage], 'challenge.png', { type: 'image/png' })],
    //     })
    //     return
    //   } catch (error) {
    //     console.log('Web Share failed, using WhatsApp instead', error)
    //   }
    // }

    // Web: Use WhatsApp API (text only)
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <Modal title="Challenge a Friend" onClose={onClose}>
      <div className={styles.container}>
        {formStep == 1 ? (
          <div className={styles.createUsername}>
            <Input fullWidth type="text" label="Save your progress" placeholder="Create your username" onChange={(e) => console.log(e.target.value)} />
            <Button
              width={120}
              additionalStyles={styles.saveButton}
              type="primary"
              text="Save"
              backgroundColor="#673ab7"
              borderColor="#673ab7"
              padding="12px 0"
              onClick={saveSession}
            />
          </div>
        ) : (
          <div className={styles.share}>
            <div className={styles.score} ref={captureRef}>
              <p>Can you beat my score?</p>
              <ReactSpeedometer height={200} value={score} maxValue={20} needleColor="#ffffff" textColor="#ffffff" needleHeightRatio={0.8} ringWidth={20} />
              <p>I got {score} out of 20 on Globetrotter</p>
            </div>

            <div className={styles.buttons}>
              <Button
                fullWidth
                type="outline"
                text="Save Image"
                fontSize={18}
                padding="14px 0"
                backgroundColor="#ffffff"
                borderColor="#5a1ad7"
                textColor="#5a1ad7"
                onClick={downloadScore}
              />
              <Button
                fullWidth
                type="primary"
                text="Invite Friend"
                fontSize={18}
                padding="14px 0"
                backgroundColor="#5a1ad7"
                borderColor="#5a1ad7"
                textColor="#ffffff"
                onClick={shareChallenge}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
