import { APIResult, APIResultSuccess } from "@/api/types";
import { AppSlice } from "@/store/appSlice";

export const baseUrl = import.meta.env.VITE_API_URL || "/api";
export const apiKey = import.meta.env.VITE_API_KEY;

export const defaultQueryOptions = {
  staleTime: 5 * 60 * 1000,
  retry: 0,
};

export const apiResultSuccess = <T>(data?: T): APIResult<T> => ({
  success: true,
  data: data,
});

export const apiErrorFactory = async <T = never>(data: {
  status: number;
  message: string;
}): Promise<APIResult<T>> => {
  return {
    success: false,
    error: {
      status: data.status,
      error: data.message,
    },
  };
};

export const throwUnhandledApiError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.message || `Error Code ${response.status}`);
  }
};

export const handleApi = async <T>(
  fn: () => Promise<T>,
  setAppError: AppSlice["setAppError"]
): Promise<T> => {
  try {
    setAppError(null);
    return await fn();
  } catch (error: any) {
    const message =
      error?.name === "AbortError"
        ? "Request was aborted."
        : error?.message || "Unknown error occurred.";

    setAppError(message);
    throw new Error(error);
  }
};

export const customFetch = async (
  url: string,
  options?: RequestInit
): Promise<Response> => {
  return fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
};

export const fetchJson = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.message || `Error Code ${response.status}`);
  }

  return response.json();
};

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 3,
  retryDelay = 1000,
  signal?: AbortSignal
): Promise<Response> {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      const controller = new AbortController();
      const timeoutSignal = signal
        ? mergeAbortSignals(signal, controller.signal)
        : controller.signal;

      const response = await fetch(url, { ...options, signal: timeoutSignal });

      if (!response.ok) {
        const isServerError = response.status >= 500 && response.status < 600;
        if (isServerError) {
          throw new Error(`Server error: ${response.status}`);
        }
      }

      return response;
    } catch (err: any) {
      if (signal?.aborted || err.name === "AbortError") {
        throw new DOMException("Aborted", "AbortError");
      }

      if (attempt === retries) {
        throw err;
      }

      await delay(retryDelay);
      attempt++;
    }
  }

  throw new Error("Fetch failed after retries");
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mergeAbortSignals(...signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();

  for (const signal of signals) {
    if (!signal) continue;
    if (signal.aborted) {
      controller.abort();
      break;
    }
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  return controller.signal;
}

export function isApiSuccess<T>(rsp: APIResult<T>): rsp is APIResultSuccess<T> {
  return rsp.success === true;
}
