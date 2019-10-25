import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DevEnvironmentGuard } from '../dev-environment.guard';

export const Authenticated = () => {
    if (process.env.NODE_ENV === 'development') {
        return UseGuards(DevEnvironmentGuard);
    } else {
        return UseGuards(AuthGuard('jwt'));
    }
};
