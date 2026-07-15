import { prisma } from "../../config/prisma";

const assetWithCountsSelect = {
  id: true,
  name: true,
  model: true,
  location: true,
  totalOperatingHours: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  _count: {
    select: {
      assetParts: true,
    },
  },
};

export const assetRepository = {
  findAll() {
    return prisma.asset.findMany({
      orderBy: {
        id: "asc",
      },
      select: assetWithCountsSelect,
    });
  },

  findById(id: number) {
    return prisma.asset.findUnique({
      where: {
        id,
      },
      select: assetWithCountsSelect,
    });
  },
};
