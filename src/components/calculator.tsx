import { MouseEventHandler, useReducer, useState } from "react"

const wrapperParent: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
}

const cssWrapperThreeByThree: React.CSSProperties = {
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr 1fr 1fr', 
    gridTemplateRows: '1fr 1fr 1fr 1fr',
    gap: '16px 16px',
}

const cssInputResult: React.CSSProperties = {
    gridColumn: '1 / 5',
}

enum CalculMethod {
    PLUS = '+',
    MINUS = '-',
}

interface StateCalc {
    operandOne: string;
    method?: CalculMethod;
    operandTwo: string;
    result: string;
}

const Calculator = () => {

    const [resultValue, setResultValue] = useState<StateCalc>({
        operandOne: '',
        operandTwo: '',
        result: '',
    });

    // const [state, dispatch] = useReducer(reducer, {
        
    // });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, val: number) => {
        if(resultValue.method) {
            let result: string = resultValue.operandOne + ' ' + resultValue.method + ' ' + (resultValue.operandTwo + val);
            setResultValue({ ...resultValue, operandTwo: resultValue.operandTwo + val, result: result })
        } else {
            setResultValue({ ...resultValue, operandOne: resultValue.operandOne + val, result: resultValue.operandOne + val})
        }
    }

    const handlePlusMinusMethod = (event: React.MouseEvent<HTMLButtonElement>, calculMethod: CalculMethod) => {
        if(resultValue.operandOne) {
            if(resultValue.method !== undefined) {
                //Calculate value before apply method
                switch(calculMethod) {
                    case CalculMethod.PLUS:
                        let operandOnePlus = (Number(resultValue.operandOne) + Number(resultValue.operandTwo)).toString();
                        setResultValue(
                            { 
                                ...resultValue, 
                                method: CalculMethod.PLUS, 
                                operandOne: operandOnePlus, 
                                operandTwo: '',
                                result: operandOnePlus + CalculMethod.PLUS
                            })
                        break;
                    case CalculMethod.MINUS:
                        let operandOneMinus = (Number(resultValue.operandOne) - Number(resultValue.operandTwo)).toString();
                        setResultValue(
                            { 
                                ...resultValue, 
                                method: CalculMethod.MINUS, 
                                operandOne: operandOneMinus, 
                                operandTwo: '',
                                result: operandOneMinus + CalculMethod.MINUS
                            })
                        break;
                }
            } else {
                setResultValue({ ...resultValue, method: calculMethod, result: resultValue.operandOne + calculMethod })
            }
        }
    }

    const handleValueMethod = () => {
        if(resultValue.operandOne && resultValue.operandTwo) {
            switch(resultValue.method) {
                case CalculMethod.PLUS:
                    let operandOnePlus = (Number(resultValue.operandOne) + Number(resultValue.operandTwo)).toString();
                    setResultValue(
                        { 
                            ...resultValue, 
                            method: undefined, 
                            operandOne: operandOnePlus, 
                            operandTwo: '',
                            result: operandOnePlus + CalculMethod.PLUS
                        })
                    break;
                case CalculMethod.MINUS:
                    let operandOneMinus = (Number(resultValue.operandOne) - Number(resultValue.operandTwo)).toString();
                    setResultValue(
                        { 
                            ...resultValue, 
                            method: undefined,  
                            operandOne: operandOneMinus, 
                            operandTwo: '',
                            result: operandOneMinus + CalculMethod.MINUS
                        })
                    break;
            }
            // let result: string = (Number(resultValue.operandOne) - Number(resultValue.operandTwo)).toString();
            // setResultValue({ ...resultValue, operandOne: result, result: result, method: undefined, operandTwo: ''});
        }
    }

    return (
        <div style={wrapperParent}>
            <div style={cssInputResult}>
                <p>{resultValue.result}</p>
            </div>
            <div style={cssWrapperThreeByThree}>
                {Array.from(Array(10).keys()).map((val: number) => {
                      return <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleClick(event, val)}>{val}</button>;
                })}
                <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => handlePlusMinusMethod(event, CalculMethod.PLUS) }> + </button>
                <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => handlePlusMinusMethod(event, CalculMethod.MINUS) }> - </button>
                <button onClick={handleValueMethod}> = </button>
            </div>
        </div>
    )
}

export default Calculator