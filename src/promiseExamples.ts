export const awaitExmaple = () => {
    console.log("awaitExmaple")

    function waitFor2Seconds(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                resolve("Hello There");
            }, 1500);
        })
    }

    function performNetworkTast(): Promise<any> {
        return new Promise((res, rej) => {
            let random = Math.floor(Math.random() * 10) % 2
            setTimeout(() => {
                if (random === 0) {
                    res("random === 0")
                } else if (random === 1) {
                    rej("random === 1")
                }
            }, 240)

        })
    }

    let executeNetworkTasks = async () => {
        console.log("ASYNC FUNCTOIN executeNetworkTasks")

        let helloThere = await waitFor2Seconds();
        console.log(helloThere);
        let randomNetworkTest = await performNetworkTast()
        console.log(randomNetworkTest);
        console.log("ASYNC FUNCTOIN COMPLETE")
    }

    let executeNetworkTasksTry = async () => {
        try {
            console.log("ASYNC FUNCTOIN executeNetworkTasksTry")
            let helloThere = await waitFor2Seconds();
            console.log(helloThere);
            let randomNetworkTest = await performNetworkTast()
            console.log(randomNetworkTest);                
        } catch(e) {
            console.log("ERRROR catch something", e)
        }
    }

    const execution = async () => {
        try {
            await executeNetworkTasks() 
            await executeNetworkTasksTry()    
        } catch (e) {
            console.log(`ERROR ${e}`)
        }
    }
    execution()
}

export const promiseExmaples = () => {

    function waitFor2Seconds(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                resolve("Hello There");
            }, 1500);
        })
    }

    function performNetworkTast(): Promise<any> {
        return new Promise((res, rej) => {
            let url = "www.google.com"
            let random = Math.floor(Math.random() * 10) % 2
            console.log(random);
            setTimeout(() => {
                if (random === 0) {
                    res("random === 0")
                } else if (random === 1) {
                    rej("random === 1")
                }
            }, 240)

        })
    }

    performNetworkTast()
        .then(function(task) {
            console.log("task " + task);
        })
        .catch(function(e) {
            console.log(e)
        })


    let promise = waitFor2Seconds()
        .then(function (a) {
            console.log(a);
            return new Promise((resolve) => resolve("exmaple"))
        })
        .then(function (b) {
            console.log(b);
        })
        .catch(function (e) {
            console.log(e);
        })
}
