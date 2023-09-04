import styles from "./styles.module.scss";

interface Props {
  img: string;
  title: string;
}
export const WhoIsItForCard = ({ img, title }: Props) => {
  return (
    <div className={styles.component}>
      <img src={img} alt={`Card ${title}`} />
      <p>{title}</p>
    </div>
  );
};
