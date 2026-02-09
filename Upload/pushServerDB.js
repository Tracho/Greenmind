const DBjson = require("./src/json.json");

// const URL = "http://localhost:1337/graphql";
const URL = "http://localhost:1337/api/products";
const StrapiURL = "http://localhost:1337"
// /api/products
// upload
// bf80e5d375e666fb87e03235357cb99710520abb50aef401412145fb9aa3c5614035e44bffcb308e01e459a91e5586eaa40f70c2058824f19d08b04fe31a0d01a76b54aaa79cc7b28fcd008b48e3e597c7cc18b3f750ff78b429aa782a24eca56cde2a4a34caa00fc57ca8c3ba194e6eb679a9725e1bbd08349a531ca949904f
const fs = require("fs");

async function uploadImage(filePath) {
  const form = new FormData();
  form.append("files", fs.createReadStream(filePath));
  const res = await fetch("http://localhost:1337/api/upload", {
    method: "POST",
    headers: {
      Authorization: "bf80e5d375e666fb87e03235357cb99710520abb50aef401412145fb9aa3c5614035e44bffcb308e01e459a91e5586eaa40f70c2058824f19d08b04fe31a0d01a76b54aaa79cc7b28fcd008b48e3e597c7cc18b3f750ff78b429aa782a24eca56cde2a4a34caa00fc57ca8c3ba194e6eb679a9725e1bbd08349a531ca949904f",
    },
    body: form,
  });

  const json = await res.json();
  console.log(json)
  return json[0]; // { id, url, ... }
}
// uploadImage("https://m.media-amazon.com/images/I/71UjhrOLt1L.jpg")
// uploadImage("C:/Users/user/Documents/work/TS/6479.jpg")


async function downloadImage(url, filename) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();

  fs.writeFileSync(filename, Buffer.from(buffer));
}
// downloadImage("http://localhost:1337/api/upload", "81O9s-xJgDL._AC_SL1500_.jpg") 


async function Brand(params) {
   let product = params[0];

  try {
    const res = await fetch(StrapiURL+'/api/brands', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "e99ce2d960d842d1472b57c7bc8971d262779b25b428c8dbb982770fee5e906d9fa130a6e43660bfb3042915c58169b5839cd2e0a427e7efcf11a6092eafbce7c71af37c6e33e959dcabf95e80e27797faa4953cdf94576bfca70f1478ef2017d5b5d11968b02f3d9dc070c91149fef5039e256bb905b548f673b077e0feba3f"
      },
      body: JSON.stringify({
        data: {
          name:product.brand
        }
      })
    });


    const result = await res.json();

    if (res.ok && !result.errors) {
      console.log("✅ Успех:", JSON.stringify(result.data, null, 2));
    } else {
      console.error("❌ Ошибка:", JSON.stringify(result.errors || result, null, 2));
    }
  } catch (err) {
    console.error("🚨 Ошибка сети:", err.message);
  }
}Brand(DBjson);

async function QQQ(products) {
  let product = products[0];

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "e99ce2d960d842d1472b57c7bc8971d262779b25b428c8dbb982770fee5e906d9fa130a6e43660bfb3042915c58169b5839cd2e0a427e7efcf11a6092eafbce7c71af37c6e33e959dcabf95e80e27797faa4953cdf94576bfca70f1478ef2017d5b5d11968b02f3d9dc070c91149fef5039e256bb905b548f673b077e0feba3f"
      },
      body: JSON.stringify({
        data: {
          title: product.title,
          slug: product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),

          description: product.about.join("\n\n"),

          price: Number(product.price.current),
          oldPrice: Number(product.price.original),
          discount: Number(product.price.discountPercent),
          discountboolean: Boolean(product.price.discountPercent > 0),

          likes: Number(Math.round(product.rating * 100)),
          sold: Number(product.reviewsCount),
          inStock: true,

          brand: {
            name: product.brand
          },
          colors: {
            name: product.characteristics.Color
          },
          styles: {
            name: product.characteristics.Style
          },
          materials: {
            name: product.characteristics.Material
          },
          specialfeatures: {
            name: product.characteristics.Special_Feature
          },

          imgjson: product.images, // 🔥 ВАЖНО
        }
      })
    });


    const result = await res.json();

    if (res.ok && !result.errors) {
      console.log("✅ Успех:", JSON.stringify(result.data, null, 2));
    } else {
      console.error("❌ Ошибка:", JSON.stringify(result.errors || result, null, 2));
    }
  } catch (err) {
    console.error("🚨 Ошибка сети:", err.message);
  }
}
// QQQ(DBjson);

async function createProductREST(products, imageIds) {
  let product = products[0];
  const res = await fetch("http://localhost:1337/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "e99ce2d960d842d1472b57c7bc8971d262779b25b428c8dbb982770fee5e906d9fa130a6e43660bfb3042915c58169b5839cd2e0a427e7efcf11a6092eafbce7c71af37c6e33e959dcabf95e80e27797faa4953cdf94576bfca70f1478ef2017d5b5d11968b02f3d9dc070c91149fef5039e256bb905b548f673b077e0feba3f",
    },
    body: JSON.stringify({
      data: {
        title: product.title,
        slug: product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),

        description: product.about.join("\n\n"),

        price: Number(product.price.current),
        oldPrice: Number(product.price.original),
        discount: Number(product.price.discountPercent),
        discountboolean: Boolean(product.price.discountPercent > 0),

        likes: Number(Math.round(product.rating * 100)),
        sold: Number(product.reviewsCount),
        inStock: true,

        // images: product.images, // 🔥 ВАЖНО
      }
    })
  });

  console.log(res)
  return res.json();
}
// createProductREST(DBjson)