/**
 * Stunting Recommendations Library
 * Provides detailed, age-specific recommendations for nutrition,
 * vitamins, supplements, and physical activities
 */

class StuntingRecommendations {
  constructor() {
    // Initialize recommendation categories
    this.nutritionByAge = this.initNutritionByAge();
    this.activitiesByAge = this.initActivitiesByAge();
    this.vitaminsForStunting = this.initVitaminsInfo();
  }

  /**
   * Get personalized recommendations based on child data
   * @param {Object} childData - Data about the child
   * @returns {Object} - Personalized recommendations
   */
  getPersonalizedRecommendations(childData) {
    const { age, stunting_status, weight_status } = childData;
    let ageGroup = this.determineAgeGroup(age);

    // Prepare recommendation package
    return {
      nutrition: this.getNutritionForAge(ageGroup),
      activities: this.getActivitiesForAge(ageGroup),
      supplements: this.getRecommendedSupplements(stunting_status, ageGroup),
      tips: this.getTipsBasedOnStatus(stunting_status, weight_status)
    };
  }

  /**
   * Get nutrition recommendations for specific age group
   * @param {string} ageGroup - The age group category
   * @returns {Object} - Nutrition recommendations
   */
  getNutritionForAge(ageGroup) {
    return this.nutritionByAge[ageGroup] || this.nutritionByAge.default;
  }

  /**
   * Get activity recommendations for specific age group
   * @param {string} ageGroup - The age group category
   * @returns {Object} - Activity recommendations
   */
  getActivitiesForAge(ageGroup) {
    return this.activitiesByAge[ageGroup] || this.activitiesByAge.default;
  }

  /**
   * Get recommended supplements based on stunting status and age
   * @param {string} stuntingStatus - The child's stunting status
   * @param {string} ageGroup - The age group category
   * @returns {Array} - List of recommended supplements
   */
  getRecommendedSupplements(stuntingStatus, ageGroup) {
    // Base recommendations for all children
    let supplements = [
      this.vitaminsForStunting.vitaminA,
      this.vitaminsForStunting.vitaminD
    ];

    // Add more supplements for stunting conditions
    if (stuntingStatus === "Stunting Ringan" || stuntingStatus === "Stunting Berat") {
      supplements.push(
        this.vitaminsForStunting.zinc,
        this.vitaminsForStunting.iron,
        this.vitaminsForStunting.calcium
      );
    }

    // For severe stunting, add all possible supplements
    if (stuntingStatus === "Stunting Berat") {
      supplements.push(
        this.vitaminsForStunting.omega3,
        this.vitaminsForStunting.protein,
        this.vitaminsForStunting.multivitamin
      );
    }

    return supplements;
  }

  /**
   * Get specific tips based on stunting and weight status
   * @param {string} stuntingStatus - The child's stunting status
   * @param {string} weightStatus - The child's weight status
   * @returns {Array} - List of specific tips
   */
  getTipsBasedOnStatus(stuntingStatus, weightStatus) {
    const tips = [];

    // Tips based on stunting status
    if (stuntingStatus === "Normal") {
      tips.push(
        "Pertahankan pola makan seimbang dengan protein berkualitas baik",
        "Lakukan pemeriksaan pertumbuhan secara rutin setiap bulan",
        "Pastikan anak mendapat cukup tidur untuk pertumbuhan optimal"
      );
    } else if (stuntingStatus === "Stunting Ringan") {
      tips.push(
        "Tingkatkan porsi protein dan kalsium harian",
        "Konsultasikan dengan dokter tentang potensi suplementasi",
        "Pastikan anak tidak mengalami infeksi berulang yang bisa menghambat pertumbuhan"
      );
    } else {
      tips.push(
        "Segera konsultasi dengan dokter anak dan ahli gizi untuk intervensi komprehensif",
        "Ikuti program pemulihan gizi yang disarankan tenaga kesehatan",
        "Periksa adanya kondisi medis yang mungkin menghambat penyerapan nutrisi"
      );
    }

    // Additional tips based on weight status
    if (weightStatus.includes("Kurang")) {
      tips.push(
        "Berikan makanan padat nutrisi dengan lebih sering dalam porsi kecil",
        "Tambahkan lemak sehat seperti alpukat atau minyak zaitun pada makanan",
        "Pertimbangkan pemberian makanan tambahan di antara waktu makan"
      );
    } else if (weightStatus.includes("Obesitas") || weightStatus.includes("Lebih")) {
      tips.push(
        "Utamakan kualitas makanan daripada kuantitas",
        "Batasi makanan manis dan berlemak jenuh",
        "Tingkatkan aktivitas fisik harian"
      );
    }

    return tips;
  }

  /**
   * Determine the age group category
   * @param {number} ageInMonths - The child's age in months
   * @returns {string} - The age group category
   */
  determineAgeGroup(ageInMonths) {
    if (ageInMonths < 6) return "0-6mo";
    if (ageInMonths < 12) return "6-12mo";
    if (ageInMonths < 24) return "12-24mo";
    if (ageInMonths < 36) return "24-36mo";
    if (ageInMonths < 60) return "36-60mo";
    return "default";
  }

  /**
   * Initialize nutrition recommendations by age group
   * @returns {Object} - Nutrition by age
   */
  initNutritionByAge() {
    return {
      "0-6mo": {
        title: "Nutrisi 0-6 Bulan",
        recommendations: [
          "ASI eksklusif - merupakan makanan terbaik dan satu-satunya yang dibutuhkan bayi hingga usia 6 bulan",
          "Pastikan ibu mengkonsumsi makanan bergizi seimbang untuk ASI yang berkualitas",
          "Pemberian vitamin D tambahan mungkin diperlukan jika paparan sinar matahari terbatas"
        ]
      },
      "6-12mo": {
        title: "Nutrisi 6-12 Bulan",
        recommendations: [
          "Lanjutkan ASI disertai MPASI (Makanan Pendamping ASI)",
          "Kenalkan makanan kaya zat besi seperti daging merah, hati, atau sereal yang diperkaya zat besi",
          "Berikan makanan kaya protein seperti telur, ikan, tahu, tempe secara bertahap",
          "Tambahkan makanan kaya kalsium seperti keju dan yogurt",
          "Perkenalkan buah dan sayuran berwarna-warni"
        ]
      },
      "12-24mo": {
        title: "Nutrisi 12-24 Bulan",
        recommendations: [
          "Lanjutkan ASI sampai minimal 2 tahun jika memungkinkan",
          "Berikan 3 kali makanan utama dengan porsi sesuai usia dan 2-3 kali makanan selingan bergizi",
          "Pastikan makanan mengandung protein berkualitas tinggi seperti telur, ikan, daging, atau produk nabati",
          "Sertakan karbohidrat kompleks seperti nasi merah, kentang, atau oatmeal",
          "Berikan beragam buah dan sayuran untuk memenuhi kebutuhan vitamin dan mineral",
          "Pastikan asupan lemak sehat dari alpukat, minyak zaitun, atau ikan berlemak"
        ]
      },
      "24-36mo": {
        title: "Nutrisi 24-36 Bulan",
        recommendations: [
          "Berikan porsi makan yang mencukupi kebutuhan energi anak yang aktif",
          "Pastikan setiap makan mengandung protein (telur, ikan, ayam, daging, kacang-kacangan)",
          "Sertakan sayuran dan buah dalam setiap kali makan",
          "Batasi makanan manis, asin, dan berlemak jenuh",
          "Pastikan anak mendapat cukup kalsium dari susu dan produk susu",
          "Kenalkan beragam jenis makanan untuk memastikan asupan nutrisi lengkap"
        ]
      },
      "36-60mo": {
        title: "Nutrisi 36-60 Bulan",
        recommendations: [
          "Berikan 3 kali makan utama dan 2 kali camilan sehat setiap hari",
          "Sertakan protein di setiap kali makan utama",
          "Pastikan kebutuhan zat besi terpenuhi dari makanan seperti daging merah, telur, dan sayuran hijau",
          "Berikan makanan yang kaya zinc seperti daging, kacang, dan biji-bijian",
          "Sertakan kalsium dari susu, yogurt, atau keju",
          "Libatkan anak dalam memilih makanan sehat untuk menumbuhkan kebiasaan makan yang baik",
          "Batasi junk food, makanan tinggi gula, dan makanan olahan"
        ]
      },
      "default": {
        title: "Nutrisi Umum untuk Mencegah Stunting",
        recommendations: [
          "Pastikan makanan mengandung protein berkualitas tinggi",
          "Berikan makanan kaya kalsium untuk pertumbuhan tulang",
          "Sertakan makanan yang mengandung zat besi, zinc, dan vitamin A",
          "Pastikan asupan lemak sehat yang cukup",
          "Batasi makanan olahan, tinggi gula, dan rendah nutrisi",
          "Berikan buah dan sayuran beragam warna setiap hari"
        ]
      }
    };
  }

  /**
   * Initialize physical activity recommendations by age group
   * @returns {Object} - Activities by age
   */
  initActivitiesByAge() {
    return {
      "0-6mo": {
        title: "Aktivitas Fisik 0-6 Bulan",
        activities: [
          "Tummy Time: Letakkan bayi tengkurap selama 3-5 menit, 2-3 kali sehari saat terjaga",
          "Latihan Bayi: Gerakkan tangan dan kaki bayi dengan lembut seperti gerakan bersepeda",
          "Rangsangan Visual: Gantung mainan berwarna cerah dalam jangkauan penglihatan bayi",
          "Aktivitas Tengkurap: Letakkan mainan di sekitar bayi untuk merangsang bayi mengangkat kepala"
        ]
      },
      "6-12mo": {
        title: "Aktivitas Fisik 6-12 Bulan",
        activities: [
          "Duduk dengan Bantuan: Bantu bayi duduk dan berikan mainan untuk dimainkan",
          "Merangkak: Dorong bayi merangkak dengan meletakkan mainan dalam jarak tertentu",
          "Belajar Berdiri: Bantu bayi berpegangan pada furnitur yang aman untuk belajar berdiri",
          "Bermain Sembunyi-sembunyi: Untuk merangsang gerakan dan kognitif",
          "Bermain Air: Dalam pengawasan, aktivitas air dapat membantu perkembangan motorik"
        ]
      },
      "12-24mo": {
        title: "Aktivitas Fisik 12-24 Bulan",
        activities: [
          "Berjalan dan Berlari: Dorong anak untuk aktif bergerak di area yang aman",
          "Menari: Putar musik dan ajak anak menari untuk melatih keseimbangan",
          "Melempar Bola: Bermain lempar tangkap dengan bola yang lembut",
          "Bermain di Taman: Ajak ke taman bermain untuk aktivitas seperti perosotan mini",
          "Menaiki Tangga: Dengan pengawasan, bantu anak menaiki dan menuruni tangga",
          "Mendorong atau Menarik Mainan: Seperti mobil-mobilan yang bisa ditarik"
        ]
      },
      "24-36mo": {
        title: "Aktivitas Fisik 24-36 Bulan",
        activities: [
          "Bermain Kejar-kejaran: Aktivitas ini melatih kecepatan dan koordinasi",
          "Melompat: Ajari anak melompat di tempat atau dari ketinggian rendah",
          "Bersepeda Roda Tiga: Mulai perkenalkan bersepeda dengan roda tiga",
          "Bermain Bola: Tendang, lempar, dan kejar bola",
          "Aktivitas Taman Bermain: Panjat, ayunan, dan perosotan yang sesuai usia",
          "Bermain Air: Aktivitas air seperti main di kolam dangkal dengan pengawasan"
        ]
      },
      "36-60mo": {
        title: "Aktivitas Fisik 36-60 Bulan",
        activities: [
          "Berenang: Perkenalkan berenang dengan pendampingan",
          "Bersepeda: Dengan atau tanpa roda pembantu",
          "Permainan Kelompok: Seperti petak umpet atau permainan tradisional",
          "Olahraga Mini: Perkenalkan mini-soccer atau basket dengan ukuran yang sesuai",
          "Lompat Tali: Mulai dengan tali rendah",
          "Senam Anak: Ikuti gerakan senam yang dirancang untuk anak-anak",
          "Menari: Kegiatan menari untuk koordinasi dan keseimbangan"
        ]
      },
      "default": {
        title: "Aktivitas Fisik Umum untuk Mendukung Pertumbuhan",
        activities: [
          "Sediakan waktu bermain aktif minimal 60 menit setiap hari",
          "Batasi waktu layar (TV, gadget) sesuai rekomendasi usia",
          "Dorong aktivitas yang melibatkan semua anggota tubuh",
          "Sertakan aktivitas yang melatih keseimbangan dan koordinasi",
          "Lakukan aktivitas fisik yang menyenangkan dan sesuai usia"
        ]
      }
    };
  }

  /**
   * Initialize vitamins and supplements information
   * @returns {Object} - Vitamins and supplements information
   */
  initVitaminsInfo() {
    return {
      vitaminA: {
        name: "Vitamin A",
        benefits: "Mendukung kesehatan mata, pertumbuhan tulang, dan sistem kekebalan tubuh",
        sources: "Wortel, bayam, pepaya, mangga, hati, dan telur",
        dosage: "Umumnya diberikan dalam kapsul 100.000 IU setiap 6 bulan untuk anak 6-59 bulan"
      },
      vitaminD: {
        name: "Vitamin D",
        benefits: "Membantu penyerapan kalsium dan fosfor untuk pertumbuhan tulang",
        sources: "Sinar matahari pagi, ikan berlemak, kuning telur, dan produk susu yang difortifikasi",
        dosage: "400 IU per hari untuk bayi hingga 12 bulan; 600 IU per hari untuk anak di atas 1 tahun"
      },
      calcium: {
        name: "Kalsium",
        benefits: "Sangat penting untuk pembentukan tulang dan gigi yang kuat",
        sources: "Susu, keju, yogurt, ikan teri, dan sayuran hijau gelap",
        dosage: "700mg per hari untuk anak 1-3 tahun; 1000mg per hari untuk anak 4-8 tahun"
      },
      iron: {
        name: "Zat Besi",
        benefits: "Mencegah anemia yang dapat menghambat pertumbuhan dan perkembangan kognitif",
        sources: "Daging merah, hati, kacang-kacangan, bayam, dan makanan yang difortifikasi",
        dosage: "7mg per hari untuk anak 1-3 tahun; 10mg per hari untuk anak 4-8 tahun"
      },
      zinc: {
        name: "Zinc",
        benefits: "Penting untuk pertumbuhan, perkembangan tulang, dan sistem kekebalan tubuh",
        sources: "Daging, makanan laut, kacang-kacangan, dan biji-bijian utuh",
        dosage: "3mg per hari untuk anak 1-3 tahun; 5mg per hari untuk anak 4-8 tahun"
      },
      omega3: {
        name: "Omega-3 Fatty Acids",
        benefits: "Mendukung perkembangan otak dan sistem saraf",
        sources: "Ikan berlemak (salmon, makerel, sarden), minyak ikan, biji chia, dan kenari",
        dosage: "Konsultasikan dengan dokter anak untuk dosis yang tepat sesuai usia"
      },
      protein: {
        name: "Suplemen Protein",
        benefits: "Blok bangunan untuk pertumbuhan dan perbaikan jaringan",
        sources: "Telur, daging, ikan, susu, kedelai, dan kacang-kacangan",
        dosage: "Konsultasikan dengan ahli gizi untuk dosis yang sesuai dengan kebutuhan anak"
      },
      multivitamin: {
        name: "Multivitamin dan Mineral",
        benefits: "Memberikan beragam nutrisi penting untuk mendukung pertumbuhan menyeluruh",
        sources: "Suplemen yang tersedia dalam bentuk sirup, tablet kunyah, atau gummies",
        dosage: "Sesuai petunjuk pada kemasan atau rekomendasi dokter"
      }
    };
  }

  /**
   * Format recommendations into readable text
   * @param {Object} recommendations - The recommendations object
   * @returns {string} - Formatted recommendations
   */
  formatRecommendations(recommendations) {
    let result = '';
    
    // Format nutrition recommendations
    result += `**${recommendations.nutrition.title}**\n\n`;
    recommendations.nutrition.recommendations.forEach((item, index) => {
      result += `${index+1}. ${item}\n`;
    });
    result += '\n';
    
    // Format activity recommendations
    result += `**${recommendations.activities.title}**\n\n`;
    recommendations.activities.activities.forEach((item, index) => {
      result += `${index+1}. ${item}\n`;
    });
    result += '\n';
    
    // Format supplements
    result += `**Suplemen yang Direkomendasikan**\n\n`;
    recommendations.supplements.forEach((supplement, index) => {
      result += `${index+1}. **${supplement.name}**\n`;
      result += `   • Manfaat: ${supplement.benefits}\n`;
      result += `   • Sumber: ${supplement.sources}\n`;
      result += `   • Dosis: ${supplement.dosage}\n\n`;
    });
    
    // Format specific tips
    result += `**Tips Khusus**\n\n`;
    recommendations.tips.forEach((tip, index) => {
      result += `${index+1}. ${tip}\n`;
    });
    
    // Important reminder
    result += '\n**Penting:** Selalu konsultasikan dengan dokter atau ahli gizi sebelum memberikan suplemen pada anak.';
    
    return result;
  }
}

// Initialize the recommendations class when the page loads
let stuntingRecommendations;
document.addEventListener('DOMContentLoaded', function() {
  stuntingRecommendations = new StuntingRecommendations();
});
