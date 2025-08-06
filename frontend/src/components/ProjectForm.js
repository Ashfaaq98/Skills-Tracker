// src/components/ProjectForm.js
import React, { useState } from 'react';
import { Button, TextField, Box, FormGroup, FormControlLabel, Checkbox, Typography, CircularProgress, Alert, DialogActions } from '@mui/material';
import axios from 'axios';
import { CORE_SKILLS } from '../skillsConfig'; // Import skills list

const ProjectForm = ({ onSuccess, onCancel }) => {
  const [title, setTitle] = useState('');
  // Use an object to store skill checkbox states { skillName: boolean }
  const [selectedSkills, setSelectedSkills] = useState(
      CORE_SKILLS.reduce((acc, skill) => {
          acc[skill] = false; // Initialize all skills to false
          return acc;
      }, {})
  );
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSkillChange = (event) => {
    setSelectedSkills({
      ...selectedSkills,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    // Get the list of selected skill names
    const skillsToSend = Object.keys(selectedSkills).filter(skill => selectedSkills[skill]);

    if (!title.trim()) {
        setError('Project Title is required.');
        return;
    }
    if (skillsToSend.length === 0) {
      setError('Please select at least one skill.');
      return;
    }

    setIsSubmitting(true);

    try {
      const projectData = {
        title: title.trim(),
        skills: skillsToSend, // Send as an array
        details: details.trim(),
      };
      
      // POST to your backend endpoint
      await axios.post('http://127.0.0.1:5000/projects', projectData);
      
      setIsSubmitting(false);
      onSuccess(); // Call the success callback passed from AddProjectFAB

    } catch (err) {
      console.error("Error submitting project:", err);
      setError(err.response?.data?.error || 'Failed to add project. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Error Display */}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Project Title */}
        <TextField
          label="Project Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          disabled={isSubmitting}
        />

        {/* Skills Selection */}
        <Box sx={{ border: '1px solid #ccc', borderRadius: 1, p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Skills Used
          </Typography>
          <FormGroup>
            {CORE_SKILLS.map((skill) => (
              <FormControlLabel
                key={skill}
                control={
                  <Checkbox
                    checked={selectedSkills[skill]}
                    onChange={handleSkillChange}
                    name={skill}
                    disabled={isSubmitting}
                     size="small"
                  />
                }
                label={skill}
              />
            ))}
          </FormGroup>
        </Box>

        {/* Project Details */}
        <TextField
          label="Project Details / Notes"
          variant="outlined"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          multiline
          rows={4}
          fullWidth
          disabled={isSubmitting}
        />
      </Box>
       
      {/* Form Actions (Submit/Cancel) */}
      <DialogActions sx={{ mt: 3, p: 0 }}> {/* Adjust margin and remove padding */}
         <Button onClick={onCancel} disabled={isSubmitting} color="inherit"> 
            Cancel
          </Button>
         <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={isSubmitting}
          >
           {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Add Project'}
          </Button>
      </DialogActions>
    </form>
  );
};

export default ProjectForm;