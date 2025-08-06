// src/components/AddProjectFAB.js
import React, { useState } from 'react';
import { Fab, Dialog, DialogTitle, DialogContent, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon
import ProjectForm from './ProjectForm'; // Assuming ProjectForm is in the same folder

const AddProjectFAB = ({ onProjectAdded }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // This function will be passed to ProjectForm
  // It calls the callback from App.js and closes the dialog
  const handleFormSubmitSuccess = () => {
    handleClose(); // Close the dialog
    onProjectAdded(); // Trigger data refetch in App.js
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add project"
        sx={{
          position: 'fixed', // Keep fixed position
          bottom: 32, // Adjust positioning
          right: 32,
          boxShadow: 3, // Add subtle shadow
        }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" // Set max width for the dialog
        fullWidth // Allow dialog to use the full width up to maxWidth
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Add New Project
           <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ color: (theme) => theme.palette.grey[500] }}
            >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers> {/* Add dividers for better separation */}
          {/* Pass the success handler and close handler to the form */}
          <ProjectForm 
            onSuccess={handleFormSubmitSuccess} 
            onCancel={handleClose} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProjectFAB;