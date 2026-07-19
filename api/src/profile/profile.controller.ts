import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('profile')
@UseGuards(JwtGuard)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  getProfile(@Req() req: any) {
    return this.profileService.getProfile(req.user.userId);
  }

  @Put()
  updateProfile(@Req() req: any, @Body() profileData: any) {
    return this.profileService.updateProfile(req.user.userId, profileData);
  }
}
