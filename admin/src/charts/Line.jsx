'use client'

import { months } from '@/staticItem/data'
import { ResponsiveLine } from '@nivo/line'
import { useEffect, useState } from 'react'

const MyResponsiveLine = ({ users }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const formattedMonths = [
      { x: 'Jan', y: 0 },
      { x: 'Feb', y: 0 },
      { x: 'Mar', y: 0 },
      { x: 'Apr', y: 0 },
      { x: 'May', y: 0 },
      { x: 'Jun', y: 0 },
      { x: 'Jul', y: 0 },
      { x: 'Aug', y: 0 },
      { x: 'Sep', y: 0 },
      { x: 'Oct', y: 0 },
      { x: 'Nov', y: 0 },
      { x: 'Dec', y: 0 },
    ]

    users.forEach((customer) => {
      const createdAt = new Date(customer.createdAt)
      const month = months[createdAt.getMonth()]

      const findMonth = formattedMonths.find((item) => item?.x === month)

      findMonth.y += 1
    })
    setData([
      {
        id: 'Users',
        color: 'blue',
        data: formattedMonths,
      },
    ])
  }, [users])

  // console.log(data)

  return (
    <ResponsiveLine
      data={data}
      theme={{
        text: {
          fontSize: 20,
        },
        axis: {
          text: {
            fontSize: 20,
          },
          domain: {
            line: {
              stroke: '#539eff',
            },
          },
          legend: {
            text: {
              fill: '#539eff',
              fontSize: '21px',
            },
          },
          ticks: {
            line: {
              stroke: '#539eff',
              strokeWidth: 1,
              fontSize: '21px',
            },
            text: {
              fill: '#539eff',
            },
          },
        },
        legends: {
          text: {
            fill: '#539eff',
          },
        },
        tooltip: {
          container: {
            color: 'Black',
          },
        },
      }}
      colors={{ datum: 'color' }}
      margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 90,
        legend: 'Month',
        legendOffset: 50,
        legendPosition: 'middle',
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Total',
        legendOffset: -50,
        legendPosition: 'middle',
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      enableArea={true}
      areaBlendMode="luminosity"
      legends={[
        {
          anchor: 'top',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: -35,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 18,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  )
}

export default MyResponsiveLine
