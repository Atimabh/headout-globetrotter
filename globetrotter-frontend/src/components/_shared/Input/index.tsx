import clsx from 'clsx'
import styles from './styles.module.scss'

type InputPropsType = {
  isError?: boolean
  label?: string | React.ReactElement
  type: string
  placeholder?: string
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  additionalStyles?: React.CSSProperties | string
  fullWidth?: boolean
  required?: boolean
  margin?: string
  disabled?: boolean
  defaultValue?: string
  maxDate?: string
}

export default function Input({
  isError,
  label,
  type,
  placeholder,
  inputProps,
  onChange,
  additionalStyles,
  fullWidth,
  required,
  margin,
  maxDate,
  disabled,
  defaultValue,
}: InputPropsType) {
  return (
    <div
      className={clsx(styles.container, isError ? styles.error : null, additionalStyles, disabled ? styles.disabled : null)}
      style={{ width: fullWidth ? '100%' : 'inherit', margin: margin ? margin : undefined }}
    >
      {label ? (
        <label>
          {label}
          {required ? <span className={styles.required}>*</span> : null}{' '}
        </label>
      ) : null}
      <input
        max={type === 'date' ? maxDate : undefined}
        {...inputProps}
        disabled={disabled}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  )
}
