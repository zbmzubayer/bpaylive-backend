import { z } from 'zod';

const fileSchema = z.any().refine((file) => {
  if (file instanceof File) {
    const acceptedImageTypes = [
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
    ]; // Add more if needed
    return acceptedImageTypes.includes(file.type);
  } else if (typeof file === 'string') {
    const acceptedImageTypes = ['jpg', 'jpeg', 'png', 'webp', 'svg']; // Add more if needed
    const fileExtension = file.split('.').pop();
    return acceptedImageTypes.includes(fileExtension!);
  }
  return false;
}, 'Invalid file type');

// Carousel
const saveCarouselBanner = z.object({
  carouselBanner1: fileSchema.optional().nullable(),
  carouselBanner2: fileSchema.optional().nullable(),
  carouselBanner3: fileSchema.optional().nullable(),
  carouselBanner4: fileSchema.optional().nullable(),
  carouselBanner5: fileSchema.optional().nullable(),
  carouselBanner1Url: z.string().optional().nullable(),
  carouselBanner2Url: z.string().optional().nullable(),
  carouselBanner3Url: z.string().optional().nullable(),
  carouselBanner4Url: z.string().optional().nullable(),
  carouselBanner5Url: z.string().optional().nullable(),
});

export const carouselBannerKeys = [
  'carouselBanner1',
  'carouselBanner2',
  'carouselBanner3',
  'carouselBanner4',
  'carouselBanner5',
] as const;

// Popup Banner
const savePopupBanner = z.object({
  popupBanner: fileSchema.optional().nullable(),
  popupBannerUrl: z.string().optional().nullable(),
});

// Stream Banner
const saveStreamBanner = z.object({
  streamBanner: fileSchema.optional().nullable(),
  streamBannerUrl: z.string().optional().nullable(),
});

type SaveCarouselDto = z.infer<typeof saveCarouselBanner>;
type SavePopupBannerDto = z.infer<typeof savePopupBanner>;
type SaveStreamBannerDto = z.infer<typeof saveStreamBanner>;

export type { SaveCarouselDto, SavePopupBannerDto, SaveStreamBannerDto };

export const advertisementZodSchema = {
  saveCarouselBanner,
  savePopupBanner,
  saveStreamBanner,
};
