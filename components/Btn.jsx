import React from 'react'
import { Spinner } from 'react-activity';

export default function Btn({
    text,
    className,
    loading,
    disabled,
    onClick,
    style,
    icon
}) {
    return (
        <button
            className={"mt-3 axil-button button-rounded hover-flip-item-wrapper text-center " + className}
            tabindex="0"
            disabled={loading || disabled}
            onClick={onClick}
            style={style}
        >
            {icon}{' '}{loading ? <Spinner color='white' className='mt-3' /> : text}
        </button>
    )
}
