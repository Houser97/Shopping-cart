import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from './App';
import Card from './components/card';
import Apple from './images/Apple.jpg';


describe('Card component tests', () => {
  it("Increments amount of products correctly", () =>{
    render(<Card image= {Apple} imageName = {"Apple"} price = {10} id={0}/>)
    const buttonIncrease = screen.getByTestId("0");
    const DIV = screen.getByTestId('01');
    act(()=>{
      for(let i = 0; i<3; i++){
        userEvent.click(buttonIncrease);
      }
    })
     expect(DIV.innerHTML).toBe("4");
  })

  it("Decrements amount of products correctly", () => {
    render(<Card image= {Apple} imageName = {"Apple"} price = {10} id={0}/>);
    const decreaseButton = screen.getByTestId("decrement");
    const increaseButton = screen.getByTestId("0");
    const DIV = screen.getByTestId("01");

    act(() => {
      for(let i = 0; i<10; i++){
        userEvent.click(increaseButton);
      }
    })

    act(() => {
      for(let j = 0; j<5; j++){
        userEvent.click(decreaseButton);
      }
    })
    expect(DIV.textContent).toBe("6");
  })

  it("Does not decrement below 1", () => {
    render(<Card image= {Apple} imageName = {"Apple"} price = {10} id={0}/>);
    const decreaseButton = screen.getByTestId("decrement");
    const increaseButton = screen.getByTestId("0");
    const DIV = screen.getByTestId("01");

    act(() => {
      for(let i = 0; i<2; i++){
        userEvent.click(increaseButton);
      }
    })

    act(() => {
      for(let j = 0; j<45; j++){
        userEvent.click(decreaseButton);
      }
    })

    expect(DIV.textContent).toBe("1");
  })
})
