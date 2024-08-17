import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button, Tooltip } from '@mui/material';
import styled from 'styled-components';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { LocalSTNames, menuSite, SITE_URL } from '../../utils/const';
import { RandomKey } from '../../utils/helpers';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const LeftMenu = styled.div<{ $menuWidth: boolean }>`
  width: ${({ $menuWidth }) => ($menuWidth ? '360px' : '65px')};
  height: 100vh;
  background: white;
  box-shadow: 1px 1px 20px #e1e1e1;
  transition: 0.3s;
`;

function MainTemplate({ children, pageTitle }: MainTemplate) {
  const navigate = useNavigate();
  const menuStatus: string | null = localStorage.getItem(LocalSTNames.menuStatus);
  const location = useLocation();
  const [menu, setMenu] = useState<boolean>(menuStatus ? Boolean(+menuStatus) : true);

  useEffect(() => {
    if (menuStatus) {
      setMenu(Boolean(+menuStatus));
    }
  }, [menuStatus]);

  function ChangeMenu() {
    const st = !menu;
    setMenu(st);
    localStorage.setItem(LocalSTNames.menuStatus, st ? '1' : '0');
  }

  function GoToBack() {
    navigate(-1);
  }

  return (
    <div className="d-flex justify-content-start align-items-start">
      <LeftMenu $menuWidth={menu}>
        <List
          sx={{ width: '100%', maxWidth: 360 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" sx={{ opacity: menu ? 1 : 0 }}>
              Меню
            </ListSubheader>
          }>
          {menuSite.map(
            (menuItem) =>
              menuItem.section === 1 && (
                <Link key={RandomKey()} to={menuItem.url} className="c-grey">
                  <ListItemButton
                    sx={{
                      backgroundColor:
                        menuItem.url === location.pathname ? 'rgba(61,61,61,0.13)' : ''
                    }}>
                    <Tooltip title={!menu ? `Смотреть ${menuItem.name}` : ''} placement="right">
                      <ListItemIcon>
                        <menuItem.icon />
                      </ListItemIcon>
                    </Tooltip>

                    {menu && <ListItemText primary={menuItem.name} />}
                  </ListItemButton>
                </Link>
              )
          )}
        </List>
        <List
          sx={{ width: '100%', maxWidth: 360 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" sx={{ opacity: menu ? 1 : 0 }}>
              Создать
            </ListSubheader>
          }>
          {menuSite.map(
            (menuItem) =>
              menuItem.section === 2 && (
                <Link key={RandomKey()} to={menuItem.url} className="c-grey">
                  <ListItemButton
                    sx={{
                      backgroundColor:
                        menuItem.url === location.pathname ? 'rgba(61,61,61,0.13)' : ''
                    }}>
                    <Tooltip title={!menu ? `Создать ${menuItem.name}` : ''} placement="right">
                      <ListItemIcon>
                        <menuItem.icon />
                      </ListItemIcon>
                    </Tooltip>

                    {menu && <ListItemText primary={menuItem.name} />}
                  </ListItemButton>
                </Link>
              )
          )}
        </List>
      </LeftMenu>
      <div className="w-100">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={ChangeMenu}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}>
              {menu ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to={SITE_URL.HOME} className="c-white fw-bold">
                TPark
              </Link>
            </Typography>
            <ArrowBackIosIcon className="cursor-pointer" onClick={GoToBack} />
          </Toolbar>
        </AppBar>
        <div className="MainTemplate">
          <Typography variant="h5" gutterBottom>
            {pageTitle}
          </Typography>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainTemplate;
