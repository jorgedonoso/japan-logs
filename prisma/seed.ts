import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import { env } from "prisma/config";

const db = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: env("DATABASE_URL"),
  }),
});

// Geographical order.
const prefectures = [
  { name: "Hokkaido" },
  { name: "Aomori" },
  { name: "Iwate" },
  { name: "Miyagi" },
  { name: "Akita" },
  { name: "Yamagata" },
  { name: "Fukushima" },
  { name: "Ibaraki" },
  { name: "Tochigi" },
  { name: "Gunma" },
  { name: "Saitama" },
  { name: "Chiba" },
  { name: "Tokyo" },
  { name: "Kanagawa" },
  { name: "Niigata" },
  { name: "Toyama" },
  { name: "Ishikawa" },
  { name: "Fukui" },
  { name: "Yamanashi" },
  { name: "Nagano" },
  { name: "Gifu" },
  { name: "Shizuoka" },
  { name: "Aichi" },
  { name: "Mie" },
  { name: "Shiga" },
  { name: "Kyoto" },
  { name: "Osaka" },
  { name: "Hyogo" },
  { name: "Nara" },
  { name: "Wakayama" },
  { name: "Tottori" },
  { name: "Shimane" },
  { name: "Okayama" },
  { name: "Hiroshima" },
  { name: "Yamaguchi" },
  { name: "Tokushima" },
  { name: "Kagawa" },
  { name: "Ehime" },
  { name: "Kochi" },
  { name: "Fukuoka" },
  { name: "Saga" },
  { name: "Nagasaki" },
  { name: "Kumamoto" },
  { name: "Oita" },
  { name: "Miyazaki" },
  { name: "Kagoshima" },
  { name: "Okinawa" },
];

async function main() {
  await db.prefectures.deleteMany();

  await db.prefectures.createMany({
    data: prefectures,
  });

  console.log("Database seed completed.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await db.$disconnect();
  });
