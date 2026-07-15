import type { RequestHandler } from "express";
import { AppError } from "../../common/errors/AppError";
import { sparePartService } from "./sparePart.service";

const parsePositiveIntegerId = (value: string | string[] | undefined): number => {
  if (typeof value !== "string") {
    throw new AppError("Spare part id must be a positive integer.", {
      statusCode: 400,
      errorCode: "INVALID_SPARE_PART_ID",
      details: {
        id: value ?? null,
      },
    });
  }

  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("Spare part id must be a positive integer.", {
      statusCode: 400,
      errorCode: "INVALID_SPARE_PART_ID",
      details: {
        id: value,
      },
    });
  }

  return id;
};

export const sparePartController = {
  getSpareParts: (async (_req, res) => {
    const spareParts = await sparePartService.getSpareParts();

    res.status(200).json({
      status: "success",
      data: spareParts,
    });
  }) satisfies RequestHandler,

  getSparePartById: (async (req, res) => {
    const id = parsePositiveIntegerId(req.params.id);
    const sparePart = await sparePartService.getSparePartById(id);

    res.status(200).json({
      status: "success",
      data: sparePart,
    });
  }) satisfies RequestHandler,
};
