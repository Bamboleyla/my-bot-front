import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import styles from "./styles.module.scss";

export const ErrorMessage = ({
  text,
  visible,
}: {
  text: string[];
  visible: boolean;
}) => {
  return (
    <div
      className={styles.error}
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <div className={styles.error_icon}>
        <ReportGmailerrorredOutlinedIcon fontSize="small" color="error" />
      </div>
      <div className={styles.error_text}>{text[0]}</div>
    </div>
  );
};
