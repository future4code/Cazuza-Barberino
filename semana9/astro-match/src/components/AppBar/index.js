import PropTypes from 'prop-types'
import React from 'react'
import logoImage from '../../img/logo.png'
import { AppBarWrapper, Logo } from './styled'

export const AppBar = (props) => {
  return (
    <AppBarWrapper>
      <>
        {props.leftAction}
      </>
      <Logo src={logoImage}/>
      <>
        {props.rightAction}
      </>
    </AppBarWrapper>
  )
}

AppBar.propTypes = {
  leftAction: PropTypes.object,
  rightAction: PropTypes.object,
}

export default AppBar;
