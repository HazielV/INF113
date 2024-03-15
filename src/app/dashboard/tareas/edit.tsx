'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { updateEntrega } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import Footer from './footer'
interface props {
  tareaId: number
  entregaId: number
  html: string
  css: string
  javascript: string
}
export default function Editar({
  tareaId,
  entregaId,
  html,
  css,
  javascript,
}: props) {
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
  async function formAction(datosForm: FormData) {
    await updateEntrega(datosForm)
    document.getElementById(`editar-trigger-${tareaId}`)?.click()
  }
  return (
    <Tabs defaultValue="html" className="w-full">
      <TabsList className="">
        <TabsTrigger value="html">HTML</TabsTrigger>
        <TabsTrigger value="CSS">CSS</TabsTrigger>
        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
      </TabsList>
      <form id="subir_entrega" action={formAction}>
        <input
          name="tareaId"
          type="number"
          hidden
          readOnly
          defaultValue={tareaId}
        />
        <input
          name="entregaId"
          type="number"
          hidden
          readOnly
          defaultValue={entregaId}
        />
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
        <div className="mt-3 w-full flex justify-end">
          <Footer />
        </div>
      </form>
    </Tabs>
  )
}
