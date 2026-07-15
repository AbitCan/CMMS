import type { RequestHandler } from "express";
import { AppError } from "../../common/errors/AppError";
import { assetPartService } from "./assetPart.service";

const parsePositiveIntegerId = (value: string | string[] | undefined): number => {
  if (typeof value !== "string") {
    throw new AppError("Asset part id must be a positive integer.", {
      statusCode: 400,
      errorCode: "INVALID_ASSET_PART_ID",
      details: {
        id: value ?? null,
      },
    });
  }

  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("Asset part id must be a positive integer.", {
      statusCode: 400,
      errorCode: "INVALID_ASSET_PART_ID",
      details: {
        id: value,
      },
    });
  }

  return id;
};

export const assetPartController = {
  getAssetParts: (async (_req, res) => {
    const assetParts = await assetPartService.getAssetParts();

    res.status(200).json({
      status: "success",
      data: assetParts,
    });
  }) satisfies RequestHandler,

  getAssetPartById: (async (req, res) => {
    const id = parsePositiveIntegerId(req.params.id);
    const assetPart = await assetPartService.getAssetPartById(id);

    res.status(200).json({
      status: "success",
      data: assetPart,
    });
  }) satisfies RequestHandler,
};
