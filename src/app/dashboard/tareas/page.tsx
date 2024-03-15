export const dynamic = 'force-dynamic'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Create from './create'
import { Tarea, Estado, Entrega, Documento } from '@prisma/client'
import { cookies } from 'next/headers'
import Entregar from './entregar'
import Editar from './edit'
import { Fragment } from 'react'
import { unstable_noStore } from 'next/cache'
import { useRouter } from 'next/navigation'
import { getActionEntregas, getActionTareas } from '@/lib/actions'
interface TareaEstado extends Tarea {
  estadoRel: Estado
}
interface EntregaDocus extends Entrega {
  documentos: Documento[]
}
async function getData() {
  const res = await getActionTareas()

  return res
}
async function getEntregas() {
  const res = await getActionEntregas()
  return res
}

export default async function Tareas() {
  unstable_noStore()
  const tareas: TareaEstado[] = (await getData()) as TareaEstado[]
  const entregas = (await getEntregas()) as EntregaDocus[]
  const cookieStore = cookies()
  const sesion = cookieStore.get('rolId')

  return (
    <div className=" flex flex-col gap-10 ">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Tareas y Actividades
      </h3>
      {sesion?.value && Number(sesion.value) === 2 && (
        <Dialog>
          <DialogTrigger id="trigger" asChild>
            <Button
              variant="default"
              className="absolute bottom-10 right-10 capitalize pl-2.5  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span className="ml-2">nueva tarea</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-11/12 max-w-3xl ">
            <DialogHeader>
              <DialogTitle className="first-letter:uppercase">
                Nueva Tarea
              </DialogTitle>
            </DialogHeader>
            <Create />
          </DialogContent>
        </Dialog>
      )}
      <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {tareas.map((elem) => (
          <div
            key={elem.id}
            className="border p-4 rounded-md flex flex-col gap-6"
          >
            <div className="flex justify-between items-center">
              <h4 className="scroll-m-20 text-lg  font-semibold tracking-tight first-letter:uppercase">
                {elem.titulo}
              </h4>
              <span className="text-xs font-medium capitalize">
                {entregas.find((entre) => entre.tareaId === elem.id)
                  ? 'entregado'
                  : 'pendiente'}
              </span>
            </div>
            <div>
              <p className="leading-5 [&:not(:first-child)]:mt-6 text-sm">
                {elem.descripcion}
              </p>
            </div>
            {/* actions */}
            <div>
              {entregas.length === 0 ? (
                <Dialog>
                  <DialogTrigger id="entregar-trigger" asChild>
                    <Button variant="outline" className="text-xs">
                      Entregar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-11/12 max-w-3xl ">
                    <DialogHeader>
                      <DialogTitle className="first-letter:uppercase">
                        {elem.titulo}
                      </DialogTitle>
                    </DialogHeader>
                    <Entregar tareaId={elem.id} />
                  </DialogContent>
                </Dialog>
              ) : (
                entregas.map((entre, index) => (
                  <Fragment key={index}>
                    {entre.tareaId === elem.id && (
                      <Dialog>
                        <DialogTrigger id={`editar-trigger-${elem.id}`} asChild>
                          <Button variant="default" className="text-xs">
                            Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-11/12 max-w-3xl ">
                          <DialogHeader>
                            <DialogTitle className="first-letter:uppercase">
                              {elem.titulo}
                            </DialogTitle>
                          </DialogHeader>
                          <Editar
                            entregaId={entre.id}
                            tareaId={elem.id}
                            html={
                              entre.documentos.find(
                                (docu) => docu.tipo === 'HTML'
                              )?.contenido || ''
                            }
                            css={
                              entre.documentos.find(
                                (docu) => docu.tipo === 'css'
                              )?.contenido || ''
                            }
                            javascript={
                              entre.documentos.find(
                                (docu) => docu.tipo === 'javascript'
                              )?.contenido || ''
                            }
                          />
                        </DialogContent>
                      </Dialog>
                    )}
                  </Fragment>
                ))
              )}
              {entregas.length > 0 &&
                !entregas.find((entre) => entre.tareaId === elem.id) && (
                  <Dialog>
                    <DialogTrigger id="entregar-trigger" asChild>
                      <Button variant="outline" className="text-xs">
                        Entregar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-11/12 max-w-3xl ">
                      <DialogHeader>
                        <DialogTitle className="first-letter:uppercase">
                          {elem.titulo}
                        </DialogTitle>
                      </DialogHeader>
                      <Entregar tareaId={elem.id} />
                    </DialogContent>
                  </Dialog>
                )}
              {elem.estadoRel?.valor === 2 && (
                <Button variant="default" className="text-xs pl-3 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-1.5">Ver</span>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
