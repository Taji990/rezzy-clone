import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async getProfile(userId: string) {
    const profile = await this.profileRepository.findOne({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async updateProfile(userId: string, profileData: any) {
    let profile = await this.profileRepository.findOne({
      where: { userId },
    });

    if (!profile) {
      profile = this.profileRepository.create({
        userId,
        ...profileData,
      });
    } else {
      Object.assign(profile, profileData);
    }

    return this.profileRepository.save(profile);
  }
}
