import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function Footer() {
  const { pending } = useFormStatus()
  return (
    <>
      {!pending ? (
        <Button form="subir_entrega" type="submit" className="pt">
          Guardar
        </Button>
      ) : (
        <Button
          form="subir_entrega"
          variant={'secondary'}
          disabled
          className="pt"
        >
          Guardando...
        </Button>
      )}
    </>
  )
}
