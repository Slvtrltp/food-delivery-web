import React from "react";

const Footer = () => {
  return (
    <div className=" flex gap-20 flex-col h-188.75 justify-center bg-[url('/footer-bg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="w-full h-25 bg-white flex overflow-hidden whitespace-nowrap items-center select-none gap-12">
        <div className="animate-loop-scroll flex gap-12 text-[30px] font-semibold text-[#448A5B] tracking-wider">
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
        </div>

        <div
          className="animate-loop-scroll flex gap-12 text-[30px] font-semibold text-[#448A5B] tracking-wider"
          aria-hidden="true"
        >
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
        </div>
      </div>
      <div className="text-white text-[16px] font-normal leading-6 flex gap-55 justify-start container mx-auto">
        <div className="flex flex-col items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="38"
            viewBox="0 0 46 38"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.4661 0.24198C21.2291 0.478965 21.2203 0.530356 21.2426 1.5663C21.2552 2.15901 21.225 2.68446 21.1755 2.7338C21.1259 2.78314 20.6008 2.89414 20.0086 2.98028C17.4119 3.35832 15.2288 4.11998 12.9118 5.45644C11.2389 6.42141 10.332 7.10036 8.96201 8.41362C7.54568 9.77131 6.61075 10.9553 5.40645 12.9164C5.06061 13.4798 4.39556 14.798 4.39556 14.9205C4.39556 14.9456 4.2871 15.2034 4.15456 15.4932C3.40896 17.1233 2.74567 20.133 2.72169 21.9948C2.70515 23.2824 2.75654 23.2271 1.46795 23.3449C0.491915 23.4341 0.337253 23.4735 0.174956 23.6739C-0.0801388 23.9889 -0.0554713 24.3321 0.243672 24.6312C0.494558 24.8821 0.506402 24.8837 1.58962 24.8202C2.19075 24.785 4.00401 24.6913 5.61915 24.612C7.2343 24.5327 9.32664 24.4242 10.2688 24.3707C12.9744 24.2174 13.6591 24.1821 15.0163 24.1264C16.351 24.0716 18.8048 23.9415 21.5258 23.7813C22.4142 23.729 23.7827 23.6631 24.567 23.6348C25.3513 23.6065 26.3424 23.5637 26.7695 23.5399C27.1966 23.516 28.6031 23.4498 29.8952 23.3928C31.1873 23.336 32.9493 23.2477 33.8107 23.1967C34.6721 23.1457 35.8835 23.0787 36.5026 23.0478C37.1217 23.0168 37.8926 22.9726 38.2156 22.9495C38.5387 22.9264 39.3536 22.882 40.0266 22.8506C44.4149 22.6468 45.5977 22.5474 45.7989 22.3653C46.0619 22.1272 46.0683 21.5269 45.8102 21.2933C45.6521 21.1502 45.4529 21.1276 44.5388 21.1487C43.9425 21.1625 43.4225 21.1415 43.3831 21.1022C43.3438 21.0627 43.2376 20.5374 43.1471 19.9346C42.9636 18.7109 42.9276 18.5378 42.7262 17.9087C42.6486 17.6664 42.5337 17.27 42.471 17.0277C42.4081 16.7854 42.317 16.5108 42.2685 16.4173C42.2198 16.3238 42.1801 16.1974 42.1801 16.1366C42.1801 15.9072 41.2488 13.8317 40.7617 12.9755C40.1169 11.8421 39.5494 10.9696 39.2569 10.6616C39.1309 10.5289 38.9115 10.2661 38.7694 10.0777C38.1678 9.27972 36.9438 8.05672 35.9437 7.25414C35.1665 6.6304 33.0211 5.21789 32.3913 4.91522C29.6127 3.58004 27.0152 2.89522 24.2341 2.76483C23.3564 2.72362 22.9368 2.66479 22.8415 2.56954C22.7592 2.48732 22.7019 2.21157 22.6969 1.87494C22.6781 0.60759 22.6502 0.405843 22.4651 0.201357C22.2086 -0.0820271 21.7723 -0.0643094 21.4661 0.24198ZM13.6928 7.26344C13.6916 7.33079 13.5044 7.67838 13.2768 8.03606C12.6521 9.01738 11.4437 11.2866 11.4436 11.4789C11.4435 11.5227 11.3333 11.7993 11.1987 12.0936C11.0641 12.3878 10.954 12.6845 10.954 12.753C10.954 12.8213 10.9131 12.9192 10.8631 12.9703C10.7311 13.1052 10.1131 15.5487 9.93589 16.6362C9.78377 17.569 9.72827 18.1246 9.63283 19.6707C9.54806 21.0425 9.29717 21.2325 7.53589 21.2593C6.16967 21.2801 5.92045 21.1753 5.67329 20.4758C5.48975 19.9564 5.61651 19.2719 6.25728 17.3214C6.78284 15.7218 6.8957 15.4399 7.45219 14.3358C8.33719 12.58 9.10825 11.4051 10.2787 10.0288C11.8626 8.16625 13.7028 6.67572 13.6928 7.26344ZM27.2523 26.8867C25.6318 26.9259 21.3166 27.1232 19.1276 27.2583C17.3433 27.3684 16.5484 27.4128 13.8906 27.5508C12.3563 27.6304 10.5723 27.7384 9.9262 27.7909C9.28014 27.8434 7.49615 27.9349 5.96176 27.9943C4.42738 28.0538 3.11118 28.1223 3.03699 28.1464C2.89818 28.1917 2.90826 28.3514 3.11402 29.3615C3.26604 30.1083 3.6989 31.5366 3.90799 31.9815C4.01733 32.214 4.17747 32.5896 4.26381 32.8162C4.70479 33.9727 5.64842 35.6088 6.49838 36.6906C6.75749 37.0205 6.97675 37.2904 6.98566 37.2904C6.99457 37.2904 7.21932 37.1857 7.48518 37.0579C8.8421 36.4053 9.48022 36.1208 9.90965 35.9771C11.2996 35.5124 13.6228 35.2115 15.2076 35.2913C16.6816 35.3654 24.4092 35.3632 25.4903 35.2882C26.6211 35.2099 27.2861 35.0761 27.9375 34.796C28.1528 34.7034 28.8136 34.4297 29.4058 34.1879C29.998 33.9462 30.5266 33.7134 30.5804 33.6706C30.6343 33.6278 31.1938 33.3693 31.8238 33.0961C32.4537 32.8229 33.0484 32.5559 33.1453 32.5027C33.3558 32.387 34.1206 32.0401 35.9642 31.224C36.718 30.8903 37.5549 30.5134 37.8241 30.3865C38.0933 30.2594 38.5778 30.0382 38.9008 29.8948C39.5464 29.6082 40.3375 29.2422 41.5624 28.6635C42.0034 28.4552 42.3916 28.2847 42.4252 28.2847C42.5646 28.2847 43.5374 27.7978 43.5998 27.6968C43.6371 27.6365 43.5861 27.4958 43.4867 27.3841C43.0455 26.8887 42.1856 26.7885 41.0477 27.1001C40.0669 27.3687 38.7366 27.7799 38.5093 27.8849C38.4016 27.9345 37.9611 28.0883 37.5304 28.2264C36.3337 28.6103 33.7049 29.5297 33.3465 29.6897C33.1711 29.768 32.8074 29.9064 32.5382 29.9974C32.269 30.0882 31.6082 30.3159 31.0699 30.5034C29.9959 30.8773 26.6929 31.584 25.5799 31.6782C24.7195 31.7509 24.4144 31.682 24.2092 31.3689C23.8544 30.8274 24.1202 30.079 24.7541 29.8345C25.0942 29.7032 26.4941 29.4634 26.9324 29.4612C27.2964 29.4594 29.5315 29.1025 30.92 28.8243C31.9009 28.6279 32.6325 28.2504 32.8271 27.8403C33.0174 27.4394 33.0164 27.3567 32.8183 27.0543L32.6581 26.8097L30.3956 26.8375C29.1514 26.8528 27.7368 26.875 27.2523 26.8867Z"
              fill="#ffffff"
            />
          </svg>
          <div>
            <p className="text-[20px] font-semibold text-white">
              Nom
              <span className="text-[20px] font-semibold text-white">Nom</span>
            </p>
            <p>Swift delivery</p>
          </div>
        </div>
        <div className="flex gap-4 flex-col">
          <span className="text-[#ffffff]">NOMNOM</span>
          <p>Home</p>
          <p>Contact us</p>
          <p>Delivery zone</p>
        </div>
        <div className="flex gap-4 flex-col">
          <span className="text-[#ffffff]">MENU</span>
          <p>Appetizers</p>
          <p>Salads</p>
          <p>Pizzas</p>
          <p>Lunch favorites</p>
          <p>Main dishes</p>
        </div>
        <div className="flex gap-4 flex-col">
          <div className="text-white opacity-0">SPACE</div>
          <p>Side dish</p>
          <p>Brunch</p>
          <p>Desserts</p>
          <p>Beverages</p>
          <p>Fish & Sea foods</p>
        </div>
        <div className="flex gap-4 flex-col">
          <span className="text-[#ffffff]">FOLLOW US</span>
          <div className="flex gap-4">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="28" height="27.0345" fill="url(#pattern0_23_5084)" />
              <defs>
                <pattern
                  id="pattern0_23_5084"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_23_5084"
                    transform="scale(0.00862069 0.00892857)"
                  />
                </pattern>
                <image
                  id="image0_23_5084"
                  width="116"
                  height="112"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="28" height="27.0345" fill="url(#pattern0_23_5087)" />
              <defs>
                <pattern
                  id="pattern0_23_5087"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_23_5087"
                    transform="scale(0.00862069 0.00892857)"
                  />
                </pattern>
                <image
                  id="image0_23_5087"
                  width="116"
                  height="112"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex text-[#ffffff] gap-16 container mx-auto py-8 border-t text-[14px] leading-5">
        <div className="flex gap-1 ">
          <p>Copy right 2026</p>
          <p>Â©</p>
          <p>Nomnom LLC</p>
        </div>
        <p>Privacy policy</p>
        <p>Terms and condition</p>
        <p>Cookie policy</p>
      </div>
    </div>
  );
};

export default Footer;
