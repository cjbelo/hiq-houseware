import { FC } from "react";
import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { red } from "@mui/material/colors";

type PropTypes = {
  title: string;
  close: () => void;
};

export const Header: FC<PropTypes> = ({ title, close }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex" }}>{title}</Box>
        <IconButton onClick={close}>
          <Avatar sx={{ bgcolor: red[500] }}>
            <CloseIcon sx={{ color: red[50] }} />
          </Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
