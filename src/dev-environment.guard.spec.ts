import { DevEnvironmentGuard } from './dev-environment.guard';

describe('DevEnvironmentGuard', () => {
    it('should be defined', () => {
        expect(new DevEnvironmentGuard()).toBeDefined();
    });
});
