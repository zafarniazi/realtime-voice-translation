import { useState } from "react"
import { AppHeader } from "../components/layout/AppHeader"
import { PageContainer } from "../components/layout/PageContainer"
import { ControlPannel } from "../components/organisms/ControlPannel"
import { Tranlationlist } from "../components/organisms/TranslationList"
import { useSocket } from "../hooks/useSocket"
import { useSpeech } from "../hooks/useSpeech"


export default function App(){

  const [lang, SetLang] = useState('English')
  const [recording, SetRecording] = useState(false)

  const {items, send} = useSocket()
  const speech = useSpeech((s)=> send(s,lang))

  const handleStart = () => {
    console.log('Start button clicked');
    speech.start();
    SetRecording(true);
  }

  const handleStop = () => {
    console.log('Stop button clicked');
    speech.stop();
    SetRecording(false);
  }

  return(
    <>
    <AppHeader/>
    <PageContainer>
      <ControlPannel
        recording={recording}
        lang={lang}
        SetLang={SetLang}
        onStart={handleStart}
        onStop={handleStop}
      />
      <Tranlationlist items={items}/>
    </PageContainer>
    </>
  )
}