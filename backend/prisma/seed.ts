import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { AssetStatus, PrismaClient } from "../src/generated/prisma/client";

const databaseUrl = process.env["DATABASE_URL"];

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to run the Prisma seed script.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const assetSeed = {
  name: "Nordson Toz Boya Kabini",
  model: "Encore HD",
  location: "Toz Boya Hattı - Kabin 1",
  totalOperatingHours: 1250.5,
  status: AssetStatus.ACTIVE,
};

const sparePartSeeds = [
  {
    partName: "Hava Bıçağı Bloğu (PN:7034502)",
    stockQuantity: 2,
    warehouseLocation: "Ana Depo - Raf A3",
    minStockLimit: 1,
  },
  {
    partName: "Sıkıştırma Vanası",
    stockQuantity: 4,
    warehouseLocation: "Bakım Deposu - Raf B1",
    minStockLimit: 2,
  },
  {
    partName: "Kartuş Filtre",
    stockQuantity: 12,
    warehouseLocation: "Filtre Deposu - Raf F2",
    minStockLimit: 4,
  },
];

const assetPartSeeds = [
  {
    partName: "Hava Bıçağı Bloğu (PN:7034502)",
    componentLocation: "Kabin giriş hava bıçağı bölgesi",
    currentPartHours: 420.75,
    installedAt: new Date("2026-01-15T08:00:00.000Z"),
  },
  {
    partName: "Sıkıştırma Vanası",
    componentLocation: "Toz besleme hattı vana grubu",
    currentPartHours: 310.25,
    installedAt: new Date("2026-02-10T08:00:00.000Z"),
  },
  {
    partName: "Kartuş Filtre",
    componentLocation: "Kabin arka filtre modülü",
    currentPartHours: 185.5,
    installedAt: new Date("2026-03-05T08:00:00.000Z"),
  },
];

const maintenanceSteps = [
  {
    id: "grounding-line-check",
    label: "Topraklama hattı kontrolü",
    type: "boolean",
    required: true,
    photoRequired: true,
  },
  {
    id: "hanger-dirt-level",
    label: "Askılar hafif kirli mi?",
    type: "selection",
    required: true,
    options: ["Temiz", "Hafif kirli", "Çok kirli"],
  },
  {
    id: "compressor-pressure",
    label: "Kompresör basınç değeri",
    type: "numeric",
    required: true,
    unit: "bar",
  },
  {
    id: "filter-deformation-check",
    label: "Filtrelerde deformasyon var mı?",
    type: "boolean",
    required: true,
    photoRequired: true,
  },
  {
    id: "booth-paint-buildup-check",
    label: "Kabin içinde boya birikmesi var mı?",
    type: "boolean",
    required: true,
    photoRequired: true,
  },
];

async function main(): Promise<void> {
  const existingAsset = await prisma.asset.findFirst({
    where: {
      name: assetSeed.name,
      model: assetSeed.model,
      location: assetSeed.location,
    },
  });

  const asset = existingAsset
    ? await prisma.asset.update({
        where: { id: existingAsset.id },
        data: assetSeed,
      })
    : await prisma.asset.create({
        data: assetSeed,
      });

  const spareParts = await Promise.all(
    sparePartSeeds.map(async (partSeed) => {
      const existingPart = await prisma.sparePart.findFirst({
        where: {
          partName: partSeed.partName,
        },
      });

      return existingPart
        ? prisma.sparePart.update({
            where: { id: existingPart.id },
            data: partSeed,
          })
        : prisma.sparePart.create({
            data: partSeed,
          });
    }),
  );

  const partIds = spareParts.map((part) => part.id);

  await prisma.assetPart.deleteMany({
    where: {
      assetId: asset.id,
      partId: {
        in: partIds,
      },
    },
  });

  await prisma.assetPart.createMany({
    data: assetPartSeeds.map((assetPartSeed) => {
      const part = spareParts.find(
        (sparePart) => sparePart.partName === assetPartSeed.partName,
      );

      if (!part) {
        throw new Error(`Missing spare part for seed data: ${assetPartSeed.partName}`);
      }

      return {
        assetId: asset.id,
        partId: part.id,
        usageQuantity: 1,
        componentLocation: assetPartSeed.componentLocation,
        currentPartHours: assetPartSeed.currentPartHours,
        installedAt: assetPartSeed.installedAt,
      };
    }),
  });

  const templateData = {
    assetId: asset.id,
    periodDays: 30,
    targetHours: 250,
    steps: maintenanceSteps,
    isActive: true,
  };

  const existingTemplate = await prisma.maintenanceTemplate.findFirst({
    where: {
      assetId: asset.id,
      periodDays: templateData.periodDays,
      isActive: templateData.isActive,
    },
  });

  if (existingTemplate) {
    await prisma.maintenanceTemplate.update({
      where: { id: existingTemplate.id },
      data: templateData,
    });
  } else {
    await prisma.maintenanceTemplate.create({
      data: templateData,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Prisma seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });