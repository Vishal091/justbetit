"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export function CustomStudio() {
  return <NextStudio config={config} />;
}
