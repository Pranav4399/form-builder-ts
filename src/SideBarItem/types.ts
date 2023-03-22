//Data comes from constants.js SIDEBAR_ITEMS array. If you make changes there, need to do it here as well
export default interface ISideBarItemProps{
    data : {
        id: string,
        type: string,
        component: {
            type: string,
            content: string
        }
    } 
}