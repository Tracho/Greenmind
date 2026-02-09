async function addProducts(product, idImg, categoryIds, { API_KEY, HOST }) {
  const slug = product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const URL = `${HOST}/api/products`;

  try {
    // 1. Проверяем, существует ли продукт с таким slug
    const checkRes = await fetch(`${URL}?filters[slug][$eq]=${slug}`, {
      headers: { "Authorization": `Bearer ${API_KEY}` }
    });
    const existing = await checkRes.json();

    if (existing.data && existing.data.length > 0) {
      const existingId = existing.data[0].id;
      console.log(`⏩ Продукт уже есть: ${product.title} (ID: ${existingId})`);
      return existingId;
    }

    // 2. Если нет — создаем новый
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        data: {
          title: product.title,
          slug: slug,
          description: product.about.join("\n\n"),
          price: Number(product.price.current),
          oldPrice: Number(product.price.original),
          discount: Number(product.price.discountPercent),
          discountboolean: Boolean(product.price.discountPercent > 0),
          likes: Number(Math.round(product.rating * 100)),
          sold: Number(product.reviewsCount),
          inStock: true,
          images: idImg, // Передаем массив ID картинок

          brand: categoryIds.brand,
          colors: categoryIds.color,
          materials: categoryIds.material,
          styles: categoryIds.style,
          specialfeatures: categoryIds.special_feature, 
        }
      })
    });

    const result = await res.json();

    if (res.ok) {
      console.log("✅ Продукт создан:", result.data.id);
      return result.data.id;
    } else {
      console.error("❌ Ошибка Strapi:", JSON.stringify(result.error, null, 2));
      return null;
    }
  } catch (err) {
    console.error("🚨 Ошибка сети:", err.message);
    return null;
  }
}

module.exports = addProducts;
