import { useEffect } from 'react'
import styles from './styles.module.scss'
import { Icon } from '@iconify/react'
import Button from '../Button'

type ModalPropsType = {
  title?: string
  children: React.ReactElement
  onClose?: () => void
  showHeader?: boolean
  hideClose?: boolean
  sideButton?: boolean
  sideButtonAction?: () => void
  sideButtonText?: string
  stopPropagation?: boolean
}

export default function Modal({
  title,
  children,
  onClose,
  showHeader = true,
  hideClose,
  sideButton,
  sideButtonAction,
  sideButtonText,
  stopPropagation,
}: ModalPropsType) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div
      className={styles.container}
      onClick={(e) => {
        if (stopPropagation) {
          e.stopPropagation()
        }
      }}
    >
      <div className={styles.modal}>
        {showHeader ? (
          <div className={styles.header}>
            {title ? <p className={styles.title}>{title}</p> : null}

            <div className={styles.buttons}>
              {sideButton && sideButtonAction && sideButtonText && (
                <Button
                  onClick={() => {
                    sideButtonAction()
                  }}
                  type="primary"
                  text={sideButtonText}
                  backgroundColor="#1FAC78"
                  padding="10px 30px"
                />
              )}

              {hideClose ? null : (
                <button className={styles.closeButton} onClick={onClose}>
                  <Icon icon="ph:x-bold" width={20} />
                </button>
              )}
            </div>
          </div>
        ) : null}

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
