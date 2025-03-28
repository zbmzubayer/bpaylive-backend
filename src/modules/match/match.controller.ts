import asyncHandler from '@/shared/async-handler';
import { type ReqParamsId } from '@/shared/query-param.validation';
import sendResponse from '@/shared/send-response';
import { matchService } from './match.service';
import { ApiError } from '@/shared';
import { HttpStatus } from '@/shared/enums';
import { matchZodSchema } from './match.dto';

const create = asyncHandler(async (req, res) => {
  const payload = req.body;
  if (!req.file) {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Thumbnail is required');
  }
  payload.thumbnail = req.file.filename;
  console.log(req.file.filename);
  payload.trending = JSON.parse(payload.trending);
  payload.channelMatches = JSON.parse(payload.channelMatches);
  await matchZodSchema.create.parseAsync(payload);
  const result = await matchService.create(payload);
  sendResponse(res, { data: result });
});

const findAll = asyncHandler(async (req, res) => {
  const result = await matchService.findAll();
  sendResponse(res, { data: result });
});

const findById = asyncHandler(async (req, res) => {
  const { id } = req.params as ReqParamsId;
  const result = await matchService.findById(id);
  sendResponse(res, { data: result });
});

const update = asyncHandler(async (req, res) => {
  const { id } = req.params as ReqParamsId;
  const payload = req.body;
  if (req.file) {
    payload.thumbnail = req.file.filename;
  }
  payload.trending = JSON.parse(payload.trending);
  payload.channelMatches = JSON.parse(payload.channelMatches);
  await matchZodSchema.create.parseAsync(payload);
  const result = await matchService.update(id, payload);
  sendResponse(res, { data: result });
});

const remove = asyncHandler(async (req, res) => {
  const { id } = req.params as ReqParamsId;
  const result = await matchService.remove(id);
  sendResponse(res, { data: result });
});

const findByURL = asyncHandler(async (req, res) => {
  const { url } = req.params;
  console.log(url);
  const result = await matchService.findByURL(url as string);
  sendResponse(res, { data: result });
});

export const matchController = { findAll, findById, create, update, remove, findByURL };
