import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/user.dto';

import * as bcrypt from 'bcrypt';
import { tokenSigner } from 'src/auth/helper/tokenSigner';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async registerUser(data: AuthDto) {
    try {
      const findUser = await this.prisma.user.findFirst({
        where: { email: data.email },
      });

      if (findUser) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Email already registered!',
        };
      }

      const SALT_ROUNDS = process.env.SALT_ROUNDS;

      const hashed = await bcrypt.hash(data.password, Number(SALT_ROUNDS));

      await this.prisma.user.create({
        data: {
          email: data.email,
          password: hashed,
          createdAt: new Date().toISOString(),
        },
      });

      return {
        status: HttpStatus.CREATED,
        message: 'Succesfully create your account!',
      };
    } catch (error) {
      console.error(error);
    }
  }

  async login(data: AuthDto) {
    try {
      const findUser = await this.prisma.user.findFirst({
        where: { email: data.email },
      });

      if (!findUser) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Please check your input!',
        };
      }

      if (bcrypt.compare(data.password, findUser.password)) {
        const { access_token } = await tokenSigner(findUser.id, findUser.email);

        await this.prisma.user.update({
          where: { id: findUser.id },
          data: {
            lastLogin: new Date().toISOString(),
          },
        });

        return {
          status: HttpStatus.OK,
          message: 'Sucessfully logged in!',
          access_token,
        };
      }

      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Credential Invalid!',
      };
    } catch (error) {
      console.error(error);
    }
  }
}
