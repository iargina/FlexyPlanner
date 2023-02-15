
export function hideNotification() {
  const warningEl = document.querySelector("#NotiflixNotifyWrap");
  if (warningEl) {
    warningEl.remove();
  }
}
