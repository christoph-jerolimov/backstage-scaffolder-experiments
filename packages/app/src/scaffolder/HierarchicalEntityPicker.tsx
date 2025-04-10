import React from 'react';

import { useApi } from '@backstage/core-plugin-api';
import { Entity, parseEntityRef, stringifyEntityRef } from '@backstage/catalog-model';
import { catalogApiRef, EntityDisplayName } from '@backstage/plugin-catalog-react';
import { FieldExtensionComponentProps } from '@backstage/plugin-scaffolder-react';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import useAsync from 'react-use/esm/useAsync';

import Autocomplete, {
  AutocompleteChangeReason,
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';

// Initialv version is based on
// https://github.com/backstage/backstage/blob/master/plugins/scaffolder/src/components/fields/EntityPicker/EntityPicker.tsx

export const HierarchicalEntityPicker = (props: FieldExtensionComponentProps<{ parent?: string, child?: string }>) => {
  const {
    onChange,
    schema: {
      title,
      description,
    },
    required,
    uiSchema,
    rawErrors,
    formData,
    idSchema,
  } = props;

  const isDisabled = uiSchema?.['ui:disabled'] ?? false;

  const catalogApi = useApi(catalogApiRef);

  const asyncParents = useAsync(async () => {
    const { items } = await catalogApi.getEntities({
      fields: [
        'metadata.name',
        'metadata.namespace',
        'metadata.title',
        'kind',
      ],
      filter: {
        kind: 'System',
      },
    });
    return items;
  }, []);

  const selectedParent = asyncParents.value?.find(e => stringifyEntityRef(e) === formData?.parent);

  const asyncChilds = useAsync(async () => {
    const { items } = await catalogApi.getEntities({
      fields: [
        'metadata.name',
        'metadata.namespace',
        'metadata.title',
        'kind',
      ],
      filter: {
        kind: 'Component',
        'spec.system': selectedParent?.metadata.name ?? '',
      },
    });
    return items;
  }, [selectedParent]);

  const selectedChild = asyncChilds.value?.find(e => stringifyEntityRef(e) === formData?.parent);

  const onParentChanged = React.useCallback(
    (_: any, entity: Entity | null, reason: AutocompleteChangeReason) => {
      if (entity) {
        onChange({ parent: stringifyEntityRef(entity), child: undefined });
      } else {
        onChange({ parent: undefined, child: undefined });
      }
    },
    [onChange],
  );

  const onChildChanged = React.useCallback(
    (_: any, entity: Entity | null, reason: AutocompleteChangeReason) => {
      if (entity) {
        onChange({ parent: formData?.parent, child: stringifyEntityRef(entity) });
      } else {
        onChange({ parent: formData?.parent, child: undefined });
      }
    },
    [onChange, formData?.parent],
  );

  return (
    <FormControl
      margin="normal"
      required={required}
      error={rawErrors?.length > 0 && !formData}
    >
      <Autocomplete
        // id={idSchema?.$id}
        value={selectedParent}
        loading={asyncParents.loading}
        onChange={onParentChanged}
        options={asyncParents.value || []}
        autoSelect
        renderInput={params => (
          <TextField
            {...params}
            label={title}
            margin="dense"
            helperText={description}
            FormHelperTextProps={{ margin: 'dense', style: { marginLeft: 0 } }}
            variant="outlined"
            required={required}
            disabled={isDisabled}
            InputProps={params.InputProps}
          />
        )}
        getOptionLabel={option => stringifyEntityRef(option)}
        renderOption={option => <EntityDisplayName entityRef={option} />}
        filterOptions={createFilterOptions<Entity>({
          stringify: option => option.metadata.name,
        })}
      />
      {selectedParent ? (
        <Autocomplete
          id={idSchema?.$id}
          value={selectedChild}
          loading={asyncChilds.loading}
          onChange={onChildChanged}
          options={asyncChilds.value || []}
          autoSelect
          renderInput={params => (
            <TextField
              {...params}
              label={`${selectedParent?.metadata.name} Components`}
              margin="dense"
              helperText={description}
              FormHelperTextProps={{ margin: 'dense', style: { marginLeft: 0 } }}
              variant="outlined"
              required={required}
              disabled={isDisabled}
              InputProps={params.InputProps}
            />
          )}
          getOptionLabel={option => stringifyEntityRef(option)}
          renderOption={option => <EntityDisplayName entityRef={option} />}
          filterOptions={createFilterOptions<Entity>({
            stringify: option => option.metadata.name,
          })}
        />
      ) : null}
    </FormControl>
  );
};
