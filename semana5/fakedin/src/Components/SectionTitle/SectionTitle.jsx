import React from 'react'
import PropTypes from 'prop-types'
import './SectionTitle.css'

function SectionTitle(props) {
    return (
        <div className="section-title">
            {props.title}
        </div>
    )
}

SectionTitle.propTypes = {
    title: PropTypes.string.isRequired,
}

export default SectionTitle

