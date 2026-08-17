const API = "http://localhost:3000/appoinments";
const form = document.getElementById("form");
const list = document.getElementById("appointments");

async function loadAppointments() {
    const res = await axios.get(`${API}/get`);
    list.innerHTML = "";
    res.data.forEach(showAppointment);
}

function showAppointment(appointment) {
    const li = document.createElement("li");
    li.innerHTML = `
        ${appointment.name} |
        ${appointment.email} 

        <button class="delete">
            Delete
        </button>
    `;
    li.querySelector("button").onclick = async () => {
        await axios.delete(`${API}/delete/${appointment.id}`);
        loadAppointments();
    };
    list.appendChild(li);

}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const appointment = {
       name: document.getElementById("name").value,
        email: document.getElementById("email").value,
    };
     await axios.post(`${API}/add`, appointment);
    form.reset();
    loadAppointments();

});

loadAppointments();