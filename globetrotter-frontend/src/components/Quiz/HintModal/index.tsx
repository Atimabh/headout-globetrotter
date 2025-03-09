import { Icon } from '@iconify/react/dist/iconify.js'
import Modal from '../../_shared/Modal'
import styles from './styles.module.scss'

type HintModalPropsType = {
  onClose: () => void
  hint: string
}

export default function HintModal({ onClose, hint }: HintModalPropsType) {
  return (
    <Modal title="Hint" onClose={onClose}>
      <div className={styles.container}>
        <p>
          <span>
            <Icon icon={'emojione:light-bulb'} width={24} />
          </span>{' '}
          {hint}
        </p>
      </div>
    </Modal>
  )
}
