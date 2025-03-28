import asyncHandler from '@/shared/async-handler';
import { type ReqParamsId } from '@/shared/query-param.validation';
import sendResponse from '@/shared/send-response';
import { channelService } from './channel.service';
import { ApiError } from '@/shared';
import { channelZodSchema } from './channel.dto';
import { HttpStatus } from '@/shared/enums';

const create = asyncHandler(async (req, res) => {
  const payload = req.body;
  if (!req.file) {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Icon is required');
  }
  payload.icon = req.file.filename;
  payload.recommended = JSON.parse(payload.recommended);
  payload.streamUrls = JSON.parse(payload.streamUrls);
  payload.sportChannels = JSON.parse(payload.sportChannels);
  await channelZodSchema.create.parseAsync(payload);
  const result = await channelService.create(payload);
  sendResponse(res, { data: result });
});

const findAll = asyncHandler(async (req, res) => {
  const result = await channelService.findAll();
  sendResponse(res, { data: result });
});

const findById = asyncHandler(async (req, res) => {
  const { id } = req.params as ReqParamsId;
  const result = await channelService.findById(id);
  sendResponse(res, { data: result });
});

const update = asyncHandler(async (req, res) => {
  const { id } = req.params as ReqParamsId;
  const payload = req.body;
  if (req.file) {
    payload.icon = req.file.filename;
  }
  payload.recommended = JSON.parse(payload.recommended);
  payload.streamUrls = JSON.parse(payload.streamUrls);
  payload.sportChannels = JSON.parse(payload.sportChannels);
  await channelZodSchema.create.parseAsync(payload);
  const result = await channelService.update(id, payload);
  sendResponse(res, { data: result });
});

const remove = asyncHandler(async (req, res) => {
  const { id } = req.params as ReqParamsId;
  const result = await channelService.remove(id);
  sendResponse(res, { data: result });
});

export const channelController = { findAll, findById, create, update, remove };
