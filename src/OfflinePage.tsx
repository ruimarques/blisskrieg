import HeaderComponent from './components/Header';
import styles from './App.module.css';

const OfflinePage = () => {
  return (
    <>
      <HeaderComponent title="Offline" />
      <section className={styles.content}>
        <div className="content">
          Your internet connection seems to be down.
        </div>
      </section>
    </>
  );
};

export default OfflinePage;
