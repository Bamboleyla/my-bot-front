import { Header } from "../../shared/components/Header";
import { Start } from "../Start";
import { WhatIs } from "../WhatIs";
import { YouWillBeAble } from "../YouWillBeAble";
import styles from "./styles.module.scss";

export const Welcome = () => {
  return (
    <div className={styles.welcome} data-testid={"Welcome"}>
      <Header />
      <Start />
      <WhatIs />
      <YouWillBeAble />
    </div>
  );
};
