import * as React from "react";
import { AppBar, Container, Typography } from "@mui/material";
import { AppHeaderProps } from "./props";
import { HorizontalContainer } from "./styles";

/**
 * Header component for Local Holidays 1.0.
 * @param logo: Text to display as the top left logo
 * @returns AppBar component
 */
const AppHeader = ({ logo }: AppHeaderProps) => {
  return (
    <AppBar position="static">
      <Container disableGutters maxWidth="xl">
        <HorizontalContainer>
          <Typography variant="h6">{logo}</Typography>
        </HorizontalContainer>
      </Container>
    </AppBar>
  );
};

export { AppHeader };
