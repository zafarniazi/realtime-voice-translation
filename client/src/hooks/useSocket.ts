import {io, Socket} from 'socket.io-client'
import {useState, useEffect, useRef} from 'react'
import { Env } from '../config/env'
import { SOCKET_EVENT } from '../constant/app.constants'

let socketInstance: Socket | null = null

function getSocket(): Socket {
  if (!socketInstance) {
    socketInstance = io(Env.SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    })
  }
  return socketInstance
}

export function useSocket (){
const [ items, setItems] = useState<any[]>([])
const socketRef = useRef<Socket | null>(null)

useEffect(()=>{
  const socket = getSocket()
  socketRef.current = socket

  socket.on('connect', () => {
    console.log('Socket connected:', socket.id)
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnected')
  })

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error)
  })

  const handleTranslation = (res:any)=>{
    setItems((prev)=>
    prev.map((i)=>
      i.id === res.id ?{...i, translated: res.translated}:i
   
    ))
  }

  const handleTranslationError = (res:any)=>{
    setItems((prev)=>
    prev.map((i)=>
      i.id === res.id ?{...i, translated: 'Translation failed'}:i
   
    ))
  }

  socket.on(SOCKET_EVENT.TRANSLATION, handleTranslation)
  socket.on('translation_error', handleTranslationError)
  
  return () => {
    socket.off(SOCKET_EVENT.TRANSLATION, handleTranslation)
    socket.off('translation_error', handleTranslationError)
  }
},[])

const send = (text: string, lang: string) =>{
  if (!socketRef.current || !socketRef.current.connected) {
    console.error('Socket not connected')
    return
  }

  const id = crypto.randomUUID()

  setItems((p)=>[{id,text, translated: '...'}, ...p])
  socketRef.current.emit(SOCKET_EVENT.TRANSLATE, {id, text, targetLang: lang})

}

return {items,send}
}