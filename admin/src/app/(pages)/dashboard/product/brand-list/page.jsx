import { getAllBrands } from '@/api/othersApi'
import OtherGrid from '@/grids/OtherGrid'
import Title from '@/components/Title'

const page = async () => {
  const data = await getAllBrands()
  return (
    <div className="w-full h-screen overflow-y-scroll">
      <Title title={'Brands List'} subtitle={'List of all Brand!'} />

      <OtherGrid data={data} headerName={'Brands'} limit={10} />
      <div className="my-20"></div>
    </div>
  )
}

export default page
