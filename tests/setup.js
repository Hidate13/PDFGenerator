import { vi, expect } from "vitest";
import "@testing-library/jest-dom";

// Mock all CSS modules
vi.mock("identity-obj-proxy");
// Mock Vuetify CSS files
vi.mock("vuetify/lib/styles/main.css", () => "");
vi.mock("vuetify/lib/components/*.css", () => "");
// Mock CSS imports
vi.mock("*/vuetify/lib/components/VBtn/VBtn.css", () => ({}));
// Mock all .css files to prevent errors during tests
vi.mock("*.css", () => ({}));
