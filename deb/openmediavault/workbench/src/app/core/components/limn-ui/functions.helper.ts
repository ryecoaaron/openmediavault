import * as _ from 'lodash';

import { FormFieldConfig } from '~/app/core/components/limn-ui/models/form-field-config.type';

/**
 * Flatten the configuration the get all fields, including the ones used
 * in 'containers'.
 */
export const flattenFormFieldConfig = (fields: Array<FormFieldConfig>): Array<FormFieldConfig> =>
  _.flatMap(
    _.filter(
      fields,
      (field: FormFieldConfig) => !_.isUndefined(field.name) || _.isArray(field.fields)
    ),
    (field: FormFieldConfig) => {
      if (_.isArray(field.fields)) {
        return flattenFormFieldConfig(field.fields);
      } else {
        return field;
      }
    }
  );

/**
 * Helper function to setup 'confObjUuid' form fields.
 */
export const setupConfObjUuidFields = (fields: Array<FormFieldConfig>) => {
  const filteredFields = _.filter(fields, { type: 'confObjUuid' });
  if (filteredFields.length > 1) {
    throw new Error('Only one \'confObjUuid\' field per form is allowed.');
  }
  if (filteredFields.length === 1) {
    // Set the UUID that is used to tell the backend that the
    // configuration object is new. The UUID will be replaced
    // by another one automatically.
    _.defaults(filteredFields[0], {
      name: 'uuid',
      value: '{{ _routeParams.uuid | default(newconfobjuuid) }}'
    });
  }
};
