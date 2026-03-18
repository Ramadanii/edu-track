let students = JSON.parse(localStorage.getItem("students")) || [];

render();

// MODAL
function openModal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// ADD STUDENT
function addStudent() {
    const name = document.getElementById("name").value;
    const subject = document.getElementById("subject").value;

    if (!name || !subject) return;

    students.push({
        id: Date.now(),
        name,
        subject,
        grades: []
    });

    save();
    closeModal();
}

// DELETE
function deleteStudent(id) {
    students = students.filter(s => s.id !== id);
    save();
}

// ADD RANDOM GRADE (advanced demo feel)
function addRandomGrade(id) {
    const student = students.find(s => s.id === id);
    const random = Math.floor(Math.random() * 5) + 6; // 6-10
    student.grades.push(random);
    save();
}

// AVG
function avg(grades) {
    if (!grades.length) return 0;
    return (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(1);
}

// GLOBAL AVG
function globalAvg() {
    let all = students.flatMap(s => s.grades);
    return avg(all);
}

// RENDER
function render() {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    students.forEach(s => {
        tbody.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.subject}</td>
        <td>${s.grades.join(", ")}</td>
        <td>${avg(s.grades)}</td>
        <td>
          <button onclick="addRandomGrade(${s.id})">+ Notë</button>
          <button onclick="deleteStudent(${s.id})">Delete</button>
        </td>
      </tr>
    `;
    });

    document.getElementById("totalStudents").innerText = students.length;
    document.getElementById("avgGrade").innerText = globalAvg();
}

// SAVE
function save() {
    localStorage.setItem("students", JSON.stringify(students));
    render();
}