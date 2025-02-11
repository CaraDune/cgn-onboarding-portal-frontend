import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Container from "../components/Container/Container";
import IntroductionAdmin from "../components/Introduction/IntroductionAdmin";
import Requests from "../components/Requests/Requests";
import OperatorConvention from "../components/OperatorConvention/OperatorConvention";
import { RootState } from "../store/store";
import {
  ADMIN_PANEL_RICHIESTE,
  ADMIN_PANEL_CONVENZIONATI
} from "../navigation/routes";

const AdminPanel = () => {
  const { data } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const history = useHistory();
  const user = data as any;

  const handleClick = (newTab: string) => {
    history.push(newTab);
  };

  const selectedTab = () => {
    switch (location.pathname) {
      case ADMIN_PANEL_RICHIESTE:
        return <Requests />;
      case ADMIN_PANEL_CONVENZIONATI:
        return <OperatorConvention />;
      default:
        return <div>error</div>;
    }
  };

  return (
    <Layout>
      <Container className="mt-10 mb-20">
        <div className="col-12">
          <IntroductionAdmin
            name={user.name?.replace(".", " ")}
            handleClick={handleClick}
            activeTab={location.pathname}
          />
          {selectedTab()}
        </div>
      </Container>
    </Layout>
  );
};

export default AdminPanel;
