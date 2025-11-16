import { FastifyInstance } from 'fastify'
import { updateUserBodySchema } from '../lib/schemas'
import { z } from 'zod'
import { authenticate } from '../lib/auth'
import { prisma } from '../lib/prisma'
import { Prisma } from '@prisma/client'

export async function userRoutes(app: FastifyInstance) {
 
  app.addHook('onRequest', authenticate)

  app.get('/me', async (request, reply) => {
    const userId = request.user.sub

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true }, 
    })

    if (!user) {
      return reply.status(404).send({ message: 'Usuário não encontrado.' })
    }
    return reply.send(user)
  })

  app.patch('/me', async (request, reply) => {
    try {
      const userId = request.user.sub
      
      const { name, email } = updateUserBodySchema.parse(request.body)

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          ...(name && { name }),
          ...(email && { email }),
        },
        select: { id: true, name: true, email: true },
      })

      return reply.send(updatedUser)
    } catch (error) {
      
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ issues: error.format() })
      }

     
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        
        if (error.code === 'P2002') {
          
          const target = error.meta?.target
          let targetIncludesEmail = false

          if (typeof target === 'string') {
            targetIncludesEmail = target.includes('email')
          } 
          else if (Array.isArray(target)) {
            targetIncludesEmail = target.includes('email')
          }

          if (targetIncludesEmail) {
            return reply.status(409).send({ message: 'Este email já está em uso.' })
          }
        }
      }
      
      return reply.status(500).send({ message: 'Erro interno.' })
    }
  })
}