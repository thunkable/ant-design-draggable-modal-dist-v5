import * as React from 'react';
export declare const useResize: (x: number, y: number, width: number, height: number, onResize: (args: {
    x: number;
    y: number;
    width: number;
    height: number;
}) => void) => (e: React.MouseEvent) => void;
