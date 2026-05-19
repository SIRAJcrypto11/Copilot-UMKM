import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  
  // 1. Setup Business via Prompt
  app.post("/api/business/setup", async (req, res) => {
    try {
      const { prompt } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Berdasarkan prompt berikut: "${prompt}", buatkan data setup bisnis UMKM yang realistis untuk testing. Sertakan nama bisnis, tipe usaha, 5-10 produk (nama, kategori, harga modal, harga jual, stok saat ini, stok minimum), dan 15 transaksi terakhir dalam 7 hari terakhir.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              type: { type: Type.STRING },
              monthlyTargetRevenue: { type: Type.NUMBER },
              products: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    category: { type: Type.STRING },
                    cost: { type: Type.NUMBER },
                    price: { type: Type.NUMBER },
                    stock: { type: Type.NUMBER },
                    minStock: { type: Type.NUMBER },
                  },
                },
              },
              transactions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    date: { type: Type.STRING },
                    productName: { type: Type.STRING },
                    quantity: { type: Type.NUMBER },
                    total: { type: Type.NUMBER },
                    cost: { type: Type.NUMBER },
                  },
                },
              },
            },
            required: ["name", "type", "products", "transactions"],
          },
        },
      });
      
      const setupData = JSON.parse(response.text);
      res.json(setupData);
    } catch (error: any) {
      console.error("Setup Error:", error);
      const message = error.message?.includes("503") || error.message?.includes("demand") 
        ? "Gemini sedang sibuk, silakan coba lagi sebentar lagi." 
        : "Gagal melakukan setup bisnis.";
      res.status(500).json({ error: message });
    }
  });

  // 1.5. Import Business via URL or Catalog Text
  app.post("/api/business/import", async (req, res) => {
    try {
      const { url, catalogText } = req.body;
      let context = catalogText || "";

      if (url) {
        try {
          const webContent = await fetch(url).then(r => r.text());
          context += "\nContent from URL:\n" + webContent.substring(0, 5000); 
        } catch (e) {
          context += `\n(User provided URL: ${url}. Extract business data based on this URL if you know it, or use common patterns for such sites.)`;
        }
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Ekstrak data bisnis dari konteks berikut: "${context}". Hasilkan data bisnis yang terstruktur (nama, tipe, produk, transaksi simulasi). Jika data produk tidak lengkap, buatkan simulasi yang masuk akal berdasarkan tipe bisnisnya.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              type: { type: Type.STRING },
              products: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    cost: { type: Type.NUMBER },
                    price: { type: Type.NUMBER },
                    stock: { type: Type.NUMBER },
                  },
                },
              },
              transactions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    date: { type: Type.STRING },
                    productName: { type: Type.STRING },
                    quantity: { type: Type.NUMBER },
                    total: { type: Type.NUMBER },
                  },
                },
              },
            },
            required: ["name", "type", "products", "transactions"],
          },
        },
      });

      res.json(JSON.parse(response.text));
    } catch (error: any) {
      console.error("Import Error:", error);
      const message = error.message?.includes("503") || error.message?.includes("demand") 
        ? "Gemini sedang sibuk, silakan coba lagi sebentar lagi." 
        : "Gagal mengimpor data bisnis.";
      res.status(500).json({ error: message });
    }
  });

  // 2. Chat with Copilot
  app.post("/api/business/chat", async (req, res) => {
    try {
      const { message, history, businessData } = req.body;
      const context = JSON.stringify(businessData);
      
      const chat = ai.chats.create({ 
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `Anda adalah SNIShop AI Copilot, asisten pintar untuk pemilik UMKM di Indonesia. 
          Gunakan data bisnis berikut untuk menjawab pertanyaan: ${context}.
          Berikan jawaban yang ramah, profesional, dan to-the-point dalam Bahasa Indonesia. 
          Jika ditanya tentang laba, hitung berdasarkan (harga jual - harga modal) * jumlah terjual.
          Selalu berikan saran praktis.`,
        },
        history: history.map((h: any) => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }]
        }))
      });

      const response = await chat.sendMessage({ message });
      res.json({ content: response.text });
    } catch (error: any) {
      console.error("Chat Error:", error);
      const message = error.message?.includes("503") || error.message?.includes("demand") 
        ? "Gemini sedang sibuk, silakan coba lagi sebentar lagi." 
        : "Gagal memproses pesan.";
      res.status(500).json({ error: message });
    }
  });

  // 3. Get Daily Brief/Summary
  app.post("/api/business/brief", async (req, res) => {
    try {
      const { businessData } = req.body;
      const context = JSON.stringify(businessData);
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Berdasarkan data bisnis ini: ${context}, buatkan ringkasan operasional harian yang menarik untuk pemilik usaha. Tentukan: 1. Ringkasan performa penjualan (Omzet & Estimasi Laba). 2. Produk Terlaris. 3. Peringatan Stok (jika ada yang rendah). 4. Tiga tindakan prioritas (Action Center) yang harus dilakukan hari ini (misal: restock, promo, follow up). Tampilkan dalam format JSON.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              metrics: {
                type: Type.OBJECT,
                properties: {
                  revenue: { type: Type.NUMBER },
                  profit: { type: Type.NUMBER },
                  topProduct: { type: Type.STRING },
                }
              },
              stockAlerts: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              actions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    reason: { type: Type.STRING },
                    priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] }
                  }
                }
              }
            },
            required: ["summary", "metrics", "stockAlerts", "actions"],
          },
        },
      });

      res.json(JSON.parse(response.text));
    } catch (error: any) {
      console.error("Brief Error:", error);
      const message = error.message?.includes("503") || error.message?.includes("demand") 
        ? "Gemini sedang sibuk, silakan coba lagi sebentar lagi." 
        : "Gagal memuat ringkasan bisnis.";
      res.status(500).json({ error: message });
    }
  });

  // 4. Simulate Business
  app.post("/api/business/simulate", async (req, res) => {
    try {
      const { scenario, businessData } = req.body;
      const context = JSON.stringify(businessData);
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Berdasarkan data bisnis ini: ${context}, pengguna ingin melakukan simulasi keputusan: "${scenario}". Analisis dampaknya secara logis (misalnya prediksi perubahan omzet, laba kotor, dan risiko). Berikan ringkasan dalam format JSON.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              impactRevenueText: { type: Type.STRING },
              impactProfitText: { type: Type.STRING },
              impactRiskText: { type: Type.STRING },
              recommendationNote: { type: Type.STRING, description: "aman dicoba | perlu hati-hati | risiko tinggi" }
            },
            required: ["impactRevenueText", "impactProfitText", "impactRiskText", "recommendationNote"]
          }
        }
      });

      res.json(JSON.parse(response.text));
    } catch (error: any) {
      console.error("Simulation Error:", error);
      const message = error.message?.includes("503") || error.message?.includes("demand") 
        ? "Gemini sedang sibuk, silakan coba lagi sebentar lagi." 
        : "Gagal memuat simulasi bisnis.";
      res.status(500).json({ error: message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
