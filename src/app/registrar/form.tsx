'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
export default function Form() {
  const router = useRouter()
  const [datos, setDatos] = useState({
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    nroDocumento: '',
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
  const registro = (e: FormEvent) => {
    e.preventDefault()
    axios
      .post('http://localhost:3000/api/auth/registro', {
        ...datos,
      })
      .then((res) => {
        if (res.status === 200) router.push('/login')
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <form id="registro" onSubmit={registro}>
      <div className="grid w-full items-center gap-4 md:gap-2">
        <div className="grid grid-cols-1 md:grid-cols-4 space-y-1.5 items-center gap-1 md:gap-2">
          <Label htmlFor="nombres" className="md:text-right">
            Nombres
          </Label>
          <Input
            required
            value={datos.nombres}
            onChange={cambiarDatos}
            name="nombres"
            id="nombres"
            placeholder="Introduzca sus nombres"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 space-y-1.5 items-center gap-1 md:gap-2">
          <Label htmlFor="primerApellido" className="md:text-right">
            Primer apellido
          </Label>
          <Input
            required
            value={datos.primerApellido}
            onChange={cambiarDatos}
            name="primerApellido"
            id="primerApellido"
            placeholder="Introduzca su primer apellido"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 space-y-1.5 items-center gap-1 md:gap-2">
          <Label
            htmlFor="segundoApellido"
            className="md:text-right whitespace-nowrap"
          >
            Segundo apellido
          </Label>
          <Input
            required
            value={datos.segundoApellido}
            onChange={cambiarDatos}
            name="segundoApellido"
            id="segundoApellido"
            placeholder="Introduzca su segundo apellido"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 space-y-1.5 items-center gap-1 md:gap-2">
          <Label htmlFor="ci" className="md:text-right">
            Carnet
          </Label>
          <Input
            required
            value={datos.nroDocumento}
            onChange={cambiarDatos}
            name="nroDocumento"
            id="nroDocumento"
            placeholder="Introduzca el CI"
            className="col-span-3"
          />
        </div>
      </div>
    </form>
  )
}
