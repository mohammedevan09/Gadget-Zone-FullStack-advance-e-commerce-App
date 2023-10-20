import Header from '@/components/Header'
import Menu from '@/components/Menu'

const layout = ({ children }) => {
  return (
    <main className="flex lg:gap-6 gap-2 w-full h-auto">
      <Menu />
      <div className="flex flex-col relative pr-4 w-full">
        <Header />
        {children}
      </div>
    </main>
  )
}

export default layout
