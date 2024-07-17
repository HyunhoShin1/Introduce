window.onload = function () {

  var html = document.documentElement;
  var body = document.body;

  /* 메뉴 엘레베이터 이동 및 메뉴,헤더 색깔 변경 */
  var logo = document.querySelector('.logo');
  var sideMenu = document.querySelector('.side-menu');
  var sections = document.querySelectorAll('section');
  var page = 1;
  var lastPage = sections.length;
  var isScrolling = false;


  if (localStorage.getItem('currentPage')) {
    page = parseInt(localStorage.getItem('currentPage'), 10);
    var posTop = (page - 1) * window.innerHeight;
    updateSideMenuAndLogo();
    window.scrollTo(0, posTop);
  } else {
    window.scrollTo(0, 0);
  }

  function closeDoors(callback) {
    var doors = document.querySelectorAll('.elevator-doors');
    
    doors.forEach(function (door) {
      door.classList.add('doors-closing');
    });

    document.documentElement.classList.add('shake');
    setTimeout(function() {
        document.documentElement.classList.remove('shake');
    }, 1000);

    setTimeout(function () {
      if (callback) callback();
      doors.forEach(function (door) {
        door.classList.remove('doors-closing');
      });
      
    }, 1000);
  }

  function updateSideMenuAndLogo() {
    var scrollY = window.scrollY;
    var logoImage = document.querySelector('.logo img')
    var mobileSpan = document.querySelectorAll(".span1, .span2, .span3")
 
    if ((scrollY >= 912 && scrollY <= 1824) || scrollY >= 2736) {
      sideMenu.style.color = 'black';
      logoImage.src = './images/logo-black.png';
      mobileSpan.forEach(function(span) {
        span.style.backgroundColor = 'black';
      });

    } else {
      sideMenu.style.color = '';
      logoImage.src = './images/logo-white.png';
      mobileSpan.forEach(function(span) {
        span.style.backgroundColor = 'white';
      });
    }
  }


  function scrollToSection(index) {
    if (isScrolling || index < 1 || index > lastPage) return;

    isScrolling = true;
    page = index;
    localStorage.setItem('currentPage', page);
    var posTop = (page - 1) * window.innerHeight;
    closeDoors(function () {
      window.scrollTo(0, posTop);
      isScrolling = false;
      
      console.log('Scroll Y Position:', window.scrollY);

      updateSideMenuAndLogo();
      
    });
  }

  window.addEventListener('scroll', function() {
    updateSideMenuAndLogo();
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    updateSideMenuAndLogo();
  });

  function wheelHandler(e) {
    if (isScrolling) return;
    e.preventDefault();

    if (e.deltaY > 0) {
      if (page == lastPage) return;
      page++;
    } else if (e.deltaY < 0) {
      if (page == 1) return;
      page--;
    }

    scrollToSection(page);
  }

  function addScrollListener() {
    window.addEventListener("wheel", wheelHandler, { passive: false });
  }

  function removeScrollListener() {
    window.removeEventListener("wheel", wheelHandler);
  }

  addScrollListener();


  /* gnb 메뉴 클릭 */
  document.querySelectorAll(".gnb li").forEach(function (li, index) {
    li.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToSection(index + 2);

      if (window.innerWidth <= 768) {
        setTimeout(function() {
          sideMenu.style.display = 'none';
          menuBar.classList.remove("active");
          logo.style.visibility = "visible";
          document.documentElement.style.overflow = "";
          addScrollListener();
        }, 500);
      }
    });
  });

  /* 로고 클릭 */
  logo.addEventListener("click", function () {
    if (menuBar.classList.contains("active")) return;
    scrollToSection(1);
  });

  /* 모바일 메뉴 버튼 */
  var menuBar = document.querySelector(".mobile-menu-bar");
  var menuItems = document.querySelectorAll(".gnb li")

  menuBar.addEventListener("click", function (e) {
    e.preventDefault();
    if (sideMenu.style.display === "block") {
      sideMenu.style.display = "none";
      setTimeout(() => {
        sideMenu.classList.remove('show');       
      }, 100);
      menuBar.classList.remove("active");
      logo.style.visibility = "visible";
      document.documentElement.style.overflow = "";
      addScrollListener();
    } else {
      sideMenu.style.display = "block";
      setTimeout(() => {
        sideMenu.classList.add('show');       
      }, 10);
      menuBar.classList.add("active");
      logo.style.visibility = "hidden";
      document.documentElement.style.overflow = "hidden";
      removeScrollListener();
    }
  });


  /* 글자깜빡이게 */
  var textElement = document.querySelector('.blink')
  var texts = ["▼", "▽"];
  let index = 0;

  function changeText() {
    textElement.innerText = texts[index];
    index = (index + 1) % texts.length;
  }
  setInterval(changeText, 500);

  /* 텍스트 드래그 */
  const dragText = document.querySelector('.dragtext')
  let offsetX, offsetY, isDragging = false;

  dragText.addEventListener('mousedown', (e) => {
    offsetX = e.clientX - dragText.getBoundingClientRect().left;
    offsetY = e.clientY - dragText.getBoundingClientRect().top;
    isDragging = true;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      dragText.style.left = `${e.clientX - offsetX - 59}px`;
      dragText.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  dragText.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    offsetX = touch.clientX - dragText.getBoundingClientRect().left;
    offsetY = touch.clientY - dragText.getBoundingClientRect().top;
    isDragging = true;
  });

  document.addEventListener('touchmove', (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      dragText.style.left = `${touch.clientX - offsetX}px`;
      dragText.style.top = `${touch.clientY - offsetY}px`;
    }
  });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });

  /* -------------------aboutme-sec------------------------- */
  
  
  
  /* ---------------------skill-sec----------------- */
  /* 스킬 탭버튼 */
  document.getElementById("toggle-on").addEventListener("click", tabmenu1);
  function tabmenu1() {
    if (window.innerHeight <= 1024) {
      document.querySelector(".languages").style.display = "grid";
      document.querySelector(".tools").style.display = "none";
    } else {
      document.querySelector(".languages").style.display = "flex";
      document.querySelector(".tools").style.display = "none";
    }
  }

  document.getElementById("toggle-off").addEventListener("click", tabmenu2);
  function tabmenu2() {
    if (window.innerHeight <= 1024) {
      document.querySelector(".languages").style.display = "none";
      document.querySelector(".tools").style.display = "grid";
    } else {
      document.querySelector(".languages").style.display = "none";
      document.querySelector(".tools").style.display = "flex";
    }
  }

  /* 스킬 툴팁 */
  document.querySelectorAll(".skill-icon").forEach(function (icon) {
    icon.addEventListener("mouseenter", function () {
      var toolname = this.dataset.name;
      var widthPercentage = 0;
      var text = this.dataset.text;
      var tooltip = document.querySelector(".tooltip");
      const targetWidth = parseInt(this.dataset.width);
      var loadingBar = document.querySelector(".loading-bar");

      tooltip.style.display = "block";
      document.querySelector(".toolname").textContent = toolname;

      loadingBar.style.width = "0%";

      var animateWidth = function () {
        if (widthPercentage <= targetWidth) {
          loadingBar.style.width = widthPercentage + "%";
          document.querySelector(".per-text").textContent =
            widthPercentage + "%";
          widthPercentage++;
          setTimeout(animateWidth, 0);
        }
      };
      animateWidth();
      document.querySelector(".tool-text").textContent = text;
    });

    icon.addEventListener("mouseleave", function () {
      var tooltip = document.querySelector(".tooltip");
      tooltip.style.display = "none";
      var loadingBar = document.querySelector(".loading-bar");
      loadingBar.style.width = "0%";
      document.querySelector(".per-text").textContent = "0%";
    });
  });


/* ---------------portfolio-sec----------------- */
  /* 포트폴리오 슬라이드 */
  let currentIndex = 0;
  const wrapper = document.querySelector(".slide-wrapper");
  const boxes = document.querySelectorAll(".portfolio-box");
  const totalBoxes = boxes.length;

  document.querySelector(".next").addEventListener("click", () => {
    if (currentIndex < totalBoxes - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  document.querySelector(".prev").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  function updateSlider() {
    const offset = -currentIndex * 100;
    wrapper.style.transform = `translateX(${offset}%)`;
  }


  /* 버튼 사이트 이동 */
  function seoulGit() {
    window.location.href = 'https://github.com/jeonghae98/Seoul284', '_blank';
  }
  
};
