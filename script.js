function goToSubjectPage() {
  const branch = document.getElementById("branch").value;
  const sem = document.getElementById("semester").value;
  const subjectCode = document.getElementById("subject").value;

  if (branch && sem && subjectCode) {
    window.location.href = `subject.html?branch=${branch}&sem=${sem}&code=${subjectCode}`;
  }
}

function loadSemesters() {
  const branch = document.getElementById("branch").value;
  const semester = document.getElementById("semester");
  semester.innerHTML = '<option value="">--Select Semester--</option>';

  if (data[branch]) {
    Object.keys(data[branch]).forEach(sem => {
      const option = document.createElement("option");
      option.value = sem;
      option.text = sem.toUpperCase();
      semester.appendChild(option);
    });
  }

  document.getElementById("papersList").innerHTML = "";
}

function loadPapers() {
  const branch = document.getElementById("branch").value;
  const sem = document.getElementById("semester").value;
  const subjectDropdown = document.getElementById("subject");
  subjectDropdown.innerHTML = '<option value="">--Select Subject--</option>';
  subjectDropdown.disabled = true;

  if (data[branch] && data[branch][sem]) {
    data[branch][sem].forEach(file => {
      const option = document.createElement("option");
      option.value = file.code;
      option.textContent = `${file.code} - ${file.name.replace('.pdf','')}`;
      subjectDropdown.appendChild(option);
    });
    subjectDropdown.disabled = false;
  }

  document.getElementById("papersList").innerHTML = "";
}

function toggleSyllabusMenu() {
  const menu = document.getElementById("syllabusMenu");
  menu.classList.toggle("hidden");
}

function updateViewButton() {
  const branch = document.getElementById("branch").value;
  const sem = document.getElementById("semester").value;
  const subject = document.getElementById("subject").value;
  const viewBtn = document.getElementById("viewButton");

  if (branch && sem && subject) {
    viewBtn.style.display = "inline-block";
    viewBtn.onclick = () => {
      const url = `subject.html?branch=${branch}&sem=${sem}&code=${subject}`;
      window.location.href = url;
    };
  } else {
    viewBtn.style.display = "none";
  }
}

function redirectToStreamPage() {
  const selected = document.getElementById("streamSelect").value;
  if (!selected) return;
  // Redirect to a stream-specific archive page
window.location.href = `school-archive/${selected}.html`;
}

// Reload page if revisited via back/forward
window.addEventListener("pageshow", function (event) {
  if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
    window.location.reload();
  }
});

function shareSite() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: "Check out this useful question paper archive from EduPaper by Harshit!",
      url: window.location.href
    }).then(() => {
      console.log("Thanks for sharing!");
    }).catch((err) => {
      console.error("Sharing failed:", err);
    });
  } else {
    alert("Sharing isn’t supported on this browser.You can copy the link manually.");
  }
}

document.getElementById("hamburger").addEventListener("click", function () {
  document.getElementById("nav-links").classList.toggle("show");
});

function redirectToBranch() {
  const selected = document.getElementById("branchSelect").value;
  if (!selected) return;
  // Redirect to a branch-specific material page
  window.location.href = `materials/${selected}.html`;
}


const syllabusData = { 
  "1": {
    "BT-101": "../materials/CSE/sem1/BT-101.pdf",
    "BT-102": "../materials/CSE/sem1/BT-102.pdf",
    "BT-103": "../materials/CSE/sem1/BT-103.pdf",
    "BT-104": "../materials/CSE/sem1/BT-104.pdf",
    "BT-105": "../materials/CSE/sem1/BT-105.pdf",
  },
  "2": {
    "BT-201": "../materials/CSE/sem2/BT-201.pdf",
    "BT-202": "../materials/CSE/sem2/BT-202.pdf",
    "BT-203": "../materials/CSE/sem2/BT-203.pdf",
    "BT-204": "../materials/CSE/sem2/BT-204.pdf",
    "BT-205": "../materials/CSE/sem2/BT-205.pdf",
  },   
  "5": {
    "CS-501": "../materials/CSE/sem5/CS-501.pdf",
    "CS-502": "../materials/CSE/sem5/CS-502.pdf",
    "CS-503-A": "../materials/CSE/sem5/CS-503-A.pdf",
    "CS-503-C": "../materials/CSE/sem5/CS-503-C.pdf",
    "CS-504-A": "../materials/CSE/sem5/CS-504-A.pdf",
    "CS-504-B": "../materials/CSE/sem5/CS-504-B.pdf",
    "CS-504-C": "../materials/CSE/sem5/CS-504-C.pdf"
  },
};

const semesterSelect = document.getElementById("semesterSelect");
const subjectSelect = document.getElementById("subjectSelect");
const pdfContainer = document.getElementById("pdfContainer");

semesterSelect.addEventListener("change", () => {
  const sem = semesterSelect.value;
  subjectSelect.innerHTML = `<option value="">Select Subject</option>`;
  pdfContainer.innerHTML = "";
  
  if (syllabusData[sem]) {
    subjectSelect.disabled = false;
    Object.keys(syllabusData[sem]).forEach(subject => {
      const opt = document.createElement("option");
      opt.value = subject;
      opt.textContent = subject;
      subjectSelect.appendChild(opt);
    });
  } else {
    subjectSelect.disabled = true;
  }
});

subjectSelect.addEventListener("change", () => {
  const sem = semesterSelect.value;
  const subject = subjectSelect.value;
  const pdfPath = syllabusData[sem]?.[subject];

  if (pdfPath) {
    pdfContainer.innerHTML = `
      <h3>${subject} Syllabus</h3>
      <a href="${pdfPath}" target="_blank">📥 Download PDF</a>
    `;
  } else {
    pdfContainer.innerHTML = "";
  }
});