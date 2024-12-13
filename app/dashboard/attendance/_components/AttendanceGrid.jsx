import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { getUniqueRecord } from '@/app/_services/service';

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [2, 5, 10];


function AttendanceGrid({ attendanceList, selectedMonth }) {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: 'studentId',filter:true },
    { field: 'name',filter:true }
  ]);

  // Function to mark attendance
  const onMarkAttendance = (day, studentId, presentStatus) => {
    const date = moment(selectedMonth).format('MM/yyyy');
    if (presentStatus) {
      const data = {
        day: day,
        studentId: studentId,
        present: presentStatus,
        date: date
      };

      GlobalApi.MarkAttendance(data).then((resp) => {
        console.log(resp);
        toast(`Student Id: ${studentId} marked as present`);
      });
    }
    else{
        GlobalApi.MarkAbsent(studentId,day,date).then(resp=>{
            toast(`Student Id: ${studentId} marked as absent`);
        })
    }
  };

  useEffect(() => {
    if (attendanceList && attendanceList.length > 0) {
      const userList = getUniqueRecord(attendanceList);
      setRowData(userList);

      // Dynamically generate column definitions for days in the month
      daysArrays.forEach((date) => {
        setColDefs((prevData) => [
          ...prevData,
          { field: date.toString(), width: 50, editable: true }
        ]);

        // Update user attendance for each day
        userList.forEach((obj) => {
          obj[date] = isPresent(obj.studentId, date);
        });
      });
    }
  }, [attendanceList]);

  const isPresent = (studentId, day) => {
    const result = attendanceList.find(
      (item) => item.day === day && item.studentId === studentId
    );
    return result ? true : false;
  };

  const daysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const numberOfDays = daysInMonth(
    moment(selectedMonth).format('yyyy'),
    moment(selectedMonth).format('MM') - 1
  );
  const daysArrays = Array.from({ length: numberOfDays }, (_, i) => i + 1);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        onCellValueChanged={(e) => {
          // Call the function explicitly
          onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue);
        }}
      />
    </div>
  );
}

export default AttendanceGrid;
