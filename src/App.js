import React, { useState } from 'react';
import { Box, Grid, Tab, Tabs, styled } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import UserList from './USER/UserList';
import GroupList from './GROUP/GroupList';
import './App.css';

const StyledTab = styled(Tab)(({ theme }) => ({
  backgroundColor: '#ddd',
  borderRadius: '6px 6px 0px 0px',
  minHeight: 0,
  marginTop: 10,
  height: 32,
  marginRight: 2,
  '&.Mui-selected': {
    backgroundColor: '#1976d2',
    color: '#fff',
  },
}));

const App = () => {
  const [valueTab, setValueTab] = useState(0);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  return (
    <Router>
      <Box sx={{ textAlign: "center", marginTop: "30px", paddingBottom: "-20px", fontSize: "25px", textTransform: "uppercase" }}>
        <h4>User Management</h4>
      </Box>
      <div className="tab-content">
        <Grid container direction={"column"} sx={{ px: 0.5 }}>
          <Grid item>
            <Tabs
              value={valueTab}
              onChange={handleChange}
              style={{
                minHeight: '0px',
                borderBottom: '1px solid #ddd',
              }}
            >
              <Link to="/groups" style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledTab label="Groups" icon={<GroupIcon />} iconPosition="start" />
              </Link>
              <Link to="/users" style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledTab label="Users" icon={<PersonIcon />} iconPosition="start" />
              </Link>
            </Tabs>
          </Grid>
          <Grid item container xs direction="column">
            <Routes>
              <Route path="/groups" element={<GroupList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="*" element={<Navigate to="/groups" />} />
            </Routes>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
