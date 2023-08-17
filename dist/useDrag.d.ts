import * as React from 'react';
export declare const useDrag: (x: number, y: number, onDrag: (args: {
    x: number;
    y: number;
}) => void) => (e: React.MouseEvent) => void;
