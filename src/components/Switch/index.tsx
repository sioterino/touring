import { useState } from "react"
import styles from "./styles.module.css"

interface Props {
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  size?: "sm" | "md" | "lg"
  color?: "primary" | "success" | "warning" | "danger" | "purple" | "pink"
  className?: string
}

const Switch = ({ defaultChecked = false, onChange, disabled = false, size = "md", color = "primary", className = "", }: Props) => {
  const [ isOn, setIsOn ] = useState(defaultChecked)

  const handleToggle = () => {
    if (disabled) return
    const newState = !isOn
    setIsOn(newState)
    onChange?.(newState)
  }

  return (
    <button
      className={`${styles.switch} ${isOn ? styles.on : styles.off} ${styles[size]} ${
        styles[color]
      } ${disabled ? styles.disabled : ""} ${className}`}
      onClick={handleToggle}
      disabled={disabled}
      role="switch"
      aria-checked={isOn}
      type="button"
    >
      <span className={styles.slider}>
        <span className={styles.thumb} />
      </span>
    </button>
  )
}

export default Switch