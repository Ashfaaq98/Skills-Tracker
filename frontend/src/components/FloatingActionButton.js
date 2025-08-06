import React, { useState } from 'react';
import { Fab, Dialog, DialogTitle, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProjectForm from './ProjectForm';

const FloatingActionButton = ({ onSubmission }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 20, right: 20 }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <ProjectForm onSubmission={onSubmission} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingActionButton;
