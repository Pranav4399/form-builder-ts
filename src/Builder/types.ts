import { DragEvent } from "react";

export default interface IBuilderProps{
    
}


export interface dropZoneProps{
    path: number[],
    childrenCount: number,
    availableSize: number,
    type: string,
    modify: boolean
}

export interface itemProps{
    id: string,
    origin: string,
    type: string,
    component: {
        content: string,
        type: string
    },
    path: any,
    size: number,
    children: childrenProps[]
}

interface childrenProps{
    id: string,
    size: number,
    type: string
}


