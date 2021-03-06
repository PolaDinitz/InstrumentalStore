import * as React from "react";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button, Chip,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PianoIcon from '@mui/icons-material/Piano';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {selectCartItemsCount} from "./redux/Cart/cart.selectors";
import {userActions} from "./redux/User/user.actions";
import {AppDispatch, RootState} from "./type";
import socketIOClient from "socket.io-client";
import {config} from "./config/config";

interface Page {
  name: string;
  path: string;
}

interface NavbarProps {
  pages: Array<Page>;
}

const Navbar = (props: NavbarProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [numOfConnectedUsers, setNumOfConnectedUsers] = useState(0);

  useEffect(() => {
    const socket = socketIOClient(config.apiUrl);
    socket.on("users", numOfConnectedUsers => {
      setNumOfConnectedUsers(numOfConnectedUsers);
    });
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(userActions.logout());
  };

  const { pages } = { ...props };

  const cartTotalItems = useSelector(selectCartItemsCount);
  const isLoggedIn = useSelector(
    (state: RootState) => state.userState.loggedIn
  );
  const user = useSelector((state: RootState) => state.userState.user);
  const welcomeName = user?.firstName || "guest";

  return (
    <AppBar position="static" sx={{ marginBottom: "20px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PianoIcon />
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Instrumentore
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page: Page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link style={{ textDecoration: "none" }} to={page.path}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Instrumentore
          </Typography>
          <Chip variant="outlined" sx={{ color: "white" }} label={"Welcome " + welcomeName}/>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page: Page) => (
              <Link
                style={{ textDecoration: "none" }}
                key={page.name}
                to={page.path}
              >
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Link
              style={{ textDecoration: "inherit", color: "inherit" }}
              to="/cart"
            >
              <IconButton
                sx={{ marginRight: "10px" }}
                size="large"
                aria-label="show cart"
                color="inherit"
              >
                <Badge badgeContent={cartTotalItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {user?.role === "Admin" && (
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to="products/dashboard"
                >
                  <MenuItem key="Dashboard" onClick={handleCloseUserMenu}>
                    Dashboard
                  </MenuItem>
                </Link>
              )}
              {isLoggedIn && (
                <div>
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to="/orders/history"
                  >
                    <MenuItem key="OrdersHistory" onClick={handleCloseUserMenu}>
                      Orders history
                    </MenuItem>
                  </Link>
                  <MenuItem key="Logout" onClick={handleLogout}>
                    <Typography>Logout</Typography>
                  </MenuItem>
                </div>
              )}
              {!isLoggedIn && (
                <div>
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to="/login"
                  >
                    <MenuItem key="Login" onClick={handleCloseUserMenu}>
                      Login
                    </MenuItem>
                  </Link>
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to="/register"
                  >
                    <MenuItem key="Register" onClick={handleCloseUserMenu}>
                      Register
                    </MenuItem>
                  </Link>
                </div>
              )}
            </Menu>
          </Box>
          <Box sx={{ marginLeft: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography>
              Active Users
            </Typography>
            <Typography>
              {numOfConnectedUsers}
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
