import { getAllBlogs, getAllBlogsCategory, getOneBlog } from '@/api/blogApi'
import OneBlog from './OneBlog'
import Blogs from '@/components/homeComp/Blogs'

export async function generateMetadata({ params }) {
  const blog = await getOneBlog(params?.id)

  return {
    title: blog?.title,
    description: blog?.description,
  }
}

const page = async ({ params }) => {
  const blog = await getOneBlog(params?.id)
  const blogList = await getAllBlogs()
  // const categories = await getAllBlogsCategory()

  const date = new Date(blog?.updatedAt)
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  const formattedDate = date.toLocaleDateString(undefined, options)
  return (
    <>
      <OneBlog
        blog={blog}
        formattedDate={formattedDate}
        // blogList={blogList}
        // categories={categories}
      />
      <Blogs blogs={blogList} />
    </>
  )
}

export default page
