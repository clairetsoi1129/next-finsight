"use client";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Row1 from "../(dashboard)/Row1";
import Row2 from "../(dashboard)/Row2";
import Row3 from "../(dashboard)/Row3";

type Props = {};
const gridTemplateLargeScreens = `
  "a"
  "a"
  "b"
`;
const gridTemplateSmallScreens = `
  "a"
  "a"
  "b"
`;

const Dashboard = (props: Props) => {
  const { palette } = useTheme();
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(3, minmax(100px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      <Row1 />
    </Box>
  );
};

export default Dashboard;
