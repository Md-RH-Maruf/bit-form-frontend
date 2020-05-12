/* eslint-disable react/react-in-jsx-scope */
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { SelectControl, Icon } = wp.components; // Import SelectControl() from wp.components

const blockStyle = {
  backgroundColor: '#900',
  color: '#fff',
  padding: '20px',
};

const bitformsIcon = () => (
  <Icon icon={(
    <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 163 163">
      <defs />
      <path fill="#13233c" d="M106 0H57A57 57 0 000 57v49a57 57 0 0057 57h49a57 57 0 0057-57V57a57 57 0 00-57-57zM51 60v3l-1 59v12c0 5-3 8-8 6-2-1-3-4-3-6v-21-55a29 29 0 011-4 5 5 0 015-4h33a4 4 0 004-2c2-3 8-2 10-1a9 9 0 015 9 9 9 0 01-7 8c-3 1-6 0-9-3a3 3 0 00-1-1H51zm73 74c-6 5-12 6-20 6H72a8 8 0 01-4-1 5 5 0 01-2-6 5 5 0 015-3h35c11-1 20-10 21-20 0-11-8-20-18-23a6 6 0 00-1 0H78h-1v14l1 2h18a4 4 0 003-1c4-4 8-3 11-1 4 2 5 7 3 12-2 4-9 6-13 2a6 6 0 00-5-1H71c-3 0-5-2-5-6V82c0-4 1-5 5-6h17a21 21 0 0021-24c-1-9-8-16-16-18a25 25 0 00-6 0H46c-4 0-7-3-7-6s3-5 7-5h42a33 33 0 0132 23c2 11 0 20-6 29l-1 2 5 2c11 4 17 12 19 23 3 12-2 24-13 32z" />
    </svg>
)}
  />
)
registerBlockType('bitforms/form-shortcode', {
  title: __('Bit Forms', 'bitforms'),
  icon: bitformsIcon,
  category: 'layout',
  attributes: {
    formID: { type: 'Integer', default: 0 },
    formName: { type: 'string', default: '' },
  },
  example: {
    attributes: {
      formName: __('New Form'),
    },
  },
  edit: props => {
    const AllForms = [{ value: 0, label: '--select a form--', disabled: true }]
    bitformsBlock.forms.map(form => {
      AllForms.push({ label: form.form_name, value: form.id })
    })
    const { attributes, setAttributes, className } = props;
    const onChangeContent = formID => {
      setAttributes({ formID });
    };
    return (
      <div className={className}>
        <SelectControl
          label={__('Select a form ', 'bitforms')}
          value={attributes.formID}
          options={AllForms}
          onChange={onChangeContent}
        />
      </div>
    );
  },
  save: props => {
    const formID = parseInt(props.attributes.formID)
    return `[bitforms id='${formID}']`;
  },
});
