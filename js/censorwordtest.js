
/**
 * 是否包含敏感词
 * @param  {string}  text [description]
 * @return {Boolean}      [description]
 */
export function hasSensitiveWord(text) {
  if (typeof text != 'string') {
    console.error('Type Error: expected string but ', typeof text);
  }
  const censorwordsArr = window.getSensitives()
  for (let word of censorwordsArr) {
    let pattern = new RegExp(word)
    if (pattern.test(text)) {
      return true;
    }
  }
  return false;
}
