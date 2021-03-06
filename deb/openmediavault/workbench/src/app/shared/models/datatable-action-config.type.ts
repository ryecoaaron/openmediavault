import { Constraint } from '~/app/shared/models/constraint.type';
import { DataStore } from '~/app/shared/models/data-store.type';
import { DatatableSelection } from '~/app/shared/models/datatable-selection.model';

// A datatable action is visually represented in the action toolbar
// which is located on the left side above the datatable.
export type DatatableActionConfig = {
  // The following actions that are displayed in the datatable toolbar
  // are available:
  // button     - Displays a button with text.
  // iconbutton - Displays a button with an icon.
  // menu       - Displays a button with icon. A menu is displayed when
  //              the button is clicked. The menu items displays text
  //              and an optional icon.
  // divider    - Display a divider.
  // select     - Internal only.
  type?: 'button' | 'iconButton' | 'menu' | 'select' | 'divider';

  // An unique identifier.
  id?: string;

  // --- button | menu ---
  text?: string;

  // --- iconbutton | menu ---
  icon?: string;
  tooltip?: string;

  // --- button | iconbutton | menu ---
  // A callback function. Internal only.
  click?: (action: DatatableActionConfig, selection: DatatableSelection, data: any) => void;

  // --- select ---
  store?: DataStore;
  placeholder?: string;
  // Defaults to 'value'.
  valueField?: string;
  // Defaults to 'text'.
  textField?: string;
  selectionChange?: (action: DatatableActionConfig, value: any, data: any) => void;

  // --- menu ---
  // The actions displayed in the menu dropdown.
  actions?: Array<DatatableActionConfig>;

  // The constraints that must be fulfilled to enable the action.
  enabledConstraints?: {
    // The datatable must contain data?
    hasData?: boolean;
    // Minimum number of selected rows.
    minSelected?: number;
    // Maximum number of selected rows.
    maxSelected?: number;
    // Apply the specified custom constraint to all selected rows
    // (and their data). If the constraint succeeds for all selected
    // rows, then the action will be enabled.
    constraint?: Array<Constraint>;
    // A callback function. Return `true` to let the check succeed.
    callback?: (selected: any[], data: any) => boolean;
  };
};
