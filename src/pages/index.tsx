import { Route, Routes } from "react-router-dom";
import { Authorization } from "./Authorization";
import { ForgetPassword } from "./ForgetPassword";
import { Main } from "./Main";
import { Registration } from "./Registration";

export const Routing = () => {
  return (
    <Routes>
      <Route index element={<Authorization />} />
      <Route path={"auth"} element={<Authorization />} />
      <Route path={"forgetPassword"} element={<ForgetPassword />} />
      <Route path={"registration"} element={<Registration />} />
      <Route path={"main"} element={<Main />} />
    </Routes>
  );
};
