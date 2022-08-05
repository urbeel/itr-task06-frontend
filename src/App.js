import {Fragment} from "react";
import {PersonTable} from "./components/PersonTable";

function App() {
    return (
        <div className="container pt-4">
            <Fragment>
                <PersonTable/>
            </Fragment>
        </div>
    );
}

export default App;
