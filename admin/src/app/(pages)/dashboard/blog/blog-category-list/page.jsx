import { getAllBlogsCategory } from '@/api/blogApi'
import OtherGrid from '@/grids/OtherGrid'
import Title from '@/components/Title'

const page = async () => {
  const data = await getAllBlogsCategory()

  return (
    <div className="h-screen overflow-y-scroll">
      <Title
        title={'Blog Category List'}
        subtitle={'List of all Blog Category!'}
      />
      <div className="my-10"></div>
      <OtherGrid data={data} headerName={'Blog Category'} limit={10} />
      <div className="my-32"></div>
    </div>
  )
}

export default page
