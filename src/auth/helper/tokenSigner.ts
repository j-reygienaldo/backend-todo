import { JwtService } from '@nestjs/jwt';

const jwtService = new JwtService();

export const tokenSigner = async (
  id: number,
  email: string,
  exp?: string,
): Promise<{
  id: number;
  email: string;
  access_token: string;
}> => {
  const payload = {
    sub: id,
    email,
  };

  const secretKey = 'secret';

  const token = await jwtService.signAsync(payload, {
    expiresIn: exp ? `${exp}` : `7d`,
    secret: secretKey,
  });

  return {
    id,
    email,
    access_token: token,
  };
};

module.exports = {
  tokenSigner,
};
