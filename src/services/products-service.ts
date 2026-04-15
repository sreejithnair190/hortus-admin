"use server";

export type ProductStatus = "Active" | "Soft Deleted";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  status: ProductStatus;
  imageUrl: string;
  imageAlt: string;
  description?: string;
  seasons?: string[];
  classification?: string[];
};

export type ProductInsights = {
  totalItems: number;
  avgMargin: string;
  lowStockCount: number;
  unitsSold: string;
};

export type ProductsData = {
  products: Product[];
  insights: ProductInsights;
};

// Initial data representing what would be in a DB
let mockProducts: Product[] = [
  {
    id: "1",
    name: "Monstera Deliciosa",
    category: "Tropicals",
    price: 2499,
    stock: 42,
    rating: 4.5,
    status: "Active",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCefCIrjQfuKJeJZGU14MmBLlrnp4ts1HhpTITsb_SPJBTcQON62q1FD0bDbAiung3nhp6Evl1T7AH61npnHflnTvNP7j6Az8sATq6VKtcEVZkEPYiq0-dBT3AI_zILUKs_ZYv0yiVfvYgJLbTpAksUsKfy6JcHVesq5R0oXTmgxaDxZcs0P_zmesIq8-0X7LN1LKtvTHgpDfhK01wrydPuIum7ERizSFyA5oWhZrkdg5kxdaPDJ6c7WsVPVISYhJ8GlliMk1qFbUP2",
    imageAlt: "Close-up of a lush Monstera Deliciosa leaf",
    description: "The Monstera deliciosa, also known as the Swiss cheese plant, is a species of flowering plant native to tropical forests of southern Mexico.",
    seasons: ["Spring", "Summer"],
    classification: ["Indoor", "Rare Hybrid"]
  },
  {
    id: "2",
    name: "Snake Plant Laurentii",
    category: "Succulents",
    price: 850,
    stock: 5,
    rating: 4.0,
    status: "Active",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZCcs182GMcjgHWarv-920ayGx1Az01Z8gu5k9Xa8aFC1C0wyM5Rktwl_g-X5rtVjdGmPGfcqzkeH-f_ykWZfB0FsrflGfhRPeVuLGXhZrlv_01xHyX8hBneyRjtGsOYwnora-FlqRtXaGaoBuprXqBhbyAY_UxyOiL0sV4-AYDSgk8ZxjrBK1RaVPANVftq_j3wIUE23iqgCYiieQS6NTavTlRDi0TE4SUyY1rzjOf8aOiEwF_Acdmhzw24wwnMXXkwM2C3KvAskV",
    imageAlt: "Slender Snake Plant against a clean white background",
    description: "Sansevieria trifasciata 'Laurentii' is a popular, hardy indoor plant with stiff, sword-like leaves.",
    seasons: ["All-year"],
    classification: ["Indoor", "Pet Friendly"]
  },
  {
    id: "3",
    name: "Fiddle Leaf Fig",
    category: "Indoor Trees",
    price: 4200,
    stock: 0,
    rating: 3.0,
    status: "Soft Deleted",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBga05MiPRvwKQFjHvbqJkittc9NoIWR_4UVYEUUlnhhK5mM4kPKPOHxu8NIowg9rAEeOuESXlRbsVDDFtuNxrSuBZxuHtVasX6WCoSMr4WHhTFS_Q4gD1qZc-ssldxYpXOE0VXjaTk5t1MqWYb-X9JrgK78-20UXO0MLWlpQ307qtBJOlSbfHDKtrdrf0HF-zUyvkfIzwggQxE0ASJevw61m4D5eHkV6VHyQgIaAzKsEDjCucDdGWq4ev0gI89wjk2hRrKiGJFCDuC",
    imageAlt: "Delicate fiddle leaf fig tree",
    description: "Ficus lyrata, commonly known as the fiddle-leaf fig, is a species of flowering plant in the mulberry and fig family Moraceae.",
    seasons: ["Spring"],
    classification: ["Indoor"]
  },
  {
    id: "4",
    name: "Anthurium Red",
    category: "Flowering",
    price: 1150,
    stock: 18,
    rating: 5.0,
    status: "Active",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyXi_9wSHeAzgqk8RqsPJPWA4a94izwVTa0TE-ZhnEhUY1wjQHMNolnO9X70hUutWhCRT4rnk_eZlQrVhvAxVUFXC1cTAmvJ-7sGiu9MQNl6bzTfx-Cv5-J81cmyYQVPmHgyBFhdjQ22YEzPiixW52MxjGO1L3_Bt307ICuf3g7vfz_hb-2_47Eh03BbpxTHURc25MJaoLFCx-FusvphNYl8btc5DYSsMgcbhK1pugot5UaebDKS0z1RZXlzd9HQ94zB1Cj7EL3Sc0",
    imageAlt: "Vibrant red Anthurium flowers",
    description: "Anthurium is a genus of about 1,000 species of flowering plants, the largest genus of the arum family, Araceae.",
    seasons: ["Winter", "Spring"],
    classification: ["Indoor", "Outdoor"]
  },
  {
    id: "5",
    name: "String of Pearls",
    category: "Succulents",
    price: 550,
    stock: 65,
    rating: 3.5,
    status: "Active",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbRj1vBBY8zAzCipwJb5n0nYf_nw1nrtCk5gUZ69dXPg8PnmFqJ2FF65gJ2WawzakV7FdoDQjQ2foMKPK7uS0GDsvExQ078f977GbOqoC7u4sYzCUtQ7EOtbeQVy66BYlFrs_Kg7M5Rk-YZ1tFuHYd4bxgE2ErxoUP5vRE1ckA_0nkNnEBn4-PPAnRWngvjYdUlOVivRI7AWG1dmy-MtMlaCOIKIZLMgefo6ryEt1kUDLvSYrO67WCzPfclmaaMAcyuCgUrElXze2S",
    imageAlt: "Cascading String of Pearls plant",
    description: "Curio rowleyanus, syn. Senecio rowleyanus, is a flowering plant in the daisy family Asteraceae.",
    seasons: ["Summer"],
    classification: ["Indoor", "Low Light"]
  },
];

export async function fetchProductsData(): Promise<ProductsData> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    products: mockProducts,
    insights: {
      totalItems: mockProducts.length,
      avgMargin: "32.4%",
      lowStockCount: mockProducts.filter(p => p.stock < 10).length,
      unitsSold: "2.1k",
    },
  };
}

export async function addProduct(product: Omit<Product, "id" | "rating" | "status">): Promise<Product> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  const newProduct: Product = {
    ...product,
    id: Math.random().toString(36).substr(2, 9),
    rating: 0,
    status: "Active",
  };
  
  mockProducts.push(newProduct);
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  const index = mockProducts.findIndex(p => p.id === id);
  if (index === -1) throw new Error("Product not found");
  
  mockProducts[index] = { ...mockProducts[index], ...updates };
  return mockProducts[index];
}
