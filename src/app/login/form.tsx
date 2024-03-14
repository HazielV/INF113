'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
export default function Form() {
  const router = useRouter()
  const [datos, setDatos] = useState({
    ci: '',
    password: '',
  })
  const cambiarDatos = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const valor = e.target.value
    const name = e.target.name
    setDatos((prev) => ({
      ...prev,
      [name]: valor,
    }))
  }
  const login = (e: FormEvent) => {
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
  }
  return (
    <form id="login" onSubmit={login}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="ci">Carnet</Label>
          <Input
            required
            value={datos.ci}
            onChange={cambiarDatos}
            name="ci"
            id="ci"
            placeholder="Introduzca el CI"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            required
            value={datos.password}
            onChange={cambiarDatos}
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
