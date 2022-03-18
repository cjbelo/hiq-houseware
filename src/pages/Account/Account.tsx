import { FC } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AppBar } from "../../components/AppBar";
import { AccountProfile } from "./AccountProfile";
import { AccountDetails } from "./AccountDetails";
import { useAppSelector } from "../../state/store";
import { getUser } from "../Login/Login.slice";

export const Account: FC = () => {
  const user = useAppSelector(getUser);
  return (
    <>
      <AppBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile user={user} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountDetails user={user} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
