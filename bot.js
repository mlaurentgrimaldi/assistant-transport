const SECRET_CODE = "NEXITUP2026";

const REPONSES = {

  chronopost: localStorage.getItem("admin_chronopost") || `📦 CONTACTER CHRONOPOST

📧 Email : service.client@chronopost.fr

📞 Téléphone National : 0892 70 25 07
Horaires : lundi au vendredi, 8h - 18h
Délais : 24 à 48h

📞 Téléphone Export : 0825 801 801
Délais : 72h ou plus selon destination`,

  tarifs_chronopost: localStorage.getItem("admin_tarifs_chronopost") || `💰 TARIFS CHRONOPOST

https://groupealliance.sharepoint.com/:b:/r/docs/01%20-%20ALLIANCE-COM/Supply-Chain/Transport/Grilles%20tarifaires/Chronopost-2024/tarifs%2046193601-05-12-2024%20chrono%20actuel.pdf?csf=1&web=1&e=65k3vr`,

  services_chronopost: localStorage.getItem("admin_services_chronopost") || `🛎️ SERVICES CHRONOPOST
- Chrono 18 -> Assure le délai contractuel de livraison avant 18h00
- Chrono 13 -> Assure le délai contractuel de livraison avant 13h00
- Chrono 10 -> Assure le délai contractuel de livraison avant 10h00
<strong><em><span style="color: red;">Voir la liste des localités desservies par CH-10</span></em></strong>
- Click and collect -> Livraison dans un point relais choisi par le client`,

  etiquette_chronopost: `__VIDEO__`,

  heppner: localStorage.getItem("admin_heppner") || `🚚 CONTACTER HEPPNER

📞 Téléphone : 04 72 23 40 66
📧 Email : audrey.pierrottet@heppner-group.com`,

  tarifs_heppner: localStorage.getItem("admin_tarifs_heppner") || `💰 TARIFS HEPPNER

https://groupealliance.sharepoint.com/:x:/r/_layouts/15/Doc.aspx?sourcedoc=%7BFD5B2B25-DB56-4914-A809-829E948824DB%7D&file=GROUPE%20ASAP%20tarif%20applicable%20au%2001%2001%2026%20-%20heppner%20actuel.xlsx&action=default&mobileredirect=true`,

  services_heppner: localStorage.getItem("admin_services_heppner") || `🛎️ SERVICES HEPPNER

- Star Priority -> Assure le délai contractuel de livraison
- Star Priority 13 -> Assure le délai contractuel de livraison avant 13h00
- Star Date -> Assure une livraison à une date précise
- Star RDV -> Assure une livraison avec prise de RDV`,

  tracking: localStorage.getItem("admin_tracking") || `🔍 TRACKING INTROUVABLE ?

Le tracking de chaque commande se trouve dans la "LC" correspondante au numéro de livraison dans NETSUITE.
Un lien https est disponible dans le champ 👉 TRACKING COLIS

Si aucun lien https n'est présent, deux cas possibles :

1) COMMANDE EXPORT : le tracking a été envoyé par mail avec les documents export au responsable du compte ainsi qu'à la personne ayant saisi la commande.

2) GROUPAGE CLIENT : le champ TRANSPORTEUR indique :
   - "RH-CH" = regroupement de colis expédiés par Chronopost
   - "Classic" = regroupement en palette Heppner
   -> Pour retrouver le tracking, aller dans le compte client et ouvrir les LC expédiées à la même date. L'une d'elles contient le tracking. 🙂`,

  groupage: `📅 GROUPAGES CLIENT HEBDOMADAIRES

- ACRT VILLEFRANCHE : Lundis et Mercredis
- ACRT BOURG : Lundis
- TIMS : Lundis et Mercredis
- SYBORD et MULTIPHONE : Mardis et Vendredis
- ABC TELEPHONIE : Mercredis et Vendredis
- ATELSYS : Mercredis et Vendredis
- ACTION TELECOM, ACTION TELECOM ATLANTIQUE et ACTION TELECOM OCCITANIE : Vendredis
- MACON COMMUNICATION et MY TELECOM ENTREPRISE : Mardis`
};

/* =========================
   INIT
========================= */

const boutons = document.querySelectorAll(".suggestion");
let boutonActif = null;

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

/* =========================
   CLICK
========================= */

boutons.forEach(btn => {

  btn.addEventListener("click", () => {

    const cle = btn.dataset.cle;
    const boxId = btn.dataset.box;
    const box = document.getElementById(boxId);

    if (btn === boutonActif) {
      box.classList.remove("visible");
      box.style.display = "none";
      btn.classList.remove("actif");
      boutonActif = null;
      return;
    }

    document.querySelectorAll(".reponse-box").forEach(b => {
      b.classList.remove("visible");
      b.style.display = "none";
    });

    boutons.forEach(b => b.classList.remove("actif"));

    if (cle === "delais") {
      box.innerHTML = `
        <h3 class="titre-carte">🗺️ Délais de livraison Heppner</h3>
        <iframe src="carte-france-livraison.html" class="carte-iframe"></iframe>
      `;
    }
    else if (cle === "groupage") {
      box.innerHTML = `<img src="groupages-clients.png" class="groupage-image">`;
    }
    else if (cle === "cut") {
      box.innerHTML = `<img src="Cutoff.png" class="cutoff-image">`;
    }
    else if (cle === "etiquette_chronopost") {
      box.innerHTML = `
        <h3 class="titre-carte">🏷️ Créer une étiquette Chronopost</h3>
        <video controls style="width:100%; border-radius:14px; margin-top:12px;">
          <source src="retour-chronopost.mp4" type="video/mp4">
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      `;
    }
    else if (cle === "tarifs_chronopost") {
  box.innerHTML = `
    <h3 class="titre-carte">💰 TARIFS CHRONOPOST</h3>
    <a
      href="https://groupealliance.sharepoint.com/:b:/r/docs/01%20-%20ALLIANCE-COM/Supply-Chain/Transport/Grilles%20tarifaires/Chronopost-2024/tarifs%2046193601-05-12-2024%20chrono%20actuel.pdf?csf=1&web=1&e=65k3vr"
      target="_blank"
      class="btn-lien"
    >
      Cliquez ici
    </a>
  `;
}
else if (cle === "tarifs_heppner") {
  box.innerHTML = `
    <h3 class="titre-carte">💰 TARIFS HEPPNER</h3>
    <a
      href="https://groupealliance.sharepoint.com/:x:/r/_layouts/15/Doc.aspx?sourcedoc=%7BFD5B2B25-DB56-4914-A809-829E948824DB%7D&file=GROUPE%20ASAP%20tarif%20applicable%20au%2001%2001%2026%20-%20heppner%20actuel.xlsx&action=default&mobileredirect=true"
      target="_blank"
      class="btn-lien"
    >
      Cliquez ici
    </a>
  `;
}
  else if (cle === "localites_chronopost") {
  box.innerHTML = `
    <h3 class="titre-carte">📍 Localités desservies en CH-10</h3>
    <a href="https://www.chronopost.fr/sites/chronopost/files/2024-04/couverture_c10_1.pdf"
      target="_blank"
      class="btn-lien">
      Cliquez ici
    </a>
  `;
}
  else if (cle === "localites_heppner") {
  box.innerHTML = `
    <h3 class="titre-carte">📍 Localités non desservies service STAR</h3>
    <a href="https://groupealliance.sharepoint.com/:x:/r/_layouts/15/Doc.aspx?sourcedoc=%7B9BA3C9A7-59C1-4627-B435-9098CE6063C0%7D&file=Localit%C3%A9s%20exclues%20Star.xlsx&action=default&mobileredirect=true"
      target="_blank"
      class="btn-lien">
      Cliquez ici
    </a>
  `;
}
else {
  box.textContent = REPONSES[cle];
}

    box.style.display = "block";

    requestAnimationFrame(() => {
      box.classList.add("visible");
    });

    btn.classList.add("actif");
    boutonActif = btn;

    box.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

  });

});

/* =========================
   RECHERCHE
========================= */

const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", (e) => e.preventDefault());

searchInput.addEventListener("keydown", (e) => {

  if (e.key !== "Enter") return;

  e.preventDefault();

  const query = normalize(searchInput.value.trim());
  if (!query) return;

  let bestBtn = null;
  let bestScore = 0;

  boutons.forEach(btn => {

    const texteBouton = normalize(btn.textContent);
    const cle = normalize(btn.dataset.cle || "");
    const contenu = normalize(REPONSES[btn.dataset.cle] || "");

    let score = 0;

    if (texteBouton.includes(query)) score += 20;
    if (cle.includes(query)) score += 15;
    if (contenu.includes(query)) score += 30;

    query.split(" ").forEach(mot => {
      if (mot.length < 2) return;
      if (texteBouton.includes(mot)) score += 8;
      if (cle.includes(mot)) score += 6;
      if (contenu.includes(mot)) score += 12;
    });

    if (score > bestScore) {
      bestScore = score;
      bestBtn = btn;
    }

  });

  if (bestBtn) bestBtn.click();
});

/* =========================
   RECHERCHE VISUELLE
========================= */

searchInput.addEventListener("input", () => {

  const recherche = normalize(searchInput.value);
  const categories = document.querySelectorAll(".categorie");

  categories.forEach(cat => {

    let visible = false;

    cat.querySelectorAll(".suggestion").forEach(btn => {

      const txt = normalize(btn.textContent);
      const cle = normalize(btn.dataset.cle || "");
      const contenu = normalize(REPONSES[btn.dataset.cle] || "");

      let match = false;

      if (txt.includes(recherche) || cle.includes(recherche) || contenu.includes(recherche)) {
        match = true;
      }

      recherche.split(" ").forEach(mot => {
        if (txt.includes(mot) || cle.includes(mot) || contenu.includes(mot)) {
          match = true;
        }
      });

      btn.style.display = (match || !recherche) ? "flex" : "none";
      if (match || !recherche) visible = true;

    });

    cat.style.display = (visible || !recherche) ? "block" : "none";

  });

});

/* =========================
   ADMIN CACHE
========================= */

const zoneAdminCache = document.getElementById("zone-admin-cache");
const adminPanel = document.getElementById("adminPanel");
const closeAdmin = document.getElementById("closeAdmin");
const saveAdmin = document.getElementById("saveAdmin");

zoneAdminCache.addEventListener("click", () => {

  const code = prompt("Code secret administration :");
  if (code !== SECRET_CODE) return alert("Code incorrect");

  document.getElementById("adminChronopost").value = localStorage.getItem("admin_chronopost") || "";
  document.getElementById("adminTarifsChronopost").value = localStorage.getItem("admin_tarifs_chronopost") || "";
  document.getElementById("adminServicesChronopost").value = localStorage.getItem("admin_services_chronopost") || "";
  document.getElementById("adminHeppner").value = localStorage.getItem("admin_heppner") || "";
  document.getElementById("adminTarifsHeppner").value = localStorage.getItem("admin_tarifs_heppner") || "";
  document.getElementById("adminServicesHeppner").value = localStorage.getItem("admin_services_heppner") || "";
  document.getElementById("adminTracking").value = localStorage.getItem("admin_tracking") || "";

  adminPanel.classList.add("visible");
});

closeAdmin.addEventListener("click", () => adminPanel.classList.remove("visible"));

saveAdmin.addEventListener("click", () => {

  const map = [
    ["adminChronopost", "admin_chronopost"],
    ["adminTarifsChronopost", "admin_tarifs_chronopost"],
    ["adminServicesChronopost", "admin_services_chronopost"],
    ["adminHeppner", "admin_heppner"],
    ["adminTarifsHeppner", "admin_tarifs_heppner"],
    ["adminServicesHeppner", "admin_services_heppner"],
    ["adminTracking", "admin_tracking"]
  ];

  map.forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) localStorage.setItem(key, el.value);
  });

  alert("Modifications sauvegardées avec succès.");
  location.reload();
});
