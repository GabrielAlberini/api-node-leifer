import rateLimit from "express-rate-limit";

const sessionTimeClientHandler = (min, maxRequest, next) => {
  return rateLimit({
    windowMs: min * 60 * 1000,
    max: maxRequest,
    message: {
      error: "You have exceeded your request limit. Please try again later.",
    },
  });
};

export { sessionTimeClientHandler };
