export const Hero = () => {
  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2">
      <svg
        viewBox="0 0 1440 500"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block"
        preserveAspectRatio="none"
        style={{ display: "block" }}
      >
        <path
          d="M0,40 C200,0 400,80 720,30 C1000,0 1200,60 1440,30 L1440,470 C1200,500 900,440 720,470 C500,500 200,450 0,470 Z"
          fill="#448A5B"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-12">
        <span className="inline-block bg-white/20 text-white text-xs px-4 py-1 rounded-full mb-5 tracking-widest">
          🍽️ ШИНЭХЭН · АМТТАЙ
        </span>
        <h1 className="text-5xl font-medium text-white leading-tight mb-4 text-center">
          Дуртай хоолоо хүргүүлээрэй
        </h1>
        <p className="text-white/70 text-sm leading-relaxed max-w-sm text-center">
          Гэртээ суугаад дуртай хоолоо захиалаарай. Хурдан, амттай, тав тухтай.
        </p>
      </div>
    </div>
  );
};
