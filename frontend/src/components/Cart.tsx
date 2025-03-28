import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Amulet } from '../models/Amulet'

const products:Amulet[] = [
  {
    id : 1,
    name : "พระปิดตาหลังยันต์นะ หลวงปู่โต๊ะ",
    templeName : "วัดประดู่ฉิมพลี",
    price : 1390,
    type : "หลังยันต์นะ เนื้อผง ฝั่งตะกรุดเงิน",
  },
  {
    id : 2,
    name : "พระปิดตาหลังยันต์นะ หลวงปู่โต๊ะ",
    templeName : "วัดประดู่ฉิมพลี",
    price : 2000,
    type : "หลังยันต์นะ เนื้อผง ฝั่งตะกรุดเงิน",
  },
]

interface CartSlideOverProps {
  open : boolean;
  setOpen : Dispatch<SetStateAction<boolean>>;
  cart : Amulet[];
  setCart : Dispatch<SetStateAction<Amulet[]>>;
}

export default function CartSlideOver({open , setOpen, cart, setCart}: CartSlideOverProps) {
  const [total , setTotal] = useState<number>(0);

  useEffect(()=>{
    setCart(products);
  },[]);

  useEffect(() => {
    const t = cart?.reduce((sum , amulet) => sum + amulet.price,0);
    setTotal(t);
  },[cart]);

  const removeAmulet = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const c = cart.filter((amulet , idx) => idx != index);
    setCart(c);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <FontAwesomeIcon icon={faXmark}/>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cart.map((product , index) => (
                          <li key={index} className="flex py-6">
                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              {/* <img alt={product.imageAlt} src={product.imageSrc} className="size-full object-cover" /> */}
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    {product.name}
                                  </h3>
                                  <p className="ml-4">{product.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{product.type}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-end text-sm">
                                {/* <p className="text-gray-500">Qty {product.quantity}</p> */}

                                <div className="flex">
                                  <button type="button" onClick={(e)=>removeAmulet(index,e)} className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500">
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{total}</p>
                  </div>
                  {/* <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p> */}
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
