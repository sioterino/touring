import { useContext, useId, useState , type ReactNode, } from "react";
import styles from "./styles.module.css";
import { AccordionGroupContext  } from "../AccordionGroup";
import { parseMarkdown } from "../../../utils/MarkdownUtils";

export interface Props {
  title: string;
  /**
   * Content to display.
   * - Pass a **string** and it will be rendered through the
   *   built-in mini-markdown parser (supports bold, italic,
   *   inline code, and bullet lists via "- ").
   * - Pass **ReactNode** for full control (nested accordions, etc).
   */
  children: ReactNode;
  /** Start in the open state */
  defaultOpen?: boolean;
}

const AccordionItem = ({ title, children, defaultOpen = false }: Props) => {
  
  const uid = useId();
  const group = useContext(AccordionGroupContext);

  const [ localOpen, setLocalOpen ] = useState(defaultOpen);

  const isControlledByGroup = group !== null && !group.allowMultiple;
  const isOpen = isControlledByGroup ? group.openId === uid : localOpen;

  const handleToggle = () => {
    if (isControlledByGroup)
      group.toggle(uid);

    else  setLocalOpen((prev) => !prev);
  };

  const panelId = `accordion-panel-${uid}`;
  const headerId = `accordion-header-${uid}`;

  const content = typeof children === "string" ? parseMarkdown(children) : children;

  return (
    <div className={styles.accordionItem}>
      <h3>
        <button
          id={headerId} className={styles.header} onClick={handleToggle}
          aria-expanded={isOpen} aria-controls={panelId} type="button"
        >
          <span className={styles.title}>{title}</span>

          {/* Plus / minus icon */}
          <span className={styles.icon} aria-hidden="true">
            <span className={styles.iconBarHorizontal} />
            <span className={ isOpen ? styles.iconBarVerticalOpen : styles.iconBarVertical } />
          </span>

        </button>
      </h3>

      <div
        id={panelId} role="region" aria-labelledby={headerId}
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
      >
        <div className={styles.panelInner}>
          <div className={styles.content}>{content}</div>
        </div>
      </div>
    </div>
  );
}

export default AccordionItem