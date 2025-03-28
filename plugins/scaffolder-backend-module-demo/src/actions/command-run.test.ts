import { createMockActionContext } from '@backstage/plugin-scaffolder-node-test-utils'

import { createCommandRunAction } from './command-run';

describe('createExampleAction', () => {
  it('should call action', async () => {
    const action = createCommandRunAction();

    await expect(action.handler(createMockActionContext({
      input: {
        command: 'test',
        args: [],
      },
    }))).resolves.toBeUndefined()
  });

  it('should fail when passing foo', async () => {
    const action = createCommandRunAction();

    await expect(action.handler(createMockActionContext({
      input: {
        command: 'foo',
        args: [],
      },
    }))).rejects.toThrow("myParameter cannot be 'foo'")
  });
});
