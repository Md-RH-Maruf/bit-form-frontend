import { __ } from '../../Utils/i18nwrap'

// eslint-disable-next-line import/prefer-default-export
export const disabledLogicType = [
  'empty',
  'not_empty',
  'today',
  'till_today',
  'tomorrow',
  'yesterday',
  'till_yesterday',
  'till_yesterday',
  'last_7_days',
  'last_30_days',
  'last_60_days',
  'last_90_days',
  'last_120_days',
  'next_7_days',
  'next_30_days',
  'next_60_days',
  'next_90_days',
  'next_120_days',
  'current_week',
  'next_week',
  'last_week',
  'current_month',
  'next_month',
  'last_month',
  'current_year',
  'next_year',
  'last_year',
]

export const additionalFields = [
  {
    key: 'user_id',
    lbl: 'User',
    type: 'user',
    typ: 'user',
    name: 'User',
  },
  {
    key: 'user_ip',
    lbl: 'IP address',
    type: 'text',
    typ: 'text',
    name: 'IP address',
  },

  {
    key: 'referer',
    lbl: 'Refer URL',
    type: 'text',
    typ: 'text',
    name: 'Refer URL',
  },
  {
    key: 'user_device',
    lbl: 'Device',
    type: 'text',
    typ: 'text',
    name: 'Device',
  },
  {
    key: 'status',
    lbl: 'Entry Status',
    type: 'boolean',
    typ: 'boolean',
    name: 'Entry Status',
  },
  {
    key: 'created_at',
    lbl: 'IP address',
    type: 'date',
    typ: 'date',
    name: 'Created Time',
  },
]

export const getLogicOptionByFieldType = (type, fields, fieldKey) => {
  const options = [
    {
      title: '',
      type: 'group',
      childs: [
        { label: __('Equal'), value: '=' },
        { label: __('Not equal'), value: '!=' },
        { label: __('Empty'), value: 'empty' },
        { label: __('Not empty'), value: 'not_empty' },
      ],
    },
  ]

  if (!type.match(/^(number|color|url|password|email|date|time|datetime|month|week|boolean)$/)) {
    options[0].childs.push(
      { label: __('Start With'), value: 'start_with' },
      { label: __('End With'), value: 'end_with' },
      { label: __('Not Start With'), value: 'not_start_with' },
      { label: __('Not End With'), value: 'not_end_with' },
    )
  }

  if (!type.match(/^(number|date|time|datetime|month|week|boolean)$/) && !type.match(/^(check|radio)$/)) {
    options[0].childs.push({ label: __('Not contains'), value: 'not_contains' })
  }

  if (((type === 'select' && fields?.[fieldKey]?.mul) || type === 'check')) {
    options[0].childs.push({ label: __('Contain All'), value: 'contain_all' })
  }
  if (type.match(/^(number|date|time|datetime|month|week)$/)) {
    options[0].childs.push({ label: __('Greater Than'), value: 'greater_than' })
    options[0].childs.push({ label: __('Less Than'), value: 'less_than' })
    options[0].childs.push({ label: __('Greater Than or Equal'), value: 'greater_than_equal' })
    options[0].childs.push({ label: __('Less Than or Equal'), value: 'less_than_equal' })
  }

  if (type.match(/^(date|datetime)$/)) {
    options.push({
      title: 'Day',
      type: 'group',
      childs: [
        { label: __('Today'), value: 'today' },
        { label: __('Till Today'), value: 'till_today' },
        { label: __('Tomorrow'), value: 'tomorrow' },
        { label: __('Yesterday'), value: 'yesterday' },
        { label: __('Till Yesterday'), value: 'till_yesterday' },
        { label: __('Last 7 Days'), value: 'last_7_days' },
        { label: __('Last 30 Days'), value: 'last_30_days' },
        { label: __('Last 60 Days'), value: 'last_60_days' },
        { label: __('Last 90 Days'), value: 'last_90_days' },
        { label: __('Last 120 Days'), value: 'last_120_days' },
        { label: __('Next 7 Days'), value: 'next_7_days' },
        { label: __('Next 30 Days'), value: 'next_30_days' },
        { label: __('Next 60 Days'), value: 'next_60_days' },
        { label: __('Next 90 Days'), value: 'next_90_days' },
        { label: __('Next 120 Days'), value: 'next_120_days' },
      ],
    })

    options.push({
      title: 'Week',
      type: 'group',
      childs: [
        { label: __('Current Week'), value: 'current_week' },
        { label: __('Next Week'), value: 'next_week' },
        { label: __('Last Week'), value: 'last_week' },
      ],
    })

    options.push({
      title: 'Month',
      type: 'group',
      childs: [
        { label: __('Current Month'), value: 'current_month' },
        { label: __('Next Month'), value: 'next_month' },
        { label: __('Last Month'), value: 'last_month' },
      ],
    })

    options.push({
      title: 'Year',
      type: 'group',
      childs: [
        { label: __('Current Year'), value: 'current_year' },
        { label: __('Next Year'), value: 'next_year' },
        { label: __('Last Year'), value: 'last_year' },
      ],
    })
  }
  return options
}

export const stringToArray = (type, val) => {
  if (['user', 'select', 'check'].includes(type)) {
    return val === '' ? [] : val.split(',')
  }
  return val
}

{ /* <MtSelect
        label="Logic"
        value={logicValue || ''}
        onChange={e => changeLogic(e.target.value, lgcInd, subLgcInd, subSubLgcInd)}
        className="w-5"
      >
        <option value="">{__('Select One')}</option>
        <option value="=">{__('Equal')}</option>
        <option value="!=">{__('Not Equal')}</option>
        <option value="empty">{__('Is Empty')}</option>
        <option value="not_empty">{__('Is Not Empty')}</option>
        {!type.match(/^(number|date|time|datetime|month|week)$/) && <option value="contain">{__('Contain')}</option>}

        {((fldType === 'select' && fields?.[fieldKey]?.mul) || fldType === 'check') && <option value="contain_all">{__('Contain All')}</option>}
        {!type.match(/^(number|date|time|datetime|month|week)$/) && <option value="not_contain">{__('Not Contain')}</option>}
        {type.match(/^(number|date|time|datetime|month|week)$/) && <option value=">">{__('Greater Than')}</option>}
        {type.match(/^(number|date|time|datetime|month|week)$/) && <option value="<">{__('Less Than')}</option>}
        {type.match(/^(number|date|time|datetime|month|week)$/) && <option value=">=">{__('Greater Than or Equal')}</option>}
        {type.match(/^(number|date|time|datetime|month|week)$/) && <option value="<=">{__('Less Than or Equal')}</option>}
        {!type.match(/^(number|color|url|password|email|date|time|datetime|month|week)$/) && <option value="start_with">{__('Start With')}</option>}
        {!type.match(/^(number|color|url|password|email|date|time|datetime|month|week)$/) && <option value="end_with">{__('End With')}</option>}
        {!type.match(/^(number|color|url|password|email|date|time|datetime|month|week)$/) && <option value="not_start_with">{__('Not Start With')}</option>}
        {!type.match(/^(number|color|url|password|email|date|time|datetime|month|week)$/) && <option value="not_end_with">{__('Not End With')}</option>}

        {type.match(/^(date|time|datetime)$/) && (
          <>
            <optgroup label={__('Days')}>
              <option value="today">{__('Today')}</option>
              <option value="till_today">{__('Till Today')}</option>
              <option value="tomorrow">{__('Tomorrow')}</option>
              <option value="till_tommorrow">{__('Till Tomorrow')}</option>
              <option value="yesterday">{__('Yesterday')}</option>
              <option value="till_yesterday">{__('Till Yesterday')}</option>
            </optgroup>
            <optgroup label={__('Month')}>
              <option value="current_month">{__('Current Month')}</option>
              <option value="next_month">{__('Next Month')}</option>
              <option value="last_month">{__('Last Month')}</option>
            </optgroup>
            <optgroup label={__('Week')}>
              <option value="current_week">{__('Current Week')}</option>
              <option value="next_week">{__('Next Week')}</option>
              <option value="last_week">{__('Last Week')}</option>
            </optgroup>
            <optgroup label={__('Year')}>
              <option value="current_year">{__('Current Year')}</option>
              <option value="next_year">{__('Next Year')}</option>
              <option value="last_year">{__('Last Year')}</option>
            </optgroup>
          </>
        )}

      </MtSelect> */ }
