export function asyncHandler(handlerFunction) {
  return function wrappedHandler(req, res, next) {
    Promise.resolve(
      handlerFunction(req, res, next)
    ).catch(next);
  };
}