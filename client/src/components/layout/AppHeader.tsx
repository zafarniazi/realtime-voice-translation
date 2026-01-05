import { AppBar, Toolbar, Typography } from "@mui/material";

export function AppHeader (){
  return(
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Voice Translation
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
