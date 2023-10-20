import Blogs from '@/components/homeComp/Blogs'
import Categories from '@/components/homeComp/Categories'
import Landing from '@/components/homeComp/Landing'
import Products from '@/components/homeComp/Products'
import ShopNow from '@/components/homeComp/ShopNow'
import SponsorsAndBrands from '@/components/homeComp/SponsorsAndBrands'

import { getAllProduct } from '@/api/productApi'
import { getAllBlogs } from '@/api/blogApi'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await getAllProduct({ limit: 8 })
  const blogs = await getAllBlogs({ limit: 8 })
  return (
    <>
      <div className="grid justify-center items-center">
        <Landing />
        <ShopNow />
        <Categories />
        <Products products={products} />
        <Blogs blogs={blogs} />
        <SponsorsAndBrands />
      </div>
    </>
  )
}
