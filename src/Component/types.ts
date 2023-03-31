export default interface IComponentProps{
    data: {
        id: string,
        type: string,
        size: number,
        component: {
            type: string,
            content: string
        }
    },
    path: number[],
    allowDrag: boolean,
    setAllowDrag: (args: boolean) => void,
    subSectionSize: number
}


