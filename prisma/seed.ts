import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import { env } from "prisma/config";

const db = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: env("DATABASE_URL"),
  }),
});

const regions = [
  { name: "Hokkaido", prefectures: ["Hokkaido"] },
  {
    name: "Tohoku",
    prefectures: [
      "Aomori",
      "Iwate",
      "Miyagi",
      "Akita",
      "Yamagata",
      "Fukushima",
    ],
  },
  {
    name: "Kanto",
    prefectures: [
      "Ibaraki",
      "Tochigi",
      "Gunma",
      "Saitama",
      "Chiba",
      "Tokyo",
      "Kanagawa",
    ],
  },
  {
    name: "Chubu",
    prefectures: [
      "Niigata",
      "Toyama",
      "Ishikawa",
      "Fukui",
      "Yamanashi",
      "Nagano",
      "Gifu",
      "Shizuoka",
      "Aichi",
      "Mie",
    ],
  },
  {
    name: "Kansai",
    prefectures: ["Shiga", "Kyoto", "Osaka", "Hyogo", "Nara", "Wakayama"],
  },
  {
    name: "Chugoku",
    prefectures: ["Tottori", "Shimane", "Okayama", "Hiroshima", "Yamaguchi"],
  },
  { name: "Shikoku", prefectures: ["Tokushima", "Kagawa", "Ehime", "Kochi"] },
  {
    name: "Kyushu",
    prefectures: [
      "Fukuoka",
      "Saga",
      "Nagasaki",
      "Kumamoto",
      "Oita",
      "Miyazaki",
      "Kagoshima",
    ],
  },
  {
    name: "Okinawa",
    prefectures: ["Okinawa"],
  },
];

const locations = [
  { name: "Tokyo Skytree", prefecture: "Tokyo" },
  { name: "Mt. Inasa", prefecture: "Nagasaki" },
  { name: "Sapporo Tower", prefecture: "Hokkaido" },
];

async function main() {
  await db.location.deleteMany();
  await db.prefecture.deleteMany();
  await db.region.deleteMany();

  for (const region of regions) {
    const createdRegion = await db.region.create({
      data: {
        name: region.name,
      },
    });

    for (const prefName of region.prefectures) {
      await db.prefecture.create({
        data: {
          name: prefName,
          regionId: createdRegion.id,
        },
      });
    }
  }

  for (const location of locations) {
    const asdf = await db.prefecture.findFirst({
      where: { name: location.prefecture },
    });

    await db.location.create({
      data: {
        name: location.name,
        prefectureId: asdf?.id ?? 0,
      },
    });
  }

  console.log("Database seed completed.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await db.$disconnect();
  });
