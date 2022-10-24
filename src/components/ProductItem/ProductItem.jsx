import { Button } from "../Button/Button";
import styles from "./productItem.module.scss";

export const ProductItem = ({ product, className, onAdd }) => {
  const onAddHandler = () => onAdd(product);
  return (
    <div className={styles.product}>
      <div className={styles.img}> </div>
      <div className={styles.title}> {product.title}</div>
      <div className={styles.description}> {product.description}</div>
      <div className={styles.price}>
        <span>
          Стоимость:<b>{product.price}</b>
        </span>
      </div>
      <Button className={styles.add_btn} onClick={onAddHandler}>
        Добавить в корзину
      </Button>
    </div>
  );
};
