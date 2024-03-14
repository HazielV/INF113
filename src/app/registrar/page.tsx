import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import Form from './form'
import Link from 'next/link'

export default function Registrar() {
  return (
    <div className="flex w-screen min-h-screen  place-content-center items-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Registro</CardTitle>
          <CardDescription>Ingrese sus datos personales</CardDescription>
        </CardHeader>
        <CardContent>
          <Form />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={'/login'}>
            <Button variant={'ghost'}>Iniciar Sesion</Button>
          </Link>
          <Button form="registro">Crear cuenta</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
