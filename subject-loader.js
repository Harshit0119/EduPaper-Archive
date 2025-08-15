const params = new URLSearchParams(window.location.search);
const branch = params.get("branch");
const sem = params.get("sem");
const code = params.get("code");

document.getElementById("subjectTitle").textContent = `📘 ${code.toUpperCase()} (${branch.toUpperCase()} – Semester ${sem})`;

const paperList = document.getElementById("paperLinks");
const redirectURL = subjectRedirectLinks[code.toUpperCase()];

if (!redirectURL) {
  paperList.innerHTML = `<div class="paper-card">🚧 No paper link found for ${code.toUpperCase()}.</div>`;
} else {
  const card = document.createElement("div");
  card.className = "paper-card";
  const link = document.createElement("a");
  link.href = redirectURL;
  link.target = "_blank";
  link.rel = "noopener";
  link.innerHTML = `🔗 <strong>View ${code.toUpperCase()} Question Papers</strong>`;
  card.appendChild(link);
  paperList.appendChild(card);
}

// ✅ Dynamically load study materials
const studyMaterialSection = document.querySelector(".study-material .material-grid");
const normalizedSem = sem.startsWith("sem") ? sem.replace("sem", "Sem") : `Sem${sem}`;
const materials = studyMaterialLinks?.[branch]?.[normalizedSem]?.[code.toUpperCase()];

console.log("Branch:", branch);
console.log("Semester:", sem);
console.log("Code:", code.toUpperCase());
console.log("Study Material Found:", materials);

if (materials && materials.length > 0) {
  materials.forEach(item => {
    const card = document.createElement("div");
    card.className = "material-item";

    if (item.type === "Mind Map") {
      const preview = document.createElement("img");
      preview.src = item.url;
      preview.alt = item.name;
      preview.width = 200;
      preview.style.cursor = "pointer";
      preview.onclick = () => window.open(item.url, "_blank");

      const caption = document.createElement("p");
      caption.textContent = item.name;

      card.appendChild(preview);
      card.appendChild(caption);
    } else {
      const button = document.createElement("a");
      button.href = item.url;
      button.download = "";
      button.className = "download-button";
      button.textContent = `📄 Download – ${item.name}`;
      card.appendChild(button);
    }

    studyMaterialSection.appendChild(card);
  });
}else {
  // 🚫 Hide the entire section if no materials found
  document.querySelector(".study-material").style.display = "none";
}