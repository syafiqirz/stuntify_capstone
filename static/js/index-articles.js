const apiUrl = "https://681245c23ac96f7119a77e57.mockapi.io/nyoba";
const ARTICLES_TO_SHOW = 2; // Jumlah artikel yang ditampilkan di homepage

/**
 * Format tanggal untuk tampilan yang lebih baik
 * @param {string} dateString - String tanggal dari API
 * @returns {string} - Tanggal yang sudah diformat
 */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}

/**
 * Potong teks jika terlalu panjang
 * @param {string} text - Teks yang akan dipotong
 * @param {number} maxLength - Panjang maksimal sebelum dipotong
 * @returns {string} - Teks yang sudah dipotong
 */
function truncateText(text, maxLength) {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

/**
 * Mendapatkan URL gambar default jika gambar dari API tidak ada
 * @param {number} index - Indeks artikel
 * @returns {string} - URL gambar default
 */
function getDefaultImage(index) {
  const defaultImages = [
    'https://source.unsplash.com/400x250/?child,health',
    'https://source.unsplash.com/400x250/?nutrition,kids',
    'https://source.unsplash.com/400x250/?baby,food'
  ];
  return defaultImages[index % defaultImages.length];
}

/**
 * Menampilkan artikel di homepage
 */
async function getHomeArticles() {
  try {
    // Tampilkan loading placeholder
    const homeArticlesContainer = document.getElementById("homeArticles");
    if (!homeArticlesContainer) {
      console.error("Container homeArticles tidak ditemukan");
      return;
    }
    
    // Mengambil data artikel
    const response = await fetch(`${apiUrl}?page=1&limit=${ARTICLES_TO_SHOW}`);
    const articles = await response.json();

    // Jika tidak ada artikel atau error
    if (!articles || articles.length === 0) {
      homeArticlesContainer.innerHTML = `
        <div class="artikel-item error-message">
          <div class="artikel-content text-center">
            <i class="fas fa-exclamation-triangle text-warning mb-3"></i>
            <h3>Tidak ada artikel tersedia</h3>
            <p>Silakan coba kembali nanti.</p>
          </div>
        </div>
      `;
      return;
    }

    // Buat HTML untuk semua artikel
    let articlesHTML = '';
    articles.forEach((article, index) => {
      articlesHTML += `
        <div class="artikel-item">
          <img src="${article.image || getDefaultImage(index)}" alt="${article.title || 'Artikel Stunting'}" />
          <div class="artikel-content">
            <h3>${article.title || 'Artikel Stunting'}</h3>
            <div class="artikel-meta">
              <span><i class="fas fa-user-edit"></i> ${article.author || 'Tim Stuntify'}</span>
              <span><i class="far fa-calendar-alt"></i> ${formatDate(article.createdAt) || 'Baru ditambahkan'}</span>
            </div>
            <p>${truncateText(article.description, 150) || 'Informasi tentang stunting...'}</p>
            <a href="articleDetail.html?id=${article.id}">Baca selengkapnya</a>
          </div>
        </div>
      `;
    });

    // Update container dengan artikel
    homeArticlesContainer.innerHTML = articlesHTML;  } catch (error) {
    console.error("Gagal mengambil artikel:", error);
    const homeArticlesContainer = document.getElementById("homeArticles");
    if (homeArticlesContainer) {
      homeArticlesContainer.innerHTML = `
        <div class="artikel-item error-message">
          <div class="artikel-content text-center">
            <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
            <h3>Gagal Memuat Artikel</h3>
            <p>Maaf, terjadi kesalahan saat memuat artikel. Silakan coba beberapa saat lagi.</p>
          </div>
        </div>
      `;
    }
    
    // Sembunyikan tombol "Lihat Semua Artikel" jika gagal memuat
    const lihatSemuaContainer = document.getElementById("lihatSemuaArtikelContainer");
    if (lihatSemuaContainer) {
      lihatSemuaContainer.style.display = "none";
    }
  }
}

// Memastikan tombol "Lihat Semua Artikel" ditampilkan dengan benar
function setupLihatSemuaButton() {
  const lihatSemuaContainer = document.getElementById("lihatSemuaArtikelContainer");
  if (lihatSemuaContainer) {
    // Pastikan tombol terlihat jelas dengan margin-top yang cukup
    lihatSemuaContainer.style.marginTop = "2rem";
  }
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  getHomeArticles();
  setupLihatSemuaButton();
});
