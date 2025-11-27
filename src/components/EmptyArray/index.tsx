import { Plus } from 'lucide-react'
import styles from './styles.module.css'

interface Props {
  title?: string
  desc?: string
  showButton?: boolean
}

const EmptyArray = ({ title = 'No records found', desc = "We’re still preparing this section or gathering data. Check back later!", showButton = false }: Props) => {
    return (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateContent}>
            <h3 className={styles.emptyTitle}>{title}</h3>
            <p className={styles.emptyDescription}>{desc}</p>
            { showButton &&
              <button className={styles.emptyButton}>
                <Plus className={styles.emptyButtonIcon} />
                Criar primeira dúvida
              </button>
            }
          </div>
        </div>
    )
}

export default EmptyArray