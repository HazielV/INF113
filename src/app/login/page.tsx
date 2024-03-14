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
export default function Login() {
  return (
    <div className="flex w-screen min-h-screen  place-content-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Iniciar Sesion</CardTitle>
          <CardDescription>Ingrese sus datos persoanles</CardDescription>
        </CardHeader>
        <CardContent>
          <Form />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={'/registrar'}>
            <Button variant="ghost">Crear cuenta</Button>
          </Link>

          <Button form="login">Iniciar sesion</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
