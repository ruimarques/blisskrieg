import styles from './Loading.module.css';

const LoadingComponent = () => {
  return (
    <div className={styles.centerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingComponent;
