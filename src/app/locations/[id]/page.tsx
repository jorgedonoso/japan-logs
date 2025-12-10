import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../../generated/prisma/client";
import { env } from "prisma/config";

// TODO: Move to helper.
const db = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: env("DATABASE_URL") }),
});

export async function generateStaticParams() {
  const locations = await db.location.findMany();

  return locations.map((loc) => ({
    id: loc.id,
  }));
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const location = await getLocation((await params).id);

  if (!location) return <div>Location not found</div>;

  return (
    <div>
      <h1>{location.id}</h1>
      <p>{location.name}</p>
    </div>
  );
}

async function getLocation(id: string) {
  return db.location.findUnique({
    where: { id },
  });
}
