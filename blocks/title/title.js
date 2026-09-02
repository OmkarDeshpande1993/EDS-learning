export default function decorate(block) {
  const [titleRow, subtitleRow] = [...block.children];

  if (titleRow) {
    const heading = titleRow.querySelector('h1, h2, h3, h4, h5, h6') || titleRow.firstElementChild;
    if (heading && !heading.matches('h1, h2, h3, h4, h5, h6')) {
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent;
      heading.replaceWith(h2);
    }
  }

  if (subtitleRow) {
    subtitleRow.classList.add('title-subtitle');
  }
}