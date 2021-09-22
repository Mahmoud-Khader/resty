function History(props) {
    
    async function handleResult(index) {
        const obj={
            method:props.history[index].method,
            url:props.history[index].url,
            reqBody:props.history[index].reqBody
        };
        await props.handleApiCalls(obj);
    }

    return(
        <>
        <h1>History : </h1>
        <ul>
            {props.history.map((ele,idx)=>{
                return(
                    <li key={idx}>
                        <div>
                            <p>
                                <span>
                                    <b>
                                        Method
                                    </b>
                                    {ele.method}
                                </span>
                                <br/>
                                <span>
                                    <b>URL</b>
                                    {ele.url}
                                </span>
                                
                                <button onClick={()=>handleResult(idx)}>Request</button>
                            </p>
                        </div>

                    </li>
                )
            })}
        </ul>
        </>
    )
}

export default History;