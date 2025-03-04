import React, { useState } from "react";
import {
  Avatar as MuiAvatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Box,
} from "@mui/material";
import {
  Fastfood,
  Favorite,
  Logout,
  RestaurantMenu,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useLogoutMutation } from "../../features/auth/authApiSlice";

const Avatar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useAuth();

  const [logout] = useLogoutMutation();

  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    localStorage.setItem("persist", false);
    navigate("/auth/signin");
  };

  return (
    <div className="ml-auto md:ml-0">
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <MuiAvatar
            alt={user?.name}
            src={user?.profilePicture}
            sx={{ width: 34, height: 34 }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Link
            to={"/profile"}
            className="flex items-center"
          >
            <MuiAvatar
              alt={user?.name}
              src={user?.profilePicture}
              sx={{ width: 32, height: 32, mr: 2 }}
            />{" "}
            Profile
          </Link>
        </MenuItem>
        {(user?.isAdmin || user?.isProUser) && (
          <Box>
            <Divider />
            <MenuItem>
              <Link
                to="/recipe/add"
                className="flex items-center"
              >
                <ListItemIcon>
                  <RestaurantMenu fontSize="small" />
                </ListItemIcon>
                Add new recipe
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/recipe/my-recipes"
                className="flex items-center"
              >
                <ListItemIcon>
                  <Fastfood fontSize="small" />
                </ListItemIcon>
                My recipes
              </Link>
            </MenuItem>
          </Box>
        )}
        <MenuItem>
          <Link
            to="/recipe/saved"
            className="flex items-center"
          >
            <ListItemIcon>
              <Favorite fontSize="small" />
            </ListItemIcon>
            Saved recipes
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Avatar;
