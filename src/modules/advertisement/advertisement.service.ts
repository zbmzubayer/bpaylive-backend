import { prisma } from '@/lib';
import {
  carouselBannerKeys,
  SaveCarouselDto,
  SavePopupBannerDto,
  SaveStreamBannerDto,
} from './advertisement.dto';
import { deleteFile } from '@/lib/file-handle';

const upsertCarousel = async (data: SaveCarouselDto) => {
  const advertisements = await prisma.advertisement.findMany();
  const advertisement = advertisements[0];
  if (advertisement) {
    await prisma.advertisement.update({ where: { id: advertisement.id }, data }).then(() => {
      for (const key of carouselBannerKeys) {
        if (advertisement[key] && advertisement[key] !== data[key]) {
          deleteFile(advertisement[key]);
        }
      }
    });
  } else {
    await prisma.advertisement.create({ data });
  }
};

const upsertPopupBanner = async (data: SavePopupBannerDto) => {
  const advertisements = await prisma.advertisement.findMany();
  const advertisement = advertisements[0];
  if (advertisement) {
    await prisma.advertisement.update({ where: { id: advertisement.id }, data }).then(() => {
      if (advertisement.popupBanner && advertisement.popupBanner !== data.popupBanner) {
        deleteFile(advertisement.popupBanner);
      }
    });
  } else {
    await prisma.advertisement.create({ data });
  }
};

const upsertStreamingBanner = async (data: SaveStreamBannerDto) => {
  const advertisements = await prisma.advertisement.findMany();
  const advertisement = advertisements[0];
  if (advertisement) {
    await prisma.advertisement.update({ where: { id: advertisement.id }, data }).then(() => {
      if (advertisement.streamBanner && advertisement.streamBanner !== data.streamBanner) {
        deleteFile(advertisement.streamBanner);
      }
    });
  } else {
    await prisma.advertisement.create({ data });
  }
};

const find = async (id: string) => {
  const advertisement = await prisma.advertisement.findMany();
  return advertisement[0];
};

export const advertisementService = {
  upsertCarousel,
  upsertPopupBanner,
  upsertStreamingBanner,
  find,
};
