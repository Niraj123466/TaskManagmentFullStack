module.exportes = {
    apps: [
        {
            name: "stackd",
            script: "npm",
            args: "run dev",
            env:{
                NODE_ENV: "development",
            },
        },
    ],
}