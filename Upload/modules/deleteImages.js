const fs = require('fs/promises');
const path = require('path');

async function deleteImages(fileNames) {
  console.log("🧹 Начинаю очистку локальных файлов...");
  
  for (const fileName of fileNames) {
    try {
      const filePath = path.join(__dirname, '..', 'images', fileName);
      await fs.unlink(filePath);
      console.log(`🗑️ Удалено: ${fileName}`);
    } catch (err) {
      console.error(`⚠️ Не удалось удалить ${fileName}:`, err.message);
    }
  }
}

module.exports = deleteImages;
