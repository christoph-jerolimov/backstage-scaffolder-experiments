import { createBackendModule } from "@backstage/backend-plugin-api";
import { scaffolderActionsExtensionPoint  } from '@backstage/plugin-scaffolder-node/alpha';

import { createCommandRunAction } from "./actions/command-run";
import { createBackstageCreateApp } from "./actions/backstage-create-app";

/**
 * A backend module that registers the action into the scaffolder
 */
export const scaffolderModule = createBackendModule({
  moduleId: 'demo',
  pluginId: 'scaffolder',
  register({ registerInit }) {
    registerInit({
      deps: {
        scaffolderActions: scaffolderActionsExtensionPoint
      },
      async init({ scaffolderActions }) {
        scaffolderActions.addActions(createCommandRunAction());
        scaffolderActions.addActions(createBackstageCreateApp());
      }
    });
  },
})
