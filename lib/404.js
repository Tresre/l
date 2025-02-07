var GITHUB_ISSUES_LINK =
  "https://api.github.com/repos/Tresre/l/issues/";
var PATH_SEGMENTS_TO_SKIP = 1;

function isUrl(url) {
  // Regex from https://stackoverflow.com/a/3809435, with a modification to allow for TLDs of up to 24 characters
  return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,24}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+$/.test(
    url
  );
}

function redirect() {
  var location = window.location;
  var issueNumber = location.pathname.split("/")[
    PATH_SEGMENTS_TO_SKIP + 1
  ];
  var issueDecode = atob(issueNumber);
  var issueNumber = parseInt(issueDecode) - (10);
  var homepage =
    location.protocol +
    "//" +
    location.hostname +
    (location.port ? ":" + location.port : "") +
    "/" +
    location.pathname.split("/")[PATH_SEGMENTS_TO_SKIP];

  var xhr = new XMLHttpRequest();

  xhr.onload = function () {
    try {
      var payload = JSON.parse(xhr.response);
      var message = payload.message;
      var title = payload.title;

      // Workaround IE 11 lack of support for new URL()
      var url = document.createElement("a");
      url.setAttribute("href", title);

      // Invalid URLs includes invalid issue numbers, issue titles that are not URLs, and recursive destination URLs
      var isInvalidUrl =
        message === "Not Found" ||
        !title ||
        !isUrl(title) ||
        url.hostname === location.hostname;

      if (isInvalidUrl) {
        location.replace(homepage);
      } else {
        location.replace(title);
      }
    } catch (e) {
      location.replace(homepage);
    }
  };

  xhr.onerror = function () {
    location.replace(homepage);
  };
  xhr.open("GET", GITHUB_ISSUES_LINK + issueNumber);
  xhr.send();
}

redirect();
