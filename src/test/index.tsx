import React, { ReactElement, ReactNode } from "react";
import {
  render as baseRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";
import Login from "pages/login";
import "@testing-library/jest-dom";
import { BrowserRouter, Routes, MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>{children}</Routes>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

const render = (ui: ReactElement, options?: Omit<RenderOptions, "queries">) =>
  baseRender(ui, { wrapper: AllTheProviders, ...options }) as RenderResult;

export * from "@testing-library/react";
export * from "@testing-library/jest-dom";
export { render };
