import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get('date'); // Assuming the date is in YYYY-MM-DD format
    const grade = searchParams.get('grade'); // Grade to filter by

    try {
        // Query to fetch attendance data
        const result = await db.select({
            day: ATTENDANCE.day,
            presentCount: sql`count(${ATTENDANCE.studentId})`,
        })
        .from(ATTENDANCE)
        .leftJoin(STUDENTS, and (eq(ATTENDANCE.studentId, STUDENTS.id), eq(ATTENDANCE.date, date)))
        .groupBy(ATTENDANCE.day)
        .where(eq(STUDENTS.grade, grade))
        .orderBy(desc(ATTENDANCE.day))
        .limit(7);

        return NextResponse.json(result);

    } catch (error) {
        console.error('Error fetching attendance data:', error);
        return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
    }
}
