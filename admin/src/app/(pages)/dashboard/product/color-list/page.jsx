import { getAllColors } from '@/api/othersApi'
import OtherGrid from '@/grids/OtherGrid'
import Title from '@/components/Title'

const page = async () => {
  const data = await getAllColors()
  return (
    <div className="w-full h-screen overflow-y-scroll">
      <Title title={'Color List'} subtitle={'List of all Colors!'} />
      <div className="my-10"></div>

      <OtherGrid data={data} headerName={'Colors'} limit={10} />
      <div className="my-20"></div>
    </div>
  )
}

export default page
