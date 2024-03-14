import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24  bg-black text-white gap-20">
      <div></div>
      <div className="text-5xl capitalize text-center">
        Sistema <span className="text-gray-300/50">de</span> calificaciones
      </div>
      <div className="text-xl">
        <Link href={'login'}>
          <button className="rounded-full bg-[#276DF1] px-9 py-2.5">
            Iniciar
          </button>
        </Link>
      </div>
    </main>
  )
}
