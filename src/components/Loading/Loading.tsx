import styles from './Loading.module.scss';

const Loading = () => {
    return (
        <div className={styles.lds_dual_ring}></div>
    );
};

export default Loading;
