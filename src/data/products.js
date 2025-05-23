// src/data/products.js
// Data produk supermarket dummy
export const dummyProducts = [
  {
    id: 1,
    name: "Beras Premium 5kg",
    category: "Bahan Pokok",
    price: 69500,
    discountPrice: 62000,
    rating: 4.8,
    reviewCount: 235,
    image:
      "https://plus.unsplash.com/premium_photo-1723925093264-40b6b957c44d?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNewArrival: false,
    stock: 50,
    unit: "karung",
  },
  {
    id: 2,
    name: "Minyak Goreng 2L",
    category: "Bahan Pokok",
    price: 38000,
    discountPrice: 34500,
    rating: 4.7,
    reviewCount: 186,
    image:
      "https://ik.imagekit.io/j4eizgagj/Cadbury%20Dairy%20Milk%20Cokelat%20Buy%202%20Get%201.jpg?updatedAt=1738334778465",
    isNewArrival: false,
    stock: 75,
    unit: "botol",
  },
  {
    id: 3,
    name: "Telur Ayam 1kg",
    category: "Bahan Pokok",
    price: 29000,
    discountPrice: null,
    rating: 4.5,
    reviewCount: 120,
    image: "/images/supermarket/silverquin.jpg",
    isNewArrival: false,
    stock: 60,
    unit: "kg",
  },
  {
    id: 4,
    name: "Susu UHT Full Cream 1L",
    category: "Susu & Olahan",
    price: 18500,
    discountPrice: 16000,
    rating: 4.6,
    reviewCount: 98,
    image: "/api/placeholder/500/500",
    isNewArrival: true,
    stock: 45,
    unit: "kotak",
  },
  {
    id: 5,
    name: "Apel Fuji Premium 1kg",
    category: "Buah & Sayur",
    price: 45000,
    discountPrice: 39000,
    rating: 4.4,
    reviewCount: 78,
    image: "/api/placeholder/500/500",
    isNewArrival: false,
    stock: 30,
    unit: "kg",
  },
  {
    id: 6,
    name: "Sayur Bayam Organik 250gr",
    category: "Buah & Sayur",
    price: 12500,
    discountPrice: null,
    rating: 4.3,
    reviewCount: 56,
    image: "/api/placeholder/500/500",
    isNewArrival: true,
    stock: 20,
    unit: "ikat",
  },
  {
    id: 7,
    name: "Daging Sapi Giling 500gr lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    category: "Daging & Seafood",
    price: 75000,
    discountPrice: 69000,
    rating: 4.7,
    reviewCount: 65,
    image: "/api/placeholder/500/500",
    isNewArrival: false,
    stock: 25,
    unit: "pack",
  },
  {
    id: 8,
    name: "Udang Segar 500gr",
    category: "Daging & Seafood",
    price: 89000,
    discountPrice: null,
    rating: 4.8,
    reviewCount: 42,
    image: "/api/placeholder/500/500",
    isNewArrival: true,
    stock: 15,
    unit: "pack",
  },
  {
    id: 9,
    name: "Mie Instan Ayam Bawang (1 dus)",
    category: "Makanan Instan",
    price: 110000,
    discountPrice: 98000,
    rating: 4.6,
    reviewCount: 210,
    image: "/api/placeholder/500/500",
    isNewArrival: false,
    stock: 40,
    unit: "dus",
  },
  {
    id: 10,
    name: "Sabun Mandi 450mL",
    category: "Perawatan Tubuh",
    price: 32500,
    discountPrice: 28000,
    rating: 4.5,
    reviewCount: 95,
    image: "/api/placeholder/500/500",
    isNewArrival: false,
    stock: 55,
    unit: "botol",
  },
  {
    id: 11,
    name: "Pasta Gigi Whitening 190gr",
    category: "Perawatan Tubuh",
    price: 24500,
    discountPrice: 22000,
    rating: 4.4,
    reviewCount: 87,
    image: "/api/placeholder/500/500",
    isNewArrival: false,
    stock: 65,
    unit: "tube",
  },
  {
    id: 12,
    name: "Deterjen Bubuk 1.8kg",
    category: "Kebersihan",
    price: 53000,
    discountPrice: 48500,
    rating: 4.7,
    reviewCount: 154,
    image: "/api/placeholder/500/500",
    isNewArrival: false,
    stock: 70,
    unit: "pack",
  },
];

// Export list of all categories to make them easily accessible
export const productCategories = [
  "Semua",
  "Bahan Pokok",
  "Buah & Sayur",
  "Daging & Seafood",
  "Susu & Olahan",
  "Makanan Instan",
  "Perawatan Tubuh",
  "Kebersihan",
];
