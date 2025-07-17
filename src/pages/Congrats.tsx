import React from 'react';

const Congrats = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      <div className="relative w-full max-w-lg mx-auto">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-green-500 opacity-70 blur-md" />
        <div className="relative bg-card/80 backdrop-blur-md rounded-2xl shadow-2xl z-10 p-8 flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">Congratulations!</h1>
          <p className="text-lg text-muted-foreground text-center mb-6">
            Thank you for your purchase! Your road to body transformation starts now.
          </p>
          <p className="text-base text-muted-foreground text-center mb-8">
            Please fill out this survey in as much detail as possible. Once this is complete, Boon will have your program ready within 7 business days!
          </p>
          <a
            href="https://tally.so/r/31Y66W"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Fill Out My Program Survey
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Congrats; 