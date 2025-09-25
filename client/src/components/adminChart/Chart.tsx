import type { product } from '@/types/type'
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from '../ui/chart'

import type{ ChartConfig } from '../ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader } from '../ui/card'
interface ProductChartPorps{
    data:product[]
}

function Chart({data}:ProductChartPorps) {
    const monthMap:{[month:string]:number}={};
    for(const product of data){
        const month=new Date(product.createdAt).toLocaleDateString("default",{
            month:"short",
            day:"2-digit"
        });
        if(!monthMap[month])monthMap[month]=0;
        monthMap[month]++
    }
    const chartData = Object.entries(monthMap).map(([month,count])=>({
      month,
      count
    }))
    
    const chartConfig={
      desktop:{
        label:"Date",
        color:"#2563eb"
      },
      mobile:{
        label:"Count",
        color:"#60a5fa"
      } 
    } satisfies ChartConfig
  return (
    <Card>
       <CardHeader>
        Product added per day
       </CardHeader>
       <CardContent>
       <ChartContainer config={chartConfig} className='min-h-60'>
        <AreaChart accessibilityLayer data={chartData}       margin={{
              left: 12,
              right: 12,
            }}>
        <Area dataKey={"month"}/>
        <Area dataKey={"count"}/>
          <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis 
            dataKey={"count"}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
        </AreaChart>
        </ChartContainer>
        </CardContent>
    </Card>
  )
}

export default Chart