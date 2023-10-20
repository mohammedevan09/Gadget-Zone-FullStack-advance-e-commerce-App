import { getAllCategory } from '@/api/categoryApi'
import Title from '@/components/Title'
import CategoryGrid from '@/grids/CategoryGrid'

const page = async () => {
  const data = await getAllCategory()
  return (
    <div className="w-full h-screen overflow-y-scroll">
      <Title title={'Category List'} subtitle={'List of all Category!'} />
      <div className="my-10"></div>

      <CategoryGrid data={data} headerName={'Categories'} limit={10} />
      <div className="my-32"></div>
    </div>
  )
}

export default page
