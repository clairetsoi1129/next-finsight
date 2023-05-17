import React from "react";
import DashboardBox from "../(shared)/DashboardBox";

type Props = {};

const Row2 = (props: Props) => {
  return (
    <div>
      <DashboardBox bgcolor="#000" gridArea="d"></DashboardBox>
      <DashboardBox bgcolor="#000" gridArea="e"></DashboardBox>
      <DashboardBox bgcolor="#000" gridArea="f"></DashboardBox>
    </div>
  );
};

export default Row2;
