import { getOneOrder } from '@/api/orderApi'
import OneOrder from './OneOrder'

const page = async ({ params }) => {
  const data = await getOneOrder(params?.id)

  const totalCount = data?.products?.reduce((acc, curr) => {
    acc += curr?.quantity
    return acc
  }, 0)

  return (
    <>
      <OneOrder data={data} totalCount={totalCount} />
    </>
  )
}

export default page
