
function Text2() {

    const dispatch = useDispatch()

    const amount = useSelector(state => state)

    function handler() {
      dispatch({
        type:"change"
      })
  
    }

    
    return (
      <div className="App">
        {amount}
        <button onClick={handler}>+</button>
      </div>
    );
  }
  
  export default Text2;
  