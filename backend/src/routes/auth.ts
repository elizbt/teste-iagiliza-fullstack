import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { registerBodySchema, loginBodySchema } from '../lib/schemas'
import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma' 

export async function authRoutes(app: FastifyInstance) {
 
  app.post('/register', async (request, reply) => {
    try {
      const { name, email, password } = registerBodySchema.parse(request.body)

      const userExists = await prisma.user.findUnique({ where: { email } })

      if (userExists) {
        return reply.status(400).send({ message: 'Email já cadastrado.' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      await prisma.user.create({
        data: { name, email, password: hashedPassword },
      })

      return reply.status(201).send({ message: 'Usuário criado!' })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ issues: error.format() })
      }
      return reply.status(500).send({ message: 'Erro interno.' })
    }
  })

  app.post('/login', async (request, reply) => {
    try {
      const { email, password } = loginBodySchema.parse(request.body)

      const user = await prisma.user.findUnique({ where: { email } })

      if (!user) {
        return reply.status(401).send({ message: 'Email ou senha inválidos.' })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return reply.status(401).send({ message: 'Email ou senha inválidos.' })
      }

      const token = app.jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        {
          sub: user.id, 
          expiresIn: '7 days',
        },
      )
      return reply.send({ token })

    } catch (error) {
      return reply.status(500).send({ message: 'Erro interno do servidor.' })
    }
  })
}