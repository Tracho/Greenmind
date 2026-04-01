(async () => {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // 1. Клик по "Click to see full view"
  const openFullViewBtn = document.querySelector("#canvasCaption a");
  if (openFullViewBtn) {
    openFullViewBtn.click();
    await delay(1500); // Ждем открытия модального окна
  }

  // 2. Сбор ссылок на изображения
  const images = [];
  const thumbs = document.querySelectorAll(".ivThumb");

  if (thumbs.length > 0) {
    for (const thumb of thumbs) {
      thumb.click(); // Кликаем по миниатюре
      await delay(800); // Ждем подгрузки основной картинки

      const fullImg = document.querySelector("img.fullscreen");
      if (fullImg && fullImg.src) {
        images.push(fullImg.src);
      }
    }
  } else {
    // Если модалка не открылась, пробуем взять хотя бы главное фото
    const mainImg = document.querySelector("#landingImage")?.src;
    if (mainImg) images.push(mainImg);
  }

  // ===== Парсинг остальных данных (ваш исходный код) =====
  const title = document.querySelector("#productTitle")?.innerText.trim() || null;

  const about = Array.from(document.querySelectorAll("#feature-bullets li span.a-list-item"))
    .map(el => el.innerText.trim())
    .filter(Boolean);

  const characteristics = {};
  document.querySelectorAll("table.a-normal tbody tr").forEach(row => {
    const key = row.querySelector("td span.a-text-bold")?.innerText.trim();
    const value = row.querySelector("td span.po-break-word")?.innerText.trim();
    if (key && value) characteristics[key] = value;
  });

  const brandText = document.querySelector("#bylineInfo")?.innerText || "";
  const brand = brandText.replace("Visit the", "").replace("Store", "").trim() || null;

  const rating = document.querySelector(".mvt-cm-cr-review-stars-mini-popover span.a-size-small")?.innerText.trim() || null;

  const reviewsRaw = document.querySelector("#acrCustomerReviewText")?.innerText || "";
  const reviewsCount = reviewsRaw ? Number(reviewsRaw.replace(/[^\d]/g, "")) : null;

  const priceWhole = document.querySelector(".priceToPay .a-price-whole")?.innerText || "";
  const priceFraction = document.querySelector(".priceToPay .a-price-fraction")?.innerText || "";
  const priceCurrency = document.querySelector(".priceToPay .a-price-symbol")?.innerText || "$";

  const priceDiscounted = priceWhole && priceFraction
    ? Number(`${priceWhole.replace(/\D/g, "")}.${priceFraction}`)
    : null;

  const discountPercentRaw = document.querySelector(".savingPriceOverride")?.innerText || null;
  const discountPercent = discountPercentRaw ? Number(discountPercentRaw.replace(/[^\d]/g, "")) : null;

  let priceOriginal = null;
  if (priceDiscounted && discountPercent) {
    priceOriginal = Number((priceDiscounted / (1 - discountPercent / 100)).toFixed(2));
  }

  const result = {
    title,
    brand,
    price: {
      current: priceDiscounted,
      original: priceOriginal,
      currency: priceCurrency,
      discountPercent,
    },
    rating: rating ? Number(rating) : null,
    reviewsCount,
    about,
    characteristics,
    images: [...new Set(images)] // Убираем дубликаты
  };

  console.log("📦 Parsed product JSON with Images:");
  console.log(JSON.stringify(result, null, 2));

  return result;
})();
