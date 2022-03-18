import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { getUser } from "../../pages/Login/Login.slice";

import { nav } from "./nav";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const ResponsiveAppBar: FC = () => {
  const dispatch = useAppDispatch();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState("");
  const [avatar, setAvatar] = useState("");
  const open = Boolean(anchorElNav);
  const navigate = useNavigate();
  const user = useAppSelector(getUser);

  useEffect(() => {
    if (user) {
      if (user.avatar) {
        setAvatar(user.avatar);
      } else {
        const av = user.firstName.charAt(0).toUpperCase();
        setAvatar(av);
      }
    }
  }, [user]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    const { path } = event.currentTarget.dataset;
    switch (path) {
      case "logout":
        dispatch({ type: "user/LOG_OUT" });
        navigate("/login");
        break;
      case "dashboard":
        navigate("/");
        break;
      default:
        navigate(`/user/${path}`);
        break;
    }
    handleCloseUserMenu();
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNav(event.currentTarget);
    setOpenMenu(event.currentTarget.id);
  };

  const handleCloseMenu = () => {
    setAnchorElNav(null);
    setOpenMenu("");
  };

  const gotoPage = (e: string) => {
    handleCloseMenu();
    navigate(`/${e}`);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {nav.map((n, i) => (
            <React.Fragment key={i}>
              <Button
                id={`nav-${n.id}`}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleOpenMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {n.label}
              </Button>
              {n.sub && (
                <Menu
                  id={`menu-${n.id}`}
                  anchorEl={anchorElNav}
                  open={openMenu === `nav-${n.id}`}
                  onClose={handleCloseMenu}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {n.sub.map((sn: any, j) => {
                    return sn === "-" ? (
                      <Divider key={j} />
                    ) : (
                      <MenuItem key={j} onClick={() => gotoPage(sn.url)}>
                        {sn.label}
                      </MenuItem>
                    );
                  })}
                </Menu>
              )}
            </React.Fragment>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user.avatar ? (
                <Avatar alt="Nick Belo" src={avatar} />
              ) : (
                <Avatar sx={{ bgcolor: red[500] }} alt="Nick Belo">
                  {avatar}
                </Avatar>
              )}
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} data-path={`${setting.toLowerCase()}`} onClick={handleUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
