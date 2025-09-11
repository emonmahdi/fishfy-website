document.querySelectorAll(".counter").forEach((counter) => {
  const target = +counter.getAttribute("data-target");
  let count = 0;
  const step = target / 200; // animation speed
  const updateCounter = () => {
    count += step;
    if (count < target) {
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target;
    }
  };
  updateCounter();
});
