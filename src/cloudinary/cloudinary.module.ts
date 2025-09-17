import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.provider';

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService], // 👈 makes it available to other modules
})
export class CloudinaryModule {}
