import React from "react";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { links } from "./config";
import classes from "./MainLayout.module.css";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Router>  
      <Layout className={classes.fullHeight}>
    <Content className={classes.header}>
          <li><a style = {{textDecoration:"none", color: "#000"}} href = "/principal" >Main</a></li>
          <li><a style = {{textDecoration:"none", color: "#000"}} href = "/secondary">Plan "B"</a></li>

</Content>
        {/* <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            {links.map((link) => (
              <Menu.Item key={link.href}>
                <Link to={link.href}>{link.title}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Header> */}
        <Content className={classes.wrapper}>
          <Switch>
            {links.map((link, index) => (
              <Route key={index} path={link.href} component={link.component} />
            ))}
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
};

export default MainLayout;
