import { Flex } from "antd";
import classes from "./Header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={classes.header}>
      <Flex justify="center" align="center">
        <div className={classes.headerContent}>
          <Link to="">
            <img src="/images/logo.png" alt="logo" width={150} height={24} />
          </Link>
        </div>
      </Flex>
    </header>
  );
};

export default Header;
