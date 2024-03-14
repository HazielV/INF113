import { NextResponse } from 'next/server'
import { Persona, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  console.log('funciona')
  return NextResponse.json('funcionando')
}

export async function POST(request: Request) {
  const data: Persona = await request.json()

  try {
    const persona = await prisma.persona.create({
      data: {
        nroDocumento: Number(data.nroDocumento),
        fechaNac: new Date(),
        nombres: data.nombres,
        primerApellido: data.primerApellido,
        segundoApellido: data.segundoApellido,
        usuario: {
          create: {
            login: Number(data.nroDocumento),
            password: String(data.nroDocumento),
            Estudiante: {
              create: {},
            },
          },
        },
      },
    })

    return NextResponse.json('Usuario creado')
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'No autorizado' }, { status: 500 })
  }
}
