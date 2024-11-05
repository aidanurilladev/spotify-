import styles from "./Menu.module.scss";

const Menu = () => {
  return (
    <div className={styles.menu}>
      <button
        className={`${styles.menu__item} ${styles["menu__item--active"]}`}
      >
        Все
      </button>
      <button className={styles.menu__item}>Треки</button>
      <button className={styles.menu__item}>Альбомы</button>
      <button className={styles.menu__item}>Плейлисты</button>
      <button className={styles.menu__item}>Исполнители</button>
      <button className={styles.menu__item}>Профили</button>
      <button className={styles.menu__item}>Подкасты и шоу</button>
    </div>
  );
};

export default Menu;