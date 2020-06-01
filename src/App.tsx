import React, { useEffect } from "react";
import "./styles/main.scss";
import { Route, Switch } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import { connect } from "react-redux";
import { AppStateType } from "./redux/store";
import { initApp } from "./redux/app-reducer";
import PreloaderApp from "./components/preloader/PreloaderApp";
import UsersContainer from "./components/users/UsersContainer";
import ProfileContainerHoc from "./components/profile/ProfileContainer";
import DemoWorks from "./components/demoworks/DemoWorks";
import TestCont from "./components/test/TestCont";
interface PropsType {
  initialized: boolean;
  initApp: () => void;
}

const App: React.FC<PropsType> = ({ initApp, initialized }) => {
  useEffect(() => {
    initApp();
  }, [initApp]);
  if (!initialized) return <PreloaderApp />;
  return (
    <div className="app">
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" render={() => <ProfileContainerHoc />} />
          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/demoworks" component={DemoWorks} />
          <Route path="/test" render={() => <TestCont />} />
          <Route
            path="/profile/:userId?"
            render={() => <ProfileContainerHoc />}
          />
          <Route path="/signIn" render={() => <Login />} />
        </Switch>
      </div>
    </div>
  );
};

type mapStatePropsType = {
  initialized: boolean;
};

const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
  initialized: state.app.initialized,
});

export default connect(mapStateToProps, { initApp })(App);
