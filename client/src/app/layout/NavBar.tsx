import { Box, AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem"; // ✅ Correct import
import { Group } from "@mui/icons-material";

export default function Navbar() {
  return (
  
    <Box sx={{ flexGrow: 1 }}>
    <AppBar 
      position="static"
      sx={{ 
        backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)' 
      }}
    >
    <Container maxWidth = 'xl'>
      <Toolbar sx = {{display: 'flex', justifyContent:'space-between'}}>
        <Box>
          <MenuItem sx={{display: 'flex', gap: 2}}>
            <Group fontSize="large" />
            <Typography variant="h4" fontWeight='bold'>Reactivities</Typography>
          </MenuItem>
        </Box>
        <Box sx = {{display:'flex'}}>
          <MenuItem sx = {{fontSize:'1.2rem', textTransform:"uppercase", fontWeight: 'bold'}}>
            Activities
          </MenuItem>
          <MenuItem sx = {{fontSize:'1.2rem', textTransform:"uppercase", fontWeight: 'bold'}}>
            About
          </MenuItem>
          <MenuItem sx = {{fontSize:'1.2rem', textTransform:"uppercase", fontWeight: 'bold'}}>
            Contact Us
          </MenuItem>
        </Box>
        <Button size="large" variant="contained" color="warning">
            Create Activity
          </Button>
      </Toolbar>
      </Container>
    </AppBar>
  </Box>
  )
}
