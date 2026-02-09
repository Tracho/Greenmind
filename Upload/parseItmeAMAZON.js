(() => {
  // ===== Название =====
  const title =
    document.querySelector("#productTitle")?.innerText.trim() || null;

  // ===== About this item =====
  const about = Array.from(
    document.querySelectorAll("#feature-bullets li span.a-list-item")
  )
    .map(el => el.innerText.trim())
    .filter(Boolean);

  // ===== Характеристики =====
  const characteristics = {};
  document
    .querySelectorAll("table.a-normal tbody tr")
    .forEach(row => {
      const key = row.querySelector("td span.a-text-bold")?.innerText.trim();
      const value = row.querySelector("td span.po-break-word")?.innerText.trim();
      if (key && value) {
        characteristics[key] = value;
      }
    });

  // ===== Бренд =====
  const brandText =
    document.querySelector("#bylineInfo")?.innerText || "";
  const brand = brandText
    .replace("Visit the", "")
    .replace("Store", "")
    .trim() || null;

  // ===== Рейтинг =====
  const rating =
    document.querySelector(
      ".mvt-cm-cr-review-stars-mini-popover span.a-size-small"
    )?.innerText.trim() || null;

  // ===== Количество отзывов =====
  const reviewsRaw =
    document.querySelector("#acrCustomerReviewText")?.innerText || "";
  const reviewsCount = reviewsRaw
    ? Number(reviewsRaw.replace(/[^\d]/g, ""))
    : null;

  // ===== ЦЕНЫ =====

  // Цена со скидкой
  const priceWhole =
    document.querySelector(".priceToPay .a-price-whole")?.innerText || "";
  const priceFraction =
    document.querySelector(".priceToPay .a-price-fraction")?.innerText || "";
  const priceCurrency =
    document.querySelector(".priceToPay .a-price-symbol")?.innerText || "$";

  const priceDiscounted =
    priceWhole && priceFraction
      ? Number(`${priceWhole.replace(/\D/g, "")}.${priceFraction}`)
      : null;

  // Процент скидки
  const discountPercentRaw =
    document.querySelector(".savingPriceOverride")?.innerText || null;
  const discountPercent = discountPercentRaw
    ? Number(discountPercentRaw.replace(/[^\d]/g, ""))
    : null;

  // Полный текст (fallback)
  const priceScreenText =
    document.querySelector(".aok-offscreen")?.innerText.trim() || null;

  // Цена без скидки (пытаемся восстановить)
  let priceOriginal = null;
  if (priceDiscounted && discountPercent) {
    priceOriginal = Number(
      (priceDiscounted / (1 - discountPercent / 100)).toFixed(2)
    );
  }

  // ===== Финальный объект =====
  const result = {
    title,
    brand,
    price: {
      current: priceDiscounted,
      original: priceOriginal,
      currency: priceCurrency,
      discountPercent,
      rawText: priceScreenText
    },
    rating: rating ? Number(rating) : null,
    reviewsCount,
    about,
    characteristics,
    images: [] // заглушка
  };

  console.log("📦 Parsed product JSON:");
  console.log(JSON.stringify(result, null, 2));

  return result;
})();


