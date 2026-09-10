import {useState} from 'react';

import './App.css'
import Spinner from "./components/Spinner/Spinner.jsx";
import Accordion from "./components/Accordion/Accordion.jsx";
import RgbPickerWithInputs from "./components/ColorPicker/ColorPicker.jsx";

function App() {
    const [portion, setPortion] = useState(5);

    const clickHandler = () => {
        console.log(portion);
    }


    const elementList = [
        {
            "id": 1,
            "slot": "Водичка"
        },
        {
            "id": 2,
            "slot": "Огненная водичка\uD83D\uDD25"
        },
        {
            "id": 3,
            "slot": "Чай улун"
        }
    ]

    return (
        <>
            <section id="center">
                <RgbPickerWithInputs/>

            </section>

            <section id="center">
                <Accordion
                    title="Game"
                    initialOpen={false}
                >
                    <Spinner
                        defaultValue={portion}
                        min={1}
                        max={10}
                        step={1}
                        onChange={val => setPortion(val)}/>
                </Accordion>
            </section>

        </>
    )
}

export default App
