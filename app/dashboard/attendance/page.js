"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import MonthSelection from "@/app/_components/MonthSelection";
import GradeSelect from "@/app/_components/GradeSelect";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_services/GlobalApi";
import moment from "moment";
import AttendanceGrid from "./_components/AttendanceGrid";

function Attendance() {
  const { setTheme } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList, setAttendanceList] = useState();

  // Used to fetch attendance list for given month and Grade
  const onSearchHandler = () => {
    const month = moment(selectedMonth).format("MM/YYYY");
    GlobalApi.GetAttendanceList(selectedGrade, month).then((resp) => {
      setAttendanceList(resp.data);
    });
  };

  useEffect(() => {
    setTheme("light");
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Attendance</h2>
      <div className="flex gap-4 my-5 p-5 border rounded-lg shadow-sm">
        <div className="flex gap-2 items-center">
          <label>Select Month:</label>
          <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
        </div>
        <div className="flex gap-2 items-center">
          <label>Select Grade:</label>
          <GradeSelect selectedGrade={(value) => setSelectedGrade(value)} />
        </div>
        <Button onClick={onSearchHandler}>Search</Button>
      </div>
      <AttendanceGrid attendanceList={attendanceList} selectedMonth={selectedMonth} />
    </div>
  );
}

export default Attendance;
