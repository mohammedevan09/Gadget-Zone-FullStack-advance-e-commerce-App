import { getAllEnq } from '@/api/enqApi'
import Title from '@/components/Title'
import EnqGrid from '@/grids/EnqGrid'

const page = async () => {
  const data = await getAllEnq()
  return (
    <div className="w-full h-screen overflow-y-scroll">
      <Title title={'Enquiries'} subtitle={'All enquiries data!'} />
      <div className="my-10"></div>

      <EnqGrid data={data} />
      <div className="my-32"></div>
    </div>
  )
}

export default page
