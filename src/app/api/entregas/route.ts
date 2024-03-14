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
export async function PUT(request: Request) {
  interface dataEntrega {
    html: string
    css: string
    javascript: string
    tareaId: number
  }
  const data: dataEntrega = await request.json()

  try {
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
        const tarea = await prisma.tarea.findUnique({
          where: {
            id: data.tareaId,
          },
        })

        if (tarea && estudiante) {
          const entrega = await prisma.entrega.findUnique({
            where: {
              tareaId: tarea.id,
              estudianteId: estudiante.id,
            },
          })

          if (entrega) {
            await prisma.documento.deleteMany({
              where: {
                entregaId: entrega?.id,
              },
            })

            await prisma.entrega.update({
              where: {
                id: entrega.id,
              },
              data: {
                documentos: {
                  create: [
                    { contenido: data.html || '', tipo: 'HTML' },
                    { contenido: data.css || '', tipo: 'css' },
                    { contenido: data.javascript || '', tipo: 'javascript' },
                  ],
                },
              },
            })
          }
        }
      }
    }

    return NextResponse.json({ mensaje: 'tarea actualizada' }, { status: 202 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'algo salio mal' })
  }
}
export async function POST(request: Request) {
  interface dataEntrega {
    html: string
    css: string
    javascript: string
    tareaId: number
  }
  const data: dataEntrega = await request.json()

  try {
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
        const tarea = await prisma.tarea.findUnique({
          where: {
            id: data.tareaId,
          },
        })

        if (tarea && estudiante) {
          const nuevaEntrega = await prisma.entrega.create({
            data: {
              tareaId: tarea.id,
              estudianteId: estudiante.id,
              documentos: {
                create: [
                  { contenido: data.html || '', tipo: 'HTML' },
                  { contenido: data.css || '', tipo: 'css' },
                  { contenido: data.javascript || '', tipo: 'javascript' },
                ],
              },
            },
          })
        }
      }
    }

    return NextResponse.json({ mensaje: 'tarea creada' }, { status: 202 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'algo salio mal' })
  }
}
