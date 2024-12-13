export const getUniqueRecord = (attendanceList) => {
    const uniqueRecord = [];
    const existingUser = new Set(); // So that records are unique

    attendanceList?.forEach((record) => {
      if (!existingUser.has(record.studentId)) {
        existingUser.add(record.studentId);
        uniqueRecord.push(record);
      }
    });

    return uniqueRecord; // Return the unique records
  };