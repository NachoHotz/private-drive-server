import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { envConfig } from './envConfig';

const envs = envConfig();

const { NODE_ENV, CLIENT_DEV_URL, CLIENT_PROD_URL } = envs;

export const corsOptions: CorsOptions = {
  origin: `${NODE_ENV} === 'development' : ${CLIENT_DEV_URL} : ${CLIENT_PROD_URL}`,
};
