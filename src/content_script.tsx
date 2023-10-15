/**
 * https://mjai.ekyu.moe/report/888288d74f7ed24c.html#kyoku-6-0
 */
class CrxMortal {
  static DEFAULT_THRESHOLD = 5.0;
  createSpan = (text: string) => {
    const span = document.createElement("span");
    span.innerText = text;
    span.style.background = `#ffd5d5`;
    span.style.margin = `auto .5rem`;
    span.style.fontWeight = `bold`;
    return span;
  };

  main = () => {
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
        if (scoreNum < CrxMortal.DEFAULT_THRESHOLD) {
          const suggestion = this.createSpan(score.textContent || ``);
          element.querySelector(`:scope > span`)?.appendChild(suggestion);
        } else {
          element.removeAttribute(`open`);
        }
        return scoreNum;
      })
      .filter((score) => score !== null);

    const totalMoves = scores.length;
    const badMoves = scores.filter(
      (score) => score !== null && score < CrxMortal.DEFAULT_THRESHOLD
    ).length;
    const metrics = this.createSpan(
      `${badMoves}/${totalMoves} = ${
        totalMoves > 0 ? Math.round((badMoves / totalMoves) * 100) : NaN
      }%`
    );
    document
      .querySelector("body > details.collapse:nth-child(6) > summary")
      ?.appendChild(metrics);
  };
}

if (require.main === module) {
  const crx = new CrxMortal();
  crx.main();
}
