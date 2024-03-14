'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
export default function Create() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [dateF, setDateF] = useState<Date>()
  const [datos, setDatos] = useState({
    titulo: '',
    descripcion: '',
    fechaIni: '',
    fechaFin: '',
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

  const subir = (e: FormEvent) => {
    const data = { ...datos, fechaIni: date, fechaFin: dateF }
    e.preventDefault()
    axios
      .post('http://localhost:3000/api/tareas', {
        ...data,
      })
      .then((data) => {
        document.getElementById('trigger')?.click()

        router.refresh()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <form id="subir_entrega" onSubmit={subir}>
      <div className=" flex flex-col gap-3">
        <Label htmlFor="titulo" className="">
          Titulo
        </Label>

        <Input
          id="titulo"
          name="titulo"
          onChange={cambiarDatos}
          value={datos.titulo}
          placeholder="Titulo"
        />
      </div>
      <div className=" flex flex-col gap-3 mt-4">
        <Label htmlFor="descripcion" className="">
          Descripcion
        </Label>

        <Input
          id="descripcion"
          name="descripcion"
          onChange={cambiarDatos}
          value={datos.descripcion}
          placeholder="descripcion"
        />
      </div>
      <div className="flex gap-10 w-full">
        <div className=" flex flex-col gap-3 mt-4 w-full">
          <Label htmlFor="descripcion" className="">
            Fecha Inicio
          </Label>

          <Popover>
            <PopoverTrigger asChild>
              {/* !date && "text-muted-foreground" */}
              <Button
                variant={'outline'}
                className={'w-full justify-start text-left font-normal'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                  <path
                    fillRule="evenodd"
                    d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>

                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className=" flex flex-col gap-3 mt-4 w-full">
          <Label htmlFor="descripcion" className="">
            Fecha Fin
          </Label>

          <Popover>
            <PopoverTrigger asChild>
              {/* !date && "text-muted-foreground" */}
              <Button
                variant={'outline'}
                className={'w-full justify-start text-left font-normal'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                  <path
                    fillRule="evenodd"
                    d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>

                {dateF ? format(dateF, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Calendar
                mode="single"
                selected={dateF}
                onSelect={setDateF}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </form>
  )
}
