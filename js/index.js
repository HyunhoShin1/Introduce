window.onload = function () {
  var html = document.documentElement;
  var body = document.body;
  var page = 1;
  var sections = document.querySelectorAll("section");
  var lastPage = sections.length;
  var isScrolling = false;

  window.scrollTo(0, 0);

  function closeDoors(callback) {
    var doors = document.querySelectorAll(".elevator-doors");
    doors.forEach(function (door) {
      door.classList.add("doors-closing");
    });
    setTimeout(function () {
      if (callback) callback();
      doors.forEach(function (door) {
        door.classList.remove("doors-closing");
      });
    }, 1000);
  }

  function scrollToSection(index) {
    if (isScrolling || index < 1 || index > lastPage) return;

    isScrolling = true;
    page = index;
    var posTop = (page - 1) * window.innerHeight;
    closeDoors(function () {
      window.scrollTo(0, posTop);
      isScrolling = false;
    });
  }

  window.addEventListener("wheel", function (e) {
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
  });

  document.querySelectorAll(".gnb li").forEach(function (li, index) {
    li.addEventListener("click", function () {
      scrollToSection(index + 2);
    });
  });

  /* 로고 클릭 */
  document.querySelector(".logo").addEventListener("click", function () {
    scrollToSection(1);
  });

  /* 모바일 메뉴 버튼 */
  var menuBar = document.querySelector(".mobile-menu-bar");
  var sideMenu = document.querySelector(".side-menu")
  var logo = document.querySelector(".logo");
    menuBar.addEventListener("click", function (e) {
      e.preventDefault();
      if (sideMenu.style.display === 'block') {
        sideMenu.style.display = 'none';
        menuBar.classList.remove('active');
        logo.style.visibility = 'visible';
      } else {
        sideMenu.style.display = 'block';
        menuBar.classList.add('active');
        logo.style.visibility = 'hidden';
      }
    });

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
          document.querySelector(".per-text").textContent = widthPercentage + "%";
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
};
