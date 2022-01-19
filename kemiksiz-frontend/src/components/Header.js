import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";



const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const history = useHistory();
  const location = useLocation();
  const isAdmin = localStorage.getItem("isAdmin");

  const [showHeader, setShowHeader] = React.useState(true)
  const [pages, setPages] = React.useState([]);


  // React.useEffect(()=>{

  // },[location.pathname])

  React.useEffect(() => {
    if (location.pathname === "/login")
      setShowHeader(false)
  }, [location.pathname])

  React.useEffect(() => {
    if (location.pathname === "/")
      setShowHeader(true)
  }, [location.pathname])

  React.useEffect(() => {
    console.log("admin",isAdmin);
    setPages(
      isAdmin === undefined || isAdmin === null
        ? []
        : isAdmin === "false"
          ? [{ label: "My Bills", link: "/mybills" }]
          : [
            { label: "Apartments", link: "/apartments" },
            { label: "Users", link: "/users" },
            { label: "Bills", link: "/bills" },
            { label: "My Bills", link: "/mybills" },
          ])
  
  }, [])
  return (
    showHeader ?
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <Link to="/">
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Kemiksiz" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Link>
              <div style={{ position: "absolute", right: 0 }}>
                <Button
                  onClick={() => {
                    localStorage.removeItem("userId");
                    localStorage.removeItem("isAdmin")
                    history.push("login");
                  }}
                  variant="contained"
                  color="error"
                >
                  LOGOUT
                </Button>
              </div>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
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
                {pages.map((page) => (
                  <Link to={page.link} key={page.label}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.label}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <Link to="/">
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Kemiksiz" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link to={page.link} key={page.label}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.label}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      : <></>
  );
};
export default Header;
