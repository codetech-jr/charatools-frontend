import { MembresiaBanner_Home_CTA } from '@/components/sections/MembresiaBanner_Home_CTA'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Membresía VIP | CharaTools',
  description: 'Únete al Club de Beneficios VIP de CharaTools y obtén precios preferenciales y atención prioritaria en tus obras.',
}

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-zinc-50 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Club de Beneficios VIP
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Diseñado para contratistas, profesionales y clientes frecuentes. Únete a nuestra membresía y obtén acceso a precios preferenciales en todo nuestro catálogo.
          </p>
        </header>
        
        <MembresiaBanner_Home_CTA />
        
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">¿Tienes dudas sobre cómo funciona?</p>
          <a
            href="https://api.whatsapp.com/send?phone=584220148405&text=Hola%20CharaTools,%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20Membres%C3%ADa%20VIP"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-yellow-600 font-bold hover:text-yellow-700 transition-colors"
          >
            Habla con un asesor por WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
