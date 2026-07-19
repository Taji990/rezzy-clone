import { Controller, Post, Body, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('ai')
@UseGuards(JwtGuard)
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('rewrite-bullet')
  @HttpCode(HttpStatus.OK)
  async rewriteBullet(
    @Body('bullet') bullet: string,
    @Body('jobDescription') jobDescription: string,
  ) {
    return this.aiService.rewriteBullet(bullet, jobDescription);
  }

  @Post('cover-letter')
  @HttpCode(HttpStatus.OK)
  async generateCoverLetter(
    @Req() req: any,
    @Body('jobTitle') jobTitle: string,
    @Body('companyName') companyName: string,
    @Body('jobDescription') jobDescription: string,
  ) {
    return this.aiService.generateCoverLetter(jobTitle, companyName, jobDescription);
  }
}
