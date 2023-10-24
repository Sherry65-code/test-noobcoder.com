var isMenuBarOpen = false;
const pagestartname = "page";
var curpage;
    curpage = localStorage.getItem("currentPage");
    if (curpage == null) curpage = 0;
    
const pages = [
  "Introduction",
  "Basic Commands",
  "Learn Vim",
  "Gaming on Linux",
  "Desktop Enviroments",
  "Ricing Xfce Like a Pro",
  "Where to go from here ?",
];

function toggleMenuBar() {
  if (isMenuBarOpen) {
    // Close MenuBar
    document.getElementById("menubar").style.left = "-300px";
    document.getElementById("body").style.left = 0;
    document.getElementById("menu-button").style.transform = "rotateZ(360deg)";
    isMenuBarOpen = false;
  } else {
    // Open MenuBar
    document.getElementById("menubar").style.left = 0;
    document.getElementById("body").style.left = "300px";
    document.getElementById("menu-button").style.transform = "rotateZ(0deg)";
    isMenuBarOpen = true;
  }
}

function animate() {
    const items = document.querySelectorAll("#page");
    if (items.length == 0) return;

    items.forEach(item => {
      gsap.from(item, {
        duration: 1,
        opacity: 0,
        y: 100,
        // stagger: 0.2,         
        ease: "power2.out",
      });
    });
}


function openPage(index, shouldtoggle=true) {
    document.getElementById("pagename").innerHTML = pages[index];
    document.title = `LearnLinux.com - ${pages[index]}`;
    localStorage.setItem("currentPage", index);
  
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `subfiles/page${index}.html`, false); // make the request synchronous
    xhr.send();
  
    if (xhr.status == 200) {
      document.getElementById('page').innerHTML = xhr.responseText;
    }
  
    curpage = index;
    if (shouldtoggle) toggleMenuBar();
    animate();
}

function nextPage() {
    curpage++;
    openPage(curpage, false);
}

function fetchFileContent(filePath) {
    return fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .catch(error => {
        console.error('There was a problem fetching the file:', error);
      });
  }

window.addEventListener('load', () => {
    openPage(curpage, false);
});

