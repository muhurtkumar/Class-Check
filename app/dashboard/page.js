"use client"
import React, { useEffect, useState } from 'react';
import { useTheme } from "next-themes";
import GradeSelect from '@/app/_components/GradeSelect';
import GlobalApi from '@/app/_services/GlobalApi';
import moment from 'moment';

import MonthSelection from '../_components/MonthSelection';
import AttendanceGrid from './attendance/_components/AttendanceGrid';
import StatusList from './_components/StatusList';
import BarChartComponent from './_components/BarChartComponent';

function Dashboard() {
    const { setTheme } = useTheme();
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedGrade, setSelectedGrade] = useState();
    const [attendanceList,setAttendanceList] = useState();
    const [totalPresentData, setTotalPresentData] = useState([]);

    useEffect(()=>{
        getStudentAttendance();
        TotalPresentCountByDay();
    },[selectedMonth])

    useEffect(()=>{
        getStudentAttendance();
        TotalPresentCountByDay();
    },[selectedGrade])   

    // used to get Student Attendace for given month and date
    const getStudentAttendance=()=>{
        GlobalApi.GetAttendanceList(selectedGrade,moment(selectedMonth).format('MM/yyyy'))
        .then(resp=>{
            setAttendanceList(resp.data)
        })
    }
    

    const TotalPresentCountByDay = () => {
        GlobalApi.TotalPresentCountByDay(moment(selectedMonth).format('MM/yyyy'), selectedGrade)
            .then(resp => {
                setTotalPresentData(resp.data)
            })
    };
    
    
    return (
        <div className='p-10'>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-2xl'>Dashboard</h2>
                <div className='flex items-center gap-4'>
                    <MonthSelection selectedMonth={setSelectedMonth} />
                    <GradeSelect selectedGrade={(v)=>setSelectedGrade(v)} />
                </div>
            </div>
            <StatusList attendanceList={attendanceList}/>
            <div className='grid grid-cols-1 md:grid-cols-3'>
                <div className='md:col-span-2'>
                    <BarChartComponent attendanceList={attendanceList}
                    totalPresentData={totalPresentData}/>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;
