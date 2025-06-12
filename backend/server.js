// index.js
import express from 'express';
import { db, collection, addDoc, serverTimestamp } from './firebase.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/test-kirim', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, "testCollection"), {
      message: "Hello from backend!",
      createdAt: serverTimestamp(),
    });

    res.status(200).json({
      success: true,
      message: "Data berhasil dikirim ke Firestore",
      docId: docRef.id,
    });
  } catch (error) {
    console.error("Gagal kirim data:", error);
    res.status(500).json({
      success: false,
      message: "Gagal kirim data",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
