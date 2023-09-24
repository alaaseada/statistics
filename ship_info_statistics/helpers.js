const _query = (tag) => {
  return document.querySelector(`#${tag}`)
    ? document.querySelector(`#${tag}`)
    : document.querySelector(`.${tag}`);
};

const __queryAll = (q) => {
  return document.querySelectorAll(`${q}`);
};

export { _query, __queryAll };
