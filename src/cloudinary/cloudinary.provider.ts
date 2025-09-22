import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: 'dpdgiqkym',
      api_key: '637919447612188',
      api_secret: 'yu3AXauVvY19IbmoNI0WNGHofYk',
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'employee-cards' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as UploadApiResponse);
        },
      );

      const readable = new Readable();
      readable.push(file.buffer);
      readable.push(null);
      readable.pipe(uploadStream);
    });
  }

  async deleteImage(imageUrl: string): Promise<void> {
    if (!imageUrl) return;

    // Extract everything after `/upload/` and remove the extension
    const publicId = imageUrl
      .split('/upload/')[1] // e.g. "v1698765432/employee-cards/abc123.jpg"
      .split('.')[0]; // e.g. "v1698765432/employee-cards/abc123"

    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error) => {
        if (error) return reject(error);
        resolve();
      });
    });
  }
}
