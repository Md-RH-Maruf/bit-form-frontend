import bitsFetch from '../../../Utils/bitsFetch'

export const handleInput = (e, formID, marketingHubConf, setMarketingHubConf, setisLoading, setSnackbar, isNew, error, setError) => {
  let newConf = { ...marketingHubConf }
  if (isNew) {
    const rmError = { ...error }
    rmError[e.target.name] = ''
    setError({ ...rmError })
  }
  newConf[e.target.name] = e.target.value

  switch (e.target.name) {
    case 'list':
      newConf = listChange(newConf, formID, setMarketingHubConf, setisLoading, setSnackbar)
      break;
    default:
      break;
  }
  setMarketingHubConf({ ...newConf })
}

export const listChange = (marketingHubConf, formID, setMarketingHubConf, setisLoading, setSnackbar) => {
  const newConf = { ...marketingHubConf }
  newConf.field_map = [{ formField: '', zohoFormField: 'Contact Email' }]

  if (!newConf?.default?.fields?.[newConf.list]) {
    refreshContactFields(formID, newConf, setMarketingHubConf, setisLoading, setSnackbar)
  }
  return newConf
}

export const refreshLists = (formID, marketingHubConf, setMarketingHubConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshListsRequestParams = {
    formID,
    id: marketingHubConf.id,
    dataCenter: marketingHubConf.dataCenter,
    clientId: marketingHubConf.clientId,
    clientSecret: marketingHubConf.clientSecret,
    tokenDetails: marketingHubConf.tokenDetails,
  }
  bitsFetch(refreshListsRequestParams, 'bitforms_zmarketingHub_refresh_lists')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...marketingHubConf }
        if (result.data.lists) {
          newConf.default = { ...newConf.default, lists: result.data.lists }
        }
        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setSnackbar({ show: true, msg: 'Lists refreshed' })
        setMarketingHubConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Lists refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Lists refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshContactFields = (formID, marketingHubConf, setMarketingHubConf, setisLoading, setSnackbar) => {
  const { list } = marketingHubConf
  if (!list) {
    return
  }

  setisLoading(true)
  const refreshContactFieldsRequestParams = {
    formID,
    list,
    dataCenter: marketingHubConf.dataCenter,
    clientId: marketingHubConf.clientId,
    clientSecret: marketingHubConf.clientSecret,
    tokenDetails: marketingHubConf.tokenDetails,
  }
  bitsFetch(refreshContactFieldsRequestParams, 'bitforms_zmarketingHub_refresh_contact_fields')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...marketingHubConf }
        if (result.data.fields) {
          if (!newConf.default.fields) {
            newConf.default.fields = {}
          }

          newConf.default.fields[list] = result.data

          setSnackbar({ show: true, msg: 'Contact Fields refreshed' })
        } else {
          setSnackbar({ show: true, msg: "Zoho didn't provide fields names for this list" })
        }

        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setMarketingHubConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: 'Contact Fields refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const checkMappedFields = (marketingHubConf) => {
  const mappedFields = marketingHubConf?.field_map ? marketingHubConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && marketingHubConf?.default?.fields?.[marketingHubConf.list]?.required.indexOf(mappedField.zohoFormField) !== -1)) : []
  if (mappedFields.length > 0) {
    return false
  }

  return true
}
