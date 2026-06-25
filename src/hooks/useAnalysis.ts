import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { AnalysisResult, AnalysisError, AppState } from "@/types/analysis";

export function useAnalysis() {
  const [state, setState] = useState<AppState>("upload");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<AnalysisError | null>(null);

  const handleResponse = useCallback((data: any, fnError: any) => {
    if (fnError) {
      const status = (fnError as any)?.status;
      if (status === 429) {
        setState("error");
        setError({ error: "Rate limit exceeded.", code: "RATE_LIMITED", scans_remaining: 0 });
        return;
      }
      if (status === 402) {
        setState("error");
        setError({ error: "AI credits exhausted. Please try again later.", code: "PROCESSING_ERROR" });
        return;
      }
      throw fnError;
    }

    if (data?.error) {
      setState("error");
      setError(data as AnalysisError);
      return;
    }

    setResult(data as AnalysisResult);
    setState("results");
  }, []);

  const analyze = useCallback(async (file: File) => {
    setState("processing");
    setError(null);
    setResult(null);

    try {
      const base64 = await fileToBase64(file);

      const { data, error: fnError } = await supabase.functions.invoke("analyze-listing", {
        body: { image: base64, mimeType: file.type },
      });

      handleResponse(data, fnError);
    } catch (e) {
      console.error("Analysis error:", e);
      setState("error");
      setError({ error: "Processing error. Please try again.", code: "PROCESSING_ERROR" });
    }
  }, [handleResponse]);

  const analyzeUrl = useCallback(async (url: string) => {
    setState("processing");
    setError(null);
    setResult(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("analyze-listing", {
        body: { url },
      });

      handleResponse(data, fnError);
    } catch (e) {
      console.error("URL analysis error:", e);
      setState("error");
      setError({ error: "Processing error. Please try again.", code: "PROCESSING_ERROR" });
    }
  }, [handleResponse]);

  const analyzeVin = useCallback(async (vin: string) => {
    setState("processing");
    setError(null);
    setResult(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("analyze-listing", {
        body: { vin },
      });

      handleResponse(data, fnError);
    } catch (e) {
      console.error("VIN analysis error:", e);
      setState("error");
      setError({ error: "Processing error. Please try again.", code: "PROCESSING_ERROR" });
    }
  }, [handleResponse]);

  const reset = useCallback(() => {
    setState("upload");
    setResult(null);
    setError(null);
  }, []);

  return { state, result, error, analyze, analyzeUrl, analyzeVin, reset };
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
