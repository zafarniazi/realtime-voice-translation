import { PrimaryButton } from "../atoms/PrimaryButton";
import { Box, Typography, CircularProgress } from "@mui/material";

export function RecordingControls({recording, onStart, onStop}:any){
  const handleStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('RecordingControls: Start clicked', onStart);
    if (onStart) {
      onStart();
    } else {
      console.error('onStart handler is not defined');
    }
  };

  const handleStop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('RecordingControls: Stop clicked', onStop);
    if (onStop) {
      onStop();
    } else {
      console.error('onStop handler is not defined');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
      {recording ? (
        <>
          <PrimaryButton 
            onClick={handleStop} 
            color="error" 
            variant="contained"
            size="large"
            sx={{ minWidth: 180 }}
          >
            Stop Recording
          </PrimaryButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={12} color="error" />
            <Typography variant="caption" color="error" sx={{ fontWeight: 500 }}>
              Recording... Speak now
            </Typography>
          </Box>
        </>
      ) : (
        <PrimaryButton 
          onClick={handleStart} 
          color="primary" 
          variant="contained"
          size="large"
          sx={{ minWidth: 180 }}
        >
          Start Recording
        </PrimaryButton>
      )}
    </Box>
  );
}