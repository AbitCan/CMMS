import type { RequestHandler } from "express";
import { AppError } from "../../common/errors/AppError";
import { assetService } from "./asset.service";

const parsePositiveIntegerId = (value: string | string[] | undefined): number => {
  if (typeof value !== "string") {
    throw new AppError("Asset id must be a positive integer.", {
      statusCode: 400,
      errorCode: "INVALID_ASSET_ID",
      details: {
        id: value ?? null,
      },
    });
  }

  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("Asset id must be a positive integer.", {
      statusCode: 400,
      errorCode: "INVALID_ASSET_ID",
      details: {
        id: value,
      },
    });
  }

  return id;
};

export const assetController = {
  getAssets: (async (_req, res) => {
    const assets = await assetService.getAssets();

    res.status(200).json({
      status: "success",
      data: assets,
    });
  }) satisfies RequestHandler,

  getAssetById: (async (req, res) => {
    const id = parsePositiveIntegerId(req.params.id);
    const asset = await assetService.getAssetById(id);

    res.status(200).json({
      status: "success",
      data: asset,
    });
  }) satisfies RequestHandler,
};
