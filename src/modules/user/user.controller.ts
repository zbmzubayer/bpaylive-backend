import asyncHandler from '@/shared/async-handler';
import { type ReqParamsId } from '@/shared/query-param.validation';
import sendResponse from '@/shared/send-response';
import { userService } from './user.service';

const create = asyncHandler(async (req, res) => {
  const payload = req.body;
  const result = await userService.create(payload);
  sendResponse(res, { data: result });
});

const findAll = asyncHandler(async (req, res) => {
  const result = await userService.findAll();
  sendResponse(res, { data: result });
});

const findById = asyncHandler(async (req, res) => {
  const { id } = req.params as ReqParamsId;
  const result = await userService.findById(id);
  sendResponse(res, { data: result });
});

const update = asyncHandler(async (req, res) => {
  const { id } = req.params as ReqParamsId;
  const payload = req.body;
  const result = await userService.update(id, payload);
  sendResponse(res, { data: result });
});

const remove = asyncHandler(async (req, res) => {
  const { id } = req.params as ReqParamsId;
  const result = await userService.remove(id);
  sendResponse(res, { data: result });
});

export const userController = { findAll, findById, create, update, remove };
