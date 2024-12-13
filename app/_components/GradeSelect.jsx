import React, { useEffect, useState } from 'react';
import GlobalApi from '../_services/GlobalApi';

function GradeSelect({ selectedGrade }) {
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        GetAllGradesList();
    }, []);

    const GetAllGradesList = async () => {
        try {
            const resp = await GlobalApi.GetAllGrades();
            setGrades(resp.data);
        } catch (error) {
            console.error('Error fetching grades:', error);
        }
    };

    return (
        <div>
            <select
                className="p-2 border rounded-lg"
                onChange={(e) => selectedGrade?.(e.target.value)}
                disabled={grades.length === 0} // Disable if grades are not loaded
            >
                <option value="">Select Grade</option>
                {grades.map((item, index) => (
                    <option key={index} value={item.grade}>
                        {item.grade}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default GradeSelect;
