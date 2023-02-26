import { Controller, Get, Header, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClassificationService } from './classification.service';

@Controller('classify')
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}

  @Get()
  async getRandomImages(): Promise<any> {
    return this.classificationService.getRandomImages();
  }

  @Header('Access-Control-Allow-Origin', '*')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async classifyImage(@UploadedFile() image: Express.Multer.File) {
    const classifiedNumber = await this.classificationService.classifyImage(image.buffer);
    return classifiedNumber;
  }

}
