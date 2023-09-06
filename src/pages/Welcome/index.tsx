import { Header } from "../../shared/components/Header";
import { OurRates } from "./OurRates";
import { Start } from "./Start";
import { WhatIs } from "./WhatIs";
import { WhoIsItFor } from "./WhoIsItFor";
import { YouWillBeAble } from "./YouWillBeAble";
import styles from "./styles.module.scss";

export const Welcome = () => {
  return (
    <div className={styles.component} data-testid={"Welcome"}>
      <Header />
      <Start />
      <WhatIs />
      <YouWillBeAble />
      <WhoIsItFor />
      <OurRates />
    </div>
  );
};
