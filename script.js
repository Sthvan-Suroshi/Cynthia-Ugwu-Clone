var mncircle = document.querySelector(".mncircle");
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

var timeout;
function hero_anim() {
  var tl = gsap.timeline();
  tl.from("#nav", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 1,
      stagger: 0.3,
    })
    .from(".hero-fotter", {
      x: -10,
      opacity: 0,
      ease: Expo.easeInOut,
      //   delay: -1,
    });
}

function mouseskew() {
  var xscale = 1;
  var yscale = 1;
  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", (dets) => {
    clearTimeout(timeout);
    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseHover(xscale, yscale);
    timeout = setTimeout(() => {
      document.querySelector(
        ".mncircle"
      ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}

function circleMouseHover(xscale, yscale) {
  window.addEventListener("mousemove", (dets) => {
    mncircle.style.display = "block";
    mncircle.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
  });

  window.addEventListener("mouseout", () => {
    mncircle.style.display = "none";
  });
}

document.querySelectorAll(".elem").forEach((elem) => {
  var rotate = 0;
  var diff_rotate = 0;

  elem.addEventListener("mousemove", (dets) => {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diff_rotate = rotate - dets.clientX;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      // display: "block",
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diff_rotate * 0.5),
    });

    gsap.to(elem.querySelector("h1"), {
      opacity: 0.2,
      transform: "translateX(50px)",
    });

    gsap.to(elem.querySelector("h5"), {
      opacity: 0.2,
    });

    gsap.to(elem.querySelector("span"), {
      opacity: 0.2,
    });
  });

  //mouse leave events scripts down below
  elem.addEventListener("mouseleave", (dets) => {
    diff_rotate = rotate - dets.clientX;
    gsap.to(elem.querySelector("img"), {
      // display:"none",
      opacity: 0,
      top: 0,
      // duration:.5,
      ease: Power1,
    });

    gsap.to(elem.querySelector("h1"), {
      opacity: 0.7,
      transform: "translateX(0)",
    });

    gsap.to(elem.querySelector("h5"), {
      opacity: 0.7,
    });
    gsap.to(elem.querySelector("span"), {
      opacity: 0.7,
    });
  });
});

function updateTime() {
  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour12: true,
    timeZone: "IST", // Use UTC for consistent time across users
  });

  // Update the element with the ID "time-display" with the formatted time
  document.getElementById("time-display").textContent = formattedTime;
}



updateTime();
setInterval(updateTime, 1000);
circleMouseHover();
mouseskew();
hero_anim();
