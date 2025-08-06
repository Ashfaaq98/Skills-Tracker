// src/components/ProjectList.js
import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Divider, CircularProgress, Alert } from '@mui/material';

// Helper to format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString(undefined, { // Use locale default format
       year: 'numeric', month: 'short', day: 'numeric' 
    }); 
  } catch (e) {
    return dateString; // Return original if formatting fails
  }
};


const ProjectList = ({ projects = [], isLoading, error }) => {

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>;
  }

  if (error) {
     return <Alert severity="error">{error}</Alert>;
  }

  if (!projects || projects.length === 0) {
    return <Typography sx={{ textAlign: 'center', color: 'text.secondary', mt: 2 }}>No projects logged yet.</Typography>;
  }

  // Display only the latest N projects (e.g., 10)
  const recentProjects = projects.slice(0, 10);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto', flexGrow: 1 }}>
      {recentProjects.map((project) => (
        <Card key={project.id} variant="outlined" sx={{ borderColor: '#e0e0e0' }}>
          <CardContent sx={{ p: 2 }}> {/* Adjust padding */}
            <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'medium' }}>
              {project.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Completed: {formatDate(project.completion_date)}
            </Typography>
            {/* Display Skills as Chips */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
               {project.skills && project.skills.split(',').map(skill => (
                 <Chip key={skill.trim()} label={skill.trim()} size="small" color="primary" variant="outlined" />
               ))}
            </Box>
            
             {project.details && (
                <>
                 <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                    "{project.details}"
                  </Typography>
                </>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ProjectList;