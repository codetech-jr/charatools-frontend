import { MembresiaBanner_Home_CTA } from '@/components/sections/MembresiaBanner_Home_CTA'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Membresía VIP | CharaTools',
  description: 'Únete al Club de Beneficios VIP de CharaTools y obtén precios preferenciales y atención prioritaria en tus obras.',
}

export default function MembershipPage() {
  return (
    <main className="bg-[#0f0a2a] min-h-screen">
      <MembresiaBanner_Home_CTA />
    </main>
  )
}
