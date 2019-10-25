import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DevelopmentEnvironmentGuard } from '../development-environment.guard';

export const Authenticated = () => {
    if (process.env.NODE_ENV === 'development') {
        return UseGuards(DevelopmentEnvironmentGuard);
    } else {
        return UseGuards(AuthGuard('jwt'));
    }
};
