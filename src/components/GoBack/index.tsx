import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { ArrowLeft } from 'lucide-react'

interface Props {
    path: string
    text?: string
}

const GoBack = ({ path, text = 'Go back' }: Props) => {

    const navigate = useNavigate()

    return (
      <div className={styles.container}>
        <button onClick={() => navigate(path)} className={styles.backButton}>
          <ArrowLeft className={styles.backIcon} />
          {text}
        </button>
      </div>
    )

}

export default GoBack