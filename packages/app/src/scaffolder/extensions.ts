import { scaffolderPlugin } from '@backstage/plugin-scaffolder';

import { createScaffolderFieldExtension } from '@backstage/plugin-scaffolder-react';

import { Headline } from './Headline';
import { HierarchicalEntityPicker } from './HierarchicalEntityPicker';
import { OwnedHierarchicalEntityPicker } from './OwnedHierarchicalEntityPicker';

export const HeadlineExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: 'Headline',
    component: Headline,
  }),
);

export const HierarchicalEntityPickerExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: 'HierarchicalEntityPicker',
    component: HierarchicalEntityPicker,
  }),
);

export const OwnedHierarchicalEntityPickerExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: 'OwnedHierarchicalEntityPicker',
    component: OwnedHierarchicalEntityPicker,
  }),
);
