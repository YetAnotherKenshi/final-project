import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProductCard from "../components/ui/productCard";
import { getProducts } from "../store/products";
import { Headphones, Keyboard, Mouse, MousePad } from "../utils/icons";

import CougarLogo from "../logos/Cougar.png";
import HyperXLogo from "../logos/HyperX.png";
import LogitechLogo from "../logos/Logitech.png";
import RazerLogo from "../logos/Razer.png";
import SteelseriesLogo from "../logos/Steelseries.png";
import ZowieLogo from "../logos/Zowie.png";

const Main = () => {
  const history = useHistory();
  const products = useSelector(getProducts());
  const productsSlice = products
    .toSorted(() => Math.random() - 0.5)
    .slice(0, 4);
  return (
    <div className="z-0">
      <div className="h-[calc(100vh-5rem)] flex items-center justify-between">
        <div>
          <h1 className="text-4xl mb-4">
            Все товары для геймеров теперь <br /> в одном месте
          </h1>
          <h3 className="text-xl mb-4 text-gray-600">
            Найди свой идеальный сетап!
          </h3>
          <button className="w-48 h-16 rounded-md bg-purple-500 text-white">
            Искать
          </button>
        </div>
        <div className="bg-gradient-to-t from-purple-500 via-transparent to-transparent w-1/2 h-full relative pointer-events-none">
          <img
            src="https://resource.logitechg.com/w_1800,c_limit,f_auto,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/gaming/en/non-braid/hyjal-g502-hero/g502-hero-intro-nb.png?v=1"
            alt=""
            className="object-contain absolute h-full z-20 -rotate-12"
          />
          <img
            src="https://media.steelseriescdn.com/thumbs/catalog/items/61470/97d494a637c740d885afebaa1bff6770.png.500x400_q100_crop-fit_optimize.png"
            alt=""
            className="object-contain absolute h-2/3 2xl:h-1/2 top-80 -right-40 xl:-right-32 xl:top-56 2xl:-right-48 2xl:top-80
						 z-0"
          />
          <img
            src="https://content.presspage.com/uploads/1500/1920_high-resolution-png-progamingkeyboardbty1us.png?10000"
            alt=""
            className="object-contain absolute h-2/3 2xl:h-1/2 top-10 right-32 xl:right-64 xl:top-0 2xl:right-32 2xl:top-10 z-10"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-8">
        <p className="text-3xl font-light">Специально для вас</p>
        <Link to="/shop/all">
          <p className="text-lg text-neutral-500">Перейти к товарам</p>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-6 mt-4">
        {productsSlice.map((p) => (
          <ProductCard product={p} />
        ))}
      </div>
      <hr className="border-t-neutral-300 my-8" />
      <p className="text-3xl font-light mt-8">По категориям</p>
      <div className="grid grid-cols-4 gap-6 mt-4">
        <button
          className="bg-gradient-to-tr from-purple-400 to-purple-500 h-48 rounded-md flex flex-col items-center justify-center"
          onClick={() => history.push("/shop/J6uNi8Aq0")}
        >
          <Mouse />
          <p className="text-white text-2xl font-semibold mt-2">Игровые мыши</p>
        </button>
        <button
          className="bg-gradient-to-tr from-blue-300 to-blue-400 h-48 rounded-md flex flex-col items-center justify-center"
          onClick={() => history.push("/shop/J6uNi8Aq1")}
        >
          <Keyboard />
          <p className="text-white text-2xl font-semibold mt-2">Клавиатуры</p>
        </button>
        <button
          className="bg-gradient-to-tr from-purple-400 to-purple-500 h-48 rounded-md flex flex-col items-center justify-center"
          onClick={() => history.push("/shop/J6uNi8Aq2")}
        >
          <Headphones />
          <p className="text-white text-2xl font-semibold mt-2">Наушники</p>
        </button>
        <button
          className="bg-gradient-to-tr from-blue-300 to-blue-400 h-48 rounded-md flex flex-col items-center justify-center"
          onClick={() => history.push("/shop/J6uNi8Aq3")}
        >
          <MousePad />
          <p className="text-white text-xl font-semibold mt-2">
            Коврики для мыши
          </p>
        </button>
      </div>

      <hr className="border-t-neutral-300 my-8" />
      <div className="text-3xl font-light mt-8">Наши партнёры</div>
      <div className="grid grid-cols-3 gap-6 my-4">
        <img src={CougarLogo} alt="" className="h-32 w-full object-cover" />
        <img src={LogitechLogo} alt="" className="h-32 w-full object-cover" />
        <img src={HyperXLogo} alt="" className="h-32 w-full object-cover" />
        <img src={RazerLogo} alt="" className="h-32 w-full object-cover" />
        <img
          src={SteelseriesLogo}
          alt=""
          className="h-32 w-full object-cover"
        />
        <img src={ZowieLogo} alt="" className="h-32 w-full object-cover" />
      </div>
    </div>
  );
};

export default Main;
