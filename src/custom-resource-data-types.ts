interface StackProps {
    exportName: string,
    handler: {
        folder: string,
        handlerName: string,
        environment: {
            [key: string]: string
        },
        timeout: number
    },
    role: {
        parentResource: string,
        childResource: string,
        actions: string[]
    }
}

export {
    StackProps
}
