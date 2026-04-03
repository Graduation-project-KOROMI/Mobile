import { useEffect, useRef } from "react";

type GlobalErrorHandler = (error: unknown, isFatal?: boolean) => void;

type ErrorUtilsLike = {
  getGlobalHandler?: () => GlobalErrorHandler;
  setGlobalHandler?: (handler: GlobalErrorHandler) => void;
};

function normalizeError(error: unknown) {
  if (error instanceof Error) {
    return error;
  }

  return new Error(typeof error === "string" ? error : "Unknown fatal error");
}

export function useGlobalFatalErrorBridge(onFatalError: (error: Error) => void) {
  const onFatalErrorRef = useRef(onFatalError);

  useEffect(() => {
    onFatalErrorRef.current = onFatalError;
  }, [onFatalError]);

  useEffect(() => {
    const errorUtils = (globalThis as typeof globalThis & { ErrorUtils?: ErrorUtilsLike })
      .ErrorUtils;

    if (!errorUtils?.getGlobalHandler || !errorUtils?.setGlobalHandler) {
      return;
    }

    const previousHandler = errorUtils.getGlobalHandler();

    const nextHandler: GlobalErrorHandler = (error, isFatal = false) => {
      if (isFatal) {
        const normalizedError = normalizeError(error);
        console.error(normalizedError);
        onFatalErrorRef.current(normalizedError);
        return;
      }

      previousHandler?.(error, isFatal);
    };

    errorUtils.setGlobalHandler(nextHandler);

    return () => {
      errorUtils.setGlobalHandler?.(previousHandler);
    };
  }, []);
}
