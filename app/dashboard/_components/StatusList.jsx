import { getUniqueRecord } from '@/app/_services/service';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Card from './Card';

function StatusList({ attendanceList }) {
    const [totalStudent, setTotalStudent] = useState(0);
    const [presentPerc, setPresentPerc] = useState(0);

    useEffect(() => {
        if (attendanceList) {
            const totalSt = getUniqueRecord(attendanceList);
            setTotalStudent(totalSt.length); 

            const today = Number(moment().format('D'));
            if (totalSt.length > 0 && today > 0) {
                const PresentPerc = ((attendanceList.length / (totalSt.length * today)) * 100).toFixed(2);
                setPresentPerc(PresentPerc); 
            } else {
                setPresentPerc(0); 
            }
        }
    }, [attendanceList]);

    return (
        <div className='grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
            <Card icon={<GraduationCap />} title='Total Student' value={totalStudent} />
            <Card icon={<TrendingUp />} title='Total Present' value={presentPerc+"%"} />
            <Card icon={<TrendingDown />} title='Total Absent' value={(100 - presentPerc)+"%"} />
        </div>
    );
}

export default StatusList;
