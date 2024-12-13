import { getUniqueRecord } from '@/app/_services/service';
import React, { useState, useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function BarChartComponent({ attendanceList, totalPresentData }) {
    const [data, setData] = useState([]);

    useEffect(()=>{
        formatAttendanceListCount();
    },[attendanceList,totalPresentData])
    const formatAttendanceListCount=()=>{
    const totalStudent=getUniqueRecord(attendanceList);
    const result=totalPresentData.map((item=>({
        day:item.day,
        presentCount:item.presentCount,
        absentCount:Number(totalStudent?.length)-Number(item.presentCount)
    })))
    console.log(result);
    setData(result)
}

  return (
    <div className='p-5 border rounded-lg shadow-sm'>
        <h2 className='my-2 font-bold text-lg'>Attendance</h2>
    <ResponsiveContainer width={'100%'} height={300}>
        <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend/>
        <Bar dataKey="presentCount" fill="#8884d8" />
        <Bar dataKey="absentCount" fill="#82ca9d" />
        </BarChart>
    </ResponsiveContainer>
    </div>
  );
}

export default BarChartComponent;
