import Dashboard from '@/components/homeComp/Dashboard'
import Header from '@/components/Header'
import Menu from '@/components/Menu'

export default function Home() {
  return (
    <main className="flex lg:gap-6 gap-2 w-full h-auto">
      <Menu />
      <div className="flex flex-col relative pr-4 w-full">
        <Header />
        <Dashboard />
      </div>
    </main>
  )
}
