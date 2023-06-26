import React from 'react'
import './Logo.scss'

export default function Logo({topText, bottomText}) {
    return (
            <div className="logo">
                <div className="logo_content">{topText}</div>
                <div className="logo_content">{bottomText}</div>
            </ div>
        
    )
}