
function compose(...funcs) {
  return funcs.reduceRight(function (previousResult, currentF) {
    return currentF(previousResult)
  }, 0)
}

module.exports = compose;
