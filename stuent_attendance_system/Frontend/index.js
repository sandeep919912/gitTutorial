const API = "http://localhost:3000/students"

const loadAttendance = ()=>{
    getAllStudents()
}

const getAllStudents = async ()=>{
    const res = await axios.get(`${API}/students`)
    displayAttendanceWithCondition(res.data)
}
const displayAttendanceWithCondition = async () => {
    try {
        const attendanceDate = document.getElementById("attendanceDate");
        const date = attendanceDate.value;

        if (!date) {
            alert("Please select a date");
            return;
        }

        const response = await axios.get(`${API}/attendance?date=${date}`);

        const studentsData = response.data;

        const studentList = document.getElementById("studentList");
        const submitBtn = document.getElementById("submitAttendanceBtn");

        studentList.innerHTML = "";

        // Check whether attendance already exists
        const attendanceExists = studentsData.some(
            (student) => student.attendances.length > 0
        );

        if (!attendanceExists) {

            // Attendance does NOT exist
            // Show Present / Absent options

            studentsData.forEach((student) => {

                studentList.innerHTML += `
                    <div 
                        class="student"
                        data-student-id="${student.id}"
                        data-student-name="${student.name}"
                    >

                        <span class="student-name">
                            ${student.name}
                        </span>

                        <div class="options">

                            <label>
                                <input
                                    type="radio"
                                    name="attendance-${student.id}"
                                    value="present"
                                >
                                Present
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="attendance-${student.id}"
                                    value="absent"
                                >
                                Absent
                            </label>

                        </div>

                    </div>
                `;
            });

            // Show submit button
            submitBtn.style.display = "block";

        } else {

            // Attendance already exists
            // Show attendance status

            studentsData.forEach((student) => {

                const attendance = student.attendances[0];

                studentList.innerHTML += `
                    <div class="student">

                        <span class="student-name">
                            ${student.name}
                        </span>

                        <strong class="${
                            attendance.status === "present"
                                ? "status-present"
                                : "status-absent"
                        }">
                            ${attendance.status.toUpperCase()}
                        </strong>

                    </div>
                `;
            });

            // Hide submit button
            submitBtn.style.display = "none";
        }

    } catch (error) {
        console.log(error.message);
    }
};


const submitAttendance = async () => {
    try {

        const attendanceDate = document.getElementById("attendanceDate");
        const date = attendanceDate.value;

        if (!date) {
            alert("Please select a date");
            return;
        }

        const students = document.querySelectorAll(".student");

        for (const student of students) {

            const studentId = student.dataset.studentId;
            const studentName = student.dataset.studentName;

            const selectedStatus = student.querySelector(
                `input[name="attendance-${studentId}"]:checked`
            );

            // If no Present/Absent selected
            if (!selectedStatus) {
                alert(`Please select attendance for ${studentName}`);
                return;
            }

            const status = selectedStatus.value;

            console.log({
                studentId,
                date,
                status
            });

            // Send attendance to backend
            await axios.post(`${API}/attendance`, {
                studentId,
                date,
                status
            });
        }

        // Success message
        document.getElementById("message").textContent =
            "Attendance submitted successfully!";

        // Hide submit button
        document.getElementById("submitAttendanceBtn").style.display =
            "none";

    } catch (error) {
        console.log(error.message);

        document.getElementById("message").textContent =
            "Failed to submit attendance";
    }
};

const findAverage = async () => {
    try {
        const response = await axios.get(
            `${API}/allAttendance`
        );

        const students = response.data;

        const studentList = document.getElementById("studentList");

        studentList.innerHTML = "";

        students.forEach((student) => {

            const totalDays = student.attendances.length;

            const presentDays = student.attendances.filter(
                attendance => attendance.status === "present"
            ).length;

            const average =
                totalDays === 0
                    ? 0
                    : (presentDays / totalDays) * 100;

            studentList.innerHTML += `
                <div class="student">

                    <span class="student-name">
                        ${student.name}
                    </span>

                    <strong>
                        ${average.toFixed(2)}%
                    </strong>

                </div>
            `;
        });

    } catch (error) {
        console.log(error.message);
    }
};