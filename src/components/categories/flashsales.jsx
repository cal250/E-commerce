import React, { useRef } from "react";
import Product from "../product";
import { products } from "../../data/products";
import { useImperativeHandle } from "react";

const FlashsalesProducts = React.forwardRef((props, ref) => {
  const scrolldiv = useRef(null);
  const salesProducts = [];

  // Populate salesProducts array with Product components
  for (let index = 0; index < 12; index++) {
    const element = products[index];
    const product = (
      <Product
        {...element}
        key={element.id}
        updateheader={props.updateheader}
        updateheaderwishlist={props.updateheaderwishlist}
      />
    );
    salesProducts.push(product);
  }

  // Function to scroll left or right based on direction
  function scroll(direction) {
    if (direction === "left") {
      scrolldiv.current.scrollLeft -= 800;
    } else {
      scrolldiv.current.scrollLeft += 800;
    }
  }

  // Expose scroll function using useImperativeHandle
  useImperativeHandle(ref, () => ({
    scroll,
  }));

  return (
    <div className={`${props.display} gap-2 max-w-full grid-cols-6 flex-nowrap overflow-auto transition scroll-smooth scrollbar-hidden`} ref={scrolldiv}>
      {salesProducts}
    </div>
  );
});

function FlashSales(props) {
  const [display, setDisplay] = React.useState("flex");
  const scrolldiv = useRef(null);

  // Toggle display between grid and flex
  function handleDisplay() {
    const nextDisplay = display === "flex" ? "grid" : "flex";
    setDisplay(nextDisplay);
  }

  // Function to handle scrolling direction
  function handleScroll(direction) {
    if (scrolldiv.current) {
      scrolldiv.current.scroll(direction);
    }
  }

  return (
    <>
      <div className="flex flex-row w-11/12 justify-between flex-wrap">
        <div className="flex flex-row w-6/12 justify-between flex-wrap">
          <div>
            <div className="flex">
              <button className="bg-red-500 w-3 h-6 rounded-sm"></button>
              <p className="text-red-600 ml-2">Today's</p>
            </div>
            <h1 className="text-4xl font-semibold my-4">Flash sales</h1>
          </div>
          <div className="flex flex-row mt-7 items-end">
            {/* Countdown timers */}
            <div className="flex flex-col w-10 mx-1 text-black">
              <p className="text-xs font-semibold opacity-70">days</p>
              <h1 className="text-3xl font-semibold mb-4 -mt-1">03</h1>
            </div>
            <span className="text-red-600 text-3xl mb-4">:</span>
            <div className="flex flex-col w-10 mx-1 text-black">
              <p className="text-xs font-semibold opacity-70">hours</p>
              <h1 className="text-3xl font-semibold mb-4 -mt-1">23</h1>
            </div>
            <span className="text-red-600 text-3xl mb-4">:</span>
            <div className="flex flex-col w-10 mx-1 text-black">
              <p className="text-xs font-semibold opacity-70">minutes</p>
              <h1 className="text-3xl font-semibold mb-4 -mt-1">19</h1>
            </div>
            <span className="text-red-600 text-3xl mb-4">:</span>
            <div className="flex flex-col w-10 mx-1 text-black">
              <p className="text-xs font-semibold opacity-70">seconds</p>
              <h1 className="text-3xl font-semibold mb-4 -mt-1">56</h1>
            </div>
          </div>
        </div>
        {/* Navigation buttons for scrolling products */}
        <div className="flex flex-row items-center">
          <button className="w-8 h-8 rounded-full bg-gray-100 mx-1" onClick={() => handleScroll("left")}>
            <img src={"/images/arrow-small-left.svg"} alt="Left Arrow" className="w-8" />
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-100" onClick={() => handleScroll("right")}>
            <img src={"/images/arrow-small-right.svg"} alt="Right Arrow" className="w-8" />
          </button>
        </div>
      </div>

      {/* Render FlashsalesProducts component */}
      <FlashsalesProducts display={display} ref={scrolldiv} updateheader={props.updateheader} updateheaderwishlist={props.updateheaderwishlist} />

      {/* Toggle button to show more or fewer products */}
      <button className="py-2 px-8 bg-red-500 rounded text-white ml-[45%] mt-4" onClick={handleDisplay}>
        {display === "flex" ? "View All Products" : "Show Less Products"}
      </button>
      
      {/* Horizontal rule */}
      <hr className="bg-gray-400 mt-8 mr-28" />
    </>
  );
}

export default FlashSales;
