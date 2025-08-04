const params = new URLSearchParams(window.location.search);
const branch = params.get("branch");
const sem = params.get("sem");
const code = params.get("code");

const title = document.getElementById("subjectTitle");
title.textContent = `📘 ${code.toUpperCase()} (${branch.toUpperCase()} – Semester ${sem})`;

const paperList = document.getElementById("paperLinks");

const redirectURL = subjectRedirectLinks[code.toUpperCase()];

if (!redirectURL) {
  paperList.innerHTML = `<div class="paper-card">🚧 Sorry, no paper link found for ${code.toUpperCase()}.</div>`;
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