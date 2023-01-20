const token = sessionStorage.getItem('token');
const url = new URL(location.href);

if (url.pathname === '/admin.html' && !token) {
  //   history.replaceState(null, null, 'http://localhost:1234');
  console.log(url.origin + '/admin');
  window.open(url.origin, '_parent');
}

console.log(url);
