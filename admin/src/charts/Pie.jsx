'use client'

import { ResponsivePie } from '@nivo/pie'
import { colorGenerator } from '../staticItem/data'
import { useMemo } from 'react'
import { Box, Typography } from '@mui/material'

const Pie = ({ products }) => {
  const categoryPie = useMemo(() => {
    let nextIndex = 1
    return products?.reduce((acc, curr) => {
      const productCat = curr?.category

      const findCat = acc?.find((item) => item?.label === productCat)

      if (findCat) {
        findCat.value++
      } else {
        acc?.push({
          id: productCat,
          label: productCat,
          value: 1,
          color: colorGenerator(nextIndex++),
        })
      }

      return acc
    }, [])
  }, [products])

  const highest = categoryPie.reduce((acc, curr) => {
    if (curr.value > acc) {
      acc = curr.value
    }

    return acc
  }, 0)

  // console.log(categoryPie)

  return (
    <Box height={'100%'} position="relative">
      <ResponsivePie
        data={categoryPie}
        theme={{
          text: {
            fontSize: 20,
          },
          axis: {
            domain: {
              line: {
                stroke: 'cyan',
              },
            },
            legend: {
              text: {
                fill: 'cyan',
              },
            },
            ticks: {
              line: {
                stroke: 'cyan',
                strokeWidth: 1,
              },
              text: {
                fill: 'cyan',
              },
            },
          },
          legends: {
            text: {
              fill: 'cyan',
            },
          },
          tooltip: {
            container: {
              color: 'black',
            },
          },
        }}
        colors={{ datum: 'data.color' }}
        padAngle={1}
        margin={{ top: 40, right: 80, bottom: 100, left: 50 }}
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        enableArcLinkLabels={true}
        arcLinkLabelsTextColor={'cyan'}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 70,
            itemsSpacing: 8,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 20,
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
      />
      <Box
        position="absolute"
        top="48%"
        left="48%"
        color={'cyan'}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: 'translate(-50%, -100%)',
        }}
      >
        <Typography variant="h5">Highest {highest}</Typography>
      </Box>
    </Box>
  )
}

export default Pie
