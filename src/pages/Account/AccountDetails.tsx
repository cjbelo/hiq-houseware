import { FC } from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from "@mui/material";

type PropTypes = {
  user: any;
};

export const AccountDetails: FC<PropTypes> = ({ user }) => {
  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="Your account profile information" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                required
                value={user.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                required
                value={user.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth label="Email Address" name="email" required value={user.email} variant="outlined" />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth label="Phone Number" name="phone" value={user.phone} variant="outlined" />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth label="Username" name="username" required value={user.username} variant="outlined" />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={user.password}
                variant="outlined"
                type="password"
                required
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
