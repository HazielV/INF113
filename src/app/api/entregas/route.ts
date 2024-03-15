import { NextResponse } from 'next/server'
import { Entrega, PrismaClient, Tarea } from '@prisma/client'
import Jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
const prisma = new PrismaClient()
interface userData {
  exp: number
  login: number
  rol: number
  iat: number
}
const clave = process.env.PRIVATE_KEY as string
export async function GET(request: Request) {
  const token = cookies().get('sesion')

  if (token && token.value) {
    const dataUser = Jwt.verify(token.value, clave) as userData

    if (dataUser && dataUser.login) {
      const usuario = await prisma.usuario.findUnique({
        where: {
          login: dataUser.login,
        },
      })

      const estudiante = await prisma.estudiante.findUnique({
        where: {
          usuarioId: usuario?.id,
        },
      })

      if (estudiante) {
        const entregas = await prisma.entrega.findMany({
          where: {
            estudianteId: estudiante?.id,
          },
          select: {
            id: true,
            documentos: true,
            calificacion: true,
            tareaId: true,
          },
        })
        return NextResponse.json(entregas)
      } else {
        return NextResponse.json([])
      }
    }
  }
  return NextResponse.json([])
}
