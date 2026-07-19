import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async getJobs(userId: string, stage?: string, limit = 10) {
    const query = this.jobRepository
      .createQueryBuilder('job')
      .where('job.userId = :userId', { userId })
      .orderBy('job.createdAt', 'DESC')
      .take(limit);

    if (stage) {
      query.andWhere('job.stage = :stage', { stage });
    }

    return query.getMany();
  }

  async createJob(userId: string, jobData: any) {
    const job = this.jobRepository.create({
      ...jobData,
      userId,
      stage: 'applied',
    });

    return this.jobRepository.save(job);
  }

  async updateJob(userId: string, jobId: string, jobData: any) {
    const job = await this.jobRepository.findOne({ where: { id: jobId } });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.userId !== userId) {
      throw new ForbiddenException('Cannot update this job');
    }

    Object.assign(job, jobData);
    return this.jobRepository.save(job);
  }

  async deleteJob(userId: string, jobId: string) {
    const job = await this.jobRepository.findOne({ where: { id: jobId } });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.userId !== userId) {
      throw new ForbiddenException('Cannot delete this job');
    }

    return this.jobRepository.remove(job);
  }
}
