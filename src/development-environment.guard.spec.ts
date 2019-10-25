import { DevelopmentEnvironmentGuard } from './development-environment.guard';

describe('DevelopmentEnvironmentGuard', () => {
  it('should be defined', () => {
    expect(new DevelopmentEnvironmentGuard()).toBeDefined();
  });
});
