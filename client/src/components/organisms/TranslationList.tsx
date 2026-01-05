import { Card, CardContent, Typography, Box, Stack, Divider } from "@mui/material";

export function Tranlationlist ({items}:any){

if (!items || items.length === 0) {
  return (
    <Card sx={{ textAlign: 'center', py: 4 }}>
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No translations yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click "Start Recording" and speak to begin translating
        </Typography>
      </CardContent>
    </Card>
  );
}

return(
  <Stack spacing={2}>
    {items.map((i:any) =>(
      <Card key={i.id} sx={{ transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 } }}>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              Original Text
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 500 }}>
              {i.text}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box>
            <Typography variant="caption" color="primary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
              Translation
            </Typography>
            <Typography variant="body1" color="primary" sx={{ mt: 0.5, fontWeight: 500 }}>
              {i.translated}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    ))}
  </Stack>
)
}