function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split("; ");
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}

window.addEventListener("load", () => {

  const loginButton = document.querySelector('.login-button');
  const loginInfo = document.querySelector('.user-info')
  const userName = document.querySelector('.user_name')
  const userAvatar = document.querySelector('.user_avatar')

  if(!getCookie("_token")) {
    const loader = document.querySelector(".preloader");
    loader.className += " hidden";
    loginInfo.className += " hidden";
  } else {
    const loader = document.querySelector(".preloader");
    loader.className += " hidden";
    loginButton.className += " hidden";

    const userData = getCookie("_user_data");
    const userDataObj = JSON.parse(userData.substring(2, userData.length));
    let newUserAvatar = `https://cdn.discordapp.com/avatars/${userDataObj.id}/${userDataObj.avatar}.png`;
    let newUserName = userDataObj.username;
    userName.innerHTML = newUserName;
    userAvatar.src = newUserAvatar;
  }
  
});
