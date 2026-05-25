import {useGame} from "../context/GameContext";

function Numpad(){
    const {placeNumber, eraseCell} = useGame();

    return (
    <div className ="numpad">
        {[1,2,3,4,5,6,7,8,9].map(n =>
            <button key={n} onClick={() => placeNumber(n)}>
                {n}
            </button>
        )}
        <button className="erase"onClick={eraseCell}>Erase</button>
    </div>
    )
}

export default Numpad;