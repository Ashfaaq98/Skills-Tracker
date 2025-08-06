// src/App.js
import React, { useState, useEffect } from 'react';
// Removed 'Grid' from this line as it's not used
import { CssBaseline, Box, Paper, Typography, AppBar, Toolbar, ThemeProvider, createTheme } from '@mui/material';
import InsightsSidebar from './components/InsightsSidebar';
import RadarChartComponent from './components/RadarChart';
import ProjectList from './components/ProjectList';
import AddProjectFAB from './components/AddProjectFAB';
import axios from 'axios';
import { CORE_SKILLS } from './skillsConfig';

// Define a simple theme (optional, for customization)
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Example primary color
    },
    background: {
      default: '#f4f6f8', // Light grey background
      paper: '#ffffff', // White paper background
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
     h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
      marginBottom: '1rem',
      color: '#333'
    },
  },
});

function App() {
  // State to trigger updates in child components after adding a project
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [skillScores, setSkillScores] = useState({});
  const [projects, setProjects] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [error, setError] = useState(null);


  // Fetch skills and projects on mount and when updateTrigger changes
  useEffect(() => {
    const fetchData = async () => {
      setLoadingSkills(true);
      setLoadingProjects(true);
      setError(null); // Reset error on new fetch
      try {
        // Fetch skills
        const skillsRes = await axios.get('http://127.0.0.1:5000/skills');
        // Ensure scores are set for all CORE_SKILLS, defaulting to 0 if not returned
        const fetchedScores = skillsRes.data;
        const completeScores = CORE_SKILLS.reduce((acc, skill) => {
            acc[skill] = fetchedScores[skill] || 0;
            return acc;
        }, {});
        setSkillScores(completeScores);
        setLoadingSkills(false);

        // Fetch projects
        const projectsRes = await axios.get('http://127.0.0.1:5000/projects');
        setProjects(projectsRes.data);
        setLoadingProjects(false);

      } catch (err)
      {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Ensure the backend server is running.");
        setLoadingSkills(false);
        setLoadingProjects(false);
      }
    };
    fetchData();
  }, [updateTrigger]); // Re-run effect when updateTrigger changes

  // Callback function passed to the form/FAB to trigger data refetch
  const handleProjectAdded = () => {
    setUpdateTrigger(prev => prev + 1); // Increment trigger to re-run useEffect
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Header */}
        <AppBar position="static" sx={{ mb: 3 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Skills Navigator {/* Your Unique Heading */}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content Area */}
        <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden', px: 3, pb: 3 }}> {/* Added Padding */}
          
          {/* Left Sidebar */}
          <Box sx={{ width: 280, flexShrink: 0, mr: 3 }}> {/* Adjusted width and added margin */}
             <Paper elevation={2} sx={{ height: '100%', p: 2, overflowY: 'auto' }}>
               <Typography variant="h2" gutterBottom sx={{fontSize: '1.25rem' /* Adjust title size for sidebar */}}>
                    Insights
                </Typography>
               {loadingProjects || loadingSkills ? (
                    <p>Loading Insights...</p>
                  ) : (
                    <InsightsSidebar
                      projects={projects}
                      scores={skillScores}
                      coreSkills={CORE_SKILLS}
                    />
                  )}
             </Paper>
          </Box>

          {/* Center and Right Content */}
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 3, overflow: 'hidden' }}> {/* Use flex for center/right layout */}
             {/* Radar Chart Section (Center) */}
             <Box sx={{ flex: 1.5, minWidth: 0 }}> {/* Allow shrinking, give more space */}
                <Paper elevation={2} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h2">Skill Proficiency</Typography>
                  {error && <Typography color="error">{error}</Typography>}
                  {loadingSkills ? <p>Loading Chart...</p> : <RadarChartComponent skills={CORE_SKILLS} scores={skillScores} />}
                </Paper>
             </Box>

             {/* Project List Section (Right) */}
              <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}> {/* Allow shrinking */}
                  <Paper elevation={2} sx={{ p: 2, height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}> {/* Allow vertical scroll */}
                    <Typography variant="h2" sx={{ mb: 2 }}>Recent Projects</Typography>
                    <ProjectList projects={projects} isLoading={loadingProjects} error={error} />
                  </Paper>
              </Box>
          </Box>
        </Box>

        {/* Floating Action Button for Adding Projects */}
        <AddProjectFAB onProjectAdded={handleProjectAdded} />
      </Box>
    </ThemeProvider>
  );
}
export default App;