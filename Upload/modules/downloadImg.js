const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

async function downloadImg(urls) {
  // 1. Создаем путь к папке (на уровень выше текущей)
  const dirPath = path.join(__dirname, '..', 'images');
  let arrNameImg = new Array();
  // 2. Проверяем/создаем папку
  if (!fs.existsSync(dirPath)) {
    await fsPromises.mkdir(dirPath, { recursive: true });
  }

  for (const url of urls) {
    try {
      // 3. Выделяем имя файла из URL (берем последнюю часть после /)
      const fileName = path.basename(new URL(url).pathname);
      const filePath = path.join(dirPath, fileName);

      // 4. Проверка: существует ли уже файл?
      if (fs.existsSync(filePath)) {
        console.log(`⏩ Пропущено: ${fileName} уже существует`);
        arrNameImg.push(fileName);
        continue;
      }

      // 5. Скачивание
      console.log(`⏳ Скачиваю: ${fileName}...`);
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });

      if (!res.ok) throw new Error(`Ошибка статуса: ${res.status}`);

      const buffer = await res.arrayBuffer();

      // 6. Сохранение
      await fsPromises.writeFile(filePath, Buffer.from(buffer));
      arrNameImg.push(fileName);
      console.log(`✅ Сохранено: ${fileName}`);

    } catch (err) {
      console.error(`❌ Ошибка при скачивании ${url}:`, err.message);
    }
  }

  return arrNameImg;
}

// Пример вызова:
// downloadImg(['https://example.com/photo.jpg']);


module.exports = downloadImg;