import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { authRoutes } from './routes/auth'
import { userRoutes } from './routes/user'
import { chatRoutes } from './routes/chat'

const app = fastify()

app.register(cors, { origin: true })

app.register(jwt, {
  secret: process.env.JWT_SECRET || 'fallback-secret-mude-no-env',
})

app.register(authRoutes, { prefix: '/api' })
app.register(userRoutes, { prefix: '/api' })
app.register(chatRoutes, { prefix: '/api' })

app.listen({ port: 3334 }).then(() => {
  console.log('Servidor rodando em http://localhost:3334')
})