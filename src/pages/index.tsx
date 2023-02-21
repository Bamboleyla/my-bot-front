import { Route, Routes } from "react-router-dom";
import { Authorization } from "./Authorization";
import { Registration } from "./Registration";

export const Routing = () => {
  return (
    <Routes>
      <Route index element={<Authorization />} />
      <Route path={"auth"} element={<Authorization />} />
      <Route path={"registration"} element={<Registration />} />
    </Routes>
  );
};
