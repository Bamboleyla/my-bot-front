import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import styles from "./authorization.module.scss";

export const ErrorAuth = ({
  text,
  visible,
}: {
  text: string[];
  visible: boolean;
}) => {
  return (
    <div
      className={styles.error}
      style={visible ? { visibility: "visible" } : { visibility: "hidden" }}
    >
      <div className={styles.error_icon}>
        <ReportGmailerrorredOutlinedIcon fontSize="small" color="error" />
      </div>
      <div className={styles.error_text}>{text[0]}</div>
    </div>
  );
};
