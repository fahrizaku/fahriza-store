// File: src/app/api/products/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const productData = await request.json();

    // Validasi data
    if (!productData.name || !productData.category || !productData.price) {
      return NextResponse.json(
        { message: "Nama, kategori, dan harga produk wajib diisi" },
        { status: 400 }
      );
    }

    // Cek apakah kategori ada
    const categoryExists = await prisma.category.findFirst({
      where: { name: productData.category },
    });

    if (!categoryExists) {
      return NextResponse.json(
        { message: "Kategori tidak ditemukan" },
        { status: 400 }
      );
    }

    // Buat produk baru
    const newProduct = await prisma.product.create({
      data: productData,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Gagal menambahkan produk" },
      { status: 500 }
    );
  }
}
