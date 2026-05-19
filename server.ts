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
        contents: `Berdasarkan prompt berikut: "${prompt}", buatkan data setup bisnis UMKM yang realistis untuk testing. Sertakan nama bisnis, tipe usaha, 5 produk (nama, harga modal, harga jual, stok), dan 5 transaksi terakhir dalam 7 hari terakhir.`,
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
      
      const setupData = JSON.parse(response.text);
      res.json(setupData);
    } catch (error) {
      console.error("Setup Error:", error);
      res.status(500).json({ error: "Gagal melakukan setup bisnis." });
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
    } catch (error) {
      console.error("Chat Error:", error);
      res.status(500).json({ error: "Gagal memproses pesan." });
    }
  });

  // 3. Get Daily Brief/Summary
  app.post("/api/business/brief", async (req, res) => {
    try {
      const { businessData } = req.body;
      const context = JSON.stringify(businessData);
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Berdasarkan data bisnis ini: ${context}, buatkan ringkasan operasional harian yang menarik untuk pemilik usaha. 
        Tentukan:
        1. Ringkasan performa penjualan (Omzet & Estimasi Laba).
        2. Produk Terlaris.
        3. Peringatan Stok (jika ada yang rendah).
        4. Tiga tindakan prioritas (Action Center) yang harus dilakukan hari ini (misal: restock, promo, follow up).
        Tampilkan dalam format JSON.`,
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
    } catch (error) {
      console.error("Brief Error:", error);
      res.status(500).json({ error: "Gagal memuat ringkasan bisnis." });
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
