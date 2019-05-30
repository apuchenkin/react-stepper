import * as React from "react";
import { Context, Index } from "./context";

interface Props {
  index: Index;
  title: React.ReactNode;
}

const Header: React.FunctionComponent<Props> = ({ index, title }) => {
  const { go } = React.useContext(Context);
  return <header onClick={() => go(index)}>{title}</header>;
};

export default Header;
