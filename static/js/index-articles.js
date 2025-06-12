const apiUrl = "https://681245c23ac96f7119a77e57.mockapi.io/nyoba";

// Format tanggal untuk tampilan yang lebih baik
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Potong teks jika terlalu panjang
function truncateText(text, maxLength) {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Ambil artikel untuk halaman index/beranda
async function getHomeArticles() {
  try {
    const response = await fetch(`${apiUrl}?page=1&limit=2`);
    const data = await response.json();

    // Tampilkan artikel di halaman beranda
    const homeArticlesContainer = document.getElementById("homeArticles");
    if (homeArticlesContainer && data.length >= 2) {
      homeArticlesContainer.innerHTML = `
        <div class="artikel-item">
          <img src="${data[0].image || 'https://source.unsplash.com/400x250/?child,health'}" alt="${data[0].title || 'Artikel Stunting'}" />
          <div class="artikel-content">
            <h3>${data[0].title || 'Apa Itu Stunting?'}</h3>
            <div class="artikel-meta">
              <span><i class="fas fa-user-edit"></i> ${data[0].author || 'Tim Stuntify'}</span>
              <span><i class="far fa-calendar-alt"></i> ${formatDate(data[0].createdAt) || 'Baru ditambahkan'}</span>
            </div>
            <p>${truncateText(data[0].description, 150) || 'Informasi tentang stunting...'}</p>
            <a href="articleDetail.html?id=${data[0].id}">Baca selengkapnya</a>
          </div>
        </div>
        <div class="artikel-item">
          <img src="${data[1].image || 'https://source.unsplash.com/400x250/?nutrition,kids'}" alt="${data[1].title || 'Artikel Nutrisi'}" />
          <div class="artikel-content">
            <h3>${data[1].title || 'Peran Nutrisi Sejak Dini'}</h3>
            <div class="artikel-meta">
              <span><i class="fas fa-user-edit"></i> ${data[1].author || 'Tim Stuntify'}</span>
              <span><i class="far fa-calendar-alt"></i> ${formatDate(data[1].createdAt) || 'Baru ditambahkan'}</span>
            </div>
            <p>${truncateText(data[1].description, 150) || 'Informasi tentang nutrisi...'}</p>
            <a href="articleDetail.html?id=${data[1].id}">Baca selengkapnya</a>
          </div>
        </div>
      `;
    }
  } catch (error) {
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
  }
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', getHomeArticles);
