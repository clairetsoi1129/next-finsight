import React from "react";
import DashboardBox from "../(shared)/DashboardBox";

type Props = {};

const Row3 = (props: Props) => {
  return (
    <div>
      <DashboardBox bgcolor="#000" gridArea="g"></DashboardBox>
      <DashboardBox bgcolor="#000" gridArea="h"></DashboardBox>
      <DashboardBox bgcolor="#000" gridArea="i"></DashboardBox>
      <DashboardBox bgcolor="#000" gridArea="j"></DashboardBox>
    </div>
  );
};

export default Row3;
