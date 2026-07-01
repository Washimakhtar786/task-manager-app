export function validateRequest(validationFunction) {
  return function validationMiddleware(req, res, next) {
    const validationResult = validationFunction(req.body);

    if (!validationResult.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationResult.errors,
      });
    }

    req.validatedData = validationResult.data;

    next();
  };
}