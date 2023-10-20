'use client'

import { PiChartLineDown, PiChartLineUp } from 'react-icons/pi'
import { redirect } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, setUsers } from '@/store/reducers/userReducer'
import { useEffect, useState } from 'react'
import { handleRefresh } from '@/api/userApi'
import MyResponsiveLine from '@/charts/Line'
import { months } from '@/staticItem/data'

const Main = ({ users, products, orders, blogs }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state?.user)

  // console.log(userInfo?.refreshToken)

  if (orders === 'Failed') {
    dispatch(setUsers({}))
    dispatch(setToken(null))
    redirect('/login')
  }

  useEffect(() => {
    if (userInfo?.refreshToken) {
      handleRefresh({ refreshToken: userInfo?.refreshToken }).then((d) => {
        if (d !== null) {
          dispatch(setToken(d?.accessToken))
        } else {
          console.error('Refresh request failed')
        }
      })
    } else {
      redirect('/login')
    }
  }, [])

  const usersLength = users?.length
  const productsLength = products?.length
  const ordersLength = orders?.length
  const blogsLength = blogs?.length

  const incOrDesc = (data) => {
    const currentDate = new Date()
    const thirtyDaysAgo = new Date(currentDate - 30 * 24 * 60 * 60 * 1000)

    const dataCreatedInLast30Days = data.filter((d) => {
      const createdAtDate = new Date(d.createdAt)
      return createdAtDate >= thirtyDaysAgo && createdAtDate <= currentDate
    })

    const dataCreatedLast30DaysCount = dataCreatedInLast30Days.length
    const percentageChange =
      ((dataCreatedLast30DaysCount - data?.length) / data?.length) * 100

    // console.log(percentageChange.toFixed(2))

    if (percentageChange?.toString().startsWith('-')) {
      return percentageChange.toFixed(2) + '%'
    } else {
      return '+' + percentageChange.toFixed(2) + '%'
    }
  }

  const main = [
    {
      name: 'Total Customers',
      total: usersLength,
      incOrDesc: incOrDesc(users),
    },
    {
      name: 'Total Products',
      total: productsLength,
      incOrDesc: incOrDesc(products),
    },
    {
      name: 'Total Orders',
      total: ordersLength,
      incOrDesc: incOrDesc(orders),
    },
    {
      name: 'Total Blogs',
      total: blogsLength,
      incOrDesc: incOrDesc(blogs),
    },
  ]
  return (
    <div className="xl:flex grid w-full gap-4">
      <div className="grid xl:grid-cols-2 xl:justify-around items-center gap-4 mt-3 xl:w-/12 w-full">
        {main?.map((item, i) => (
          <div
            key={i}
            className="px-4 py-2 bg-[black] rounded-md w-full grid justify-between items-between lg:gap-4 gap-2 relative"
          >
            <h2 className="lg:text-2xl text-xl">{item?.name}</h2>
            <h3 className="text-[#6fddff] lg:text-5xl text-3xl font-bold">
              {item?.total}
            </h3>
            <div className="flex justify-between items-center lg:gap-4 gap-3">
              <h2 className="text-[#6fddff] lg:text-xl text-lg">
                {item?.incOrDesc?.startsWith('-') ? (
                  <div className="flex justify-center items-center gap-3 tracking-[2px]">
                    {item?.incOrDesc}{' '}
                    <PiChartLineDown size={28} className="red" />
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-3 tracking-[2px]">
                    {item?.incOrDesc}{' '}
                    <PiChartLineUp size={28} className="green" />
                  </div>
                )}
              </h2>
              <i className="lg:text-md absolute text-gray-300 right-4 text-sm">
                Since Last Month
              </i>
            </div>
          </div>
        ))}
      </div>
      <div className="xl:w-1/2 w-full bg-black rounded-md min-h-[350px]">
        <MyResponsiveLine users={users} />
      </div>
    </div>
  )
}

export default Main
