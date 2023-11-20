import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Grid, Stack, Tooltip } from "@mui/material";
import Search from "./Search/Search";
import { useNavigate } from "react-router-dom";
import MenuCate from "../MenuCate";
import style from "./styleMenuNav.module.scss";
import { useUserContext } from "../../../../context/UserContext";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { currentUser, handleSignout } = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (currentUser) {
      // Xử lý logic khi có currentUser từ local storage
      setIsLoggedIn(true);
    }
  }, [currentUser]); // Chạy một lần sau khi component được render

  const handleSignIn = (text) => {
    if (text === "Sign In" || text === "Join") {
      if (!isLoggedIn) {
        navigate("/sign-in");
      }
    } else if (text === "Logout") {
      handleSignout();
      setIsLoggedIn(false);
    }
  };

  const pages = isLoggedIn
    ? ["Business solutions", "Explore", "Become a Seller", "Sign Out"]
    : ["Business solutions", "Explore", "Become a Seller", "Sign In", "Join"];

  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [scrolling, setScrolling] = useState(false);
  // Sử dụng useEffect để theo dõi sự kiện cuộn
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [scrollingCate, setScrollingCate] = useState(false);

  // Sử dụng useEffect để theo dõi sự kiện cuộn
  useEffect(() => {
    const handleScrollCate = () => {
      if (window.scrollY > 280) {
        setScrollingCate(true);
      } else {
        setScrollingCate(false);
      }
    };

    window.addEventListener("scroll", handleScrollCate);

    return () => {
      window.removeEventListener("scroll", handleScrollCate);
    };
  }, []);

  return (
    <div className={style.js2}>
      <AppBar className={scrolling ? style.js22 : style.js21}>
        <Container maxWidth="xl">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
          >
            {/* menu button */}
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
                {pages.map((page, index) => (
                  <MenuItem key={index} onClick={() => handleSignIn(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
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
              <a href="/?source=top_nav" class="site-logo">
                <svg
                  width="89"
                  height="27"
                  viewBox="0 0 89 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="#404145">
                    <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path>
                  </g>
                  <g fill="#1dbf73">
                    <path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path>
                  </g>
                </svg>
              </a>
            </Typography>

            <Grid item md={5} className={style.js1}>
              <Grid md={4}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <a href="/?source=top_nav" class="site-logo">
                    <svg
                      width="89"
                      height="27"
                      viewBox="0 0 89 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="black">
                        <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path>
                      </g>
                      <g fill="#1dbf73">
                        <path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path>
                      </g>
                    </svg>
                  </a>
                </Typography>
              </Grid>

              <Grid item md={8} className={scrolling ? "" : style.js3}>
                <Search />
              </Grid>
            </Grid>

            <Grid item md={7} className={style.js1}>
              <Grid item md={8}>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page, index) => (
                    <Button
                      key={index}
                      //onClick={handleCloseNavMenu}
                      onClick={() => handleSignIn(page)}
                      sx={{
                        my: 2,
                        color: "black",
                        display: "block",
                        border: page === "Join" ? "1px solid black" : "none",
                      }}
                    >
                      {page === "Sign Out" ? (
                        <Box sx={{ flexGrow: 0 }}>
                          <Tooltip title="Open settings">
                            <IconButton
                              onClick={handleOpenUserMenu}
                              sx={{ p: 0 }}
                            >
                              <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/2.jpg"
                              />
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
                              <MenuItem
                                key={setting}
                                onClick={() => {
                                  if (setting === "Logout") {
                                    handleSignIn(setting); // Gọi hàm handleSignIn khi Logout được click
                                  } else {
                                    handleCloseUserMenu(); // Đóng menu nếu không phải Logout
                                  }
                                }}
                              >
                                <Typography textAlign="center">
                                  {setting}
                                </Typography>
                              </MenuItem>
                            ))}
                          </Menu>
                        </Box>
                      ) : (
                        <>{page}</>
                      )}
                    </Button>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Stack>
        </Container>
        <Grid className={scrollingCate ? "" : style.js4}>
          <MenuCate />
        </Grid>
      </AppBar>
    </div>
  );
}
export default ResponsiveAppBar;
