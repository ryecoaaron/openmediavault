import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { marker as gettext } from '@biesbjerg/ngx-translate-extract-marker';

import { DatatablePageConfig } from '~/app/core/components/limn-ui/models/datatable-page-config.type';

@Component({
  templateUrl: './plugins-datatable-page.component.html',
  styleUrls: ['./plugins-datatable-page.component.scss']
})
export class PluginsDatatablePageComponent implements OnInit {
  @ViewChild('pluginInfoTpl', { static: true })
  public pluginInfoTpl: TemplateRef<any>;

  public config: DatatablePageConfig = {
    columns: [
      {
        name: gettext('Installed'),
        prop: 'installed',
        flexGrow: 1,
        sortable: true,
        hidden: true,
        cellTemplateName: 'checkIcon'
      },
      { name: gettext('Name'), prop: 'name', flexGrow: 1, sortable: true, hidden: true },
      { name: gettext('Version'), prop: 'version', flexGrow: 1, sortable: true, hidden: true },
      {
        name: gettext('Section'),
        prop: 'pluginsection',
        flexGrow: 1,
        sortable: true,
        hidden: true,
        cellTemplateName: 'chip'
      },
      {
        name: gettext('Repository'),
        prop: 'repository',
        flexGrow: 1,
        sortable: true,
        hidden: true
      },
      { name: gettext('Abstract'), prop: 'abstract', flexGrow: 1, sortable: true, hidden: true },
      {
        name: gettext('Description'),
        prop: 'extendeddescription',
        flexGrow: 1,
        sortable: true,
        hidden: true
      },
      {
        name: gettext('Summary'),
        prop: 'summary',
        flexGrow: 1,
        sortable: true,
        hidden: true
      },
      {
        name: gettext('Size'),
        prop: 'size',
        flexGrow: 1,
        sortable: true,
        hidden: true,
        cellTemplateName: 'binaryUnit'
      },
      {
        name: gettext('Maintainer'),
        prop: 'maintainer',
        flexGrow: 1,
        sortable: true,
        hidden: true
      },
      { name: gettext('Homepage'), prop: 'homepage', flexGrow: 1, sortable: true, hidden: true }
    ],
    hasSearchField: true,
    limit: 0,
    sorters: [
      {
        dir: 'asc',
        prop: 'name'
      },
      {
        dir: 'asc',
        prop: 'pluginsection'
      }
    ],
    store: {
      proxy: {
        service: 'Plugin',
        get: {
          method: 'enumeratePlugins'
        }
      }
    },
    stateId: 'df5e9c26-202f-11ea-9edc-6b253103fe43',
    actions: [
      {
        type: 'iconButton',
        icon: 'search',
        tooltip: gettext('Check for new plugins'),
        execute: {
          type: 'request',
          request: {
            service: 'Apt',
            method: 'update',
            task: true,
            progressMessage: gettext('Checking for new plugins ...')
          }
        }
      },
      {
        type: 'iconButton',
        icon: 'mdi:download',
        tooltip: gettext('Install'),
        enabledConstraints: {
          minSelected: 1,
          maxSelected: 1,
          constraint: [{ operator: 'falsy', arg0: { prop: 'installed' } }]
        },
        confirmationDialogConfig: {
          template: 'confirmation',
          message: gettext('Do you really want to install the plugin?')
        },
        execute: {
          type: 'taskDialog',
          taskDialog: {
            title: gettext('Install plugin'),
            startOnInit: true,
            buttons: {
              start: {
                hidden: true
              },
              stop: {
                hidden: true
              }
            },
            request: {
              service: 'Plugin',
              method: 'install',
              params: {
                packages: ['{{ _selected[0].name }}']
              }
            }
          }
        }
      },
      {
        type: 'iconButton',
        icon: 'delete',
        tooltip: gettext('Uninstall'),
        enabledConstraints: {
          minSelected: 1,
          maxSelected: 1,
          constraint: [{ operator: 'truthy', arg0: { prop: 'installed' } }]
        },
        confirmationDialogConfig: {
          template: 'confirmation',
          message: gettext('Do you really want to uninstall the plugin?')
        },
        execute: {
          type: 'taskDialog',
          taskDialog: {
            title: gettext('Uninstall plugin'),
            startOnInit: true,
            buttons: {
              start: {
                hidden: true
              },
              stop: {
                hidden: true
              }
            },
            request: {
              service: 'Plugin',
              method: 'remove',
              params: {
                packages: ['{{ _selected[0].name }}']
              }
            }
          }
        }
      }
    ]
  };

  ngOnInit(): void {
    // Append the column that uses a custom template.
    this.config.columns.unshift({
      name: gettext('Package Information'),
      prop: 'name',
      flexGrow: 3,
      cellTemplate: this.pluginInfoTpl
    });
  }
}
