import asyncHandler from '@/shared/async-handler';
import { type ReqParamsId } from '@/shared/query-param.validation';
import sendResponse from '@/shared/send-response';
import {
  advertisementZodSchema,
  carouselBannerKeys,
  SaveCarouselDto,
  SavePopupBannerDto,
  SaveStreamBannerDto,
} from './advertisement.dto';
import { advertisementService } from './advertisement.service';

const upsertCarousel = asyncHandler(async (req, res) => {
  const payload = req.body as SaveCarouselDto;
  const files = req.files as {
    [k: string]: Express.Multer.File[];
  };
  for (const key of carouselBannerKeys) {
    if (files[key] && files[key].length > 0) {
      payload[key] = files[key][0]?.filename;
    } else if (typeof payload[key] === 'string') {
      payload[key] = payload[key];
    } else {
      payload[key] = null;
    }
  }
  await advertisementZodSchema.saveCarouselBanner.parseAsync(payload);
  const result = await advertisementService.upsertCarousel(payload);
  sendResponse(res, { data: result });
});

const upsertPopupBanner = asyncHandler(async (req, res) => {
  const payload = req.body as SavePopupBannerDto;
  if (req.file) {
    payload.popupBanner = req.file.filename;
  } else if (typeof payload.popupBanner === 'string') {
    payload.popupBanner = payload.popupBanner;
  } else {
    payload.popupBanner = null;
  }
  if (!payload.popupBannerUrl) {
    payload.popupBannerUrl = null;
  }
  await advertisementZodSchema.savePopupBanner.parseAsync(payload);
  const result = await advertisementService.upsertPopupBanner(payload);
  sendResponse(res, { data: result });
});

const upsertStreamingBanner = asyncHandler(async (req, res) => {
  const payload = req.body as SaveStreamBannerDto;
  if (req.file) {
    payload.streamBanner = req.file.filename;
  } else if (typeof payload.streamBanner === 'string') {
    payload.streamBanner = payload.streamBanner;
  } else {
    payload.streamBanner = null;
  }
  if (!payload.streamBannerUrl) {
    payload.streamBannerUrl = null;
  }
  await advertisementZodSchema.saveStreamBanner.parseAsync(payload);
  const result = await advertisementService.upsertStreamingBanner(payload);
  sendResponse(res, { data: result });
});

const find = asyncHandler(async (req, res) => {
  const { id } = req.params as ReqParamsId;
  const result = await advertisementService.find(id);
  sendResponse(res, { data: result });
});

export const advertisementController = {
  upsertCarousel,
  upsertPopupBanner,
  upsertStreamingBanner,
  find,
};
