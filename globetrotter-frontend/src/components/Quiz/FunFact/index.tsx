import styles from './styles.module.scss'
import headout from '../../../assets/headout.svg'

export default function FunFact({ fact }: { fact: string[] }) {
  return (
    <div className={styles.container}>
      <img src={headout} alt="headout logo" />
      <div className={styles.factContainer}>
        <p className={styles.title}>Fun Fact</p>
        {/* <p className={styles.fact}>{fact.map((fact) => `${fact} `)}</p> */}
        <p className={styles.fact}>{fact[0]}</p>
      </div>
    </div>
  )
}
