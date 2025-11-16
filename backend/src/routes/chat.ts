import { FastifyInstance } from 'fastify'
import { sendMessageBodySchema } from '../lib/schemas'
import { z } from 'zod'
import { authenticate } from '../lib/auth' 
import { prisma } from '../lib/prisma'


const aiResponses = [
  'Interessante! Conte mais.',
  'Não tenho certeza, mas parece legal!',
  'Hmm, e se tentássemos outra abordagem?',
  'Entendi parcialmente. Você pode explicar melhor?',
]

export async function chatRoutes(app: FastifyInstance) {

  app.addHook('onRequest', authenticate)

  app.get('/messages', async (request, reply) => {
 
    const userId = request.user.sub

    const messages = await prisma.message.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'asc' }, 
    })

    return reply.send(messages)
  })

  app.post('/message', async (request, reply) => {
    try {
      const userId = request.user.sub
      const { content } = sendMessageBodySchema.parse(request.body)

      await prisma.message.create({
        data: {
          content,
          role: 'USER', 
          userId: userId,
        },
      })
      
      const aiResponseContent =
        aiResponses[Math.floor(Math.random() * aiResponses.length)]

      const aiMessage = await prisma.message.create({
        data: {
          content: aiResponseContent,
          role: 'AI', 
          userId: userId,
        },
      })

      return reply.status(201).send(aiMessage)
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ issues: error.format() })
      }
      return reply.status(500).send({ message: 'Erro interno.' })
    }
  })
}