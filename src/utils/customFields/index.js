export const fieldsNamesToBE = new Map([
  ['smallTextBox', {
    name: 'TEXT',
    type: 'String'
  }],
  ['largeTextBox', {
    name: 'TEXTAREA',
    type: 'String'
  }],
  ['roundNumber', {
    name: 'NUMBER',
    type: 'String'
  }],
  ['decimalNumber', {
    name: 'DECIMAL',
    type: 'String'
  }],
  ['phoneNumber', {
    name: 'PHONE',
    type: 'String'
  }],
  ['email', {
    name: 'EMAIL',
    type: 'String'
  }],
  ['webLink', {
    name: 'WEB',
    type: 'String'
  }],
  ['dateField', {
    name: 'CALENDAR',
    type: 'DATE'
  }],
  ['checkBox', {
    name: 'CHECKBOX',
    type: 'String'
  }],
  ['dropDown', {
    name: 'DROPDOWN',
    type: 'Array'
  }],
  ['scanner', {
    name: 'SCANNER',
    type: 'String'
  }],
  ['fileAttachment', {
    name: 'FILE',
    type: 'Object'
  }]
])

export const fieldsNamesFromBE = new Map([
  ['TEXT', {
    name: 'smallTextBox',
    type: 'String'
  }],
  ['TEXTAREA', {
    name: 'largeTextBox',
    type: 'String'
  }],
  ['NUMBER', {
    name: 'roundNumber',
    type: 'Number'
  }],
  ['DECIMAL', {
    name: 'decimalNumber',
    type: 'Number'
  }],
  ['PHONE', {
    name: 'phoneNumber',
    type: 'String'
  }],
  ['EMAIL', {
    name: 'email',
    type: 'String'
  }],
  ['WEB', {
    name: 'webLink',
    type: 'String'
  }],
  ['CALENDAR', {
    name: 'dateField',
    type: 'String'
  }],
  ['CHECKBOX', {
    name: 'checkBox',
    type: 'String'
  }],
  ['DROPDOWN', {
    name: 'dropDown',
    type: 'Array'
  }],
  ['SCANNER', {
    name: 'scanner',
    type: 'String'
  }],
  ['FILE', {
    name: 'fileAttachment',
    type: 'Object'
  }]
])
