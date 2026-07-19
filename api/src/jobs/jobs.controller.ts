import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('jobs')
@UseGuards(JwtGuard)
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  getJobs(
    @Req() req: any,
    @Query('stage') stage?: string,
    @Query('limit') limit = 10,
  ) {
    return this.jobsService.getJobs(req.user.userId, stage, limit);
  }

  @Post()
  createJob(@Req() req: any, @Body() jobData: any) {
    return this.jobsService.createJob(req.user.userId, jobData);
  }

  @Put(':id')
  updateJob(@Req() req: any, @Param('id') jobId: string, @Body() jobData: any) {
    return this.jobsService.updateJob(req.user.userId, jobId, jobData);
  }

  @Delete(':id')
  deleteJob(@Req() req: any, @Param('id') jobId: string) {
    return this.jobsService.deleteJob(req.user.userId, jobId);
  }
}
