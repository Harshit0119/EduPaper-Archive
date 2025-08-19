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
