import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClassificationService } from './classification.service';

@Controller('classify')
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}

  @Get()
  async getRandomImages(): Promise<any> {
    return this.classificationService.getRandomImages();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async classifyImage(@UploadedFile() image: Express.Multer.File) {
    const classId = await this.classificationService.classifyImage(image.buffer);
    return { classId };
  }
}
