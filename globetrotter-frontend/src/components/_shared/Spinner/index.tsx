import clsx from 'clsx'
import styles from './styles.module.scss'

type SpinnerPropsType = {
  buttonLoader?: boolean
  invertColor?: boolean
}

export default function Spinner({ buttonLoader, invertColor = false }: SpinnerPropsType) {
  return <div className={clsx(styles.container, buttonLoader ? styles.buttonLoader : null, invertColor ? styles.invert : null)}></div>
}
