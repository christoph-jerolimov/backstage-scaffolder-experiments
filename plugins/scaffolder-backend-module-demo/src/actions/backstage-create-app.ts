import { createTemplateAction, executeShellCommand } from '@backstage/plugin-scaffolder-node';
// import { z } from 'zod';

export const createBackstageCreateApp = () => {
  return createTemplateAction({
    id: 'demo:backstage:create-app',
    schema: {
      input: {
        name: z => z.string(),
      },
    },
    async handler(ctx) {
      await executeShellCommand({
        command: 'npx',
        args: [
          '--yes',
          '@backstage/create-app@latest',
          '--path',
          ctx.workspacePath,
          '--skip-install',
        ],
        logger: ctx.logger,
        options: {
          cwd: ctx.workspacePath,
          env: {
            ...process.env,
            BACKSTAGE_APP_NAME: ctx.input.name,
          },
        },
      });
    },
  });
};