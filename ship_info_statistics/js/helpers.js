const _query = (tag) => {
  return document.querySelector(`#${tag}`)
    ? document.querySelector(`#${tag}`)
    : document.querySelector(`.${tag}`);
};

const _queryAll = (q) => {
  return document.querySelectorAll(`${q}`);
};

export { _query, _queryAll };
