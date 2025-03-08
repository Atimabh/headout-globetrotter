import { useRef, useState } from 'react'
import Button from '../../../_shared/Button'
import Input from '../../../_shared/Input'
import Modal from '../../../_shared/Modal'
import styles from './styles.module.scss'
import ReactSpeedometer from 'react-d3-speedometer'
import html2canvas from 'html2canvas'
import { postRequest } from '../../../../utils/requests'
import { toast } from 'react-toastify'
import Spinner from '../../../_shared/Spinner'

import { hmac } from "@noble/hashes/hmac";
import { sha256 } from "@noble/hashes/sha256";
import { utf8ToBytes, bytesToHex } from "@noble/hashes/utils";

type ChallengeFriendModalPropsType = {
  onClose: () => void
  score: number
}

const secret = process.env.SECRET

function generateSignature(username: string, score: number): string {
  const key = utf8ToBytes(secret)
  const message = utf8ToBytes(`${username}${score}`)
  const signature = hmac(sha256, key, message)
  return bytesToHex(signature)
}

async function generateHash(data: string) {
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)

  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

export default function ChallengeFriendModal({ onClose, score }: ChallengeFriendModalPropsType) {
  // Reference for capturing the score display as an image
  const captureRef = useRef(null)
  // State to manage the two-step form process (1: username input, 2: sharing options)
  const [formStep, setFormStep] = useState(1)
  // State to store the generated score image
  const [scoreImage, setScoreImage] = useState(null)
  // State to store the user's username
  const [username, setUsername] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  // Function to save user's score to the backend
  async function saveSession() {
    if (username == '') {
      toast.error('Enter a valid username')
      return
    }
    setIsLoading(true)
    const payload = {
      username: username,
      score: score,
      signature: generateSignature(username, score),
    }
    const response = await postRequest('/save-score', payload)
    if (response.success) {
      toast.success('Score saved')
      setFormStep(2)
    } else {
      toast.error(response.message)
    }
    setIsLoading(false)
  }

  // Function to capture and download the score display as an image
  async function downloadScore() {
    if (!captureRef.current) return

    // Convert the DOM element to a canvas and then to a base64 image
    const canvas = await html2canvas(captureRef.current, { useCORS: true })
    const imageURL = canvas.toDataURL('image/png')

    setScoreImage(imageURL)

    // Create and trigger a download link
    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'score.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Function to share the challenge with friends
  async function shareChallenge() {
    const gameLink = `https://atimabh-globetrotter.netlify.app/challenge?ref=${username}`
    const message = `🔥 ${username} scored ${score} points! Can you beat them? Play now: ${gameLink}`

    // Try to use the Web Share API for mobile devices if available
    if (navigator.share && navigator.canShare({ files: [new File([scoreImage], 'challenge.png', { type: 'image/png' })] })) {
      try {
        await navigator.share({
          text: message,
          files: [new File([scoreImage], 'challenge.png', { type: 'image/png' })],
        })
        return
      } catch (error) {
        console.log('Web Share failed, using WhatsApp instead', error)
      }
    }

    // Fallback to WhatsApp sharing for web browsers
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <Modal title="Challenge a Friend" onClose={onClose}>
      <div className={styles.container}>
        {/* Step 1: Username input form */}
        {formStep == 1 ? (
          <div className={styles.createUsername}>
            <Input fullWidth type="text" label="Save your progress" placeholder="Create your username" onChange={(e) => setUsername(e.target.value)} />
            <Button
              width={120}
              additionalStyles={styles.saveButton}
              type="primary"
              text={isLoading ? <Spinner buttonLoader /> : 'Save'}
              backgroundColor="#673ab7"
              borderColor="#673ab7"
              padding="12px 0"
              onClick={saveSession}
            />
          </div>
        ) : (
          // Step 2: Score display and sharing options
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
                text="Download Score"
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
