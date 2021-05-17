
export const checkApiSuccess = (response, actionName, dispatch) => {
  if (response.data.error.type !== 200 && dispatch) {
    errorHandler(response.data.error, actionName, dispatch)
    return false
  }
  return true
}

const errorHandler = function(error, actionName, dispatch) {
  if (!dispatch) {
    return
  }

  if (error.type === 402) {
    dispatch('needUpgradeSubscriptionPlan', {
      title: error.message || 'Upgrade Subscription now!'
    }, { root: true })
  } else {
    dispatch('setSubmitFormError', {
      title: 'Error ' + actionName,
      message: error.message || 'Ooops! Something went wrong. The operation was not completed'
    }, { root: true })
  }
}
export function firstCharUppercase(base) {
  return base[0].toUpperCase() + base.substr(1, base.length).toLowerCase()
}

export function isTarget(target, clickTarget, findingStop) {
  if (clickTarget === target) return true
  let parent = clickTarget.parentNode
  while (parent) {
    if (parent === target) {
      return true
    }
    if (parent === findingStop) {
      parent = null
      return false
    } else {
      parent = parent.parentNode
    }
  }
  return false
}
