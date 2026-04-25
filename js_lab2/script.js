// Задание 1
window.onload = function () {
  var savedCount = localStorage.getItem("pageLoadCount");
  if (savedCount === null) {
    savedCount = 0;
  } else {
    savedCount = Number(savedCount);
  }
  var newCount = savedCount + 1;
  localStorage.setItem("pageLoadCount", newCount);
  alert("Вы загрузили/обновили эту страницу " + newCount + " раз(а).");
};
// Общие функции для заданий 2-4
function askFiveImageUrls() {
  var urls = [];
  for (var i = 1; i <= 5; i++) {
    var url = prompt("Введите ссылку на картинку №" + i);
    if (url === null) {
      url = "";
    }
    urls.push(url);
  }
  return urls;
}

function clearImagesResult() {
  document.getElementById("imagesResult").innerHTML = "";
}

function addImageResult(element) {
  document.getElementById("imagesResult").appendChild(element);
}

function createErrorText() {
  var paragraph = document.createElement("p");
  paragraph.textContent = "Can't load image";
  return paragraph;
}

function loadImage(url) {
  return new Promise(function (resolve) {
    var image = document.createElement("img");
    image.onload = function () {
      resolve(image);
    };
    image.onerror = function () {
      resolve(createErrorText());
    };
    image.src = url;
  });
}
// Задание 2, вывод в том же порядке, в котором вводились URL без async/await
function loadImagesInOrderPromise() {
  clearImagesResult();
  var urls = askFiveImageUrls();
  var promises = [];
  for (var i = 0; i < urls.length; i++) {
    promises.push(loadImage(urls[i]));
  }
  Promise.all(promises).then(function (elements) {
    for (var i = 0; i < elements.length; i++) {
      addImageResult(elements[i]);
    }
  });
}
// Задание 3, картинки выводятся в порядке фактической загрузки без async/await
function loadImagesWithoutOrderPromise() {
  clearImagesResult();
  var urls = askFiveImageUrls();
  for (var i = 0; i < urls.length; i++) {
    loadImage(urls[i]).then(function (element) {
      addImageResult(element);
    });
  }
}
// Вариант задания 2 через async/await
async function loadImagesInOrderAsync() {
  clearImagesResult();
  var urls = askFiveImageUrls();
  var promises = [];
  for (var i = 0; i < urls.length; i++) {
    promises.push(loadImage(urls[i]));
  }
  var elements = await Promise.all(promises);
  for (var j = 0; j < elements.length; j++) {
    addImageResult(elements[j]);
  }
}
// Вариант задания 3 через async/await
function loadImagesWithoutOrderAsync() {
  clearImagesResult();
  var urls = askFiveImageUrls();
  for (var i = 0; i < urls.length; i++) {
    loadOneImageAsync(urls[i]);
  }
}

async function loadOneImageAsync(url) {
  var element = await loadImage(url);
  addImageResult(element);
}
// Задание 5
function askFiveIpAddresses() {
  var ips = [];
  for (var i = 1; i <= 5; i++) {
    var ip = prompt("Введите IP-адрес №" + i);
    if (ip === null) {
      ip = "";
    }
    ips.push(ip);
  }
  return ips;
}

async function getIpInfo(ip) {
  var response = await fetch("https://json.geoiplookup.io/" + encodeURIComponent(ip));
  var data = await response.json();
  return data;
}

function isBlockedCountry(countryName, countryCode) {
  var blockedCodes = ["RU", "BY", "AF", "CN", "VE", "IR"];
  var blockedNames = [
    "russia",
    "russian federation",
    "belarus",
    "afghanistan",
    "china",
    "venezuela",
    "iran",
    "iran, islamic republic of"
  ];
  countryName = String(countryName).toLowerCase();
  countryCode = String(countryCode).toUpperCase();
  if (blockedCodes.indexOf(countryCode) !== -1) {
    return true;
  }
  if (blockedNames.indexOf(countryName) !== -1) {
    return true;
  }
  return false;
}

async function checkIpAddresses() {
  var ipResult = document.getElementById("ipResult");
  ipResult.innerHTML = "";
  var ips = askFiveIpAddresses();
  var hasBlockedIp = false;
  try {
    var promises = [];
    for (var i = 0; i < ips.length; i++) {
      promises.push(getIpInfo(ips[i]));
    }
    var results = await Promise.all(promises);
    for (var j = 0; j < results.length; j++) {
      var countryName = results[j].country_name;
      var countryCode = results[j].country_code;
      if (isBlockedCountry(countryName, countryCode)) {
        hasBlockedIp = true;
      }
      var paragraph = document.createElement("p");
      paragraph.textContent = ips[j] + " — " + countryName + " (" + countryCode + ")";
      ipResult.appendChild(paragraph);
    }
    if (hasBlockedIp) {
      alert("Our services are not available in your country");
    } else {
      alert("Welcome to our website!");
    }
  } catch (error) {
    alert("Ошибка при проверке IP-адресов");
    console.log(error);
  }
}
