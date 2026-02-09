async function addCategory(categoryName, value, { API_KEY, HOST }) {
  if (!value) return []; // Возвращаем пустой массив, если значения нет

  // 1. Разбиваем строку по запятой, убираем лишние пробелы и пустые элементы
  const values = String(value).split(',').map(v => v.trim()).filter(v => v.length > 0);
  
  const endpointName = categoryName.endsWith('s') ? categoryName : `${categoryName}s`;
  const endpoint = `${HOST}/api/${endpointName}`;

  // Функция для обработки одного значения
  const getSingleCategoryId = async (singleValue) => {
    try {
      // Поиск
      const checkRes = await fetch(`${endpoint}?filters[name][$eq]=${encodeURIComponent(singleValue)}`, {
        headers: { Authorization: `Bearer ${API_KEY}` }
      });
      const existing = await checkRes.json();
      const files = existing.data || existing;

      if (Array.isArray(files) && files.length > 0) {
        return files[0].id -1; // ❗ УБРАЛ -1, Strapi нужен реальный ID
      }

      // Создание
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`
        },
        body: JSON.stringify({ data: { name: singleValue } })
      });

      const result = await res.json();
      return result.data ? result.data.id -1 : null;
    } catch (err) {
      console.error(`❌ Ошибка внутри ${categoryName} для "${singleValue}":`, err.message);
      return null;
    }
  };

  // 2. Запускаем обработку всех значений параллельно
  const ids = await Promise.all(values.map(v => getSingleCategoryId(v)));
  
  // Возвращаем только валидные ID (без null)
  return ids.filter(id => id !== null);
}

module.exports = addCategory;
