import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    get(key: string) {
        const value = process.env[key];
        if (!value) {
            throw new Error(`"${key}" is not defined`);
        }
        return value;
    }
    get mongoUrl(): string {
        return this.get('MONGO_URL');
    }

    get secret(): string {
        return this.get('SECRET');
    }

    get chulaAppId(): string {
        return this.get('CHULA_APP_ID');
    }

    get chulaAppSecret(): string {
        return this.get('CHULA_APP_SECRET');
    }

    get awsAccessKeyId(): string {
        return this.get('AWS_ACCESS_KEY_ID');
    }

    get awsSecretAccessKey(): string {
        return this.get('AWS_SECRET_ACCESS_KEY');
    }

    get awsS3BucketName(): string {
        return this.get('AWS_S3_BUCKET_NAME');
    }

    get isDevelopment(): boolean {
        return this.get('NODE_ENV') === 'development';
    }
}
