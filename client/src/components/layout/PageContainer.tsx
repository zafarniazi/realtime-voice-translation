import { Container, Box } from "@mui/material";

export function PageContainer ({children}: any){
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        {children}
      </Box>
    </Container>
  )
}