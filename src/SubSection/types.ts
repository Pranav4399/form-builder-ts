import { DragEvent } from "react"

export default interface ISubsectionProps{
    data: {
        id: string,
        type: string,
        size: number,
        children: childrenProps[]
    },
    handleDrop:  (...args: any[]) => void,
    handleResize:  (...args: any[]) => void, //Error will get resolved if we give any type or this will work - (...args: any[]) => void;
    path: number[],
    sectionSize: number,
    allowDrag: boolean,
    setAllowDrag: (args: boolean) => void,
    style?: React.CSSProperties,
    isLast?: boolean,
}

interface childrenProps{
    id: string,
    size: number,
    type: string
}

interface dropZoneProps{
    path: number[],
    childrenCount: number,
    availableSize: number,
    type: string,
    modify: boolean
}

interface itemProps{
    id: string,
    origin: string,
    type: string,
    component: {
        content: string,
        type: string
    }
}


