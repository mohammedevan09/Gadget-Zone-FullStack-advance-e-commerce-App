'use client'

import { ResponsiveBar } from '@nivo/bar'
import { colorGeneratorBar } from '../staticItem/data'
import { useMemo } from 'react'

const Bar = ({ products }) => {
  const categoryBar = useMemo(() => {
    return products?.reduce((acc, curr) => {
      const prodCreatedAt = new Date(curr?.createdAt)?.getMonth() + 1
      const prodCategory = curr?.category

      const findMonth = acc.find((item) => item?.month === prodCreatedAt)

      if (findMonth) {
        if (findMonth[prodCategory]) {
          findMonth[prodCategory] += curr?.price
        } else {
          findMonth[prodCategory] = curr?.price
          findMonth[`${prodCategory}Color`] = colorGeneratorBar()
        }
      } else {
        const newMonthEntry = {
          month: prodCreatedAt,
        }
        newMonthEntry[prodCategory] = curr?.price
        newMonthEntry[`${prodCategory}Color`] = colorGeneratorBar()

        acc.push(newMonthEntry)
      }

      return acc
    }, [])
  }, [products])

  const keys = useMemo(() => {
    return products?.reduce((acc, curr) => {
      if (!acc?.includes(curr?.category)) {
        acc?.push(curr?.category)
      }

      return acc
    }, [])
  }, [products])

  return (
    <ResponsiveBar
      data={categoryBar}
      keys={keys}
      colors={({ id, data }) => data[`${id}Color`]}
      colorBy="indexValue"
      indexBy="month"
      margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
      padding={0.2}
      maxValue={'auto'}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
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
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Months',
        legendPosition: 'middle',
        legendOffset: 42,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Price',
        legendPosition: 'middle',
        legendOffset: -50,
      }}
      labelSkipWidth={18}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', '2']],
      }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'top',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: -35,
          itemsSpacing: 8,
          itemWidth: 85,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: 'cyan',
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  )
}

export default Bar
