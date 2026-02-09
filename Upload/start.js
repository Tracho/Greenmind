require('dotenv').config();
const path = require('path');
const DBjson = require("./json.json");
const downloadImage = require("./modules/downloadImg.js");
const uploadImg = require("./modules/uploadImg.js");
const addProducts = require("./modules/addProducts.js");
const addCategory = require("./modules/addCategory.js"); // Не забудьте создать этот файл
const deleteImages = require("./modules/deleteImages.js");

const STRAPI_HOST = process.env.STRAPI_HOST;
const API_KEY = process.env.API_UPLOAD;

async function main() {
  // Итерируемся по всем товарам в JSON (пока для примера берем первый или используйте цикл for...of)
  for (const productData of DBjson) {


    // const productData = DBjson[0];

    console.log(`🚀 Начинаем обработку: ${productData.title}`);

    // 1. Скачиваем картинки локально
    const arrNameImg = await downloadImage(productData.images);

    // 2. Загружаем картинки в Strapi и получаем их ID
    const uploadedImgIds = [];
    for (const fileName of arrNameImg) {
      const fullPath = path.join(__dirname, "images", fileName);
      const id = await uploadImg({
        filePath: fullPath,
        API_KEY: API_KEY,
        HOST: STRAPI_HOST
      });
      if (id) uploadedImgIds.push(id);
    }
    console.log("✅ Картинки загружены, ID:", uploadedImgIds);

    // 3. Обрабатываем категории (Бренд, Цвет и т.д.)
    // Создаем объект со связями
    console.log("‼️ Обработка категорий ‼️");
    const categoryConnections = {
      brand: await addCategory("brand", productData.brand, { API_KEY, HOST: STRAPI_HOST }),
      color: await addCategory("color", productData.characteristics.Color, { API_KEY, HOST: STRAPI_HOST }),
      material: await addCategory("material", productData.characteristics.Material, { API_KEY, HOST: STRAPI_HOST }),
      style: await addCategory("style", productData.characteristics.Style, { API_KEY, HOST: STRAPI_HOST }),
      special_feature: await addCategory("specialfeature", productData.characteristics.Special_Feature, { API_KEY, HOST: STRAPI_HOST }),
    };
    console.log("✅ ID Категорий:", categoryConnections)

    // 4. Создаем финальный продукт
    console.log("‼️ Создание продукта в Strapi ‼️");
    const productId = await addProducts(
      productData,
      uploadedImgIds,
      categoryConnections, // Передаем найденные ID категорий
      {
        API_KEY: API_KEY,
        HOST: STRAPI_HOST
      }
    );

    if (productId) {
      console.log("🏁 Товар готов!");
      // Удаляем только те картинки, которые скачали для этого товара
      await deleteImages(arrNameImg);
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

main().catch(err => console.error("🛑 Глобальная ошибка:", err));
