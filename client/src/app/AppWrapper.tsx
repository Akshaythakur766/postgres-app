'use client'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import React from 'react'

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <FluentProvider theme={webLightTheme}>
                {children}
            </FluentProvider>
        </div>
    )
}

export default AppWrapper