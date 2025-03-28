import asyncHandler from '@/shared/async-handler';
import { type ReqParamsId } from '@/shared/query-param.validation';
import sendResponse from '@/shared/send-response';
import { sportService } from './sport.service';
import { ApiError } from '@/shared';
import { sportZodSchema } from './sport.dto';

const create = asyncHandler(async (req, res) => {
  const payload = req.body;
  if (!req.file) {
    throw new ApiError(400, 'Icon is required');
  }
  payload.icon = req.file.filename;
  await sportZodSchema.create.parseAsync(payload);
  const result = await sportService.create(payload);
  sendResponse(res, { data: result });
});

const findAll = asyncHandler(async (req, res) => {
  const result = await sportService.findAll();
  sendResponse(res, { data: result });
});

const findById = asyncHandler(async (req, res) => {
  const { id } = req.params as ReqParamsId;
  const result = await sportService.findById(id);
  sendResponse(res, { data: result });
});

const update = asyncHandler(async (req, res) => {
  const { id } = req.params as ReqParamsId;
  const payload = req.body;
  if (req.file) {
    payload.icon = req.file.filename;
  }
  await sportZodSchema.create.parseAsync(payload);
  const result = await sportService.update(id, payload);
  sendResponse(res, { data: result });
});

const remove = asyncHandler(async (req, res) => {
  const { id } = req.params as ReqParamsId;
  const result = await sportService.remove(id);
  sendResponse(res, { data: result });
});

export const sportController = { findAll, findById, create, update, remove };
