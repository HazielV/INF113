import { NextResponse } from 'next/server'
import { PrismaClient, Tarea } from '@prisma/client'
const prisma = new PrismaClient()
export async function GET(request: Request) {
  const tareas = await prisma.tarea.findMany({
    include: {
      estadoRel: true,
      entrega: true,
    },
  })
  return NextResponse.json(tareas)
}

export async function POST(request: Request) {
  const data: Tarea = await request.json()
  try {
    const nuevaTarea = await prisma.tarea.create({
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
        fechaIni: data.fechaIni,
        fechaFin: data.fechaFin,
      },
    })
    return NextResponse.json({ mensaje: 'tarea creada' }, { status: 202 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'algo salio mal' })
  }
}
