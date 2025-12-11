import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Link from "next/link";
import { env } from "prisma/config";

const db = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: env("DATABASE_URL"),
  }),
});

export default async function Home() {
  const locations = await db.location.findMany();

  return (
    <div>
      {locations.map((l) => (
        <div key={l.id}>
          <Link href={`/locations/${l.id}`}>{l.name}</Link>
        </div>
      ))}
    </div>
  );
}
