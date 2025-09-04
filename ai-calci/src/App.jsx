import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { explainExpression } from './lib/ai';
import Header from './components/Header'

const App = () => {

  // user typing
  const[expression, setExpression] = useState("");

  //Answer of the expression
  const[result, setResult] =useState("")

  //ai explains
  const[aiMsg, setAiMsg] = useState("Type an expression and press =")

  //loading for ai reply
  const [loading, setLoading] = useState(false)


  const handleClick = (value) => {
    setExpression((prev) => prev + value)
  }

  const handleClear = () => {
    setExpression("");
    setResult("");
    setAiMsg("Type an expression and press =")
  }

  const handleBackSpace = () => {
    setExpression((prev) => prev.slice(0, -1));
 }

 const handleEqual = () => {
  try {
    const value = eval(expression)
    setResult(value.toString());
    setAiMsg("Now Click Ask AI to steps")
  } catch (error) {
    setResult("Error")
  }
 }

 const handleAskAI = async () => {
  setLoading(true);
  setAiMsg("Wait for AI Response...")

  const text = await explainExpression(expression, result);
  setAiMsg(text);
  setLoading(false)
 }
  return (
 
     <>
     <Header/>
    
    <div className='min-h-screen bg-gradient-to-br from-purple-700 to-indigo-700'>
      <div className='max-w-6xl px-6 py-10 mt mx-auto'>
        <div className='mb-8 flex items-center justify-between mt-20'>
         
        </div>

        {/* two col cals and ai */}

        <div className='grid gap-6 lg:grid-cols-2'>
          <div className='bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-6'>
            <div className='mb-4'>
              <div className='text-white/60 text-xs uppercase'>Expression</div>
              <div className='text-white text-lg min-h-[40px]'>{expression || "0"}</div>

              <div className='h-px bg-white/10 my-3'></div>

              <div className='text-white/60 text-xs uppercase'>Result</div>
              <div className='text-white text-lg min-h-[40px]'>{result || "0"}</div>

              <div className='grid grid-cols-4 gap-3 mt-4'>

                {/* Row 1 */}
                <button className='btn danger' onClick={handleClear}>C</button>
                <button className='btn' onClick={handleBackSpace}>B</button>
                <button className='btn' onClick={() => handleClick("%")}>%</button>
                <button className='btn' onClick={() => handleClick("/")}>÷</button>

                {/* Row 2 */}
                <button className='btn'onClick={() => handleClick("7")}>7</button>
                <button className='btn'onClick={() => handleClick("8")}>8</button>
                <button className='btn'onClick={() => handleClick("9")}>9</button>
                <button className='btn'onClick={() => handleClick("*")}>x</button>

                {/* Row 3 */}
                <button className='btn'onClick={() => handleClick("4")}>4</button>
                <button className='btn'onClick={() => handleClick("5")}>5</button>
                <button className='btn'onClick={() => handleClick("6")}>6</button>
                <button className='btn'onClick={() => handleClick("-")}>-</button>

                {/* Row 4 */}
                <button className='btn'onClick={() => handleClick("1")}>1</button>
                <button className='btn'onClick={() => handleClick("2")}>2</button>
                <button className='btn'onClick={() => handleClick("3")}>3</button>
                <button className='btn'onClick={() => handleClick("+")}>+</button>

                {/* Row 5 */}
                <button className='btn'onClick={() => handleClick("0")}>0</button>
                <button className='btn'onClick={() => handleClick("00")}>00</button>
                <button className='btn'onClick={() => handleClick(".")}>.</button>
                <button className='btn' onClick={handleEqual}>=</button>
              </div>
            </div>
          </div>






          <div className='bg-white/10 rounded-3xl shadow-xl p-6 relative'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-white font-semibold'>AI Explain</h2>
              <button className='btn ai' onClick={handleAskAI} disabled={loading}>
                {loading ?
                <>
                <Loader2 size={16} className='animate-spin font-bold'/>
                </> : 
                "Ask AI"
                }
              </button>
            </div>

            <p className='text-white/90 text-md min-h-[180px]'>{aiMsg}</p>


            <div className='w-full text-center text-white/40 text-sm absolute bottom-5 left-1/2 -translate-x-1/2'>
              Privacy: We only send final expression and result when you click "Ask AI"
            </div>


          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App