import React from "react"
import {SystemTest} from "./system-test"
import {screen, waitFor} from "@testing-library/react"
import App from "src/js/components/App"
const system = new SystemTest("histogram")

test("histogram deep inspection", async () => {
  system.render(<App />)
  await system.importFile("sample.zng")
  await system.runQuery("", "Histogram")
  const histogram = await screen.findByTestId("histogram")
  await waitFor(() =>
    expect(histogram.querySelectorAll("rect").length).toBeGreaterThan(0)
  )
})