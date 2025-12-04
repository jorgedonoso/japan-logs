import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { env } from "prisma/config";

const db = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: env("DATABASE_URL"),
  }),
});

export default async function Home() {
  const prefectures = await db.prefecture.findMany({
    include: { region: true },
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Region</th>
            <th>Prefecture</th>
          </tr>
        </thead>
        <tbody>
          {prefectures.map((p) => (
            <tr key={p.id}>
              <td>{p.region.name}</td>
              <td>{p.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
