import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function ResponsiveAppBar() {
  return (
    <AppBar style={{ background: "" }} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "montserrat   ",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Kapture CX
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box
            style={{ position: "fixed", right: "45px" }}
            sx={{ flexGrow: 0 }}
          >
            <IconButton sx={{ p: 0 }}>
              <img
                alt="Remy Sharp"
                style={{
                  height: "35px",
                  width: "35px",
                  borderRadius: "19px",
                }}
                src="data:image/png;base64,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"
              />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
