import { createTemplateAction, executeShellCommand } from '@backstage/plugin-scaffolder-node';
// import { z } from 'zod';

export const createCommandRunAction = () => {
  return createTemplateAction({
    id: 'demo:command:run',
    schema: {
      input: {
        command: z => z.string(),
        args: z => z.array(z.string()),
      },
      output: {
        test: z => z.string(),
      },
    },
    async handler(ctx) {
      await executeShellCommand({
        command: ctx.input.command,
        args: ctx.input.args,
        logger: ctx.logger,
        options: {
          cwd: ctx.workspacePath,
        },
      });
    },
  });
};