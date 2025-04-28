//file location: /src/api/categories/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name } = await request.json();

    // Validasi
    if (!name || name.trim() === "") {
      return NextResponse.json(
        { message: "Nama kategori wajib diisi" },
        { status: 400 }
      );
    }

    // Cek apakah kategori sudah ada
    const existingCategory = await prisma.category.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: "Kategori dengan nama ini sudah ada" },
        { status: 400 }
      );
    }

    // Buat kategori baru
    const newCategory = await prisma.category.create({
      data: { name },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { message: "Gagal menambahkan kategori" },
      { status: 500 }
    );
  }
}
