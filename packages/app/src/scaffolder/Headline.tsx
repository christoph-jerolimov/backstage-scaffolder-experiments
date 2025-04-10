import React from 'react';

import { FieldExtensionComponentProps } from '@backstage/plugin-scaffolder-react';

import Typography from '@material-ui/core/Typography';
import type { TypographyVariant } from '@material-ui/core';

export const Headline = (props: FieldExtensionComponentProps<{}, { variant: TypographyVariant }>) => {
  const {
    idSchema,
    schema: {
      title,
    },
    uiSchema: {
      'ui:options': uiOptions,
    },
  } = props;

  const variant = uiOptions?.variant ?? 'h4';

  return (
    <Typography id={idSchema?.$id} variant={variant}>
      {title}
    </Typography>
  );
};
