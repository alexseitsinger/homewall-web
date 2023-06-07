import React from "react"
import { Route, Navigate } from "react-router-dom"

export default function RequireState(props) {
  if (props.hasOwnProperty('name') && props.hasOwnProperty('value') && props[props.name] === props.value) {
    return props.children
  }
  if (props.hasOwnProperty('redirectTo') && typeof props.redirectTo === 'string') { 
    return <Navigate to={props.redirectTo} />
  }
  if (props.hasOwnProperty('component')) {
    return props.component
  }
  return null
}
