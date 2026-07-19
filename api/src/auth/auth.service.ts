import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SecurityService } from '../common/security';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private securityService: SecurityService,
  ) {}

  async register(email: string, password: string, name: string) {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = this.securityService.hashPassword(password);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    const savedUser = await this.userRepository.save(user);
    const token = this.jwtService.sign({ sub: savedUser.id, email: savedUser.email });

    return {
      id: savedUser.id,
      email: savedUser.email,
      name: savedUser.name,
      token,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !this.securityService.verifyPassword(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userRepository.findOne({ where: { id: payload.sub } });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const token = this.jwtService.sign({ sub: user.id, email: user.email });
      return { token };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
