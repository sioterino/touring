import { RotateCcw } from "lucide-react";
import Heading from "../../components/Heading";
import styles from "./styles.module.css";

interface Props {
  message: string;
}

const ErrorPage = ({ message }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <Heading title="Oops! Something went wrong" desc="We couldn't load this page." />
        <p className={styles.msg}>{message}</p>
        <button className={styles.retryBtn} onClick={() => window.location.reload()} >
          <RotateCcw size={16} />
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
