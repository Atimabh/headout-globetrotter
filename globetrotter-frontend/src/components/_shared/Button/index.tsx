import styles from './styles.module.scss'
import clsx from 'clsx'

type ButtonPropsType = {
  text: string | React.ReactElement
  icon?: React.ReactElement
  icon2?: React.ReactElement
  fullWidth?: boolean
  onClick: () => void
  type: 'primary' | 'secondary' | 'outline'
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  additionalStyles?: string | React.CSSProperties
  disabled?: boolean
  width?: number
  padding?: string
  borderRadius?: number
  fontSize?: number
  margin?: string
}

export default function Button({
  text,
  icon,
  icon2,
  fullWidth,
  onClick,
  type,
  backgroundColor,
  textColor,
  borderColor,
  additionalStyles,
  disabled = false,
  width,
  padding,
  borderRadius,
  fontSize,
  margin,
}: ButtonPropsType) {
  return (
    <button
      className={clsx(
        styles.button,
        type == 'primary' && !disabled
          ? styles.primary
          : type == 'primary' && disabled
            ? styles.primaryDisabled
            : type == 'secondary'
              ? styles.secondary
              : styles.outline,
        fullWidth ? styles.fullWidth : null,
        disabled ? styles.disabled : null,
        additionalStyles
      )}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        borderColor: borderColor,
        width: width ? `${width}px` : 'auto',
        padding: padding ? padding : '10px 16px',
        borderRadius: borderRadius ? `${borderRadius}px` : '8px',
        fontSize: fontSize ? `${fontSize}px` : '14px',
        margin: margin ? margin : undefined,
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      disabled={disabled}
    >
      {icon ? <div className={styles.icon}>{icon}</div> : null}
      {text}
      {icon2 ? <div className={styles.icon2}>{icon2}</div> : null}
    </button>
  )
}
