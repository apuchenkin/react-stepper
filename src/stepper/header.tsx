import * as React from "react";
import { Context, Index } from "./context";

interface Props {
  index: Index;
  title: React.ReactNode;
}

const Header: React.FunctionComponent<Props> = ({ index, title }) => {
  const { goAt } = React.useContext(Context);
  return <header onClick={() => goAt(index)}>{title}</header>;
};

export default Header;
