import React from 'react';

export function Square({piece, classes, inlineStyles, onClick}) {
    return (
        <button className={classes} onClick={onClick} style={inlineStyles}>
            { null !== piece ? piece.owner : null }
        </button>
    );
}