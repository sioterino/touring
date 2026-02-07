import { createContext, useCallback, useMemo, useState, type ReactNode, } from "react";
import styles from './styles.module.css'

interface GroupContext {
  openId: string | null;
  toggle: (id: string) => void;
  allowMultiple: boolean;
}

const AccordionGroupContext = createContext<GroupContext | null>(null);

interface Props {
  /** Allow more than one item open at once (default: false) */
  allowMultiple?: boolean;
  children: ReactNode;
}

const AccordionGroup = ({ allowMultiple = false, children, }: Props) => {
  const [ openId, setOpenId ] = useState<string | null>(null);

  const toggle = useCallback(
    (id: string) => { setOpenId((prev) => (prev === id ? null : id)); }, []
  );

  const ctx = useMemo(
    () => ({ openId, toggle, allowMultiple }),
    [openId, toggle, allowMultiple]
  );

  return (
    <AccordionGroupContext.Provider value={ctx}>
      <div className={styles.accordionGroup} role="presentation" data-accordion-group>
        {children}
      </div>
    </AccordionGroupContext.Provider>
  );
}

export default AccordionGroup
export { type GroupContext, AccordionGroupContext }