// src/components/InsightsSidebar.js
import React from 'react';
// Removed AssessmentIcon as 'Average Skill Score' is being removed.
import { List, ListItem, ListItemIcon, ListItemText, Typography, Paper, Divider, Box, Chip, Avatar } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import UpdateIcon from '@mui/icons-material/Update';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// AssessmentIcon was here
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // For placeholder avatar
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // For date icon

// Helper function to format date strings for display
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'; // Return 'N/A' if date string is not provided
  try {
    // Convert date string to a Date object and format it
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  } catch (e) {
    // Return original string if formatting fails
    return dateString;
  }
};

// Function to get current date for display
const getCurrentDateDisplay = () => {
  const today = new Date();
  // Format current date for display
  return today.toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
};

// InsightsSidebar component to display user insights and profile information
const InsightsSidebar = ({ projects = [], scores = {}, coreSkills = [] }) => {
  const userName = "Developer"; // Placeholder for user's name
  const currentDate = getCurrentDateDisplay(); // Get current formatted date

  // Calculate total number of projects
  const totalProjects = projects.length;

  // Determine the date of the last activity
  let lastActivityDate = 'N/A';
  if (projects.length > 0 && projects[0]?.completion_date) {
    // Assuming projects are sorted newest first
    lastActivityDate = formatDate(projects[0].completion_date);
  }

  // REMOVED: Average Skill Score calculation
  // const validScores = coreSkills.map(skill => scores[skill] || 0);
  // const averageSkillScore = validScores.length > 0
  //   ? (validScores.reduce((sum, score) => sum + score, 0) / validScores.length).toFixed(1)
  //   : 'N/A';

  // Identify highest and lowest scoring skills
  let highestScoringSkills = [];
  let lowestScoringSkills = [];
  // Need validScores for this section, so we calculate it here if not above
  const validScores = coreSkills.map(skill => scores[skill] || 0); 
  if (validScores.length > 0) {
    const maxScore = Math.max(...validScores);
    const minScore = Math.min(...validScores);

    highestScoringSkills = coreSkills.filter(skill => (scores[skill] || 0) === maxScore);
    // Only show lowest if it's meaningfully different from highest
    if (minScore < maxScore) {
      lowestScoringSkills = coreSkills.filter(skill => (scores[skill] || 0) === minScore);
    } else if (validScores.every(s => s === 0)) { // If all scores are zero
      lowestScoringSkills = ["All skills at 0"]; // Special message for this case
    }
  }

  // Data for the list of general insights
  // REMOVED: 'Average Skill Score' from this array
  const insights = [
    { icon: <FolderIcon color="primary" />, primary: 'Total Projects', secondary: totalProjects },
    { icon: <UpdateIcon color="primary" />, primary: 'Last Activity', secondary: lastActivityDate },
    // { icon: <AssessmentIcon color="primary" />, primary: 'Average Skill Score', secondary: averageSkillScore }, // This line is removed
  ];

  return (
    // REMOVED: overflowY: 'auto' from this Paper component
    // The parent Paper in App.js handles scrolling.
    <Paper elevation={0} sx={{ height: '100%', p: 0, backgroundColor: 'transparent' }}>
      {/* Profile, Welcome, and Date Section */}
      <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid #e0e0e0', mb: 1 }}>
        <Avatar
          sx={{ width: 80, height: 80, margin: '0 auto 10px auto', bgcolor: 'primary.main' }}
          src="/Profile.jpg"
        >
          {/* Placeholder if no image src is provided */}
          <AccountCircleIcon sx={{ fontSize: 60 }} />
          {/* Or display initials: {userName.substring(0,1)} */}
        </Avatar>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'medium' }}>
          Welcome back, {userName}!
        </Typography>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary', mt: 0.5}}>
            <CalendarTodayIcon sx={{fontSize: '1rem', mr: 0.5}}/>
            <Typography variant="caption">
            {currentDate}
            </Typography>
        </Box>
      </Box>

      {/* List of General Insights */}
      <List dense>
        {insights.map((item, index) => (
          <ListItem key={index} sx={{ py: 1.5 }}> {/* Added some vertical padding */}
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1" sx={{ fontWeight: 'medium' }}>{item.primary}</Typography>}
              secondary={<Typography variant="body2" color="text.secondary">{item.secondary}</Typography>}
            />
          </ListItem>
        ))}
      </List>

      {/* Section for Highest Scoring Skills */}
      {highestScoringSkills.length > 0 && (
        <>
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium', display: 'flex', alignItems: 'center' }}>
              <TrendingUpIcon color="success" sx={{ mr: 1 }} /> Strongest Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {highestScoringSkills.map(skill => (
                <Chip key={skill} label={skill} size="small" color="success" variant="outlined" />
              ))}
            </Box>
          </Box>
        </>
      )}

      {/* Section for Lowest Scoring Skills / Focus Areas */}
      {lowestScoringSkills.length > 0 && (
        <>
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium', display: 'flex', alignItems: 'center' }}>
              <TrendingDownIcon color="warning" sx={{ mr: 1 }} /> Focus Areas
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {lowestScoringSkills.map(skill => (
                <Chip key={skill} label={skill} size="small" color="warning" variant="outlined" />
              ))}
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default InsightsSidebar;
