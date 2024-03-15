import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'

import { loginVerifi } from '@/lib/actions'
export default function Form() {
  /* const login = (e: FormEvent) => {
    'use server'
    e.preventDefault()
    axios
      .post('http://localhost:3000/api/auth/login', {
        ...datos,
      })
      .then((res) => {
        if (res.status === 200) router.push(res.data.url)
      })
      .catch(function (error) {
        console.log(error.response.data)
      })
  } */
  return (
    <form id="login" action={loginVerifi}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="ci">Carnet</Label>
          <Input required name="ci" id="ci" placeholder="Introduzca el CI" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            required
            name="password"
            id="password"
            type="password"
            placeholder="Introduzca su contraseña"
          />
        </div>
      </div>
    </form>
  )
}
