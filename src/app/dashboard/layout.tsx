import { Button } from '@/components/ui/button'

import Link from 'next/link'
import Menu from './ui/menu'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="w-screen h-screen">
      <div className="w-full flex justify-between border-b px-8 py-2.5">
        <div className="flex gap-2">
          <Link href={'/dashboard'}>
            <Button
              variant={'link'}
              className="hover:no-underline  hover:text-gray-800 text-gray-800/60 font-medium"
            >
              Inicio
            </Button>
          </Link>

          <Link href={'/dashboard/tareas'}>
            <Button
              className="hover:no-underline hover:text-gray-800 text-gray-800/60 font-medium"
              variant={'link'}
            >
              Tares y Actividades
            </Button>
          </Link>
        </div>
        <div>
          <Menu />
        </div>
      </div>
      {/* contenido */}
      <div className="p-8">{children}</div>
    </main>
  )
}
