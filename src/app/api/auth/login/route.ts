import { NextResponse } from 'next/server'
import Jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { cookies } from 'next/headers'

export async function GET(request: Request) {
  console.log('funciona')
  return NextResponse.json('funcionando')
}

export async function HEAD(request: Request) {}
interface create {
  ci: string
  password: string
}
export async function POST(request: Request) {
  const { ci, password }: create = await request.json()
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
      if (token) {
        return NextResponse.json({ url: '/dashboard' })
      } else {
        return NextResponse.json('No autorizado')
      }
    }
    return NextResponse.json('No autorizado')
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'No autorizado' }, { status: 500 })
  }
}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {
  cookies().delete('sesion')
  cookies().delete('rolId')
  return NextResponse.json('Logout')
}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
