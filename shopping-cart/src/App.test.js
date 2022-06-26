import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Card from './components/card';
import Apple from './images/Apple.jpg';
import Laptop from './images/Laptop.jpg';
import Cart from './components/cart';
import App from './App';


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

describe('Cart component tests', () => {
  it('Renders "Cart empty" when no products have been added to the cart', () => {
    // set up props
    const submission = [];
    render(<Cart submission={submission} />);
    expect(screen.getByText("Cart empty")).toBeInTheDocument();
  })

  it('Renders all cart elements provided in the submission prop', () => {
    // set up props
    const submission = [{image:Apple,   name: "Apple",   price: 10,  id: 0, quantity: 1},
                        {image:Laptop,  name: "Laptop",  price: 500, id: 1, quantity: 1}];
    render(<Cart submission={submission} />);
    expect(screen.getByText("Apple") && screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByTestId("1-quantity-display").textContent).toBe("Quantity: 1");
  })

  it('Renders laptop with quantity 1 when added to the cart', () => {
    // set up props
    const submission = [{image:Apple,   name: "Apple",   price: 10,  id: 0, quantity: 1},
                        {image:Laptop,  name: "Laptop",  price: 500, id: 1, quantity: 1}];
    render(<Cart submission={submission} />);
    expect(screen.getByTestId("1-quantity-display").textContent).toBe("Quantity: 1");
  })

  it('Changes quantity of laptops if user adds the product when it is already in the cart', () => {
    render(<App />);
    const shopLink = screen.getByTestId("test-shop-link");
    userEvent.click(shopLink);
    const addProductToCart = screen.getByTestId("1-add-to-cart")

    for(let j = 0; j<10; j++){
      userEvent.click(addProductToCart);
    }


    const laptopQuantity = screen.getByTestId("0-quantity-display");
  
    expect(laptopQuantity.textContent).toBe("Quantity: 10");
  })

  it('Changes total price correctly when adding three laptops to the cart', () => {
    render(<App />);
    const shopLink = screen.getByTestId("test-shop-link");
    userEvent.click(shopLink);
    const addProductToCart = screen.getByTestId("1-add-to-cart")

      for(let j = 0; j<3; j++){
        userEvent.click(addProductToCart);
      }
  

    const totalPrice = screen.getByTestId("total-price-id");
  
    expect(totalPrice.textContent).toBe("$1500");
  })
})
