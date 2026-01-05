import express from 'express'
import http from 'http'
import cors from 'cors';
import dotenv from 'dotenv'
import { Server } from 'socket.io';
import { OpenAI } from 'openai';

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

async function translate(text, targetLang) {
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system', content: 'Translate accurately'

      },
      {
        role: 'user', content: `Translate to ${targetLang} : ${text}`

      }

    ]
  })
  return res.choices[0].message.content

}

io.on('connection', (socket) => {
  console.log(socket.id)
  socket.on('translate', async ({ id, text, targetLang }) => {
    try {
      const translated = await translate(text, targetLang)
      socket.emit('translation', { id, translated })

    } catch {
      socket.emit('translation_error', { id })

    }

  })
})


const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
