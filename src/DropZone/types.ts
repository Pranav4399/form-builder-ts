import React, { DragEvent } from 'react';
export default interface IDropZoneProps{
    data: dropZoneProps,
    onDrop: (...args: any[]) => void, //Error will get resolved if we give any type or this will work - (...args: any[]) => void;
    isLast?: boolean,
    className?: string,
    availableSize: number,
    path?: number[],
    style?: React.CSSProperties,
}



interface dropZoneProps{
    path: number[],
    childrenCount: number,
    availableSize: number,
    type: string,
    modify?: boolean
}

export interface itemProps{
    id: string,
    origin: string,
    type: string,
    component: {
        content: string,
        type: string
    },
    path: number[],
    children: childrenProps[]
}

interface childrenProps{
    id: string,
    size: number,
    type: string
}


