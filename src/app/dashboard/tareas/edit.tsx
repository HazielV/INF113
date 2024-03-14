'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
interface props {
  tareaId: number
  html: string
  css: string
  javascript: string
}
export default function Editar({ tareaId, html, css, javascript }: props) {
  const router = useRouter()
  const [datos, setDatos] = useState({
    html: html,
    css: css,
    javascript: javascript,
    tareaId: tareaId,
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
    e.preventDefault()
    axios
      .put('http://localhost:3000/api/entregas', {
        ...datos,
      })
      .then((data) => {
        document.getElementById('editar-trigger')?.click()
        router.refresh()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <Tabs defaultValue="html" className="w-full">
      <TabsList className="">
        <TabsTrigger value="html">HTML</TabsTrigger>
        <TabsTrigger value="CSS">CSS</TabsTrigger>
        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
      </TabsList>
      <form id="subir_entrega" onSubmit={subir}>
        <TabsContent value="html">
          <div className=" flex flex-col gap-3">
            <Label htmlFor="html" className="">
              Codigo HTML
            </Label>

            <Textarea
              required
              id="html"
              name="html"
              onChange={cambiarDatos}
              value={datos.html}
              placeholder="Copie el codigo aqui."
            />
          </div>
        </TabsContent>
        <TabsContent value="CSS">
          <div className=" flex flex-col gap-3">
            <Label htmlFor="css" className="">
              Codigo CSS
            </Label>

            <Textarea
              id="css"
              name="css"
              onChange={cambiarDatos}
              value={datos.css}
              placeholder="Copie el codigo aqui."
            />
          </div>
        </TabsContent>
        <TabsContent value="javascript">
          <div className=" flex flex-col gap-3">
            <Label htmlFor="javascript" className="">
              Codigo JavaScript
            </Label>

            <Textarea
              id="javascript"
              name="javascript"
              onChange={cambiarDatos}
              value={datos.javascript}
              placeholder="Copie el codigo aqui."
            />
          </div>
        </TabsContent>
      </form>
    </Tabs>
  )
}
