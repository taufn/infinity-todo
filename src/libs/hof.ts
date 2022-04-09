const hof = {
  useTimeout: (fn: () => void, ms: number = 200) => {
    const timer = window.setTimeout(() => {
      window.clearTimeout(timer);
      fn();
    }, ms);
  },
};

export default hof;
