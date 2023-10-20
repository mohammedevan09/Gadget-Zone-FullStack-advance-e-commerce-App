import { getAllBlogs } from '@/api/blogApi'
import Title from '@/components/Title'
import BlogListGrid from '@/grids/BlogListGrid'

const page = async () => {
  const data = await getAllBlogs()
  return (
    <div className="w-full h-screen overflow-y-scroll">
      <Title title={'Blogs List'} subtitle={'List of all blogs!'} />
      <div className="my-10"></div>

      <BlogListGrid data={data} limit={10} />
      <div className="my-32"></div>
    </div>
  )
}

export default page
