const url = "https://681245c23ac96f7119a77e57.mockapi.io/nyoba";
let totalArticles = 0; 
let articlesPerPage = 6;
let currentPage = 1;

// Fungsi untuk mengambil jumlah total artikel dari API
async function getTotalArticles() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    totalArticles = data.length;
    return totalArticles;
  } catch (error) {
    console.error("Gagal mengambil jumlah total artikel:", error);
    return 0;
  }
}

// Fungsi untuk generate pagination
async function generatePagination(currentPage) {
  const totalCount = await getTotalArticles();
  const totalPages = Math.ceil(totalCount / articlesPerPage);
  
  // Generate HTML pagination
  let paginationHTML = '';
  
  // Previous button
  paginationHTML += `
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}" style="cursor: pointer">
      <a class="page-link" aria-label="Previous" ${currentPage > 1 ? `onclick="getArticles(${currentPage - 1})"` : ''}>
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
  `;
  
  // Maksimal menampilkan 5 nomor halaman
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  
  // Sesuaikan range jika di ujung
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }
  
  // Tampilkan halaman pertama
  if (startPage > 1) {
    paginationHTML += `
      <li class="page-item" style="cursor: pointer">
        <a class="page-link" href="#" onclick="getArticles(1)">1</a>
      </li>
    `;
    if (startPage > 2) {
      paginationHTML += `
        <li class="page-item disabled">
          <a class="page-link">...</a>
        </li>
      `;
    }
  }
  
  // Generate nomor halaman
  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `
      <li class="page-item ${i === currentPage ? 'active' : ''}" style="cursor: pointer">
        <a class="page-link" href="#" onclick="getArticles(${i})">${i}</a>
      </li>
    `;
  }
  
  // Tampilkan halaman terakhir
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationHTML += `
        <li class="page-item disabled">
          <a class="page-link">...</a>
        </li>
      `;
    }
    paginationHTML += `
      <li class="page-item" style="cursor: pointer">
        <a class="page-link" href="#" onclick="getArticles(${totalPages})">${totalPages}</a>
      </li>
    `;
  }
  
  // Next button
  paginationHTML += `
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}" style="cursor: pointer">
      <a class="page-link" aria-label="Next" ${currentPage < totalPages ? `onclick="getArticles(${currentPage + 1})"` : ''}>
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  `;
  
  // Update pagination di halaman
  const paginationElement = document.querySelector('.pagination');
  if (paginationElement) {
    paginationElement.innerHTML = paginationHTML;
  }
}

// Ambil semua artikel
async function getArticles(page) {
  try {
    currentPage = page;
    const response = await fetch(`${url}?page=${page}&limit=${articlesPerPage}`);
    const data = await response.json();

    // Tampilkan sorotan artikel pertama & kedua
    const sorotArticle = document.getElementById("sorotArticle");
    if (sorotArticle && data.length > 0) {
      sorotArticle.innerHTML = `
        <div class="col">
          ${data.slice(0, Math.min(2, data.length)).map(article => `
            <div class="mb-3">
              <div class="card h-100">
                <img src="${article.image}" class="card-img-top" alt="${article.title || 'Gambar artikel'}" />
                <div class="card-body">
                  <h2 class="card-title fw-bold mb-3">${article.title}</h2>
                  <p class="card-text">${article.description}</p>
                  <a href="articleDetail.html?id=${article.id}" class="btn btn-success">Baca Selengkapnya</a>
                </div>
              </div>
            </div>
          `).join("")}
        </div>`;
    }

    // Tampilkan daftar artikel lainnya
    const myArticles = document.getElementById("myArticles");
    if (myArticles) {
      if (data.length > 2) {
        myArticles.innerHTML = data.slice(2).map(article => `
          <div class="col-md-12">
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${article.image}" class="img-fluid rounded-start" alt="${article.title || 'Gambar artikel'}" />
                </div>
                <div class="col-md-8">
                  <div class="card-body d-flex align-items-center">
                    <div>
                      <h5 class="card-title fw-bold" style="font-size: 20px">${article.title}</h5>
                      <a href="articleDetail.html?id=${article.id}" class="btn btn-success">Baca Selengkapnya</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `).join("");
      } else {
        myArticles.innerHTML = `<p>Tidak ada artikel tambahan untuk halaman ini.</p>`;
      }
    }
    
    // Update pagination
    generatePagination(page);
    
  } catch (error) {
    console.error("Gagal mengambil artikel:", error);
  }
}

// Ambil artikel berdasarkan ID
async function getArticleById(id) {
  try {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      throw new Error("Artikel tidak ditemukan");
    }
    const data = await response.json();

    const articleDetail = document.getElementById("articleDetail");
    if (articleDetail) {
      articleDetail.innerHTML = `
        <div class="card mb-5">
          <img src="${data.image}" class="card-img-top" alt="${data.title || 'Gambar artikel'}">
          <div class="card-body">
            <h2 class="card-title">${data.title}</h2>
            <p class="card-text" style="font-size: 18px;">${data.article.replace(/\n/g, "<br>")}</p>
            <p class="card-text"><small class="text-muted">${data.author}</small></p>
          </div>
        </div>
      `;
    }
  } catch (error) {
    const articleDetail = document.getElementById("articleDetail");
    if (articleDetail) {
      articleDetail.innerHTML = `
        <div class="alert alert-warning" role="alert">
          <h4 class="alert-heading">Artikel tidak ditemukan</h4>
          <p>Maaf, artikel yang Anda cari tidak tersedia atau telah dihapus.</p>
          <hr>
          <p class="mb-0">Silahkan kembali ke <a href="/articel.html" class="alert-link">halaman artikel</a> untuk melihat artikel lainnya.</p>
        </div>
      `;
    }
    console.error("Gagal memuat detail artikel:", error);
  }
}

// Event saat halaman dimuat
window.addEventListener("load", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const page = urlParams.get("page");
  
  if (id) {
    getArticleById(id);
  } else {
    // Gunakan parameter page dari URL jika ada, atau default ke halaman 1
    getArticles(page ? parseInt(page) : 1);
  }
});

// Tombol Next dan Prev di halaman detail
document.addEventListener("DOMContentLoaded", async () => {
  const nextBtn = document.getElementById("nextArticleButton");
  const prevBtn = document.getElementById("prevArticleButton");

  if (nextBtn || prevBtn) {
    const urlParams = new URLSearchParams(window.location.search);
    const currentId = parseInt(urlParams.get("id"));
    
    // Ambil total jumlah artikel untuk validasi navigasi
    const totalCount = await getTotalArticles();

    if (nextBtn) {
      if (currentId < totalCount) {
        nextBtn.addEventListener("click", () => {
          const nextId = currentId + 1;
          window.location.href = `articleDetail.html?id=${nextId}`;
        });
        nextBtn.classList.remove("disabled");
      } else {
        nextBtn.classList.add("disabled");
      }
    }

    if (prevBtn) {
      if (currentId > 1) {
        prevBtn.addEventListener("click", () => {
          const prevId = currentId - 1;
          window.location.href = `articleDetail.html?id=${prevId}`;
        });
        prevBtn.classList.remove("disabled");
      } else {
        prevBtn.classList.add("disabled");
      }
    }
  }
});
