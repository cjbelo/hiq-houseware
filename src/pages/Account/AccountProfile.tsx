import { FC } from "react";
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";

type PropTypes = {
  user: any;
};

export const AccountProfile: FC<PropTypes> = ({ user }) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {user.avatar ? (
          <Avatar
            src={user.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
        ) : (
          <Avatar
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          >
            <Typography variant="h4">{user.firstName.charAt(0).toUpperCase()}</Typography>
          </Avatar>
        )}
        <Typography color="textPrimary" gutterBottom variant="h5">
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.email}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button color="primary" fullWidth variant="text">
        Upload picture
      </Button>
    </CardActions>
  </Card>
);
