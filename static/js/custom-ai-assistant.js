/**
 * Custom AI Assistant for Stunting Calculator
 * This file contains the logic for our custom generative AI assistant
 * that provides recommendations based on child growth assessment
 */

class StuntingAI {
  constructor() {
    this.responses = {
      // Respons untuk kondisi stunting normal dengan berat normal
      normalHeightNormalWeight: {
        title: "Pertumbuhan Normal",
        interpretation: [
          "**Status Stunting: Normal**: Tinggi badan anak Anda sesuai dengan usianya.",
          "**Berat Badan: Normal**: Berat badan anak Anda berada dalam rentang sehat untuk usianya."
        ],
        conclusion: "Anak Anda memiliki pertumbuhan yang optimal, dengan tinggi dan berat badan yang sesuai dengan usianya.",
        recommendations: [
          "**Pertahankan Pola Makan Seimbang**: Teruskan memberi anak makanan bergizi seimbang yang mencakup protein, karbohidrat kompleks, lemak sehat, serta buah dan sayuran.",
          "**Aktivitas Fisik Teratur**: Dorong anak untuk tetap aktif sesuai usianya melalui bermain dan bergerak.",
          "**Pemeriksaan Rutin**: Tetap lakukan pemeriksaan tumbuh kembang secara berkala dengan tenaga kesehatan.",
          "**Stimulasi Perkembangan**: Berikan stimulasi yang sesuai dengan tahap perkembangannya untuk mendukung pertumbuhan optimal."
        ]
      },

      // Respons untuk kondisi stunting normal dengan berat berlebih
      normalHeightOverweight: {
        title: "Normal dengan Kelebihan Berat Badan",
        interpretation: [
          "**Status Stunting: Normal**: Tinggi badan anak Anda sesuai dengan usianya.",
          "**Berat Badan: Berlebih**: Berat badan anak Anda berada di atas rentang normal untuk usianya."
        ],
        conclusion: "Meskipun status stunting anak Anda normal, berat badannya lebih tinggi dibandingkan anak seusianya. Ini perlu perhatian khusus.",
        recommendations: [
          "**Konsultasi dengan Ahli Gizi atau Dokter**: Dapatkan saran profesional untuk manajemen berat badan yang aman untuk anak.",
          "**Evaluasi Pola Makan**: Periksa ukuran porsi dan jenis makanan yang dikonsumsi anak.",
          "**Batasi Makanan Olahan**: Kurangi konsumsi makanan tinggi gula, lemak jenuh, dan makanan olahan.",
          "**Tingkatkan Aktivitas Fisik**: Dorong anak untuk lebih aktif bergerak setiap hari dengan aktivitas yang menyenangkan.",
          "**Tetap Berikan Nutrisi Seimbang**: Jangan batasi makanan secara drastis, pastikan semua nutrisi penting tetap terpenuhi."
        ]
      },

      // Respons untuk kondisi stunting normal dengan berat kurang
      normalHeightUnderweight: {
        title: "Normal dengan Berat Badan Kurang",
        interpretation: [
          "**Status Stunting: Normal**: Tinggi badan anak Anda sesuai dengan usianya.",
          "**Berat Badan: Kurang**: Berat badan anak Anda berada di bawah rentang normal untuk usianya."
        ],
        conclusion: "Meskipun tinggi anak Anda normal, berat badannya perlu ditingkatkan untuk mencapai pertumbuhan optimal.",
        recommendations: [
          "**Tingkatkan Asupan Kalori**: Berikan makanan padat nutrisi dan tinggi kalori seperti alpukat, ikan, kacang-kacangan, dan produk susu penuh.",
          "**Makan Lebih Sering**: Tawarkan makanan utama dan camilan sehat lebih sering dalam porsi yang tidak terlalu besar.",
          "**Konsultasi Medis**: Kunjungi dokter untuk memastikan tidak ada masalah kesehatan yang mendasari.",
          "**Pantau Perkembangan**: Timbang berat anak secara teratur untuk memastikan ada kemajuan.",
          "**Hindari Junk Food**: Meskipun perlu meningkatkan kalori, tetap hindari makanan tidak sehat."
        ]
      },

      // Respons untuk kondisi stunting ringan dengan berat normal
      mildStuntingNormalWeight: {
        title: "Stunting Ringan dengan Berat Normal",
        interpretation: [
          "**Status Stunting: Ringan**: Tinggi badan anak Anda sedikit di bawah standar untuk usianya.",
          "**Berat Badan: Normal**: Berat badan anak Anda berada dalam rentang normal untuk usianya."
        ],
        conclusion: "Anak Anda menunjukkan tanda stunting ringan, yang berarti tinggi badannya sedikit di bawah standar untuk usianya, meskipun berat badannya normal.",
        recommendations: [
          "**Fokus pada Nutrisi Penunjang Pertumbuhan**: Berikan makanan kaya protein, kalsium, zinc, dan vitamin A dan D.",
          "**Konsumsi Protein Berkualitas**: Pastikan anak mendapatkan protein berkualitas dari telur, daging tanpa lemak, ikan, dan kacang-kacangan.",
          "**Suplementasi Jika Diperlukan**: Konsultasikan dengan dokter tentang kemungkinan suplementasi nutrisi.",
          "**Konsultasi dengan Ahli Gizi**: Dapatkan saran spesifik untuk meningkatkan pertumbuhan anak.",
          "**Perhatikan Higiene dan Sanitasi**: Cegah infeksi yang dapat menghambat pertumbuhan."
        ]
      },

      // Respons untuk kondisi stunting berat dengan berbagai kondisi berat
      severeStunting: {
        title: "Stunting Berat - Perhatian Khusus Diperlukan",
        interpretation: [
          "**Status Stunting: Berat**: Tinggi badan anak Anda jauh di bawah standar untuk usianya.",
          "**Kondisi Ini Memerlukan Perhatian Segera**: Stunting berat dapat mempengaruhi perkembangan fisik dan kognitif anak."
        ],
        conclusion: "Anak Anda mengalami stunting berat, yang membutuhkan intervensi segera dan komprehensif untuk membantu optimalisasi pertumbuhan.",
        recommendations: [
          "**Konsultasi Medis Segera**: Temui dokter anak untuk evaluasi menyeluruh dan rencana penanganan.",
          "**Program Nutrisi Intensif**: Ikuti program nutrisi khusus yang dirancang oleh ahli gizi.",
          "**Suplementasi Gizi**: Mungkin diperlukan suplementasi vitamin, mineral, atau formula khusus.",
          "**Pemantauan Rutin**: Lakukan pemeriksaan tumbuh kembang secara teratur.",
          "**Periksa Kondisi Medis Lain**: Stunting berat dapat terkait dengan kondisi medis tertentu yang perlu ditangani.",
          "**Dukungan Holistik**: Perhatikan juga aspek stimulasi, kesehatan lingkungan, dan dukungan psikososial."
        ]
      },

      // Respons untuk kondisi obesitas
      obesity: {
        title: "Obesitas - Perhatian Khusus Diperlukan",
        interpretation: [
          "**Status Berat: Obesitas**: Berat badan anak Anda jauh di atas normal untuk usianya.",
          "**Kondisi Ini Memerlukan Perhatian**: Obesitas pada anak dapat menyebabkan masalah kesehatan jangka panjang."
        ],
        conclusion: "Anak Anda mengalami obesitas, yang perlu ditangani secara hati-hati dengan pendekatan komprehensif untuk mencapai berat badan yang lebih sehat.",
        recommendations: [
          "**Konsultasi dengan Dokter Anak**: Dapatkan evaluasi menyeluruh dan panduan pengelolaan berat badan yang aman.",
          "**Perubahan Pola Makan Bertahap**: Fokus pada makanan bergizi, porsi yang tepat, dan mengurangi makanan olahan dan tinggi gula.",
          "**Aktivitas Fisik Teratur**: Tingkatkan aktivitas fisik secara bertahap melalui kegiatan yang menyenangkan.",
          "**Pendekatan Keluarga**: Libatkan seluruh keluarga dalam menerapkan gaya hidup sehat.",
          "**Hindari Diet Ketat**: Fokus pada pertumbuhan sehat, bukan penurunan berat badan drastis.",
          "**Dukungan Psikologis**: Perhatikan aspek psikologis dan citra diri anak."
        ]
      }
    };    // Respons umum tentang stunting
    this.generalInfo = {
      whatIsStunting: {
        title: "Apa itu Stunting?",
        content: [
          "**Stunting adalah** kondisi gagal tumbuh pada anak akibat kekurangan gizi kronis, terutama pada 1.000 hari pertama kehidupan (sejak janin hingga anak berusia 2 tahun).",
          "**Secara teknis**, stunting didefinisikan sebagai kondisi dimana tinggi badan anak berada di bawah -2 standar deviasi dari median tinggi badan menurut usia berdasarkan standar WHO.",
          "**Dampak stunting** tidak hanya pada fisik anak (tinggi badan yang rendah), tetapi juga pada perkembangan otak, yang dapat mempengaruhi kemampuan kognitif dan prestasi akademik di masa depan."
        ]
      },
      stuntingCauses: {
        title: "Penyebab Stunting",
        content: [
          "**Kekurangan gizi kronis** selama masa kehamilan dan awal kehidupan anak.",
          "**Infeksi berulang** seperti diare, cacingan, dan infeksi saluran pernapasan yang mengganggu penyerapan nutrisi.",
          "**Praktik pemberian makan yang buruk**, termasuk ASI eksklusif yang kurang, MPASI yang tidak adekuat, dan keragaman makanan yang rendah.",
          "**Sanitasi dan kebersihan yang buruk** meningkatkan risiko infeksi dan penyakit.",
          "**Faktor sosial ekonomi** seperti kemiskinan dan akses terbatas ke layanan kesehatan.",
          "**Faktor maternal** termasuk status gizi ibu sebelum dan selama kehamilan, serta kesehatan ibu secara umum."
        ]
      },
      stuntingPrevention: {
        title: "Pencegahan Stunting",
        content: [
          "**Nutrisi optimal ibu** sebelum dan selama kehamilan serta saat menyusui.",
          "**ASI eksklusif selama 6 bulan pertama** dilanjutkan dengan MPASI yang adekuat hingga usia 2 tahun atau lebih.",
          "**Makanan Pendamping ASI (MPASI)** yang tepat waktu, adekuat, aman, dan berkualitas mulai usia 6 bulan.",
          "**Pemantauan pertumbuhan rutin** untuk deteksi dini masalah pertumbuhan.",
          "**Pola asuh yang responsif** dan stimulasi yang baik untuk perkembangan anak.",
          "**Praktik sanitasi dan kebersihan yang baik** termasuk mencuci tangan, air bersih, dan sanitasi layak.",
          "**Imunisasi lengkap** dan pencegahan serta penanganan penyakit yang tepat."
        ]
      },
      vitaminsForStunting: {
        title: "Vitamin dan Suplemen untuk Mencegah Stunting",
        content: [
          "**Vitamin A**: Penting untuk kesehatan mata, pertumbuhan tulang, dan sistem kekebalan tubuh. Sumber: wortel, bayam, pepaya, mangga, hati, dan telur.",
          "**Vitamin D**: Membantu penyerapan kalsium dan fosfor untuk pertumbuhan tulang. Sumber: sinar matahari pagi, ikan berlemak, kuning telur, dan produk susu yang difortifikasi.",
          "**Vitamin B Kompleks**: Mendukung metabolisme dan pertumbuhan sel. Sumber: daging tanpa lemak, kacang-kacangan, biji-bijian utuh, dan sayuran hijau.",
          "**Asam Folat**: Penting untuk pembentukan sel baru. Sumber: sayuran hijau, kacang-kacangan, biji-bijian utuh, dan buah jeruk.",
          "**Kalsium**: Sangat penting untuk pembentukan tulang dan gigi. Sumber: susu, keju, yogurt, ikan teri, dan sayuran hijau gelap.",
          "**Zat Besi**: Mencegah anemia yang dapat menghambat pertumbuhan. Sumber: daging merah, hati, kacang-kacangan, bayam, dan makanan yang difortifikasi.",
          "**Zinc**: Penting untuk pertumbuhan dan sistem kekebalan tubuh. Sumber: daging, makanan laut, kacang-kacangan, dan biji-bijian utuh.",
          "**Protein**: Blok bangunan penting untuk pertumbuhan dan perbaikan jaringan. Sumber: telur, daging, ikan, susu, kedelai, dan kacang-kacangan."
        ]
      },
      exerciseForChildren: {
        title: "Aktivitas Fisik untuk Mendukung Pertumbuhan Optimal",
        content: [
          "**Untuk Bayi (0-1 tahun)**:",
          "• **Tummy Time**: Letakkan bayi tengkurap saat terjaga untuk memperkuat leher dan bahu",
          "• **Gerakan Bebas**: Berikan waktu bagi bayi untuk bergerak bebas di lantai yang aman",
          "• **Aktivitas Air**: Pengenalan ke air dalam suhu yang tepat dapat membantu perkembangan motorik",
          
          "**Untuk Balita (1-3 tahun)**:",
          "• **Berjalan dan Berlari**: Dorong anak untuk aktif bergerak di taman bermain",
          "• **Permainan Lempar Bola**: Membantu koordinasi dan kekuatan otot",
          "• **Menari**: Aktivitas menyenangkan yang melatih keseimbangan dan koordinasi",
          
          "**Untuk Anak Prasekolah (3-5 tahun)**:",
          "• **Bersepeda dengan Roda Bantuan**: Membangun kekuatan kaki dan keseimbangan",
          "• **Berenang**: Olahraga yang baik untuk seluruh tubuh",
          "• **Permainan Aktif**: Seperti kejar-kejaran, lompat tali, atau bermain bola"
        ]
      },
      nutritionalPrograms: {
        title: "Program Nutrisi untuk Pencegahan Stunting",
        content: [
          "**Program 1000 Hari Pertama Kehidupan**:",
          "• Fokus pada nutrisi ibu hamil dan menyusui",
          "• Pemantauan pertumbuhan bayi secara teratur",
          "• Edukasi tentang MPASI yang tepat",
          
          "**Pemberian Makanan Tambahan (PMT)**:",
          "• PMT untuk ibu hamil dan menyusui Kurang Energi Kronis (KEK)",
          "• PMT untuk balita kekurangan gizi",
          "• Biskuit atau makanan padat gizi lainnya",
          
          "**Suplementasi Gizi Mikro**:",
          "• Tablet tambah darah untuk ibu hamil",
          "• Kapsul vitamin A untuk balita",
          "• Taburia (sprinkle) yang mengandung berbagai mikronutrien",
          
          "**Program Air Bersih dan Sanitasi (WASH)**:",
          "• Akses terhadap air bersih",
          "• Sanitasi yang layak",
          "• Praktik kebersihan seperti cuci tangan pakai sabun"
        ]
      }
    };
  }
  // Metode untuk mendapatkan respons berdasarkan data anak
  getResponseForChild(data) {
    const { stunting_status, weight_status, height, age, gender, weight, name, ml_stunting_result, ml_wasting_result } = data;
    let responseTemplate;

    // Tentukan template respons berdasarkan status
    if (stunting_status === "Normal") {
      if (weight_status.includes("Normal")) {
        responseTemplate = this.responses.normalHeightNormalWeight;
      } else if (weight_status.includes("Lebih") || weight_status.includes("Obesitas")) {
        responseTemplate = this.responses.normalHeightOverweight;
      } else {
        responseTemplate = this.responses.normalHeightUnderweight;
      }
    } else if (stunting_status === "Stunting Ringan") {
      responseTemplate = this.responses.mildStuntingNormalWeight;
    } else {
      responseTemplate = this.responses.severeStunting;
    }

    if (weight_status === "Obesitas") {
      // Tambahkan rekomendasi khusus untuk obesitas
      responseTemplate = this.responses.obesity;
    }

    // Gunakan format respons yang lebih detail dan profesional
    return this.formatResponseDetailed(responseTemplate, data);
  }
  
  // Format bagian suplemen menjadi teks yang dapat dibaca
  formatSupplementsSection(supplements) {
    if (!supplements || supplements.length === 0) {
      return "";
    }
    
    let section = "**Rekomendasi Vitamin & Suplemen:**\n\n";
    
    supplements.slice(0, 3).forEach((supplement, index) => {
      section += `${index+1}. **${supplement.name}**\n`;
      section += `   • Manfaat: ${supplement.benefits}\n`;
      section += `   • Sumber: ${supplement.sources}\n\n`;
    });
    
    section += "**Catatan:** Konsultasikan dengan dokter atau ahli gizi sebelum memberikan suplemen tambahan.";
    
    return section;
  }
  
  // Metode untuk memformat respons dengan data anak
  formatResponse(template, data) {
    const { title, interpretation, conclusion, recommendations } = template;
    const { height, age, gender, weight, stunting_status, weight_status } = data;
    
    // Informasi referensi (bisa diganti dengan data aktual dari WHO jika tersedia)
    const minNormalHeight = this.getMinNormalHeight(age, gender);
    const idealWeight = this.getIdealWeight(age, gender);
    
    let response = `**${title}**\n\n`;
    
    // Interpretasi data
    response += `**Interpretasi Data:**\n\n`;
    for (let item of interpretation) {
      response += `• ${item}\n\n`;
    }
    
    // Tambahkan detail spesifik tentang anak
    response += `• **Tinggi Badan**: ${height} cm (Usia ${age} bulan, ${gender}): `;
    if (stunting_status === "Normal") {
      response += `Tinggi badan ini berada dalam rentang normal untuk anak ${gender.toLowerCase()} usia ${age} bulan.\n\n`;
    } else if (stunting_status === "Stunting Ringan") {
      response += `Tinggi badan ini sedikit di bawah standar untuk anak ${gender.toLowerCase()} usia ${age} bulan (minimal normal sekitar ${minNormalHeight} cm).\n\n`;
    } else {
      response += `Tinggi badan ini jauh di bawah standar untuk anak ${gender.toLowerCase()} usia ${age} bulan (minimal normal sekitar ${minNormalHeight} cm).\n\n`;
    }
    
    // Tambahkan informasi berat jika tersedia
    if (weight) {
      response += `• **Berat Badan**: ${weight} kg (Usia ${age} bulan, ${gender}): `;
      if (weight_status.includes("Normal")) {
        response += `Berat badan ini berada dalam rentang normal untuk anak seusianya.\n\n`;
      } else if (weight_status.includes("Lebih") || weight_status.includes("Obesitas")) {
        response += `Berat badan ini di atas rata-rata untuk anak seusianya (ideal sekitar ${idealWeight} kg).\n\n`;
      } else {
        response += `Berat badan ini di bawah rata-rata untuk anak seusianya (ideal sekitar ${idealWeight} kg).\n\n`;
      }
    }
    
    // Kesimpulan
    response += `**Kesimpulan:**\n\n${conclusion}\n\n`;
    
    // Rekomendasi
    response += `**Rekomendasi:**\n\n`;
    for (let i = 0; i < recommendations.length; i++) {
      response += `${i+1}. ${recommendations[i]}\n\n`;
    }
    
    // Peringatan dan disclaimer
    response += `**Peringatan:**\n\n`;
    response += `• Informasi ini bersifat umum dan tidak menggantikan konsultasi medis langsung.\n\n`;
    response += `• Selalu konsultasikan dengan dokter atau ahli gizi untuk penanganan yang tepat.`;
    
    return response;
  }
  
  // Metode untuk memformat respons dengan format yang lebih profesional dan komprehensif
  formatResponseDetailed(template, data) {
    const { title, interpretation, conclusion, recommendations } = template;
    const { height, age, gender, weight, stunting_status, weight_status, ml_stunting_result, ml_wasting_result, name } = data;
    
    // Informasi referensi
    const minNormalHeight = this.getMinNormalHeight(age, gender);
    const idealWeight = this.getIdealWeight(age, gender);
    const childName = name || "Anak Anda";
    
    // Tampilan status stunting yang visual
    let stuntingStatusIcon = "✅";
    if (stunting_status === "Stunting Ringan") {
      stuntingStatusIcon = "⚠️";
    } else if (stunting_status === "Stunting Berat") {
      stuntingStatusIcon = "🔴";
    }
    
    // Tampilan status berat yang visual
    let weightStatusIcon = "✅";
    if (weight_status.includes("Kurang") || weight_status.includes("Rendah")) {
      weightStatusIcon = "⚠️";
    } else if (weight_status.includes("Lebih") || weight_status.includes("Obesitas")) {
      weightStatusIcon = "⚠️";
    }
    
    // Hasil analisis
    let response = `### 🤖 **Hasil Analisis AI Stuntify**\n\n`;
    
    // Data anak
    response += `**Data Anak:**\n\n`;
    response += `* **Usia:** ${age} bulan\n`;
    response += `* **Jenis Kelamin:** ${gender}\n`;
    response += `* **Tinggi Badan:** ${height} cm\n`;
    if (weight) {
      response += `* **Berat Badan:** ${weight} kg\n`;
    }
    
    response += `\n---\n\n`;
    
    // Hasil ML jika tersedia
    if (ml_stunting_result || ml_wasting_result) {
      response += `### 📊 **Hasil Prediksi Machine Learning**\n\n`;
      
      if (ml_stunting_result) {
        let mlStuntingIcon = "✅";
        if (ml_stunting_result === "Stunting Ringan") {
          mlStuntingIcon = "⚠️";
        } else if (ml_stunting_result === "Stunting Berat") {
          mlStuntingIcon = "🔴";
        }
        
        response += `**Status Stunting:**\n${mlStuntingIcon} **${ml_stunting_result}**\n`;
        response += `📈 Confidence: **${data.stunting_confidence || "85"}%**\n\n`;
      }
      
      if (ml_wasting_result) {
        let mlWastingIcon = "✅";
        if (ml_wasting_result !== "Normal") {
          mlWastingIcon = "⚠️";
        }
        
        response += `**Status Wasting:**\n${mlWastingIcon} **${ml_wasting_result}**\n`;
        response += `📈 Confidence: **${data.wasting_confidence || "85"}%**\n\n`;
      }
      
      response += `📝 *Catatan:* Hasil ini dihasilkan oleh model Machine Learning dan bersifat prediktif. Untuk akurasi dan tindak lanjut, silakan konsultasikan dengan tenaga medis profesional.\n\n`;
      response += `---\n\n`;
    }
    
    // Interpretasi pertumbuhan
    response += `### 📋 **Interpretasi Pertumbuhan**\n\n`;
    
    // Tinggi badan
    response += `* **Tinggi Badan:** **${stunting_status}**\n`;
    if (stunting_status === "Normal") {
      response += `  * Tinggi badan ${childName} berada dalam rentang normal untuk ${gender.toLowerCase()} usia ${age} bulan (standar minimal ${minNormalHeight} cm).\n\n`;
    } else if (stunting_status === "Stunting Ringan") {
      response += `  * ${childName} berada di bawah standar WHO untuk ${gender.toLowerCase()} usia ${age} bulan. Tinggi badan ${height} cm sementara standar minimal adalah ${minNormalHeight} cm.\n\n`;
    } else {
      response += `  * ${childName} berada jauh di bawah standar WHO untuk ${gender.toLowerCase()} usia ${age} bulan. Tinggi badan ${height} cm sementara standar minimal adalah ${minNormalHeight} cm.\n\n`;
    }
    
    // Berat badan jika tersedia
    if (weight) {
      response += `* **Berat Badan:** **${weight_status}**\n`;
      if (weight_status.includes("Normal")) {
        response += `  * Berat badan ${childName} berada dalam rentang normal (${weight} kg) untuk usia ${age} bulan. Berat ideal sekitar ${idealWeight} kg.\n\n`;
      } else if (weight_status.includes("Kurang") || weight_status.includes("Rendah")) {
        response += `  * Berat badan ${childName} di bawah rata-rata (${weight} kg) untuk usia ${age} bulan. Berat ideal seharusnya sekitar ${idealWeight} kg.\n\n`;
      } else {
        response += `  * Berat badan ${childName} di atas rata-rata (${weight} kg) untuk usia ${age} bulan. Berat ideal seharusnya sekitar ${idealWeight} kg.\n\n`;
      }
    }
    
    // Status keseluruhan
    response += `* **Status Keseluruhan:**\n`;
    response += `  ${this.getOverallStatus(stunting_status, weight_status)}\n\n`;
    
    response += `---\n\n`;
    
    // Rekomendasi tindakan
    response += `### ✅ **Rekomendasi Tindakan**\n\n`;
    for (let i = 0; i < recommendations.length; i++) {
      response += `${i+1}. **${recommendations[i].split(":")[0]}**\n`;
      const description = recommendations[i].split(":")[1] || "";
      if (description) {
        response += `   ${description.trim()}\n\n`;
      }
    }
    
    // Menambahkan rekomendasi vitamin dan aktivitas fisik jika tersedia
    if (window.stuntingRecommendations) {
      try {
        const personalizedRecs = stuntingRecommendations.getPersonalizedRecommendations({
          age: age,
          stunting_status: stunting_status,
          weight_status: weight_status
        });
        
        if (personalizedRecs) {
          // Tambahkan 2 suplemen teratas
          if (personalizedRecs.supplements && personalizedRecs.supplements.length > 0) {
            response += `\n**Suplemen Direkomendasikan:**\n\n`;
            for (let i = 0; i < Math.min(2, personalizedRecs.supplements.length); i++) {
              const supp = personalizedRecs.supplements[i];
              response += `• **${supp.name}**: ${supp.benefits}. Sumber: ${supp.sources}\n`;
            }
            response += `\n`;
          }
          
          // Tambahkan 3 aktivitas fisik teratas
          if (personalizedRecs.activities && personalizedRecs.activities.activities) {
            const ageAppropriateActivities = personalizedRecs.activities.activities;
            if (ageAppropriateActivities.length > 0) {
              response += `\n**Aktivitas Fisik untuk Usia ${age} bulan:**\n\n`;
              for (let i = 0; i < Math.min(3, ageAppropriateActivities.length); i++) {
                response += `• ${ageAppropriateActivities[i]}\n`;
              }
              response += `\n`;
            }
          }
        }
      } catch (e) {
        console.error("Error mengambil rekomendasi:", e);
      }
    }
    
    // Peringatan penting
    response += `---\n\n`;
    response += `### ⚠️ **Peringatan Penting**\n\n`;
    
    // Berikan peringatan spesifik berdasarkan kondisi
    if (stunting_status !== "Normal") {
      response += `* ❗ Stunting adalah kondisi serius yang dapat memengaruhi kemampuan belajar dan kesehatan jangka panjang anak.\n`;
      response += `* ❗ Pastikan untuk berkonsultasi dengan dokter atau ahli gizi untuk penanganan yang tepat.\n`;
    }
    
    if (weight_status.includes("Obesitas") || weight_status.includes("Lebih")) {
      response += `* ❗ Jangan berikan diet ketat, suplemen penurun berat badan, atau obat-obatan tanpa anjuran dokter.\n`;
      response += `* ❗ Kelebihan berat badan di masa anak-anak bisa meningkatkan risiko penyakit metabolik di kemudian hari.\n`;
    } else if (weight_status.includes("Kurang") || weight_status.includes("Rendah")) {
      response += `* ❗ Jangan berikan suplemen penambah berat badan tanpa anjuran dokter.\n`;
      response += `* ❗ Berat badan kurang perlu penanganan serius untuk mencegah masalah kesehatan lainnya.\n`;
    }
    
    response += `* ❗ Informasi ini bersifat umum dan tidak menggantikan konsultasi medis langsung.\n`;
    
    // Kesimpulan AI
    response += `\n---\n\n`;
    response += `🔍 **Kesimpulan AI**\n`;
    response += `${conclusion}\n\n`;
    response += `📞 *Butuh bantuan lebih lanjut? Tanyakan tentang vitamin, nutrisi, atau aktivitas fisik yang sesuai untuk ${childName}.*\n\n`;
    
    return response;
  }
  
  // Mendapatkan status keseluruhan berdasarkan stunting dan berat
  getOverallStatus(stuntingStatus, weightStatus) {
    if (stuntingStatus === "Normal" && weightStatus.includes("Normal")) {
      return "✅ **Pertumbuhan Normal**\n    Tinggi dan berat badan dalam rentang normal sesuai usia.";
    } else if (stuntingStatus === "Normal" && (weightStatus.includes("Kurang") || weightStatus.includes("Rendah"))) {
      return "⚠️ **Risiko Wasting (Kurus)**\n    Tinggi badan normal tetapi berat badan kurang, perlu peningkatan asupan nutrisi.";
    } else if (stuntingStatus === "Normal" && (weightStatus.includes("Lebih") || weightStatus.includes("Obesitas"))) {
      return "⚠️ **Kelebihan Berat Badan**\n    Tinggi badan normal tetapi berat badan berlebih, perlu pengaturan pola makan.";
    } else if (stuntingStatus.includes("Stunting") && weightStatus.includes("Normal")) {
      return "⚠️ **Stunting**\n    Tinggi badan di bawah standar tetapi berat badan normal. Perlu fokus pada nutrisi penunjang pertumbuhan.";
    } else if (stuntingStatus.includes("Stunting") && (weightStatus.includes("Kurang") || weightStatus.includes("Rendah"))) {
      return "🔴 **Stunting dan Wasting**\n    Kondisi serius dimana tinggi dan berat badan di bawah standar. Memerlukan konsultasi medis dan intervensi nutrisi segera.";
    } else if (stuntingStatus.includes("Stunting") && (weightStatus.includes("Lebih") || weightStatus.includes("Obesitas"))) {
      return "⚠️ **Stunting dengan Kelebihan Berat Badan**\n    Kondisi kompleks yang menunjukkan ketidakseimbangan pertumbuhan. Memerlukan penanganan khusus.";
    } 
    
    return "Perlu evaluasi lebih lanjut oleh tenaga kesehatan.";
  }
  
  // Metode untuk mendapatkan respons pertanyaan umum
  getGeneralResponse(query) {
    // Menentukan respons berdasarkan kata kunci dalam query
    query = query.toLowerCase();
    
    // Deteksi pertanyaan spesifik tentang data anak
    if (query.includes("anak saya") || query.includes("bayi saya") || query.includes("pertumbuhan anak saya")) {
      return `**Pertanyaan tentang Anak Anda**

Untuk memberikan informasi yang akurat tentang pertumbuhan anak Anda, saya memerlukan data seperti usia, tinggi, dan berat badan anak. 

Silakan gunakan kalkulator di halaman ini untuk memasukkan data pengukuran. Setelah itu, saya dapat memberikan analisis dan rekomendasi yang spesifik untuk anak Anda.`;
    }
    
    // Deteksi jenis pertanyaan spesifik dan berikan jawaban yang sesuai
    
    // Pertanyaan tentang stunting dasar
    if (query.includes("apa itu stunting") || query.includes("stunting adalah") || query.includes("pengertian stunting")) {
      return this.formatGeneralInfo(this.generalInfo.whatIsStunting);
    } 
    // Pertanyaan tentang penyebab
    else if (
      query.includes("penyebab") || 
      query.includes("mengapa terjadi") || 
      (query.includes("kenapa bisa") && query.includes("stunting"))
    ) {
      return this.formatGeneralInfo(this.generalInfo.stuntingCauses);
    } 
    // Pertanyaan tentang pencegahan
    else if (
      query.includes("cegah") || 
      query.includes("preventif") || 
      (query.includes("mencegah") && query.includes("stunting"))
    ) {
      return this.formatGeneralInfo(this.generalInfo.stuntingPrevention);
    }
    // Pertanyaan tentang vitamin dan suplemen
    else if (
      (query.includes("vitamin") || query.includes("suplemen") || query.includes("nutrisi")) &&
      (query.includes("stunting") || query.includes("pertumbuhan") || query.includes("anak"))
    ) {
      return this.formatGeneralInfo(this.generalInfo.vitaminsForStunting);
    }
    // Pertanyaan tentang aktivitas fisik
    else if (
      (query.includes("aktivitas") || query.includes("olahraga") || query.includes("gerak") || 
       query.includes("bermain") || query.includes("fisik")) &&
      (query.includes("stunting") || query.includes("pertumbuhan") || query.includes("anak"))
    ) {
      return this.formatGeneralInfo(this.generalInfo.exerciseForChildren);
    }
    // Pertanyaan tentang program nutrisi
    else if (
      (query.includes("program") || query.includes("kebijakan") || query.includes("intervensi")) &&
      (query.includes("stunting") || query.includes("gizi") || query.includes("nutrisi"))
    ) {
      return this.formatGeneralInfo(this.generalInfo.nutritionalPrograms);
    }
    // Pertanyaan detail tentang vitamin A
    else if (query.includes("vitamin a") && (query.includes("stunting") || query.includes("anak"))) {
      return `**Vitamin A untuk Mencegah Stunting**

**Pentingnya Vitamin A:**
• Mendukung pertumbuhan sel dan jaringan yang sehat
• Menjaga kesehatan mata dan penglihatan
• Memperkuat sistem kekebalan tubuh untuk melawan infeksi
• Membantu perkembangan tulang dan gigi

**Sumber Vitamin A:**
• Hati, telur, susu, dan mentega
• Buah dan sayuran berwarna jingga/oranye (wortel, labu, pepaya, mangga)
• Sayuran hijau gelap (bayam, kangkung, daun singkong)
• Minyak kelapa sawit merah

**Dosis yang Direkomendasikan:**
• 0-6 bulan: 400 mcg per hari (dari ASI)
• 7-12 bulan: 500 mcg per hari
• 1-3 tahun: 300 mcg per hari
• 4-8 tahun: 400 mcg per hari

**Catatan:** Di Indonesia, program suplementasi vitamin A biasanya diberikan dalam bentuk kapsul biru (untuk bayi 6-11 bulan dengan dosis 100.000 IU) dan kapsul merah (untuk anak 12-59 bulan dengan dosis 200.000 IU) dua kali setahun.

Selalu konsultasikan dengan tenaga kesehatan sebelum memberikan suplemen vitamin A tambahan.`;
    }
    // Pertanyaan detail tentang vitamin D
    else if (query.includes("vitamin d") && (query.includes("stunting") || query.includes("anak"))) {
      return `**Vitamin D untuk Mencegah Stunting**

**Pentingnya Vitamin D:**
• Membantu penyerapan kalsium dan fosfor untuk pertumbuhan tulang
• Mendukung fungsi sistem kekebalan tubuh
• Berperan dalam perkembangan otak
• Mencegah riketsia (penyakit tulang lunak pada anak)

**Sumber Vitamin D:**
• Paparan sinar matahari pagi (10-15 menit, 2-3 kali seminggu)
• Ikan berlemak seperti salmon, tuna, dan makerel
• Kuning telur
• Susu dan produk susu yang difortifikasi
• Jamur yang telah terpapar sinar UV

**Dosis yang Direkomendasikan:**
• 0-12 bulan: 400 IU (10 mcg) per hari
• 1-18 tahun: 600 IU (15 mcg) per hari

**Tips Mendapatkan Vitamin D:**
• Ajak anak bermain di luar rumah pada pagi hari (sebelum jam 10)
• Jangan gunakan tabir surya selama paparan singkat ini
• Bila jarang terpapar matahari, konsultasikan ke dokter untuk suplementasi

**Catatan:** Kekurangan vitamin D dapat menyebabkan gangguan pembentukan tulang yang dapat berkontribusi pada terjadinya stunting.`;
    }
    // Pertanyaan detail tentang kalsium
    else if (query.includes("kalsium") && (query.includes("stunting") || query.includes("anak"))) {
      return `**Kalsium untuk Mencegah Stunting**

**Pentingnya Kalsium:**
• Pembentukan dan pemeliharaan tulang dan gigi yang kuat
• Mendukung fungsi saraf dan otot
• Berperan dalam pembekuan darah
• Mendukung pertumbuhan linier (tinggi badan)

**Sumber Kalsium:**
• Susu dan produk susu (yogurt, keju)
• Ikan teri dan sarden (dimakan dengan tulangnya)
• Tahu yang diproses dengan kalsium
• Sayuran hijau gelap (brokoli, bayam, daun singkong)
• Kacang-kacangan dan biji-bijian
• Buah-buahan seperti jeruk dan pisang

**Dosis yang Direkomendasikan:**
• 0-6 bulan: 200 mg per hari
• 7-12 bulan: 260 mg per hari
• 1-3 tahun: 700 mg per hari
• 4-8 tahun: 1000 mg per hari

**Tips Meningkatkan Asupan Kalsium:**
• Berikan susu sebagai minuman utama untuk anak (kecuali jika ada alergi)
• Tambahkan keju parut pada makanan anak
• Berikan yogurt sebagai camilan sehat
• Masak sup dengan tambahan tulang ikan atau ayam

**Catatan:** Vitamin D diperlukan untuk penyerapan kalsium yang optimal. Pastikan anak juga mendapatkan cukup vitamin D.`;
    }
    // Pertanyaan detail tentang zat besi
    else if ((query.includes("zat besi") || query.includes("iron")) && (query.includes("stunting") || query.includes("anak"))) {
      return `**Zat Besi untuk Mencegah Stunting**

**Pentingnya Zat Besi:**
• Pembentukan hemoglobin dan sel darah merah
• Mencegah anemia yang dapat menghambat pertumbuhan
• Mendukung perkembangan kognitif dan fokus
• Memperkuat sistem kekebalan tubuh

**Sumber Zat Besi:**
• Daging merah tanpa lemak
• Hati dan jeroan
• Ikan dan makanan laut
• Telur (terutama kuning telur)
• Kacang-kacangan dan biji-bijian
• Sayuran hijau seperti bayam dan kangkung
• Makanan yang difortifikasi seperti sereal bayi

**Dosis yang Direkomendasikan:**
• 0-6 bulan: 0.27 mg per hari (dari ASI)
• 7-12 bulan: 11 mg per hari
• 1-3 tahun: 7 mg per hari
• 4-8 tahun: 10 mg per hari

**Tips Meningkatkan Penyerapan Zat Besi:**
• Berikan makanan yang mengandung vitamin C bersamaan dengan sumber zat besi
• Hindari minum teh atau kopi bersamaan dengan makanan kaya zat besi
• Gunakan peralatan masak berbahan besi untuk menambah asupan zat besi

**Catatan:** Kekurangan zat besi dapat menyebabkan anemia yang berhubungan dengan gangguan pertumbuhan. Di Indonesia, pemberian tablet tambah darah biasanya dilakukan untuk ibu hamil untuk mencegah anemia dan stunting pada janin.`;
    }
    // Pertanyaan detail tentang zinc
    else if (query.includes("zinc") && (query.includes("stunting") || query.includes("anak"))) {
      return `**Zinc untuk Mencegah Stunting**

**Pentingnya Zinc:**
• Mendukung pertumbuhan dan perkembangan fisik
• Berperan dalam sintesis protein dan DNA
• Memperkuat sistem kekebalan tubuh
• Membantu penyembuhan luka dan mencegah infeksi
• Mendukung fungsi indera perasa dan penciuman

**Sumber Zinc:**
• Daging merah dan unggas
• Tiram dan seafood
• Kacang-kacangan dan biji-bijian
• Susu dan produk susu
• Telur
• Biji labu
• Gandum utuh

**Dosis yang Direkomendasikan:**
• 0-6 bulan: 2 mg per hari
• 7-12 bulan: 3 mg per hari
• 1-3 tahun: 3 mg per hari
• 4-8 tahun: 5 mg per hari

**Tips Meningkatkan Asupan Zinc:**
• Kombinasikan sumber protein hewani dan nabati dalam menu anak
• Rendam kacang-kacangan dan biji-bijian sebelum dimasak untuk meningkatkan ketersediaan zinc
• Hindari konsumsi teh bersamaan dengan makanan kaya zinc

**Catatan:** Kekurangan zinc telah terbukti berhubungan erat dengan stunting. Di Indonesia, suplementasi zinc sering direkomendasikan sebagai bagian dari penanganan diare pada anak, yang juga membantu mencegah stunting.`;
    }
    // Pertanyaan tentang ASI
    else if ((query.includes("asi") || query.includes("air susu ibu") || query.includes("menyusui")) && 
             (query.includes("stunting") || query.includes("pencegahan") || query.includes("pertumbuhan"))) {
      return `**ASI dan Pencegahan Stunting**

**Pentingnya ASI untuk Mencegah Stunting:**
• ASI mengandung semua nutrisi yang dibutuhkan bayi hingga usia 6 bulan
• Mengandung antibodi yang melindungi dari infeksi, sehingga mengurangi risiko penyakit yang dapat menghambat pertumbuhan
• Memiliki komposisi lemak ideal untuk perkembangan otak dan sistem saraf
• Mudah dicerna, meningkatkan penyerapan nutrisi

**Rekomendasi Pemberian ASI:**
• ASI eksklusif selama 6 bulan pertama kehidupan
• Lanjutkan pemberian ASI hingga usia 2 tahun atau lebih, bersamaan dengan MPASI
• Menyusui sesuai permintaan (on demand), minimal 8 kali sehari untuk bayi baru lahir
• Pastikan teknik menyusui yang benar untuk memastikan bayi mendapat cukup ASI

**Manfaat ASI untuk Mencegah Stunting:**
• Menurunkan risiko infeksi saluran pencernaan yang dapat mengganggu penyerapan nutrisi
• Membangun sistem kekebalan tubuh yang kuat
• Memastikan pola pertumbuhan yang optimal
• Mengurangi risiko malnutrisi pada masa bayi

**Tips untuk Ibu Menyusui:**
• Pastikan asupan cairan yang cukup
• Konsumsi makanan bergizi seimbang dengan tambahan 500 kalori per hari
• Dapatkan dukungan dari keluarga dan tenaga kesehatan
• Hindari stres berlebihan yang dapat mempengaruhi produksi ASI

**Program Pendukung ASI di Indonesia:**
• Inisiasi Menyusu Dini (IMD)
• Konseling menyusui di fasilitas kesehatan
• Ruang Laktasi di tempat kerja dan fasilitas umum
• Kelompok Pendukung ASI di komunitas`;
    }
    // Pertanyaan tentang MPASI
    else if (query.includes("mpasi") || (query.includes("makanan pendamping") && query.includes("asi"))) {
      return `**MPASI (Makanan Pendamping ASI) untuk Mencegah Stunting**

**Pentingnya MPASI yang Tepat:**
• Melengkapi nutrisi dari ASI setelah usia 6 bulan
• Memperkenalkan berbagai nutrisi esensial untuk pertumbuhan optimal
• Mengembangkan keterampilan makan dan kebiasaan makan sehat
• Mencegah malnutrisi dan stunting

**Waktu Pemberian MPASI yang Tepat:**
• Mulai pada usia 6 bulan, tidak lebih awal atau terlambat
• Lanjutkan pemberian ASI bersamaan dengan MPASI hingga usia 2 tahun atau lebih
• Tingkatkan tekstur makanan secara bertahap sesuai perkembangan anak

**Prinsip MPASI yang Baik:**
• Tepat waktu: mulai saat ASI tidak lagi mencukupi kebutuhan nutrisi (usia 6 bulan)
• Adekuat: mencukupi kebutuhan nutrisi untuk pertumbuhan optimal
• Aman: disiapkan dan disimpan dengan higienis
• Diberikan dengan responsif: memperhatikan sinyal lapar dan kenyang anak

**Panduan MPASI Berdasarkan Usia:**
• 6-8 bulan: Makanan lumat halus, 2-3 kali sehari + ASI
• 9-11 bulan: Makanan cincang, 3-4 kali sehari + ASI
• 12-24 bulan: Makanan keluarga, 3-4 kali sehari + 1-2 kali snack + ASI

**Makanan Penting dalam MPASI untuk Mencegah Stunting:**
• Sumber protein: telur, ikan, daging, ayam, hati, kacang-kacangan
• Sumber karbohidrat: nasi, kentang, ubi, jagung
• Sumber lemak: alpukat, minyak, santan (dalam jumlah moderat)
• Buah dan sayur beragam warna
• Makanan kaya zat besi, zinc, kalsium, dan vitamin A

**Catatan:** Pemberian MPASI yang tepat merupakan komponen penting dalam pencegahan stunting pada anak.`;
    }
    
    // Filter pertanyaan di luar topik stunting dan pertumbuhan anak
    else if (
      this.isOutOfScopeQuestion(query)
    ) {
      return this.getOutOfScopeResponse();
    }
    else {
      // Default response
      return this.getDefaultResponse();
    }
  }
  
  // Metode untuk mendeteksi pertanyaan yang di luar topik stunting dan pertumbuhan anak
  isOutOfScopeQuestion(query) {
    // Kata kunci topik di luar cakupan
    const outOfScopeKeywords = [
      "politik", "ekonomi", "presiden", "pemerintah", "perang", 
      "artis", "selebriti", "film", "sinetron", "drama",
      "olahraga", "sepakbola", "basket", "voli",
      "resep", "masakan", "makanan", "restoran",
      "teknologi", "komputer", "laptop", "smartphone",
      "musik", "lagu", "konser", "album",
      "games", "permainan", "game", "video game",
      "cuaca", "iklim", "ramalan", "prakiraan",
      "tiket", "perjalanan", "wisata", "liburan",
      "berita", "gosip", "skandal", "trending"
    ];
    
    // Jika query tidak mengandung kata kunci stunting/pertumbuhan tapi mengandung topik lain
    const containsStuntingKeywords = 
      query.includes("stunting") || 
      query.includes("pertumbuhan") || 
      query.includes("tinggi badan") ||
      query.includes("berat badan") ||
      query.includes("nutrisi") ||
      query.includes("gizi") ||
      query.includes("anak");
    
    if (!containsStuntingKeywords) {
      // Periksa apakah mengandung kata kunci di luar topik
      for (const keyword of outOfScopeKeywords) {
        if (query.includes(keyword)) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  // Respons untuk pertanyaan di luar topik
  getOutOfScopeResponse() {
    return `**Maaf, Saya Hanya Dapat Membantu Seputar Stunting dan Pertumbuhan Anak**

Saya adalah asisten AI Stuntify yang dikhususkan untuk menjawab pertanyaan tentang stunting dan pertumbuhan anak. Mohon ajukan pertanyaan seputar:

• Pengertian dan penyebab stunting
• Cara mencegah dan mengatasi stunting 
• Informasi tentang vitamin, nutrisi, dan suplemen untuk pertumbuhan anak
• Aktivitas fisik untuk mendukung pertumbuhan optimal
• Program nutrisi untuk pencegahan stunting
• Interpretasi hasil pengukuran anak

Mari fokus pada topik seputar stunting dan kesehatan anak. 😊`;
  }

  // Metode untuk mendapatkan topik dari pertanyaan
  detectQuestionTopic(query) {
    query = query.toLowerCase();
    
    // Objek untuk menyimpan skor topik
    const topicScores = {
      stunting: 0,
      nutrition: 0,
      vitamins: 0,
      exercise: 0,
      development: 0
    };
    
    // Kata kunci untuk setiap topik
    const keywords = {
      stunting: ["stunting", "pendek", "tinggi badan", "pertumbuhan", "gagal tumbuh"],
      nutrition: ["gizi", "nutrisi", "makan", "makanan", "diet", "asupan", "mpasi", "asi"],
      vitamins: ["vitamin", "suplemen", "mikronutrien", "mineral", "kalsium", "zat besi", "zinc", "omega"],
      exercise: ["aktivitas", "fisik", "olahraga", "gerak", "bermain", "latihan", "motorik"],
      development: ["perkembangan", "kognitif", "otak", "kemampuan", "milestone", "tahapan"]
    };
    
    // Hitung skor untuk setiap topik
    for (const topic in keywords) {
      for (const keyword of keywords[topic]) {
        if (query.includes(keyword)) {
          topicScores[topic] += 1;
        }
      }
    }
    
    // Tentukan topik dengan skor tertinggi
    let highestScore = 0;
    let mainTopic = "general";
    
    for (const topic in topicScores) {
      if (topicScores[topic] > highestScore) {
        highestScore = topicScores[topic];
        mainTopic = topic;
      }
    }
    
    return {
      topic: mainTopic,
      score: highestScore
    };
  }
  
  // Metode untuk mendapatkan rekomendasi detail berdasarkan pertanyaan dan data anak
  getDetailedRecommendations(query, childData) {
    // Pastikan stuntingRecommendations tersedia
    if (!window.stuntingRecommendations) {
      return "Mohon maaf, sistem rekomendasi detail sedang tidak tersedia. Silakan coba lagi nanti.";
    }
    
    // Deteksi topik pertanyaan
    const topicInfo = this.detectQuestionTopic(query);
    const { topic } = topicInfo;
    
    // Dapatkan rekomendasi berdasarkan data anak
    const recommendations = stuntingRecommendations.getPersonalizedRecommendations({
      age: childData.age,
      stunting_status: childData.stunting_status,
      weight_status: determineWeightStatus(childData.weight, childData.age, childData.gender)
    });
    
    // Pengantar pesan yang disesuaikan dengan topik pertanyaan
    let intro = "";
    const childName = childData.name || "anak Anda";
    
    switch (topic) {
      case "nutrition":
        intro = `**Rekomendasi Nutrisi untuk ${childName}**\n\nBerikut adalah rekomendasi nutrisi yang disesuaikan untuk ${childName} (${childData.age} bulan):\n\n`;
        break;
      case "vitamins":
        intro = `**Rekomendasi Vitamin & Suplemen untuk ${childName}**\n\nBerikut adalah vitamin dan suplemen yang dapat mendukung pertumbuhan ${childName} (${childData.age} bulan):\n\n`;
        break;
      case "exercise":
        intro = `**Rekomendasi Aktivitas Fisik untuk ${childName}**\n\nBerikut adalah aktivitas fisik yang cocok untuk ${childName} (${childData.age} bulan):\n\n`;
        break;
      default:
        intro = `**Rekomendasi Lengkap untuk ${childName}**\n\nBerikut adalah rekomendasi komprehensif untuk mendukung pertumbuhan optimal ${childName} (${childData.age} bulan):\n\n`;
    }
    
    // Format rekomendasi berdasarkan topik
    let response = "";
    if (topic === "nutrition") {
      response = intro + this.formatNutritionRecommendation(recommendations.nutrition) + 
                "\n\n**Catatan:** Nutrisi yang baik adalah fondasi pertumbuhan optimal. Jangan lupa untuk memberikan makanan yang beragam dan kaya nutrisi.";
    } 
    else if (topic === "vitamins") {
      let suppText = "";
      recommendations.supplements.forEach((supp, i) => {
        suppText += `${i+1}. **${supp.name}**\n`;
        suppText += `   • Manfaat: ${supp.benefits}\n`;
        suppText += `   • Sumber: ${supp.sources}\n`;
        suppText += `   • Dosis: ${supp.dosage}\n\n`;
      });
      
      response = intro + suppText + 
                "\n**Penting:** Selalu konsultasikan dengan dokter sebelum memberikan suplemen tambahan pada anak.";
    } 
    else if (topic === "exercise") {
      let actText = "";
      recommendations.activities.activities.forEach((act, i) => {
        actText += `${i+1}. ${act}\n`;
      });
      
      response = intro + actText + 
                "\n\n**Catatan:** Aktivitas fisik sangat penting untuk pertumbuhan dan perkembangan anak. Pastikan aktivitas menyenangkan dan aman.";
    } 
    else {
      // Berikan rekomendasi lengkap
      response = intro + stuntingRecommendations.formatRecommendations(recommendations);
    }
    
    return response;
  }
    // Format rekomendasi nutrisi
  formatNutritionRecommendation(nutrition) {
    let text = `**${nutrition.title}**\n\n`;
    nutrition.recommendations.forEach((rec, i) => {
      text += `${i+1}. ${rec}\n`;
    });
    return text;
  }
  
  // Get minimum normal height based on age and gender
  getMinNormalHeight(age, gender) {
    // Access the global stuntingReference object if defined in the global scope
    if (typeof stuntingReference !== 'undefined') {
      const ageAsNumber = parseInt(age);
      const genderIndex = gender === "Laki-laki" ? 0 : 1;
      
      if (stuntingReference[ageAsNumber]) {
        return stuntingReference[ageAsNumber][genderIndex];
      }
    }
    
    // Fallback to estimated calculation if stuntingReference is not available
    const baseHeight = gender === "Laki-laki" ? 50.0 : 49.0;
    let estimatedHeight = baseHeight;
    
    if (age <= 12) {
      // 0-12 months: faster growth
      estimatedHeight += (age * 1.5);
    } else {
      // 12+ months: slower growth
      estimatedHeight += (12 * 1.5) + ((age - 12) * 0.7);
    }
    
    return parseFloat(estimatedHeight.toFixed(1));
  }
  
  // Get ideal weight based on age and gender
  getIdealWeight(age, gender) {
    if (age <= 12) {
      // For babies: starting weight around 3.5kg, gaining approximately 0.5kg per month in first year
      const baseWeight = gender === "Laki-laki" ? 3.5 : 3.3;
      return parseFloat((baseWeight + (age * 0.5)).toFixed(1));
    } else {
      // Simple formula for toddlers after 1 year
      // Approximately follows: weight (kg) = 8 + (age in years * 2) with age adjusted to years
      const ageInYears = age / 12;
      const weightEstimate = 8 + (ageInYears * 2);
      return parseFloat(weightEstimate.toFixed(1));
    }
  }
}

// Initialize StuntingAI when the page loads
let stuntingAI;
document.addEventListener('DOMContentLoaded', function() {
  stuntingAI = new StuntingAI();
});
