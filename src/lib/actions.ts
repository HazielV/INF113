'use server'

import Jwt from 'jsonwebtoken'
import { PrismaClient, Tarea } from '@prisma/client'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
const clave = process.env.PRIVATE_KEY as string
export async function loginVerifi(formData: FormData) {
  const prisma = new PrismaClient()

  ;('use server')
  const ci = formData.get('ci')
  const password = formData.get('password')
  const clave = process.env.PRIVATE_KEY as string

  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        login: Number(ci),
      },
    })

    if (usuario?.password === String(password)) {
      const token = Jwt.sign(
        {
          exp: Math.floor(Date.now()) + 60 * 60 * 24,
          login: usuario.login,
          rol: usuario.rolId,
        },
        clave
      )

      cookies().set('sesion', token)
      cookies().set('rolId', String(usuario.rolId))
    }
  } catch (error) {
    console.log(error)
    return 'No autorizado'
  }
  redirect('/dashboard')
}
export async function logOut(formData: FormData) {
  cookies().delete('sesion')
  cookies().delete('rolId')
  redirect('/login')
}
interface userData {
  exp: number
  login: number
  rol: number
  iat: number
}
export async function getActionTareas() {
  const prisma = new PrismaClient()
  let salida = [] as Tarea[]
  try {
    const tareas = await prisma.tarea.findMany()
    salida = tareas
  } catch (error) {
    return []
  }
  revalidatePath('/dashboard/tareas')
  return salida
}

export async function getActionEntregas() {
  const prisma = new PrismaClient()
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
        revalidatePath('/dashboard/tareas')
        return entregas
      }
    }
  }
  return []
}
export async function updateEntrega(formData: FormData) {
  const prisma = new PrismaClient()
  interface dataEntrega {
    html: string
    css: string
    javascript: string
    tareaId: number
    entregaId: number
  }
  const data = Object.fromEntries(formData) as Partial<dataEntrega>

  const token = cookies().get('sesion')

  try {
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
            id: Number(data.tareaId),
          },
        })

        if (tarea && estudiante) {
          const entrega = await prisma.entrega.findUnique({
            where: {
              id: Number(data.entregaId),
            },
          })

          if (entrega) {
            await prisma.documento.deleteMany({
              where: {
                entregaId: entrega?.id,
              },
            })

            const update = await prisma.entrega.update({
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
              include: {
                documentos: true,
              },
            })
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
    return { mensaje: 'algo salio mal' }
  }
  revalidatePath('/dashboard/tareas')
  redirect('/dashboard/tareas')
}
export async function createEntrega(formData: FormData) {
  const prisma = new PrismaClient()

  interface dataEntrega {
    html: string
    css: string
    javascript: string
    tareaId: number
  }
  const data = Object.fromEntries(formData) as Partial<dataEntrega>
  const token = cookies().get('sesion')
  try {
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
            id: Number(data.tareaId),
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
  } catch (error) {
    return { mensaje: 'algo salio mal' }
  }
  revalidatePath('/dashboard/tareas')
  redirect('/dashboard/tareas')
}
export async function createTarea(formData: FormData) {
  const prisma = new PrismaClient()
  await prisma.$disconnect()

  const data = Object.fromEntries(formData) as Partial<Tarea>
  try {
    await prisma.tarea.create({
      data: {
        titulo: data.titulo || 'titulo',
        descripcion: data.descripcion,
        fechaIni: data.fechaIni,
        fechaFin: data.fechaFin,
      },
    })
  } catch (error) {
    return { mensaje: 'algo salio mal' }
  }
  revalidatePath('/dashboard/tareas')
  redirect('/dashboard/tareas')
}
