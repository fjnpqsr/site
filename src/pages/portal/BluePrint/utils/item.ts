import { G6GraphEvent } from "@antv/g6"

export const getNodeDataFromEvent = (event?: G6GraphEvent) => {
    if (!event) {
        return undefined
    }
    return event?.item?.getModel()
}


export const getJSXNodeAttrFromEvent = (event: G6GraphEvent, attrName: string) => {
    if (!event) {
        return undefined
    }
    return event.target.cfg[attrName]
}