/**
 * https://mjai.ekyu.moe/report/888288d74f7ed24c.html#kyoku-6-0
 */

const THRESHOLD = 5.0;
const createSpan = (text: string) => {
  const suggestion = document.createElement("span");
  suggestion.innerText = text;
  suggestion.style.background = `#ffd5d5`;
  suggestion.style.margin = `auto .5rem`;
  suggestion.style.fontWeight = `bold`;
  return suggestion;
};

const scores = [...document.querySelectorAll(`body section details.entry`)]
  .map((element) => {
    const tile = element.querySelector(`span svg.tile use`) as SVGAElement;
    if (tile === null) {
      return null;
    }
    // '#pai-9s'
    const score = element
      .querySelector(`table [href*="${tile.href.baseVal}"]`)
      ?.closest(`tr`)
      ?.querySelector(`td:nth-child(3)`) as HTMLElement;
    const scoreNum = parseFloat(score.textContent || ``);
    if (scoreNum < THRESHOLD) {
      const suggestion = createSpan(score.textContent || ``);
      element.querySelector(`:scope > span`)?.appendChild(suggestion);
    } else {
      element.removeAttribute(`open`);
    }
    return scoreNum;
  })
  .filter((score) => score !== null);

const badMoves = scores.filter(
  (score) => score !== null && score < THRESHOLD
).length;
const totalMoves = scores.length;

const metrics = createSpan(
  `${badMoves}/${totalMoves} = ${Math.round((badMoves / totalMoves) * 100)}%`
);
document
  .querySelector("body > details.collapse:nth-child(6) > summary")
  ?.appendChild(metrics);

