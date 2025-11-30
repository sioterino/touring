    import type React from "react"
    import { useState, useRef, useEffect } from "react"
    import { Info } from "lucide-react"
    import styles from "./styles.module.css"

    type Position = "top" | "bottom" | "left" | "right"

    interface Props {
    text: string
    position?: Position
    icon?: React.ReactNode
    className?: string
    }

    const TooltipIcon = ({ text, position = "top", icon, className }: Props) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const tooltipRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const checkMobile = () => setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (isMobile && tooltipRef.current && !tooltipRef.current.contains(event.target as Node))
            setIsVisible(false)
        }

        if (isVisible && isMobile) {
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isVisible, isMobile])

    const handleClick = () => {
        if (isMobile) setIsVisible(!isVisible)
    }

    const getTooltipClass = () => {
        const positionClasses = {
            top: styles.tooltipTop, bottom: styles.tooltipBottom,
            left: styles.tooltipLeft, right: styles.tooltipRight,
        }
        return `${styles.tooltip} ${positionClasses[position]}`
    }

    const getArrowClass = () => {
        const arrowClasses = {
        top: styles.arrowTop, bottom: styles.arrowBottom,
        left: styles.arrowLeft, right: styles.arrowRight,
        }
        return `${styles.arrow} ${arrowClasses[position]}`
    }

    return (
        <div className={styles.container} ref={tooltipRef}>
        <button
            type="button"
            className={`${styles.button} ${className || ""}`}
            onClick={handleClick}
            onMouseEnter={() => !isMobile && setIsVisible(true)}
            onMouseLeave={() => !isMobile && setIsVisible(false)}
        >
        {icon || (
            <Info className={`${styles.icon} ${className || 'defaultIconColor'}`} />
        )}
        </button>

        {isVisible && (
            <div className={getTooltipClass()} role="tooltip">
            {text}
            <div className={getArrowClass()} />
            </div>
        )}
        </div>
    )
    }

    export default TooltipIcon