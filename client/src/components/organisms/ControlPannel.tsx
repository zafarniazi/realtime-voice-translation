import {Card, CardContent, Stack, Box, Typography} from  '@mui/material'
import { RecordingControls } from '../molecules/RecordingControls'
import { LanguageSelct } from '../molecules/LanguageSelect'


export function ControlPannel ({ recording, onStart, onStop, lang, SetLang}:any){
return(
  <Card sx={{ mb: 3 }}>
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Voice Translation Controls
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select target language and start recording to translate your speech
        </Typography>
      </Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems={{ xs: 'stretch', sm: 'center' }}>
        <RecordingControls
          recording={recording}
          onStart={onStart}
          onStop={onStop}
        />
        <LanguageSelct value={lang} onChange={SetLang} />
      </Stack>
    </CardContent>
  </Card>
)
}