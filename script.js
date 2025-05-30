/////////////////// fly out menu ////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const flyoutMenu = document.getElementById("flyoutMenu");
  let menuOpen = false;

  menuBtn.addEventListener("click", () => {
    menuOpen = !menuOpen;
    flyoutMenu.classList.toggle("-translate-y-full");
    flyoutMenu.classList.toggle("translate-y-0");
  });
});

////////// carousel ////////////////

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const carouselTrack = document.getElementById("carousel-track");
  const images = carouselTrack.querySelectorAll("img");

  const totalScrollWidth =
    (images.length * window.innerWidth) / 3 - window.innerWidth;

  gsap.to(carouselTrack, {
    x: () => `-${totalScrollWidth}px`,
    ease: "none",
    scrollTrigger: {
      trigger: "#carousel-section",
      start: "top-=300 top",
      end: () => `+=${totalScrollWidth}`,
      scrub: true,
      anticipatePin: 1,
    },
  });
});

/////////// rotate image ////////////////

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const tokenomicsImage = document.getElementById("tokenomics-img");
  gsap.to(tokenomicsImage, {
    rotation: 360,
    ease: "none",
    scrollTrigger: {
      trigger: "#tokenomicsImage",
      start: "top bottom", // start when image enters the viewport
      end: "bottom top", // end when image leaves the viewport
      scrub: true, // links animation progress to scroll
    },
  });
});

function copyAddress() {
  const fullAddress = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  navigator.clipboard.writeText(fullAddress).then(() => {
    const notification = document.getElementById("copy-notification");
    notification.classList.remove("opacity-0");
    notification.classList.add("opacity-100");

    setTimeout(() => {
      notification.classList.remove("opacity-100");
      notification.classList.add("opacity-0");
    }, 2000);
  });
}

///////////// mcap and price ///////////////////////

function formatNumber(num) {
  return Math.round(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function fetchTokenData() {
  fetch(
    "https://api.geckoterminal.com/api/v2/simple/networks/solana/token_price/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?include_market_cap=true&mcap_fdv_fallback=true",
    {
      headers: {
        accept: "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const tokenPrice = parseFloat(
        data.data.attributes.token_prices["xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"]
      );
      const marketCap = parseFloat(
        data.data.attributes.market_cap_usd["xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"]
      );

      const formattedPrice = tokenPrice.toFixed(6);
      const formattedMarketCap = formatNumber(marketCap);

      document.querySelector(".price").textContent = `$${formattedPrice}`;
      document.querySelector(
        ".market-cap"
      ).textContent = `$${formattedMarketCap}`;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.querySelector(".price").textContent = "Error";
      document.querySelector(".market-cap").textContent = "Error";
    });
}

// Initial call
fetchTokenData();

// Call every 5 seconds
setInterval(fetchTokenData, 5000);
