import { prisma } from "../../config/prisma";

const sparePartWithCountsSelect = {
  id: true,
  partName: true,
  stockQuantity: true,
  warehouseLocation: true,
  minStockLimit: true,
  createdAt: true,
  updatedAt: true,
  _count: {
    select: {
      assetParts: true,
    },
  },
};

export const sparePartRepository = {
  findAll() {
    return prisma.sparePart.findMany({
      orderBy: {
        id: "asc",
      },
      select: sparePartWithCountsSelect,
    });
  },

  findById(id: number) {
    return prisma.sparePart.findUnique({
      where: {
        id,
      },
      select: sparePartWithCountsSelect,
    });
  },
};
