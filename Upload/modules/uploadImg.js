const mime = require('mime-types');
const fs = require("fs");
const path = require("path");

async function uploadImg({ filePath, API_KEY, HOST }) {
  const fileName = path.basename(filePath);
  const mimeType = mime.lookup(filePath) || 'application/octet-stream';
  
  // Вспомогательная функция для поиска файла по имени
  const findExistingFile = async () => {
    const res = await fetch(`${HOST}/api/upload/files?filters[name][$eq]=${fileName}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    const data = await res.json();
    const files = data.data || data;
    return (Array.isArray(files) && files.length > 0) ? files[0].id : null;
  };

  try {
    // 1. Сначала проверяем, нет ли уже такого файла
    const existingId = await findExistingFile();
    if (existingId) {
      console.log(`⏩ Уже в Strapi: ${fileName} (ID: ${existingId})`);
      return existingId;
    }

    // 2. Если нет — загружаем
    console.log(`⏳ Загрузка в Strapi: ${fileName}...`);
    const fileBuffer = fs.readFileSync(filePath);
    const blob = new Blob([fileBuffer], { type: mimeType });
    const form = new FormData();
    form.append("files", blob, fileName);

    const res = await fetch(`${HOST}/api/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${API_KEY}` },
      body: form,
    });

    if (!res.ok) {
      // КРИТИЧЕСКИЙ МОМЕНТ: если 500, ждем 2 сек и ищем файл снова
      if (res.status === 500) {
        console.log(`⚠️ 500 на сервере, проверяю не создался ли файл втихую...`);
        await new Promise(r => setTimeout(r, 100));
        const recoveredId = await findExistingFile();
        if (recoveredId) {
          console.log(`✅ Нашел после 500: ${fileName} (ID: ${recoveredId})`);
          return recoveredId;
        }
      }
      throw new Error(`Ошибка ${res.status}`);
    }

    const uploadedFiles = await res.json();
    return uploadedFiles[0].id;

  } catch (error) {
    console.error(`❌ Ошибка для ${fileName}:`, error.message);
    return null;
  }
}

module.exports = uploadImg;
