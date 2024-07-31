const base_url="https://dummyjson.com/";

export async function getData(endpoint){
    try{
        const res = await fetch(`https://dummyjson.com/${endpoint}`);
       
        if(res.ok){
            const data = await res.json();
            return data;
        }else{
            throw new Error('Something went wrong');
        }
    }catch(err){
        return err;
    }
}


export async function getManyRequests(uiHandlers , requestConfig){
    /* uiHandlers: {
          startLoading: logic happen during request calling
          error: method take 'err' handle case error in ui
          stopLoading: method to be called when request is done (in finally block)
    }
    requestConfig: array of objects {
        endpoint: endpoint to receive data from , 
        success: logic that happens when reply sent correctly
    } */
    const {startLoading , error , stopLoading} = uiHandlers;
    startLoading();
    try{
        const mappedRequests = requestConfig.map((item,index) => getData(item.endpoint));    
        
        const results = await Promise.all(mappedRequests);

        results.forEach((item,index)=>{      
            if(item instanceof Error){   
              throw new Error("Something went wrong");
            }
            //in case of not of type Error
            requestConfig[index].success(item);
        });
        return results;
    }catch(err){
        error(err);
    }finally{
        stopLoading();
        // console.log("executing finally block");
    }
}

export default async function handelRemoteRequest(
    endpoint,
    success,
    error,
    startLoading,
    stopLoading
  ) {
    startLoading();
    try {
      const res = await fetch(`${base_url}${endpoint}`);
      if (res.ok) {
        const data = await res.json();
        success(data);
      } else {
        throw new Error("something went wrong");
      }
    } catch (e) {
      console.log(e);
      error(e);
    } finally {
      if (stopLoading && typeof stopLoading === "function") stopLoading();
    }
  }